<?php

namespace App\Repositories;

use App\DTO\CreateBillingDTO;
use App\Models\Billing;
use App\Repositories\BillingRepositoryInterface;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\DB;
use League\Csv\Reader;

class BillingEloquentORM implements BillingRepositoryInterface {

   public function __construct(
      protected Billing $model
   ){}

   public function getPaginated(string $filter = null): object {
      return $this->model
                  ->where(function ($query) use ($filter) {
                     if ($filter) {
                        $query->where("name", "like", "%$filter%");
                     }
                  })
                  ->orderBy("created_at", "desc")
                  ->paginate()
                  ->withPath("");
   }

   public function uploadCSVFile(UploadedFile $file): void {
      ini_set("max_execution_time", 60);

      DB::disableQueryLog();
      DB::connection()->unsetEventDispatcher();

      $csv = Reader::createFromPath($file->getRealPath());
      $csv->setHeaderOffset(0);

      $billings = [];

      foreach ($csv as $record) {
         $billings[] = (array) CreateBillingDTO::makeFromReader($record);

         if (count($billings) === 5000) {
            $this->model->insert($billings);
            $billings = [];
         }
      }

      if (count($billings) > 0) {
         $this->model->insert($billings);
      }
   }
}