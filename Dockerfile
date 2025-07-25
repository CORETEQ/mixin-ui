FROM nginx

# Create nginx configuration file
RUN cat <<EOF > /etc/nginx/conf.d/default.conf
server {
    listen 80;

    location / {
        root /usr/share/nginx/html;
        index index.html index.htm;
        try_files \$uri \$uri/ /app/index.html;
        etag off;
    }
}
EOF 

# Copy the built Angular application to the nginx html directory
COPY dist/libs/web/analog/public /usr/share/nginx/html/app/


