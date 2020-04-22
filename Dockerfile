FROM node:13-alpine as builder
WORKDIR /app
COPY package.json package-lock.json /app/
RUN cd /app && npm install --no-progress
COPY .  /app
RUN cd /app && npm run build --no-progress

FROM nginx:alpine
RUN rm -rf /usr/share/nginx/html/*
COPY --from=builder /app/dist/angular-client /usr/share/nginx/html
RUN rm -rf /etc/nginx/conf.d/*
COPY --from=builder /app/nginx-nodejs-proxy.conf /etc/nginx/conf.d
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
