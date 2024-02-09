<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Services\BillingService;
use Illuminate\Http\Request;

class BillingController extends Controller
{
    public function __construct(
        protected BillingService $service
    ) {}

    /**
     * Display a listing of the resource.
     */
    public function index() {
        return $this->service->getPaginated();
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request) {
        $this->service->uploadCSVFile($request->file("csv_file"));
        return json_encode(["message" => "success", "status" => 200]);
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
    }
}
