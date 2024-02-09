<?php

namespace App\Console\Commands;

use App\Models\Billing;
use Exception;
use Illuminate\Console\Command;
use Illuminate\Support\Facades\Mail;

class SendEmail extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'app:send-email';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Send email';

    /**
     * Execute the console command.
     */
    public function handle()
    {
        try {
            $billings = Billing::select('email', 'name', 'debtAmount')->get();

            foreach ($billings as $billing) {
                Mail::send("emails/template", [
                    "name" => $billing->name,
                    "debitAmount" => $billing->debtAmount,
                ], function ($message) use ($billing) {
                    $message->to($billing->email)->subject('Laravel Billing');
                });
            }
        } catch (Exception $e) {
            log($e->getMessage());
        }
    }
}
