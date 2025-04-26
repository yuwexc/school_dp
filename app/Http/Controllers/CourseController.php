<?php

namespace App\Http\Controllers;

use App\Models\Course;
use App\Http\Requests\StoreCourseRequest;
use App\Http\Requests\UpdateCourseRequest;
use App\Models\Lesson;
use App\Models\LessonStatus;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;

class CourseController extends Controller
{
    public function generate()
    {
        $courses = Course::factory()->count(10)->create();
        return $courses;
    }

    /**
     * Display a listing of the resource.
     */

    public function index(Request $request)
    {
        $count = Course::all()->count();

        if ($request->level_id && !$request->category_id) {
            $courses = Course::whereLevelId($request->level_id);

            $count = $courses->count();

            $courses = $courses->orderByDesc('created_at')
                ->limit($request->pageIndex * $request->pageSize)->get()->all();
        }

        if (!$request->level_id && $request->category_id) {
            $courses = Course::whereCategoryId($request->category_id);

            $count = $courses->count();

            $courses = $courses->orderByDesc('created_at')
                ->limit($request->pageIndex * $request->pageSize)->get()->all();
        }

        if ($request->level_id && $request->category_id) {
            $courses = Course::whereCategoryId($request->category_id)
                ->whereLevelId($request->level_id);

            $count = $courses->count();

            $courses = $courses->orderByDesc('created_at')
                ->limit($request->pageIndex * $request->pageSize)->get()->all();
        }

        if (!$request->level_id && !$request->category_id) {
            $courses = Course::orderByDesc('created_at')
                ->orderByDesc('created_at')
                ->limit($request->pageIndex * $request->pageSize)->get()->all();
            ;
        }

        foreach ($courses as $course) {
            $course->level = $course->level()->get()->first();
            $category = $course->category()->get()->first();
            $course->category = $category ? $category : null;
            unset($course->level_id, $course->category_id);
        }

        return response([
            "courses" => $courses,
            "currentPage" => $request->pageIndex,
            "pageSize" => $request->pageSize,
            "totalPages" => ceil($count / $request->pageSize)
        ], 200);
    }

    public function my_courses()
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
                    "category" => $category ? $category : null,
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
    public function create(Request $request)
    {
        if (auth()->user()->role()->get()->first()->role_code != 'teacher') {
            return response(["message" => "Forbidden for you"], 403);
        }

        if ($user = auth()->user()) {
            $course = new Course();
            $course->course_name = $request->course_name;
            $course->course_description = $request->course_description;
            $course->level_id = $request->level_id;
            $course->category_id = $request->category_id;
            $course->author = $user->id_user;
            $course->save();
            $this->show($course->id_course);
        } else {
            return response(["message" => "User not found"], 404);
        }
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
    public function show($id)
    {
        $course = Course::find($id);
        $user = null;

        if (request()->user('api')) {
            $user = User::find(request()->user('api')->id_user);
        }

        $access = null;

        if ($user) {
            $access = $course->accesses()->where('student', $user->id_user)->get()->first();
        }

        $category = $course->category()->select('category_name')->get()->first();
        $id_course_access = null;
        $status = '';

        if ($access) {
            $id_course_access = $access->id_course_access;
            $status = $access->status()->get()->first()->status_code;
        }

        $progress = null;

        if ($status == 'enrolled' || $status == 'expelled') {
            $id_lessons = collect(Lesson::where('course_id', $course->id_course)->get('id_lesson'))
                ->map(function ($item) {
                    return $item['id_lesson'];
                });
            $dones = $user->dones()->whereNot('mark')->whereIn('lesson_id', $id_lessons)->get()->count();

            if ($id_lessons && $dones) {
                $progress = $dones / $id_lessons->count() * 100;
            }
        }

        if ($user != null && $course->user()->get()->first()->id_user == $user->id_user) {
            $lessons = $course->lessons()->select([
                'id_lesson',
                'lesson_description',
                'lesson_name',
                'lesson_number',
                'lesson_status',
                'created_at',
                'updated_at'
            ])->orderBy('lesson_number')->get();
        } else {
            $lessons = $course->lessons()
                ->where(
                    'lesson_status',
                    LessonStatus::where('status_code', 'published')->get()->first()->id_status
                )->select([
                        'id_lesson',
                        'lesson_description',
                        'lesson_name',
                        'lesson_number',
                        'lesson_status',
                        'created_at',
                        'updated_at'
                    ])->orderBy('lesson_number')->get();
        }

        foreach ($lessons as $lesson) {
            $done = null;

            if (request()->user('api')) {
                $done = $lesson->dones()
                    ->where('lesson_id', $lesson->id_lesson)
                    ->where('student', request()->user('api')->id_user)
                    ->get()->first();
            }

            $lesson->done = $done;
        }

        $top_students = collect($course->students()->get()->filter(function (User $student) {
            return $student->dones()->whereNot('mark')->count() > 0;
        }))->sort(
                function (User $a, User $b) {
                    $scoreComparison = $b->average_score() <=> $a->average_score();
                    if ($scoreComparison === 0) {
                        return $b->created_at <=> $a->created_at;
                    }
                    return $scoreComparison;
                }
            )->values()->map(function (User $user) {
                return [
                    "first_name" => $user->first_name,
                    "last_name" => $user->last_name,
                    "middle_name" => $user->middle_name,
                    'score' => $user->average_score()
                ];
            })->all();

        return response([
            "id_course" => $course->id_course,
            "course_name" => $course->course_name,
            "course_description" => $course->course_description,
            "level" => $course->level()->select(['level_code', 'level_title', 'level_name'])->get()->first(),
            "category" => $category ? $category : null,
            "image" => $course->image,
            "author" => $course->user()->select(['first_name', 'last_name'])->get()->first(),
            "access" => [
                "id_course_access" => $id_course_access,
                "access_status" => $status
            ],
            "progress" => $progress,
            "lessons" => $lessons,
            "top_students" => $top_students,
            "created_at" => $course->created_at,
            "updated_at" => $course->updated_at
        ], 200);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit($id, Request $request)
    {
        $file = $request->file('image');

        if ($file) {
            $name = Str::random(10) . '.' . $file->getClientOriginalExtension();
            $path = $_SERVER['HTTP_HOST'] . '/images/' . $name;
            Storage::putFileAs('images', $file, $name);
            $course = Course::where('id_course', $id)->get()->first();
            $course->image = $path;
            $course->save();
        } else {
            $course = Course::where('id_course', $id)->get()->first();
            $course->update($request->all());
        }
        return $this->show($id);
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
