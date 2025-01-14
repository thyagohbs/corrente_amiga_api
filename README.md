# API - Corrente Amiga

## Descrição

Este é o backend da aplicação Corrente Amiga, construída com AdonisJS.
 
A aplicação permite: 
- Gerenciar usuários e animais, com autenticação e autorização.

## Pré-requisitos

- Node.js (versão 18 ou superior)
- MySQL

## Configuração do Projeto

1. Clone o repositório:

   ```sh
   git clone <URL_DO_REPOSITORIO>
   cd corrente_amiga_api/api
   ```

2. Instale as dependências:

   ```sh
   npm install
   ```

3. Copie o arquivo `.env.example` para `.env` e configure as variáveis de ambiente:

   ```sh
   cp .env.example .env
   ```

4. Carregue o arquivo db.sql para criar a base de dados

5. Crie a APP_KEY atraves do comando:

   ```sh
   node ace generate:key
   ```
   
6. Configure o banco de dados no arquivo `.env`:
   ```
   TZ=UTC
   PORT=3333
   HOST=localhost
   LOG_LEVEL=info
   APP_KEY=
   NODE_ENV=development
   DB_HOST=127.0.0.1
   DB_PORT=3306
   DB_USER=seusuario
   DB_PASSWORD=suasenha
   DB_DATABASE=corrente_amiga
   ```

## Rodando as Migrations

1. Execute o comando para rodar as migrations:
   ```sh
   node ace migration:run
   ```

## Rodando o Projeto

1. Inicie o servidor:

   ```sh
   npm run dev  ou node ace serve --hmr
   ```

2. O servidor estará disponível em `http://localhost:3333`.
   
## Testes

1. Para rodar os testes, execute:
   ```sh
   npm test
   ```

## Estrutura do Projeto

- `app/`: Contém os controladores, modelos e middleware.
- `config/`: Contém os arquivos de configuração.
- `database/`: Contém as migrations e seeds.
- `start/`: Contém os arquivos de inicialização do servidor.
- `tests/`: Contém os testes unitários e funcionais.

## Rotas configuradas no projeto

1. Para listar as rotas configuradas no projeto:
   ```sh
   node ace list:routes
   ```

## Contribuição

1. Faça um fork do projeto.
2. Crie uma nova branch (`git checkout -b feature/nova-feature`).
3. Faça commit das suas alterações (`git commit -am 'Adiciona nova feature'`).
4. Faça push para a branch (`git push origin feature/nova-feature`).
5. Crie um novo Pull Request.

## Licença

Este projeto está licenciado sob a licença MIT.
