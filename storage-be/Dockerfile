###################
# BUILD FOR LOCAL DEVELOPMENT
###################

FROM node:16-alpine As development

# Required for Prisma Client to work in container
RUN apk update && apk add --no-cache openssl

WORKDIR /usr/src/app

COPY --chown=node:node package*.json ./

# https://stackoverflow.com/questions/58482655/what-is-the-closest-to-npm-ci-in-yarn
RUN yarn install --frozen-lockfile

# Bundle app source
COPY --chown=node:node . .

# Generate Prisma database client code
RUN yarn prisma:generate

# Use the node user from the image (instead of the root user)
USER node


###################
# BUILD FOR PRODUCTION
###################

FROM node:16-alpine As build

WORKDIR /usr/src/app

COPY --chown=node:node package*.json ./

COPY --chown=node:node --from=development /usr/src/app/node_modules ./node_modules

COPY --chown=node:node . .

# Run the build command which creates the production bundle
RUN yarn build

# Set NODE_ENV environment variable
ENV NODE_ENV production

RUN yarn cache clean

USER node

###################
# BUILD FOR PRODUCTION
###################
FROM node:16-alpine As production

COPY --chown=node:node --from=build /usr/src/app/node_modules ./node_modules
COPY --chown=node:node --from=build /usr/src/app/dist ./dist

CMD [ "node", "dist/main.js" ]
