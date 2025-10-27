Especificações do Frontend
Bibliotecas e ferramentas

Projeto criado com React, Vite, TypeScript e Tailwind.
Essa escolha foi baseada em ganho de tempo!
Axios me ajuda a fazer requisições com menos configurações e torna o código mais limpo.
React Router DOM é usado para fazer a navegação entre páginas.
O Zod me ajuda a tipar formulários, criando validações, assim me traz uma validação básica e tipada junto do HookForm.
Usei o Zustand para controle de estado; ele me traz uma configuração muito simples e performática.

Adição de funcionalidade

Adicionei um sistema de botão para navegar para cadastro e login, que não existia. Foi algo simples usando o mesmo botão de logout.

Pontos de melhoria

Eu queria fazer tudo completo, porém em 4 dias não deu para colocar tudo que eu queria, incluindo mais responsividade, toast de notificações, testes unitários, entre outros.

Não usei

Radix Color — fiquei sem tempo para ler a documentação e entender sua implementação. Mesmo tentando, no final não deu tempo.

Especificações do Backend
Bibliotecas e ferramentas

Google Cloud Storage

TypeScript

Resend

Docker

Nodemon

Prisma

Bcrypt

JWT

CORS

Express

Zod

Detalhes

O projeto foi interessante, gostei muito. Queria ter mais tempo para deixá-lo perfeito.
Acredito que perdi bastante tempo criando o envio de email agendado, onde usei RabbitMQ, até descobrir depois que o Resend faz o envio programado.
Espero que gostem do projeto e possamos conversar em uma eventual reunião.

Projeto Node com Resend e Google Cloud Storage

Este projeto Node.js utiliza Resend para envio de mensagens, Google Cloud Storage para armazenamento, e PostgreSQL como banco de dados. O projeto pode ser executado com PostgreSQL local ou via Docker.

Pré-requisitos

Node.js v18+

npm ou yarn

PostgreSQL (local ou Docker)

Conta Google Cloud com bucket configurado

Conta Resend (para envio de emails ou mensagens)

Configuração do Banco de Dados

1. Usando Docker (opcional)

Você pode iniciar o PostgreSQL com Docker:

docker run --name my-postgres \
 -e POSTGRES_USER=postgres \
 -e POSTGRES_PASSWORD=123456 \
 -e POSTGRES_DB=meubanco \
 -p 5432:5432 \
 -d postgres

2. Banco local

Se preferir, instale e configure o PostgreSQL normalmente na sua máquina.

Variáveis de Ambiente

Crie um arquivo .env na raiz do projeto com as seguintes informações:

# Porta do servidor

PORT=3000

# Banco de dados

POSTGRES_USER=postgres
POSTGRES_PASSWORD=123456
POSTGRES_DB=meubanco

# URL de conexão com o banco

DATABASE_URL="postgresql://postgres:123456@localhost:5432/meubanco?schema=public"

# JWT

JWT_SECRET="121232342"

# Configuração de emails (Resend)

EMAIL_SECRET="re_UEJhdJEQ_Q4xdArdy1NEwe6Af8Df8ZEM9"
FROM_EMAIL="onboarding@resend.dev"

# Google Cloud Storage

GCP_KEY_PATH="exemplo.json"
GCP_PROJECT_ID=
GCP_BUCKET_NAME="test"

⚠️ Certifique-se de que o arquivo JSON da chave do Google Cloud (GCP_KEY_PATH) está na raiz do projeto ou no caminho especificado.

Instalação

Clone o repositório:

git clone <repo_url>
cd <nome_do_projeto>

Instale as dependências:

npm install

# ou

yarn install

Configure o .env conforme o exemplo acima.

Inicialização

Para iniciar o servidor em modo de desenvolvimento:

npm run dev

# ou

yarn dev

O servidor estará disponível em http://localhost:3000.

Funcionalidades

Mensageria com Resend: envio de emails e notificações.

Armazenamento de arquivos: upload/download usando Google Cloud Storage.

Autenticação JWT: proteção de rotas e sessões.

Banco de dados flexível: suporte a PostgreSQL local ou via Docker.

Frontend

O frontend do projeto é feito com React + Vite + TypeScript + Tailwind. Ele consome a API do backend e fornece as interfaces para login, cadastro e visualização de filmes.

Instalação

Entre na pasta do frontend:

cd frontend

Instale as dependências:

npm install

# ou

yarn install

Inicialização

Para iniciar o servidor de desenvolvimento:

npm run dev

# ou

yarn dev

O frontend estará disponível em http://localhost:5173 (ou porta indicada pelo Vite).

Rotas principais

/ → Lista de filmes

/login → Tela de login

/cadastro → Tela de cadastro

/filme/:id → Detalhes do filme

⚠️ Certifique-se de que o backend está rodando na porta correta definida no .env do frontend, para que as requisições funcionem corretamente.
