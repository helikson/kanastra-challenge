<?php

use App\Http\Controllers\Admin\{BillingController};
use Illuminate\Support\Facades\Route;

Route::post("/billings", [BillingController::class, "store"])->name("billings/store");
Route::get("/billings", [BillingController::class, "index"])->name("billings/index");

Route::get('/', function () {
    return view('welcome');
});
