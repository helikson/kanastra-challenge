<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Services\BilletService;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\Validator;

class BilletController extends Controller
{
   public function __construct(
      protected BilletService $service
   ) {
   }

   public function create(Request $request)
   {
      $data = $request->all();

      $validator = Validator::make($data, [
         'name' => 'required',
         'governmentId' => 'required',
         'email' => 'required',
         'debtAmount' => 'required',
         'debtDueDate' => 'required',
         'debtId' => 'required',
      ]);

      if ($validator->fails()) {
         return response()->json($validator->errors(), Response::HTTP_UNPROCESSABLE_ENTITY);
      }

      return $this->service->create($data);
   }
}
