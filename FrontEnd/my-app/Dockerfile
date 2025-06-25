# Build stage
FROM node:18 AS build
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

# Production stage
FROM nginx:alpine
# Ajuste aqui - verifique se a pasta é 'build' ou 'dist'
COPY --from=build /app/dist /usr/share/nginx/html
# Ou use este comando se o projeto usa React-Scripts (CRA)
# COPY --from=build /app/build /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]