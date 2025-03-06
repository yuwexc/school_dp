<?php

namespace App\Http\Controllers;

use App\Models\AccessStatus;
use App\Models\CourseAccess;
use App\Http\Requests\StoreCourseAccessRequest;
use App\Http\Requests\UpdateCourseAccessRequest;
use Request;

class CourseAccessController extends Controller
{
    public function generate()
    {
        $courses = CourseAccess::factory()->count(10)->create();
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
    public function create($id)
    {
        $attempt = CourseAccess::where('course_id', $id)
            ->where('student', auth()->user()->id_user)
            ->whereNotNull('status_id')->get()->first();

        if (!$attempt) {

            $access = new CourseAccess();
            $access->course_id = $id;
            $access->student = auth()->user()->id_user;
            $access->status_id = AccessStatus::where('status_code', 'requested')->get()->first()->id_access_status;

            $access->save();
            return response($access, 200);

        } else {
            return response(['message' => 'Forbidden for you'], 403);
        }
    }

    public function delete($id)
    {
        $access = CourseAccess::where('id_course_access', $id)->first();

        if ($access) {
            $access->delete();
            return response($access->id_course_access, 200);
        } else {
            return response(['message' => 'Forbidden for you'], 403);
        }
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreCourseAccessRequest $request)
    {
        //
    }

    /**
     * Display the specified resource.
     */
    public function show(CourseAccess $courseAccess)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(CourseAccess $courseAccess)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateCourseAccessRequest $request, CourseAccess $courseAccess)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(CourseAccess $courseAccess)
    {
        //
    }
}
