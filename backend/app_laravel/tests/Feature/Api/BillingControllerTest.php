<?php

namespace Tests\Feature\API;

use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Testing\Fluent\AssertableJson;
use Tests\TestCase;
use App\Models\Billing;
use Carbon\Carbon;
use Illuminate\Http\UploadedFile;

class BillingControllerTest extends TestCase
{
    use RefreshDatabase;

    public function test_get_billing_endpoint(): void
    {
        $billings = Billing::factory(3)->create();
        $response = $this->getJson('/api/list/billings');

        $response->assertStatus(200);

        $response->assertJsonCount(3, 'data');

        $response->assertJson(function (AssertableJson $json) use ($billings) {
            $billing = $billings->first();

            $json
                ->hasAll([
                    'data.0.name',
                    'data.0.governmentId',
                    'data.0.email',
                    'data.0.debtAmount',
                    'data.0.debtDueDate',
                    'data.0.debtId',
                ])
                ->whereAllType([
                    'data.0.id' => 'integer',
                    'data.0.name' => 'string',
                    'data.0.governmentId' => 'integer',
                    'data.0.email' => 'string',
                    'data.0.debtAmount' => 'double',
                    'data.0.debtDueDate' => 'string',
                    'data.0.debtId' => 'string',
                    'data.0.created_at' => 'string',
                    'data.0.updated_at' => 'string',
                ])
                ->whereAll([
                    'data.0.name' => $billing->name,
                    'data.0.governmentId' => $billing->governmentId,
                    'data.0.email' => $billing->email,
                    'data.0.debtAmount' => fn ($value) => abs($value - $billing->debtAmount) < 0.0001,
                    'data.0.debtDueDate' => Carbon::parse($billing->debtDueDate)->toDateTimeString(),
                    'data.0.debtId' => $billing->debtId,
                ])
                ->etc();
        });
    }

    public function test_post_billing_endpoint()
    {
        $file = new UploadedFile("tests/Feature/API/mocks/test.csv", "test.csv");

        $response = $this->post('/api/upload/csv/billings', ['csv_file' => $file]);

        $response->assertStatus(200);
    }
}
