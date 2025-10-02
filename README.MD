# 📱 Mottu Bracelet

# RM 556092
RICARDO TAVARES
@rtof06
# RM 558186
PEDRO ABRANTES
@pdroandrad
# RM RM555726
VICTOR ALVES
@carmowa

O **Mottu Bracelet** é uma solução desenvolvida para a empresa **Mottu** visando o **gerenciamento eficiente das motos em pátios de manutenção**.  
O sistema integra **hardware** (bracelete acoplado às motos), **backend em Java com Spring Boot + Oracle** e um **aplicativo mobile em React Native**.

---

## 🌟 Proposta do Projeto

Nos pátios de manutenção da Mottu, é comum haver grande volume de motos aguardando reparos.  
O **Mottu Bracelet** resolve o problema de rastreio e organização:

- Cada moto recebe um **bracelete eletrônico** ao chegar no pátio.  
- Esse bracelete pode ser **acionado via aplicativo**, emitindo sinal **sonoro** e **infravermelho** (detectado pela câmera do app).  
- O app gerencia todas as motos via **CRUD completo**, integrado ao **backend e banco de dados Oracle**.  
- Um **sistema de login/cadastro de usuários** garante segurança e controle de acesso.  
- A aplicação possui **tema customizável** (claro/escuro).

---

## ⚙️ Funcionalidades

### 🖥️ Backend (Java + Spring Boot)
- API RESTful em Java (Spring Boot) conectada ao Oracle.
- Endpoints para:
  - Autenticação (Login / Registro)
  - CRUD de motos (`/api/motos`)
  - Consulta de motos por ID ou placa
- Regras de negócio:
  - **Placa** e **chassi** são únicos
  - Pátio associado opcionalmente à moto
- Segurança com Spring Security e CORS habilitado.

### 📱 Aplicativo Mobile (React Native + TypeScript)
- **Login e Registro de usuário** (Auth Stack).
- **Home** como hub principal, com acesso às demais telas.
- **CRUD de Motos**:
  - Cadastrar nova moto
  - Listar motos
  - Editar moto existente
  - Visualizar detalhes
  - Deletar moto
- **Câmera integrada** (tirar foto / simular IR).
- **Splash Screen** inicial.
- **Configurações** (alterar tema claro/escuro).
- Navegação com React Navigation.
- Estilização global via Theme Provider.
- Integração com API usando Axios.

---

## 📂 Estrutura do Projeto

### 📦 Backend (Spring Boot)
src/main/java/br/com/fiap/MottuBracelet
├── controller/ # Controllers REST (Auth, Moto)
├── dto/ # DTOs (Request/Response)
├── model/ # Entidades (Moto, Patio, User)
├── repository/ # Repositórios JPA
├── service/ # Regras de negócio
└── config/ # Configurações (CORS, Security)


### 📱 Mobile (React Native + TS)
src/
├── api/ # Configuração do Axios (AuthAPI, MotoAPI)
├── assets/ # Ícones, imagens, logo
├── components/ # Botões, FormField, HeaderGearButton
├── navigation/ # Stack Navigators (Root, Auth, App)
├── screens/ # Telas (Login, Register, Home, Motos, Settings, Splash, Camera)
├── styles/ # Arquivo global de estilos
└── theme/ # Provider de tema e sessão (claro/escuro, login state)


---

## 🚀 Tecnologias Utilizadas

- **Mobile**: React Native (TypeScript), React Navigation, Axios, Context API
- **Backend**: Java 17, Spring Boot, Spring Data JPA, Spring Security
- **Banco de Dados**: Oracle
- **Outros**: Lombok, JPA/Hibernate, AsyncStorage (armazenar token)

---

## 🔮 Melhorias Futuras

- Implementar detecção de IR na câmera do app (simulação hoje é apenas "tirar foto").
- Autenticação JWT integrada em todo o fluxo.
- Histórico de movimentação das motos no pátio.
- Dashboard no app com métricas rápidas (quantidade de motos por status).
- Multiusuário com perfis de acesso (admin x operador).
- Integração IoT real com hardware do bracelete.

---

## 🛠️ Como rodar

### Backend
```bash
# Oracle deve estar rodando localmente
./mvnw spring-boot:run

A API sobe em: http://localhost:8080/api

Mobile
npm install
npx expo start