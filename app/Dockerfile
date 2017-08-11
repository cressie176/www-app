from node:alpine

ENV NODE_ENV=production
RUN apk add -U --no-cache tcpdump

# First install the server dependencies (hopefully cached in previous image)
RUN mkdir -p /opt/app
WORKDIR /opt/app
COPY package.json .
COPY package-lock.json .

# Then install the client dependencies (hopefully cached in previous image)
RUN NODE_ENV=development npm install --clean --force

RUN mkdir -p /opt/app/client
WORKDIR /opt/app/client
COPY client/package.json .
COPY client/package-lock.json .

RUN NODE_ENV=development npm install --clean --force

# Now build the client (likely to cachebust)
COPY client .
RUN npm run build

# Now add the server (individually so as not to delete client/build)
WORKDIR /opt/app
COPY . .

# Finally Tests
RUN npm run test-server
RUN npm run test-client


