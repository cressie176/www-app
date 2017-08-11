## Running Locally

### Create www network

### Create a self signed certificate

```bash
mkdir -p containers/nginx/etc/ngnix/ssl
openssl req \
    -x509 \
    -nodes \
    -newkey rsa:4096 \
    -keyout containers/nginx/etc/ngnix/ssl/stephen-cresswell.key \
    -out containers/nginx/etc/ngnix/ssl/stephen-cresswell.pem \
    -days 9000
```

### Configure .env

```
AWS_ACCESS_KEY_ID=
AWS_SECRET_ACCESS_KEY=
HEALTHCHECK_INTERVAL=1m
HEALTHCHECK_TIMEOUT=5s
HEALTHCHECK_RETRIES=3
CONTAINERS_DIR=./containers
SITES_ENABLED=local
```

### Start
```bash
docker-compose up --build -d www-app-local
