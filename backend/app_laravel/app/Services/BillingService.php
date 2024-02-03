<?php

namespace App\Services;

use App\Repositories\BillingRepositoryInterface;
use Illuminate\Http\UploadedFile;

class BillingService {
   public function __construct(
      protected BillingRepositoryInterface $repository
   ){}

   public function getPaginated(string $filter = null): object {
      return $this->repository->getPaginated($filter);
   }

   public function uploadCSVFile(UploadedFile $file): void {
      $this->repository->uploadCSVFile($file);
   }
}