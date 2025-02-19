<?php

namespace App\Http\Controllers;

use App\Models\Course;
use App\Http\Requests\StoreCourseRequest;
use App\Http\Requests\UpdateCourseRequest;
use App\Models\Lesson;
use App\Models\User;

class CourseController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $user = User::find(auth()->user()->id_user);

        switch ($user->role()->get()->first()->role_code) {
            case 'student':
                $accesses = $user->accesses()->orderByDesc('created_at')->get();
                $courses = [];

                foreach ($accesses as $access) {
                    array_push($courses, $access->course()->get()->first());
                }
                break;
            case 'teacher':
                $courses = $user->courses()->get();
                break;
            default:
                $courses = Course::all();
                break;

        }

        $response = [];

        if (!empty($courses)) {
            foreach ($courses as $course) {
                $id_course_access = null;
                $status = null;
                $category = $course->category()->get()->first();
                $access = $course->accesses()->where('student', $user->id_user)->get()->first();
                $progress = 0;
                $id_lessons = collect(Lesson::where('course_id', $course->id_course)->get('id_lesson'))
                    ->map(function ($item) {
                        return $item['id_lesson'];
                    });
                $dones = $user->dones()->whereNot('mark')->whereIn('lesson_id', $id_lessons)->get()->count();

                if ($id_lessons && $dones) {
                    $progress = $dones / $id_lessons->count() * 100;
                }

                if ($access) {
                    $id_course_access = $access->id_course_access;
                    $status = $access->status()->get()->first()->status_code;
                }

                array_push($response, [
                    "id_course" => $course->id_course,
                    "course_name" => $course->course_name,
                    "course_description" => $course->course_description,
                    "level" => $course->level()->select(['level_code', 'level_title', 'level_name'])->get()->first(),
                    "category" => $category ? $category->category_name : null,
                    "image" => $course->image,
                    "author" => $course->user()->select(['first_name', 'last_name'])->get()->first(),
                    "access" => [
                        "id_course_access" => $id_course_access,
                        "access_status" => $status
                    ],
                    "progress" => $progress,
                    "created_at" => $course->created_at,
                    "updated_at" => $course->updated_at
                ]);
            }
        }

        return response($response, 200);
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
    public function store(StoreCourseRequest $request)
    {
        //
    }

    /**
     * Display the specified resource.
     */
    public function show(Course $course)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Course $course)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateCourseRequest $request, Course $course)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Course $course)
    {
        //
    }
}
