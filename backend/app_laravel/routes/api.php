<?php

use App\Http\Controllers\Api\BilletController;
use App\Http\Controllers\Api\BillingController;
use Illuminate\Support\Facades\Route;

Route::post("/billet/create", [BilletController::class, "create"]);

Route::get("/list/billings", [BillingController::class, "index"]);
Route::post("/upload/csv/billings", [BillingController::class, "store"]);