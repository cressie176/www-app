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
HEALTHCHECK_INTERVAL=1m
HEALTHCHECK_TIMEOUT=5s
HEALTHCHECK_RETRIES=3
CONTAINERS_DIR=./containers
SITES_ENABLED=local
```

### Start
```bash
docker-compose up --build -d www-app-local

### Obtaining Certificates For The First Time

Problem:

* nginx wont start until it has certificates
* certbot needs a webserver running on port 80 to confirm domain ownership

To workaround the catch-22, launch a special version of www-nginx service

```
SITES_ENABLED=certbot docker-compose run -d www-nginx
```

Then run a script in www-jobs to make the pretend to make the certificate request
```
docker-compose run --rm www-jobs /run-once-pretend
```

Assuming it works run the real script
```
docker-compose run --rm www-jobs /run-once
```

