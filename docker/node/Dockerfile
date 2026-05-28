# syntax=docker/dockerfile:1

# Use a imagem oficial do Node.js como base
FROM node:20-alpine

ENV TZ=UTC

# Install required packages
RUN apk add --no-cache bash curl npm yarn g++ make git

# Crie o diretório de trabalho na imagem
WORKDIR /var/www

# Exponha a porta que a aplicação estará ouvindo
EXPOSE 4200

# Iniciar a aplicação
ENTRYPOINT ["sh", "docker/node/start.sh"]
