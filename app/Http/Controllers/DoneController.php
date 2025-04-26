<?php

namespace App\Http\Controllers;


use App\Http\Requests\StoreDoneRequest;
use App\Http\Requests\UpdateDoneRequest;
use App\Models\Done;
use App\Models\Lesson;
use App\Models\User;
use DivisionByZeroError;
use Illuminate\Http\Request;

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

        foreach ($dones as $done) {
            $words += $done->lesson()->get()->first()->word_amount;
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
                'title' => $user->average_score() . '/5.0',
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
    public function create($id, Request $request)
    {
        if ($lesson = Lesson::where('id_lesson', $id)->get()->first()) {
            if (
                !Done::where([
                    ['student', auth()->user()->id_user],
                    ['lesson_id', $id]
                ])->exists()
            ) {
                $done = new Done();
                $done->lesson_id = $lesson->id_lesson;
                $done->student = auth()->user()->id_user;
                $done->st_answer = json_encode($request->st_answer);
                $done->time_start = $request->time_start;
                $done->time_end = $request->time_end;
                $done->save();
            } else {
                return response(["message" => "Forbidden for you"], 403);
            }
        } else {
            return response(["message" => "Lesson not found"], 404);
        }
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
    public function show($id_user, $id_lesson)
    {
        if (auth()->user()->role()->get()->first()->role_code != 'teacher') {
            return response(["message" => "Forbidden for you"], 403);
        }

        if (User::where('id_user', $id_user)->get()->first()) {
            if ($lesson = Lesson::where('id_lesson', $id_lesson)->get()->first()) {
                $lesson->done = $lesson->done($id_user)->get()->first();
                $lesson->done->student = $lesson->done->student()->get()->first();
                return response($lesson, 200);
            } else {
                return response(["message" => "Lesson not found"], 404);
            }
        } else {
            return response(["message" => "User not found"], 404);
        }
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
    public function update($id_user, $id_lesson, Request $request)
    {
        if (auth()->user()->role()->get()->first()->role_code != 'teacher') {
            return response(["message" => "Forbidden for you"], 403);
        }

        if ($user = User::where('id_user', $id_user)->get()->first()) {
            if ($done = Done::where('lesson_id', $id_lesson)->where('student', $id_user)->get()->first()) {
                if ($done->mark == null) {
                    $user->score = $user->score + $request->score;
                    $user->save();
                    $done->feedback = $request->feedback;
                    $done->mark = $request->mark;
                    $done->save();
                } else {
                    return response(["message" => "Forbidden for you"], 403);
                }
                return response($done, 200);
            } else {
                return response(["message" => "Student answer not found"], 404);
            }
        } else {
            return response(["message" => "User not found"], 404);
        }
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Done $done)
    {
        //
    }
}
