FROM node:18-alpine
WORKDIR /app
COPY . .
RUN npm install
RUN npm run build:node
EXPOSE 8888
CMD [ "npm", "run", "preview" ]