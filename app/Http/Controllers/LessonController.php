<?php

namespace App\Http\Controllers;

use App\Models\Course;
use App\Models\Lesson;
use App\Http\Requests\StoreLessonRequest;
use App\Http\Requests\UpdateLessonRequest;
use Illuminate\Http\Request;

class LessonController extends Controller
{
    public function generate()
    {
        $courses = Lesson::factory()->count(10)->create();
        return $courses;
    }

    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create($id_course, Request $request)
    {
        $course = Course::where('id_course', $id_course)->get()->first();

        if (!$course) {
            return response(["message" => "Course not found"], 404);
        }

        if (auth()->user()->id_user != $course->user()->get()->first()->id_user) {
            return response(["message" => "Forbidden for you"], 403);
        }

        $new_lesson = new Lesson();
        $new_lesson->lesson_number = $course->lessons()->count() + 1;
        $new_lesson->lesson_name = $request->lesson_name;
        $new_lesson->lesson_description = $request->lesson_description;
        $new_lesson->lesson_body = json_encode([
            "lesson_words" => $request->lesson_words,
            $request->lesson_body
        ]);
        $new_lesson->word_amount = count($request->lesson_words);
        $new_lesson->course_id = $id_course;
        $new_lesson->save();

        return response($new_lesson, 200);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreLessonRequest $request)
    {
        //
    }

    /**
     * Display the specified resource.
     */
    public function show($id)
    {
        $lesson = Lesson::where('id_lesson', $id)->get()->first();

        if (!$lesson) {
            return response(["message" => "Lesson not found"], 404);
        }

        if (auth()->user()->role()->get()->first()->role_code != 'student') {
            $lesson->done = $lesson->done(auth()->user()->id_user)->get()->first();
            $lesson->unchecked_list = $lesson->dones()->where('mark', null)->get()->all();
            foreach ($lesson->unchecked_list as $done) {
                $done->student = $done->student()->get()->first();
            }
            return $lesson;
        } else {
            $course = $lesson->course()->get()->first();
            $enrolled = auth()->user()->enrolled()->where('id_course', $course->id_course)->get()->first();
            if (!$enrolled) {
                return response(["message" => "Forbidden for you"], 403);
            }

            $lesson->done = $lesson->done(auth()->user()->id_user)->get()->first();
            return $lesson;
        }
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Lesson $lesson)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateLessonRequest $request, Lesson $lesson)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Lesson $lesson)
    {
        //
    }
}
