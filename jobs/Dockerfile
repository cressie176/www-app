FROM ubuntu:16.04

ENV DEBIAN_FRONTEND noninteractive

ENV PACKAGE_LIST curl dnsutils man-db locales cron software-properties-common apt-transport-https ca-certificates gnupg2 vim netcat iputils-ping
RUN apt-get update && apt-get install -y ${PACKAGE_LIST}
RUN locale-gen en_GB en_GB.UTF-8
RUN ln -sf /bin/bash /bin/sh

# Install docker
RUN curl -fsSL https://download.docker.com/linux/ubuntu/gpg | apt-key add -
RUN add-apt-repository "deb [arch=amd64] https://download.docker.com/linux/ubuntu $(lsb_release -cs) stable"
RUN apt-get update && apt-get install -y docker-ce

# Install certbot
RUN add-apt-repository ppa:certbot/certbot
RUN apt-get update && apt-get install -y certbot

# Add scripts
ADD container-files/run-once .
ADD container-files/run-once-pretend .
ADD container-files/run-post-renew .
ADD container-files/etc/cron.daily/* /etc/cron.daily/
RUN chmod +x /run-once /run-once-pretend /run-post-renew /etc/cron.daily/*

# Start cron in the foreground
CMD /usr/sbin/cron -f -L 15
