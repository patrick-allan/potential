# Imagem de Origem
FROM node:latest
# Diretório de trabalho(é onde a aplicação ficará dentro do container).
WORKDIR /app
# Adicionando `/app/node_modules/.bin` para o $PATH
ENV PATH /app/node_modules/.bin:$PATH
# Instalando dependências da aplicação e armazenando em cache.
COPY package.json ./
COPY package-lock.json ./
RUN npm install --silent
RUN npm install react-scripts
# add app
COPY . ./
# Inicializa a aplicação
CMD ["npm", "start"]