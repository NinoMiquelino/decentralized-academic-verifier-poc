// did-service.js

const fs = require('fs');
const crypto = require('crypto');
const DLT_FILE = './dlt-simulation.json';

// --- Utilitários de Persistência ---

function readDLT() {
    try {
        const data = fs.readFileSync(DLT_FILE, 'utf8');
        return JSON.parse(data);
    } catch (error) {
        console.error("Erro ao ler DLT:", error.message);
        return { registeredDIDs: {}, issuedCredentials: {} };
    }
}

function writeDLT(data) {
    fs.writeFileSync(DLT_FILE, JSON.stringify(data, null, 2), 'utf8');
}

// --- Funções Principais DID/VC ---

/**
 * 1. Cria um DID (Identificador Descentralizado) e um par de chaves, 
 * e o registra na simulação do DLT.
 */
function registerDID(entityName) {
    // Simula a criação de um par de chaves para autenticação
    const { publicKey, privateKey } = crypto.generateKeyPairSync('ec', {
        namedCurve: 'secp256k1', // Curva comum em DLTs
        publicKeyEncoding: { type: 'spki', format: 'pem' },
        privateKeyEncoding: { type: 'pkcs8', format: 'pem' },
    });

    // Gera um DID único (did:exemplo:hash)
    const didHash = crypto.createHash('sha256').update(entityName + Date.now()).digest('hex').substring(0, 16);
    const did = `did:examplenode:${didHash}`;

    // Documento DID simplificado
    const didDocument = {
        id: did,
        publicKey: publicKey,
        authentication: [
            { id: `${did}#keys-1`, type: "Secp256k1VerificationKey2018", publicKeyPem: publicKey }
        ]
    };

    const dlt = readDLT();
    dlt.registeredDIDs[did] = didDocument;
    writeDLT(dlt);

    console.log(`DID Registrado: ${did}`);
    // Retorna a chave privada APENAS na criação (simula a Carteira Digital)
    return { did, didDocument, privateKey }; 
}

/**
 * 2. Emite uma Credencial Verificável (VC) assinada pelo Emissor.
 */
function issueCredential(didIssuer, privateKeyIssuer, didHolder, credentialData) {
    const vc = {
        "@context": ["https://www.w3.org/2018/credentials/v1"],
        id: `urn:uuid:${crypto.randomUUID()}`,
        type: ["VerifiableCredential", "AcademicCertificate"],
        issuer: didIssuer,
        issuanceDate: new Date().toISOString(),
        credentialSubject: {
            id: didHolder,
            ...credentialData 
        },
        proof: {} // Será preenchido com a assinatura
    };

    // Assina a VC (conteúdo canônico)
    const dataToSign = JSON.stringify({ issuer: vc.issuer, subject: vc.credentialSubject, date: vc.issuanceDate });
    const signer = crypto.createSign('sha256');
    signer.update(dataToSign);
    const signature = signer.sign(privateKeyIssuer, 'base64');
    
    vc.proof = {
        type: "EcdsaSecp256k1Signature2019",
        creator: `${didIssuer}#keys-1`,
        signatureValue: signature
    };

    // Persiste a credencial emitida
    const dlt = readDLT();
    dlt.issuedCredentials[vc.id] = vc;
    writeDLT(dlt);
    
    // Retorna a VC completa para ser armazenada na Carteira do Titular
    return vc; 
}

/**
 * 3. Verifica a validade e autenticidade da Credencial.
 */
function verifyCredential(vc) {
    const dlt = readDLT();
    const issuerDid = vc.issuer;
    
    // 1. Resolve o DID do Emissor
    const didDocument = dlt.registeredDIDs[issuerDid];
    if (!didDocument) {
        return { isValid: false, reason: "DID do Emissor não encontrado." };
    }

    const publicKeyIssuer = didDocument.publicKey;
    const signature = vc.proof.signatureValue;
    
    // 2. Verifica a assinatura
    const dataToVerify = JSON.stringify({ issuer: vc.issuer, subject: vc.credentialSubject, date: vc.issuanceDate });
    const verifier = crypto.createVerify('sha256');
    verifier.update(dataToVerify);
    const isValidSignature = verifier.verify(publicKeyIssuer, signature, 'base64');

    if (isValidSignature) {
        return { 
            isValid: true, 
            issuer: vc.issuer,
            holder: vc.credentialSubject.id,
            data: vc.credentialSubject 
        };
    } else {
        return { isValid: false, reason: "Assinatura inválida (Credencial não foi emitida pelo DID afirmado)." };
    }
}


module.exports = {
    registerDID,
    issueCredential,
    verifyCredential
};