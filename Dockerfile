FROM node:18 AS build
RUN mkdir /build
WORKDIR /build
COPY . .
RUN npm ci
RUN npx prisma generate
RUN npm run build

FROM node:18
RUN mkdir /app
WORKDIR /app
COPY --from=build /build/node_modules /app/node_modules
COPY --from=build /build/.next /app/.next
COPY --from=build /build/prisma /app/prisma
COPY entrypoint.sh package.json /app/
EXPOSE 3000
ENTRYPOINT ["/app/entrypoint.sh"]
