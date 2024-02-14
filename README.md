# Kanastra Challenge

1. Criar o arquivo .env no /frontend e no /backend/app_laravel
   - Adicionar a API_KEY e o TOKEN do [PagHiper](https://www.paghiper.com) para criação de boletos
   - Adicionar as informações para envio de e-mail

2. Executar `docker-compose up -d` na raiz

3. Entrar no `app` (`docker-compose exec app bash`) e executar `sh installer.sh`

4. Acessar
- Frontend: http://localhost:8888
- Backend: http://localhost:8989

---
ERROR:
- MySQL "no matching manifest for linux/arm64/v8 in the manifest list entries"
   ```sh
   export DOCKER_DEFAULT_PLATFORM=linux/amd64
   ```