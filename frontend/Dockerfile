FROM node:22.0.0 AS build
WORKDIR /build
COPY package*.json .
RUN npm install
COPY . .
RUN npm run build


FROM nginx
COPY --from=build /build/default.conf /etc/nginx/conf.d
COPY --from=build ./build/dist/. ./react
CMD ["nginx","-g","daemon off;"]



