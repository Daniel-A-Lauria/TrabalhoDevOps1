FROM nginx:alpine

# Limpa o conteúdo padrão do Nginx
RUN rm -rf /usr/share/nginx/html/*

# Copia todo o conteúdo da pasta do projeto para o Nginx
COPY . /usr/share/nginx/html/

# Porta padrão de HTTP
EXPOSE 80

# Inicia o servidor Web
CMD ["nginx", "-g", "daemon off;"]