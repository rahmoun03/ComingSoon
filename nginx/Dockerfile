FROM nginx:latest
COPY ./config/default.conf ./etc/nginx/conf.d
COPY ./robots.txt /
CMD [ "nginx", "-g", "daemon off;" ]