<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Services\BillingService;
use Illuminate\Http\Request;

class BillingController extends Controller {

    public function __construct(
        protected BillingService $service
    ) {}

    public function index(Request $request) {
        $billings = $this->service->getPaginated($request->filter);
        return view("admin/billings/index", compact("billings"));
    }

    public function store(Request $request) {
        $this->service->uploadCSVFile($request->file("csv_file"));
        return redirect()->route("billings/index");
    }
}
