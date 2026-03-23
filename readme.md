# 🏥 Sistema Hospitalar - API Backend

API REST desenvolvida para gerenciamento de atendimentos médicos, incluindo pacientes, médicos, especialidades, consultas e prontuários.

## 🚀 Tecnologias utilizadas

* Node.js
* Express
* JavaScript
* MongoDB (via Prisma ORM)
* JWT (autenticação)
* Zod (validação de dados)
* Swagger (documentação da API)

## 🧱 Arquitetura

O projeto segue o padrão de **arquitetura em camadas**:

```
src/
├── routes/
├── controllers/
├── services/
├── repositories/
├── middlewares/
├── utils/
├── validations/
```

## 🔐 Autenticação e Autorização

* Autenticação baseada em **JWT**
* Controle de acesso por **roles**:

  * `ADMIN`
  * `DOCTOR`
  * `RECEPTIONIST`

## 📌 Funcionalidades

### 👤 Pacientes

* Cadastro de pacientes
* Listagem
* Atualização
* Visualização de histórico

### 🩺 Médicos

* Cadastro de médicos
* Ativação/Desativação
* Listagem e detalhes

### 🧠 Especialidades

* Cadastro
* Listagem
* Atualização

### 📅 Consultas

* Agendamento
* Reagendamento
* Cancelamento
* Finalização

### 📋 Prontuário

* Registro de atendimento
* Apenas médicos podem registrar

## ⚙️ Regras de Negócio

* ❌ Não é permitido dois atendimentos no mesmo horário para o mesmo médico
* 👨‍⚕️ Apenas médicos podem registrar prontuários
* 🧾 Recepcionistas são responsáveis por agendar consultas

## 📚 Documentação da API (Swagger)

A documentação interativa da API está disponível em:

```
http://localhost:3000/docs
```

Com ela você pode:

* Visualizar todos os endpoints
* Testar requisições diretamente
* Autenticar via JWT (botão "Authorize")

## 📬 Collection do Postman

A collection com todos os endpoints da API está disponível no repositório:

```
/docs/API - Sistema Hospitalar.postman_collection.json
```

### 🔹 Como importar no Postman

1. Abra o Postman
2. Clique em **Import**
3. Selecione o arquivo `API - Sistema Hospitalar.postman_collection.json`
4. Também é possível acessar o Postman Collection por meio deste [link](https://thalyta-lima08-7287144.postman.co/workspace/Thalyta-Lima-Rodrigues's-Worksp~cb103396-adfa-4422-827b-51f6ec88a7ba/collection/49985767-f92d199b-1d10-41b4-83ff-3f1c59686f5d?action=share&source=copy-link&creator=49985767).

## ▶️ Como executar o projeto

### 1. Clonar o repositório

```bash
git clone git@github.com:thalytalima211/Sistema-Hospitalar-Express.js-.git
cd Sistema-Hospitalar-Express.js
```

### 2. Instalar dependências

```bash
npm install
```

### 3. Configurar variáveis de ambiente

Crie um arquivo `.env`:

```env
DATABASE_URL="mongodb+srv://<database_user>:<database_password>@sistema-hospitalar.hxnjzbx.mongodb.net/sistema-hospitalar?appName=sistema-hospitalar"
JWT_SECRET="sua_chave_secreta"
```

### 4. Rodar o projeto

```bash
npm run dev
```

## 🧪 Validação de dados

* Implementada com **Zod**
* Aplicada via middleware (`validate`)
* Retorna erros padronizados:

```json
{
  "success": false,
  "message": "Erro de validação",
  "errors": [
    {
      "field": "email",
      "message": "Email inválido"
    }
  ]
}
```

## ⚠️ Tratamento de erros

A aplicação possui um **error handler global**, garantindo:

* Respostas padronizadas
* Tratamento de erros do Prisma
* Tratamento de validações


## 📌 Autor

Desenvolvido por **Thalyta Lima** 💻✨
Graduanda em Ciência da Computação
