<?php

use App\Http\Controllers\Api\BillingController;
use Illuminate\Support\Facades\Route;

// Route::apiResource('/billings', BillingController::class);

Route::get("/list/billings", [BillingController::class, "index"]);
Route::post("/upload/csv/billings", [BillingController::class, "store"]);