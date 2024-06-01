# API-COMP-JUNIOR

## Índice
- [Descrição do Projeto](#descrição)
- [Tecnologias Utilizadas](#descrição)
- [Modelagem de Dados](#descrição)
- [Arquitetura e Organização de Código](#descrição)
- [Instalação e Configuração](#instalação)
- [Uso](#uso)
- [Testes](#testes)
- [Contribuição](#contribuição)
- [Licença](#licença)
- [Autores](#autores)
- [Contato](#contato)
- [Changelog](#changelog)

## Descrição
Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum luctus a nisl vel blandit. Sed ut lorem pulvinar, fermentum ante ac, tempor ex. Pellentesque rhoncus vestibulum est, sit amet porttitor massa pretium quis. Aenean hendrerit, justo sed lobortis hendrerit, magna mi egestas leo, eget maximus magna lorem eget felis. Nam aliquet tortor eget augue sagittis, semper dapibus urna tincidunt. Interdum et malesuada fames ac ante ipsum primis in faucibus. Integer nibh elit, mattis in tellus ut, varius viverra enim. Nam aliquam nulla vel urna hendrerit euismod. Nam erat turpis, dignissim at tincidunt rutrum, vulputate at turpis. Mauris nec pellentesque mauris. Ut magna ante, mollis vestibulum fermentum id, fringilla in neque.

## Tecnologias Utilizadas 🚀

- **MySql**: Um sistema de gerenciamento de banco de dados relacional, usado como armazenamento de dados do projeto.

- **Prisma**: Um ORM (Object-Relational Mapping) utilizado para gerenciar as interações com o banco de dados.

- **TypeScript**: Linguagem de programação que adiciona tipos estáticos ao JavaScript

- **Jest**: Framework de testes em JavaScript, usado para escrever e executar testes unitários.

- **NodeJS**: Ambiente de execução para JavaScript server-side, permitindo a criação de aplicações de alta performance.

- **Express**: Framework web para Node.js, facilitando a criação de APIs RESTful.

- **bcrypt**: Biblioteca para hashing de senhas, garantindo a segurança dos dados dos usuários.

- **jsonwebtoken**: Biblioteca para trabalhar com JSON Web Tokens (JWT), usada para autenticação e autorização.

- **nodemailer**: Biblioteca para envio de e-mails em aplicações Node.js.

- **prisma-dbml-generator**: Biblioteca para envio de e-mails em aplicações Node.js.

- **Git**: Framework de testes em JavaScript.

- **GitHub**: Framework de testes em JavaScript.

## Modelagem de Dados

### Diagrama de Entidades

```mermaid
erDiagram
    USER {
        String id PK
        String email
        String name
        String address
        String password
        DateTime createdAt
        Boolean visible
    }
    PERMISSION {
        String id PK
        String name
        String description
        DateTime createdAt
        Boolean visible
    }
    ROLE {
        String id PK
        String name
        String description
        DateTime createdAt
        Boolean visible
    }
    AUTHOR {
        String id PK
        String name
        String biography
        DateTime createdAt
        Boolean visible
    }
    PUBLISHER {
        String id PK
        String name
        String address
        DateTime createdAt
        Boolean visible
    }
    CATEGORY {
        String id PK
        String name
        String description
        DateTime createdAt
        Boolean visible
    }
    EMPLOYEE {
        String id PK
        String name
        String cpf
        String telephone
        String address
        DateTime createdAt
        Boolean visible
    }
    BOOK {
        String id PK
        String title
        String description
        String isbn
        Int year
        String publisherId FK
        String loanTypeId FK
        DateTime createdAt
        Boolean visible
    }
    LOAN {
        String id PK
        DateTime loanDate
        DateTime dueDate
        DateTime returnDate
        Float fees
        Boolean returned
        String condition
        String paymethod
        String userId FK
        String bookId FK
        String employeeId FK
        DateTime createdAt
        Boolean visible
    }
    LOANTYPE {
        String id PK
        String name
        Float fine
        Int day
        String description
        DateTime createdAt
        Boolean visible
    }
    USER ||--o{ LOAN : "has"
    USER }|..|{ PERMISSION : "has"
    USER }|..|{ ROLE : "has"
    BOOK }o--|| PUBLISHER : "published by"
    BOOK }o--|| LOANTYPE : "has"
    BOOK }o--|{ AUTHOR : "written by"
    BOOK }o--|{ CATEGORY : "categorized as"
    LOAN }|--|| USER : "borrowed by"
    LOAN }|--|| BOOK : "includes"
    LOAN }|--|| EMPLOYEE : "handled by"
    PERMISSION }|..|{ ROLE : "granted by"
    ROLE }|..|{ USER : "assigned to"
```

### Dicionário de Entidades

#### User
- `id`: Identificador único do usuário (UUID).
- `email`: Email do usuário (único).
- `name`: Nome do usuário (opcional).
- `address`: Endereço do usuário (opcional).
- `password`: Senha do usuário.
- `visible`: Indica se o usuário está visível.
- `createdAt`: Data de criação do usuário.

#### Permission
- `id`: Identificador único da permissão (UUID).
- `name`: Nome da permissão (único).
- `description`: Descrição da permissão (opcional).
- `visible`: Indica se a permissão está visível.
- `createdAt`: Data de criação da permissão.

#### Role
- `id`: Identificador único do papel (UUID).
- `name`: Nome do papel (único).
- `description`: Descrição do papel (opcional).
- `visible`: Indica se o papel está visível.
- `createdAt`: Data de criação do papel.

#### Author
- `id`: Identificador único do autor (UUID).
- `name`: Nome do autor (único).
- `biography`: Biografia do autor (opcional).
- `visible`: Indica se o autor está visível.
- `createdAt`: Data de criação do autor.

#### Publisher
- `id`: Identificador único da editora (UUID).
- `name`: Nome da editora (único).
- `address`: Endereço da editora (opcional).
- `visible`: Indica se a editora está visível.
- `createdAt`: Data de criação da editora.

#### Category
- `id`: Identificador único da categoria (UUID).
- `name`: Nome da categoria (único).
- `description`: Descrição da categoria (opcional).
- `visible`: Indica se a categoria está visível.
- `createdAt`: Data de criação da categoria.

#### Employee
- `id`: Identificador único do empregado (UUID).
- `name`: Nome do empregado.
- `cpf`: CPF do empregado (único).
- `telephone`: Telefone do empregado (opcional).
- `address`: Endereço do empregado (opcional).
- `visible`: Indica se o empregado está visível.
- `createdAt`: Data de criação do empregado.

#### Book
- `id`: Identificador único do livro (UUID).
- `title`: Título do livro.
- `description`: Descrição do livro (opcional).
- `isbn`: ISBN do livro (único).
- `year`: Ano de publicação do livro.
- `publisherId`: Identificador da editora (chave estrangeira).
- `loanTypeId`: Identificador do tipo de empréstimo (chave estrangeira).
- `visible`: Indica se o livro está visível.
- `createdAt`: Data de criação do livro.

#### Loan
- `id`: Identificador único do empréstimo (UUID).
- `loanDate`: Data do empréstimo.
- `dueDate`: Data de devolução prevista.
- `returnDate`: Data de devolução efetiva (opcional).
- `fees`: Multa.
- `returned`: Indica se o livro foi devolvido.
- `condition`: Condição do livro (opcional).
- `paymethod`: Método de pagamento (opcional).
- `userId`: Identificador do usuário (chave estrangeira).
- `bookId`: Identificador do livro (chave estrangeira).
- `employeeId`: Identificador do empregado (chave estrangeira).
- `visible`: Indica se o empréstimo está visível.
- `createdAt`: Data de criação do empréstimo.

#### LoanType
- `id`: Identificador único do tipo de empréstimo (UUID).
- `name`: Nome do tipo de empréstimo (único).
- `fine`: Multa do tipo de empréstimo.
- `day`: Dias permitidos para o tipo de empréstimo.
- `description`: Descrição do tipo de empréstimo (opcional).
- `visible`: Indica se o tipo de empréstimo está visível.
- `createdAt`: Data de criação do tipo de empréstimo.

### Relacionamentos

- **User**
  - Um usuário pode ter múltiplos empréstimos (Loan).
  - Um usuário pode ter múltiplos papéis (Role).
  - Um usuário pode ter múltiplas permissões (Permission).

- **Permission**
  - Uma permissão pode estar associada a múltiplos papéis (Role).
  - Uma permissão pode estar associada a múltiplos usuários (User).

- **Role**
  - Um papel pode ter múltiplas permissões (Permission).
  - Um papel pode estar associado a múltiplos usuários (User).

- **Author**
  - Um autor pode ter múltiplos livros (Book).

- **Publisher**
  - Uma editora pode publicar múltiplos livros (Book).

- **Category**
  - Uma categoria pode conter múltiplos livros (Book).

- **Employee**
  - Um empregado pode gerenciar múltiplos empréstimos (Loan).

- **Book**
  - Um livro pode ter múltiplos autores (Author).
  - Um livro pode pertencer a múltiplas categorias (Category).
  - Um livro pode estar incluído em múltiplos empréstimos (Loan).
  - Um livro pode estar publicado em apenas uma editora (Publisher).
  - Um livro pode pertencer em apenas um tipo de emprestimo (LoanType).

- **Loan**
  - Um empréstimo está associado a um único usuário (User).
  - Um empréstimo está associado a um único livro (Book).
  - Um empréstimo é gerenciado por um único empregado (Employee).

- **LoanType**
  - Um tipo de empréstimo pode estar associado a múltiplos livros (Book).

## Arquitetura e Organização do Código

### Back-end

- O projeto é um monolito, onde todos os componentes estão integrados em uma única aplicação.

## Estrutura de Pastas

### Explicação de Cada Pasta

- **node_modules/**: Diretório padrão onde as dependências do Node.js são instaladas.
- **prisma/**: Contém arquivos e configurações relacionados ao Prisma ORM.
  - **dbml/**: Arquivos DBML (Database Markup Language) para definição de banco de dados.
  - **migrations/**: Arquivos de migração gerados pelo Prisma.
  - **schema.prisma**: Arquivo de schema do Prisma, definindo as entidades e relacionamentos do banco de dados.
  - **seed.ts**: Script para popular o banco de dados com dados iniciais.
- **src/**: Diretório principal do código fonte da aplicação.
  - **__tests__/**: Contém os testes da aplicação.
    - **integration/**: Testes de integração para verificar a interação entre diferentes partes do sistema.
    - **unit/**: Testes unitários para verificar a funcionalidade isolada de componentes específicos.
  - **controllers/**: Controladores responsáveis por lidar com as requisições HTTP e chamar os serviços apropriados e responder adequadamente o cliente.
  - **dtos/**: Data Transfer Objects, usados para transferir dados entre diferentes camadas da aplicação. Os DTOs podem incluir validação e higienização dos dados para garantir a integridade e conformidade com os requisitos da aplicação..
  - **middlewares/**: Funções intermediárias que processam requisições antes de chegarem aos controladores.
    - **acessControlMiddleware.ts**: Middleware responsável por verificar se o usuário tem as permissões ou roles necessárias para acessar determinadas rotas. 
      - `permissionMiddleware`: Verifica se o usuário tem as permissões necessárias diretamente ou através das roles atribuídas.
      - `roleMiddleware`: Verifica se o usuário possui uma das roles necessárias para acessar a rota.
    - **authenticationMiddleware.ts/**: Middleware que verifica a presença e a validade do token de autenticação. Se o token for válido, adiciona o `userId` ao objeto `Request`.
    - **serverMiddleware.ts/**: Middleware que lida com erros globais na aplicação. Retorna uma mensagem de erro apropriada dependendo do tipo de erro encontrado.
  - **models/**: Contém os modelos do Prisma que representam as entidades do banco de dados. Esses modelos também incluem a lógica para operações de CRUD (Create, Read, Update, Delete) e outras interações com o banco de dados.
  - **routes/**: Contém as definições das rotas da aplicação, que são responsáveis por mapear URLs para métodos de controladores específicos. Cada arquivo `.routes.ts` define as rotas para uma entidade específica da aplicação (e.g., autores, usuários, livros).
      - **index.ts/**: Centraliza e organiza todas as rotas da aplicação, definindo quais rotas estão acessíveis para cada entidade e aplicando middlewares de autenticação e controle de acesso.
  - **services/**: Contém a lógica de negócio da aplicação, que é responsável por interagir com os modelos e aplicar as regras de negócio antes de retornar os dados ou chamar outros serviços..
  - **utils/**: Contém funções utilitárias que são usadas em várias partes da aplicação. Essas funções encapsulam funcionalidades comuns e reutilizáveis, como criptografia, envio de e-mails e validação de dados.
    - **crypt.ts/**: Arquivo responsável por funções de criptografia e descriptografia de dados.
      - `encrypt`: Função que criptografa um texto usando o algoritmo AES-256-CBC e retorna o texto criptografado junto com o IV (vetor de inicialização) em formato hexadecimal.
      - `decrypt`: Função que descriptografa um texto criptografado, separando o IV e o texto criptografado, e retornando o texto original.
    - **emailService.ts/**: Arquivo responsável pelo envio de e-mails utilizando o serviço Nodemailer.
      - `decrypt`: Função que envia um e-mail utilizando o Nodemailer com autenticação OAuth2. Recebe como parâmetros o destinatário (to), o assunto (subject) e o conteúdo do e-mail em HTML (html).
    - **validationUtils.ts/**: Arquivo responsável pela validação de dados, como e-mails e senhas.
  - **views/**: Views responsáveis por renderizar as respostas (se aplicável).
  - **server.ts**: Arquivo principal do servidor, ponto de entrada da aplicação.
- **.env**: Arquivo de variáveis de ambiente contendo configurações sensíveis, como credenciais de acesso.
- **jest.config.js**: Configurações do Jest, framework de testes.
- **tsconfig.json**: Configurações do TypeScript, definindo opções de compilação.

## Instalação e Configuração

### Requisitos

- Node.js v14 ou superior
- NPM ou Yarn
- MySQL

### Passos para Instalação
1. Clone o repositório:
```sh
  git clone https://github.com/Piernita/API-COMP-JUNIOR.git
```
2. Instale as dependências:
```sh
  cd API-COMP-JUNIOR
  npm install
```

3. Configure o banco de dados MySQL e crie um arquivo `.env` baseado no `.env.example`:
```sh
  cp .env.example .env
```

4. Execute as migrations do Prisma que irá criar e popular o banco:
```sh
  npx prisma migrate dev
```
### Configuração

No arquivo `.env`, configure as seguintes variáveis:
```sh
DATABASE_URL="mysql://root:senha@localhost:3306/compJunior"
JWT_SECRET="sua_chave_secreta"
JWT_EXPIRATION_TIME="1h"
SECRET_KEY="sua_chave_secreta"
SMTP_USER="seu_email@compjunior.com.br"
SMTP_PASSWORD="sua_senha"
SMTP_CLIENT_ID="seu_client_id.apps.googleusercontent.com"
SMTP_CLIENT_SECRET="seu_client_secret"
SMTP_REFRESH_TOKEN="seu_refresh_token"
SMTP_FROM="seu_email@gmail.com.br"
```

## Uso

Para iniciar o servidor de desenvolvimento, utilize o seguinte comando:

```sh
npm run dev
```
A API estará disponível em `http://localhost:3000`.

### Endpoints Principais
- `POST /api/auth/register`: Registro de usuário
- `POST /api/auth/login`: Login de usuário
- `GET /api/books`: Listagem de livros
- `POST /api/loans`: Criação de um novo empréstimo

## Testes

### Executar Testes Unitários

Para rodar os testes unitários, use:
```sh
npm run test
```

## Contribuição

Contribuições são bem-vindas! Siga os passos abaixo:

1. Fork o repositório
2. Crie uma nova branch (`git checkout -b feature/nova-funcionalidade`)
3. Commit suas mudanças (`git commit -am 'Adiciona nova funcionalidade'`)
4. Push para a branch (`git push origin feature/nova-funcionalidade`)
5. Crie um novo Pull Request

## Licença

Este projeto está licenciado sob a licença MIT. Veja o arquivo [LICENSE](LICENSE) para mais detalhes.

## Autores

- **Perninha** - *Desenvolvimento inicial* - [Perfil do GitHub](https://github.com/Piernita)

## Contato
Para dúvidas ou suporte, entre em contato pelo email carlosaquila.dev@gmail.com.

