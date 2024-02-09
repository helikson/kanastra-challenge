<?php

namespace App\Repositories;

use Illuminate\Http\UploadedFile;

interface BillingRepositoryInterface {
   public function getPaginated(string $filter = null): object;
   public function uploadCSVFile(UploadedFile $file): void;
}