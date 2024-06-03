FROM node:alpine
WORKDIR '/app' 
COPY ./package.json ./   
RUN npm install
RUN npm i -g @angular/cli@16
COPY . .
EXPOSE 4200
CMD ["ng", "serve", "--host", "0.0.0.0", "--disable-host-check"]