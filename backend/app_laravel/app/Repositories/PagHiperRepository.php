<?php

namespace App\Repositories;

use Exception;
use Illuminate\Support\Collection;
use Illuminate\Support\Facades\Http;

class PagHiperRepository implements BilletRepositoryInterface
{
   public function __construct(
      protected ?Collection $configuration = null
   ) {
      $this->configuration = collect(config('services.paghiper'));
   }

   public function create(array $data): ?string
   {
      try {
         $url = $this->configuration->get("url");
         $apiKey = $this->configuration->get('apiKey');
         $token = $this->configuration->get('token');

         $response = Http::baseUrl($url)->post('/transaction/create', [
            'apiKey' => $apiKey,
            'token' => $token,

            'order_id' => rand(1, 1000),
            'days_due_date' => $this->calculateDaysDueDate($data['debtDueDate']),
            'type_bank_slip' => 'boletoA4',

            'payer_name' => $data['name'],
            'payer_email' => $data['email'],
            'payer_cpf_cnpj' => $data['governmentId'],
            'payer_phone' => '11999999999',

            'seller_description' => str($data['debtId'])->squish(),

            'items' => [
               [
                  'item_id' => $data['id'],
                  'description' => "Test Product",
                  'quantity' => 1,
                  'price_cents' => str_replace(',', '.', str_replace('.', '', $data['debtAmount']))
               ],
            ]
         ]);

         if ($response->failed()) {
            return null;
         }

         return $response->json('create_request.bank_slip.url_slip_pdf');
      } catch (Exception $e) {
         report($e);
         return null;
      }
   }

   private function calculateDaysDueDate(string $date): int {
      $diff = strtotime($date) - time();
      return round($diff / (60 * 60 * 24));
   }
}
