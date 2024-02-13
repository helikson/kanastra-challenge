<?php

namespace App\Services;

use App\Repositories\BilletRepositoryInterface;

class BilletService
{
   public function __construct(
      protected BilletRepositoryInterface $repository
   ) {}

   public function create(Array $data): ?string
   {
      return $this->repository->create($data);
   }
}
