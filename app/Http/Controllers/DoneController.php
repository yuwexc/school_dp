<?php

namespace App\Http\Controllers;


use App\Http\Requests\StoreDoneRequest;
use App\Http\Requests\UpdateDoneRequest;

class DoneController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //
    }

    public function dashboard()
    {
        $user = auth()->user();
        //$dones = ;
        return response([
            //'dones' => $dones
        ], 200);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreDoneRequest $request)
    {
        //
    }

    /**
     * Display the specified resource.
     */
    public function show(Done $done)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Done $done)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateDoneRequest $request, Done $done)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Done $done)
    {
        //
    }
}
