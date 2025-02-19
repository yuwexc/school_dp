<?php

namespace App\Http\Controllers;

use App\Models\CourseAccess;
use App\Http\Requests\StoreCourseAccessRequest;
use App\Http\Requests\UpdateCourseAccessRequest;
use Request;

class CourseAccessController extends Controller
{
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
    public function create()
    {
        //
    }

    public function delete($id)
    {
        $access = CourseAccess::where('id_course_access', $id)->first();
        if ($access) {
            $access->delete();
        }
        return response($access->id_course_access, 200);
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
