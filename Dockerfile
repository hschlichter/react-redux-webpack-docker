FROM node:argon

RUN useradd --user-group --create-home --shell /bin/false app
COPY . /var/www
RUN chown -R app:app /var/www

USER app
WORKDIR  /var/www
RUN npm install

CMD ["npm", "start"]

