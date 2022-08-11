FROM node:alpine
WORKDIR /app
COPY package.json ./
COPY package-lock.json ./
COPY ./ ./
RUN npm i
RUN mkdir -p node_modules/.cache && chmod -R 777 node_modules/.cache
CMD ["npm", "run", "start"]