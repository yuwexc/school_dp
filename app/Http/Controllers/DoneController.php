<?php

namespace App\Http\Controllers;


use App\Http\Requests\StoreDoneRequest;
use App\Http\Requests\UpdateDoneRequest;
use App\Models\Done;
use App\Models\User;

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

        return response([
            [
                'background' => '#fdebd0',
                'image' => '/images/book.png',
                'title' => $dones->count(),
                'subtitle' => $words . ' words',
                'additional' => 'Completed lessons'
            ],
            [
                'background' => '#f4ecf7',
                'image' => '/images/star.png',
                'title' => $marks / $dones->count() . '/5.0',
                'subtitle' => null,
                'additional' => 'Average score'
            ],
            [
                'background' => '#eafaf1',
                'image' => '/images/videogames.png',
                'title' => $dones->count() / $lessons * 100 . '%',
                'subtitle' => null,
                'additional' => 'Progress'
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
