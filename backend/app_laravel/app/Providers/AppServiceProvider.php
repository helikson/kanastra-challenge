<?php

namespace App\Providers;

use App\Repositories\BilletRepositoryInterface;
use App\Repositories\BillingEloquentORM;
use App\Repositories\BillingRepositoryInterface;
use App\Repositories\PagHiperRepository;
use Illuminate\Support\ServiceProvider;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     */
    public function register(): void
    {
        $this->app->bind(
            BillingRepositoryInterface::class,
            BillingEloquentORM::class
        );

        $this->app->bind(
            BilletRepositoryInterface::class,
            PagHiperRepository::class,
        );
    }

    /**
     * Bootstrap any application services.
     */
    public function boot(): void
    {
        //
    }
}
