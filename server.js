 // server.js

const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const didService = require('./did-service');

const app = express();
const PORT = 3000;

// Configuração do Express
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));

// Armazenamento temporário de chaves privadas (NUNCA FAZER EM PRODUÇÃO!)
let PRIVATE_KEYS = {};

/**
 * Rota 1: Cria e Registra DIDs para Emissor e Titular (Setup Inicial)
 */
app.post('/api/setup', (req, res) => {
    try {
        // Instituição (Emissor)
        const { did: issuerDID, privateKey: issuerKey } = didService.registerDID("Universidade Fictícia");
        PRIVATE_KEYS[issuerDID] = issuerKey; // Salva a chave do emissor

        // Aluno (Titular)
        const { did: holderDID } = didService.registerDID("Alice Aluna");
        
        res.json({
            message: "Setup inicial concluído. DIDs criados e registrados.",
            issuerDID,
            holderDID,
            // A chave do emissor é necessária para assinar VCs!
            // Não expomos a chave privada do titular, pois a Carteira faria isso.
            issuerKey: issuerKey 
        });
    } catch (error) {
        console.error(error);
        res.status(500).send("Erro no setup DID.");
    }
});

/**
 * Rota 2: Emissão de Credencial Verificável (Instituição)
 */
app.post('/api/issue-vc', (req, res) => {
    const { issuerDID, holderDID, courseName, courseGrade, issuerKey } = req.body;

    if (!issuerDID || !holderDID || !courseName || !issuerKey) {
        return res.status(400).send("Dados de emissão incompletos.");
    }
    
    // Valida se a chave privada fornecida corresponde à do Emissor
    if (PRIVATE_KEYS[issuerDID] !== issuerKey) {
        return res.status(403).send("Chave privada do Emissor inválida ou não autorizada.");
    }

    const credentialData = {
        course: courseName,
        grade: courseGrade,
        completionDate: new Date().toISOString().split('T')[0]
    };

    try {
        const vc = didService.issueCredential(issuerDID, issuerKey, holderDID, credentialData);
        res.json({
            message: "Credencial Verificável emitida com sucesso e assinada.",
            verifiableCredential: vc
        });
    } catch (error) {
        console.error(error);
        res.status(500).send("Erro na emissão da Credencial.");
    }
});

/**
 * Rota 3: Verificação de Credencial (Empregador/Verificador)
 */
app.post('/api/verify-vc', (req, res) => {
    const { verifiableCredential } = req.body;

    if (!verifiableCredential) {
        return res.status(400).send("Credencial Verificável não fornecida.");
    }

    try {
        const result = didService.verifyCredential(verifiableCredential);
        res.json(result);
    } catch (error) {
        console.error(error);
        res.status(500).send("Erro na verificação da Credencial.");
    }
});

// Inicia o Servidor
app.listen(PORT, () => {
    console.log(`Servidor rodando em http://localhost:${PORT}`);
    console.log("Acesse esta URL para iniciar a interface de teste.");
});