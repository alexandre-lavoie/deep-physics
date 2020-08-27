FROM node:12 AS build
WORKDIR /app
COPY . .
RUN npm install
RUN npm run build

FROM node:12
COPY --from=build /app/node_modules /app/node_modules
COPY --from=build /app/build /app/build
COPY --from=build /app/package.json /app/package.json
COPY --from=build /app/package-lock.json /app/package-lock.json
EXPOSE 80
EXPOSE 443
CMD ["node", "/app/build/index.js"]