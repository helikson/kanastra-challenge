<?php

namespace App\Console\Commands;

use App\Models\Billing;
use App\Repositories\PagHiperRepository;
use Exception;
use Illuminate\Console\Command;
use Illuminate\Support\Facades\Mail;

class GeneratePagHiperBillet extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'app:generate-paghiper-billet';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Generate Billet';

    /**
     * Execute the console command.
     */
    public function handle()
    {
        try {
            $billings = Billing::select()->get();

            foreach ($billings as $billing) {
                if (date("Y-m-d") > $billing->debtDueDate) {
                    continue;
                }

                $controller = new PagHiperRepository();
                $url = $controller->create(json_decode(json_encode($billing), true));

                if (is_null($url)) {
                    continue;
                }

                Mail::send("emails/template", [
                    "name" => $billing->name,
                    "debitAmount" => $billing->debtAmount,
                    "url" => $url
                ], function ($message) use ($billing) {
                    $message->to($billing->email)->subject('Laravel Billing');
                });
            }
        } catch (Exception $e) {
            log($e->getMessage());
        }
    }
}
