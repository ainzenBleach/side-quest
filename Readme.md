# Side Quest

## Executar com Docker Compose

Com Docker e Docker Compose instalados, execute na raiz do projeto:

```bash
docker compose up --build
```

O frontend ficará disponível em `http://localhost:8080` e a API em
`http://localhost:3001`. O frontend encaminha as chamadas `/api` ao backend
pela rede interna do Compose.

O Compose também inicia um banco MySQL e persiste os dados no volume
`mysql-data`. Para parar os containers sem apagar os dados:

```bash
docker compose down
```

As credenciais padrão do Compose são apenas para desenvolvimento local.
Antes de compartilhar ou publicar o serviço, defina `DB_NAME`, `DB_USER`,
`DB_PASS` e `DB_ROOT_PASSWORD` no ambiente ou em um arquivo `.env` na raiz.