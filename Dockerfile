FROM nginx
COPY nginx.conf /etc/nginx/nginx.conf
COPY dist/caresyntax /etc/nginx/html/
EXPOSE 8080