FROM nginx:alpine

ADD container-files/etc/nginx/nginx.conf /etc/nginx/
ADD container-files/etc/nginx/proxy.conf /etc/nginx/
ADD container-files/etc/nginx/sites-available/* /etc/nginx/sites-available/

ARG SITES_ENABLED

RUN mkdir -p /etc/nginx/sites-enabled
RUN if echo "$SITES_ENABLED" | grep -q "local"; then ln -sf /etc/nginx/sites-available/local.conf /etc/nginx/sites-enabled/local.conf; fi
RUN if echo "$SITES_ENABLED" | grep -q "stage"; then ln -sf /etc/nginx/sites-available/stage.conf /etc/nginx/sites-enabled/local.conf; fi
RUN if echo "$SITES_ENABLED" | grep -q "live"; then ln -sf /etc/nginx/sites-available/live.conf /etc/nginx/sites-enabled/local.conf; fi

EXPOSE 80 443


