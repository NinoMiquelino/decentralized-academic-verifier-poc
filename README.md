## 🙋‍♂️ Autor

<div align="center">
  <img src="https://avatars.githubusercontent.com/ninomiquelino" width="100" height="100" style="border-radius: 50%">
  <br>
  <strong>Onivaldo Miquelino</strong>
  <br>
  <a href="https://github.com/ninomiquelino">@ninomiquelino</a>
</div>

---

# 🎓 Verificador de Credenciais Acadêmicas (DID/VC PoC)

## 🛠️ Tecnologias Utilizadas

![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white)
![Express.js](https://img.shields.io/badge/Express.js-000000?style=for-the-badge&logo=express&logoColor=white)
![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)
![Bootstrap](https://img.shields.io/badge/Bootstrap-7952B3?style=for-the-badge&logo=bootstrap&logoColor=white)
![Responsive](https://img.shields.io/badge/Responsive-Design-green?style=for-the-badge)

## Sobre o Projeto

Este projeto é uma **Prova de Conceito (PoC)** que demonstra o fluxo completo da **Identidade Descentralizada (DID)** e das **Credenciais Verificáveis (VC)**, seguindo os padrões do W3C. Ele simula um cenário real onde uma **Instituição de Ensino** emite um certificado verificável que um **Empregador** pode validar de forma independente, sem depender de bancos de dados centrais.

O foco é na **UX, segurança e autonomia do usuário (Titular)** sobre seus dados.

### 🔑 Conceitos Chave Implementados

* **Identificador Descentralizado (DID):** Identificador controlado pelo usuário/entidade, registrado em um "DLT" simulado.
* **Credenciais Verificáveis (VC):** Documento JSON assinado digitalmente pelo Emissor, atestando a conclusão do curso.
* **Verificação Independente:** O Verificador (Empregador) resolve o DID do Emissor e usa a chave pública para verificar a assinatura da VC.

## 🚀 Como Executar o Projeto

Este projeto requer o **Node.js** e o **npm** instalados.

### 1. Clonar o Repositório

```bash
git clone [https://github.com/NinoMiquelino/decentralized-academic-verifier-poc.git](https://github.com/SEU_USUARIO/decentralized-academic-verifier-poc.git)
cd decentralized-academic-verifier-poc
```

2. Instalar Dependências
​O projeto utiliza Express.js e módulos nativos do Node.js.

```bash
npm install
```

3. Iniciar o Servidor
​O servidor Express será iniciado na porta 3000.

```bash
npm start
# Servidor rodando em http://localhost:3000
```

4. Usar a Interface
​Acesse http://localhost:3000 e siga os três passos na interface web (que é totalmente responsiva para uso em desktop e mobile):
​Setup Inicial: Cria e registra os DIDs para a Instituição (Emissor) e o Aluno (Titular) no dlt-simulation.json.
​Emissão: A Instituição assina digitalmente a credencial, gerando a VC (JSON) completa.
​Verificação: O Empregador usa a VC e o DID do Emissor para verificar a assinatura e a autenticidade do certificado.

📁 Estrutura do Projeto

```bash
decentralized-academic-verifier-poc/
├── node_modules/             # Gerada após 'npm install' - IGNORAR
├── package.json              # Metadados e dependências
├── server.js                 # Backend principal (Express)
├── did-service.js            # Lógica central DID/VC
├── dlt-simulation.json       # Simulação do DLT (Registro de DIDs e VCs)
├── .gitignore                # Arquivos a ignorar (como node_modules e dlt-simulation.json)
└── public/
    ├── index.html            # Interface responsiva (HTML/CSS/JS)
    └── styles.css            # (Opcional: arquivo CSS se não usar Bootstrap CDN)
```

💡 Desafios de Desenvolvimento (UX, Segurança e DID)
​Este PoC aborda diretamente os desafios de DID:
​UX (Carteira Digital): A interface simula a simplicidade de uma carteira móvel, onde o usuário apenas copia/cola a credencial (em um ambiente real, isso seria um QR Code ou conexão P2P) e não se preocupa com a complexidade criptográfica subjacente.
​Segurança (Chave Privada): O server.js armazena a chave privada do Emissor (apenas para fins de PoC). Em um sistema real, essa chave estaria em um módulo de segurança de hardware (HSM) do Emissor.
​Resolução de DID: A função verifyCredential demonstra como resolver (buscar) o Documento DID do Emissor no DLT simulado para obter a chave pública.

​🤝 Contribuições
​Sinta-se à vontade para abrir issues ou pull requests para melhorar esta PoC.
​Próximos passos sugeridos:
​Implementar o mecanismo de Proof Presentation (apresentar apenas subconjuntos de dados).
​Trocar o DLT simulado por uma rede de testes real (Ex: Rede Goerli da Ethereum ou um ledger Hyperledger Indy/Aries).

---

## 🤝 Contribuições
Contribuições são sempre bem-vindas!  
Sinta-se à vontade para abrir uma [*issue*](https://github.com/NinoMiquelino/decentralized-academic-verifier-poc/issues) com sugestões ou enviar um [*pull request*](https://github.com/NinoMiquelino/decentralized-academic-verifier-poc/pulls) com melhorias.

---

## 💬 Contato
📧 [Entre em contato pelo LinkedIn](https://www.linkedin.com/in/onivaldomiquelino/)  
💻 Desenvolvido por **Onivaldo Miquelino**

---
