FROM nginx:alpine

ADD container-files/etc/nginx/nginx.conf /etc/nginx/
ADD container-files/etc/nginx/proxy.conf /etc/nginx/
ADD container-files/etc/nginx/sites-available/* /etc/nginx/sites-available/

RUN mkdir -p /etc/nginx/sites-enabled

# certbot configuration only required to obtain certificates for the first time
# RUN ln -sf /etc/nginx/sites-available/certbot.conf /etc/nginx/sites-enabled/certbot.conf

RUN ln -sf /etc/nginx/sites-available/local.conf /etc/nginx/sites-enabled/local.conf
RUN ln -sf /etc/nginx/sites-available/stage.conf /etc/nginx/sites-enabled/stage.conf
# RUN ln -sf /etc/nginx/sites-available/live.conf /etc/nginx/sites-enabled/live.conf

EXPOSE 80 443
