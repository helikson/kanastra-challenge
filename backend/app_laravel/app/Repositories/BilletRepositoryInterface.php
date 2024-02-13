<?php

namespace App\Repositories;

interface BilletRepositoryInterface {
   public function create(Array $data): ?string;
}