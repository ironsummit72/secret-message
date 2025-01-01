FROM node:22.0.0 AS build
WORKDIR /build
RUN npm install -g typescript
COPY package*.json .
RUN npm install
COPY . .
RUN npm run build 

FROM node:22.0.0 
WORKDIR /production
COPY --from=build /build/dist/. /production/.
COPY --from=build /build/package*.json /production/
RUN npm install 
CMD [ "node","index.js" ]