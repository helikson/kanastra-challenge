#!/bin/bash
echo "Starting my application..."
composer install
php artisan key:generate
php artisan migrate
php artisan schedule:run