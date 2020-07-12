FROM node:12.2.0-alpine as build

WORKDIR /app
RUN npm install -g @angular/cli

COPY package.json package-lock.json ./
RUN npm install

COPY . .
RUN ng build --prod

FROM nginx:1.17.1-alpine
COPY nginx.conf /etc/nginx/nginx.conf
COPY --from=build /app/dist/pi-site /usr/share/nginx/html
