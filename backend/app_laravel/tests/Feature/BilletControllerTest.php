<?php

namespace Tests\Feature\API;

use App\Http\Controllers\Api\BilletController;
use App\Services\BilletService;
use Illuminate\Http\Request;
use Tests\TestCase;

class BilletControllerTest extends TestCase
{
    public function test_billet_success()
    {
        $serviceMock = $this->createMock(BilletService::class);
        $controller = new BilletController($serviceMock);

        $requestData = [
            'name' => 'John Doe',
            'governmentId' => '12345',
            'email' => 'jg6I4@example.com',
            'debtAmount' => '100.00',
            'debtDueDate' => '2022-01-01',
            'debtId' => '12345',
        ];

        $mockedString = 'url_to_billet_pdf';

        $serviceMock
            ->expects($this->once())
            ->method('create')
            ->with($requestData)
            ->willReturn($mockedString);

        $response = $controller->create(new Request($requestData));

        $this->assertEquals($mockedString, $response);
    }

    public function test_billet_error()
    {
        $serviceMock = $this->createMock(BilletService::class);
        $controller = new BilletController($serviceMock);

        $requestData = [
            'name' => 'John Doe',
            'governmentId' => '12345',
            // Missing 'email', 'debtAmount', 'debtDueDate', 'debtId'
        ];

        $response = $controller->create(new Request($requestData));

        $this->assertEquals(422, $response->getStatusCode());

        $this->assertEquals((Object) [
            "email" => ["The email field is required."],
            "debtAmount" => ["The debt amount field is required."],
            "debtDueDate" => ["The debt due date field is required."],
            "debtId" => ["The debt id field is required."]
        ], json_decode($response->getContent()));
    }
}
