FROM php:8.4-fpm-bookworm AS base

# Install system dependencies
RUN apt-get update && apt-get install -y \
    libzip-dev \
    libicu-dev \
    libpq-dev \
    libbrotli-dev\
    unzip \
    procps \
    curl \
    gosu \
    && apt-get clean \
    && rm -rf /var/lib/apt/lists/*

# Install Composer
COPY --from=composer:2.9.8 /usr/bin/composer /usr/local/bin/composer

ENV COMPOSER_ALLOW_SUPERUSER=1

# Install PHP extensions including sockets
RUN docker-php-ext-install \
    pdo \
    pdo_pgsql \
    bcmath \
    zip \
    intl \
    pcntl \
    sockets \
    && pecl install redis swoole \
    && docker-php-ext-enable redis swoole

# ============================================
# Stage: Composer dependencies
# ============================================
FROM base AS composer-deps

WORKDIR /usr/share/nginx/html/

COPY composer.json composer.lock ./

RUN composer install \
    --no-dev \
    --no-scripts \
    --no-autoloader \
    --prefer-dist

# ============================================
# Stage: Final application
# ============================================
FROM base AS final

WORKDIR /usr/share/nginx/html/

# Copy vendor from composer-deps stage — chown so www-data owns it, not root
COPY --from=composer-deps --chown=www-data:www-data /usr/share/nginx/html/vendor ./vendor

# Copy application files — chown so www-data owns it, not root
COPY --chown=www-data:www-data . ./

# Finalize composer
RUN composer dump-autoload --optimize --no-dev \
    && composer clear-cache

# Discover packages
RUN php artisan package:discover --ansi

# Setup storage and permissions (baked into image, will be copied into
# fresh volumes with correct ownership by Docker on first mount)
RUN chmod a+x ./artisan \
    && mkdir -p \
    storage/framework/sessions \
    storage/framework/views \
    storage/framework/cache/data \
    storage/logs \
    storage/app/public \
    bootstrap/cache \
    && chmod -R 775 storage bootstrap/cache \
    && chown -R www-data:www-data storage bootstrap/cache

# Copy and setup entrypoint
COPY ./scripts/php-fpm-entrypoint /usr/local/bin/php-entrypoint
RUN chmod +x /usr/local/bin/php-entrypoint

# Drop to non-root for everything from here on — build steps above
# that needed root are already done.
USER www-data

ENTRYPOINT ["/usr/local/bin/php-entrypoint"]

CMD ["php", "artisan", "octane:start", "--server=swoole", "--host=0.0.0.0", "--port=9000"]