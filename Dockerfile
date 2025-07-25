FROM nginx

# Create nginx configuration file
RUN printf "server {\n\
    listen 80;\n\
\n\
    location / {\n\
        root /usr/share/nginx/html/app;\n\
        index index.html index.htm;\n\
        try_files \$uri \$uri/ /index.html;\n\
        etag off;\n\
    }\n\
}\n" > /etc/nginx/conf.d/default.conf

# Copy the built Angular application to the nginx html directory
COPY dist/libs/web/analog/public /usr/share/nginx/html/app/
