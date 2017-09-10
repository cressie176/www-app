FROM node:alpine

RUN npm config set color false

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
RUN NODE_ENV=development npm run test -- --ci --bail --no-colors --verbose
RUN npm run build

# Now build the server (likely to cachebust)
WORKDIR /opt/app
COPY . .
RUN NODE_ENV=development npm run test-server -- --ci --bail --no-colors --verbose
RUN npm run build-server
RUN npm run lint

# Create a clean node:alpine container
FROM node:alpine

# Install userland tools
RUN apk add -U --no-cache tcpdump curl

# Copy and configure in the node app
ENV NODE_ENV=production
RUN mkdir -p /opt/app
WORKDIR /opt/app

COPY --from=0 /opt/app/package.json package.json
COPY --from=0 /opt/app/node_modules node_modules
COPY --from=0 /opt/app/server/build/config ./server/config
COPY --from=0 /opt/app/server/build/lib ./server/lib
COPY --from=0 /opt/app/server/build/index.js server/index.js

COPY --from=0 /opt/app/client/build ./client/build

