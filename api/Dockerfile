FROM php:8.2-fpm

RUN apt-get update && apt-get install -y \
    libzip-dev unzip git curl zip php-pgsql \
    && docker-php-ext-install zip pdo pdo_mysql \
    && rm -rf /var/lib/apt/lists/*

COPY --from=composer:2 /usr/bin/composer /usr/bin/composer

WORKDIR /var/www/html

COPY . .

RUN composer install --no-interaction --optimize-autoloader --no-dev
RUN chmod +x ./deploy.sh

CMD ["php-fpm"]
