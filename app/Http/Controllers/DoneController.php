<?php

namespace App\Http\Controllers;


use App\Http\Requests\StoreDoneRequest;
use App\Http\Requests\UpdateDoneRequest;
use App\Models\Done;
use App\Models\User;
use DivisionByZeroError;

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
        $user = User::find(auth()->user()->id_user);
        $dones = $user->dones()->whereNot('mark')->get();
        $courses = $user->enrolled()->get();
        $lessons = 0;

        foreach ($courses as $course) {
            $lessons += $course->lessons()->count();
        }

        $words = 0;
        $marks = 0;

        foreach ($dones as $done) {
            $words += $done->lesson()->get()->first()->word_amount;
            $marks += $done->mark;
        }

        try {
            $average_score = $marks / $dones->count();
        } catch (DivisionByZeroError $e) {
            $average_score = 0;
        }

        try {
            $progress = $dones->count() / $lessons * 100;
        } catch (DivisionByZeroError $e) {
            $progress = 0;
        }

        return response([
            [
                'title' => $dones->count(),
                'subtitle' => $words . ' ',
            ],
            [
                'title' => $average_score . '/5.0',
                'subtitle' => null,
            ],
            [
                'title' => $progress . '%',
                'subtitle' => null,
            ]
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
