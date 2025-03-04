<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreUserRequest;
use App\Http\Requests\UpdateUserRequest;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Str;

class UserController extends Controller
{
    public function generate()
    {
        $users = User::factory()->count(3)->create();
        return $users;
    }
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $user = auth()->user();
        $user->level = $user->level()->get()->first();
        $user->role = $user->role()->get()->first();
        unset($user->id_user, $user->email_verified_at, $user->level_id, $user->role_id, $user->updated_at, $user->api_token);
        return response($user, 200);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create(Request $request)
    {
        $input = $request->all();

        $validation = Validator::make($input, [
            'first_name' => ['required', 'string'],
            'last_name' => ['required', 'string'],
            'middle_name' => ['string', 'nullable'],
            'phone' => ['required', 'unique:App\Models\User,phone'],
            'email' => ['required', 'email', 'unique:App\Models\User,email'],
            'password' => ['required', 'string'],
            'level_id' => ['integer', 'nullable']
        ]);
        if ($validation->fails()) {
            return response(['success' => false, 'message' => $validation->errors()], 422);
        } else {
            $user = new User();
            $user->first_name = $input['first_name'];
            $user->last_name = $input['last_name'];
            $user->middle_name = $input['middle_name'];
            $user->phone = $input['phone'];
            $user->email = $input['email'];
            $user->level_id = $input['level_id'];
            $user->api_token = Str::random(80);
            //$user->password = Crypt::encryptString($input['password']);
            $user->password = Hash::make($input['password']);
            $user->save();
            $user = User::where('email', $input['email'])->get()->first();
            //event(new Registered($user));
            return response(["token" => $user->api_token], 200);
        }
    }

    public function login(Request $request)
    {
        $input = $request->all();
        $user = User::where('email', $input['email'])->get()->first();
        if ($user) {
            $check = Hash::check($input['password'], $user->password);
            if ($check) {
                User::where('email', $input['email'])->update(['api_token' => Str::random(80)]);
                $user = User::where('email', $input['email'])->get()->first();
                return response(["token" => $user->api_token], 200);
            } else {
                return response(["error" => "Login failed"], 401);
            }
        } else {
            return response(["error" => 'Login failed'], 401);
        }
    }

    public function logout()
    {
        $user = auth()->user();
        User::where('id_user', $user->id_user)->update(['api_token' => null]);
        $user = User::where('id_user', $user->id_user)->get()->first();
        return response(["token" => $user->api_token], 200);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreUserRequest $request)
    {
        //
    }

    /**
     * Display the specified resource.
     */
    public function show(User $user)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(User $user)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request)
    {
        $user = User::where('id_user', auth()->user()->id_user)->get()->first();
        $user->update($request->all());
        return response($user, 200);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(User $user)
    {
        //
    }

    public function ifPhoneExists(Request $request)
    {
        $phone = $request->phone;
        $exist = User::where('phone', $phone)->exists();
        return response(['phone' => $exist], 200);
    }

    public function ifPhoneExistsOnUpdate(Request $request)
    {
        $phone = $request->phone;
        $user = User::where('phone', $phone)->get()->first();

        if ($user) {
            if ($user->id_user === auth()->user()->id_user) {
                $exist = false;
            } else {
                $exist = true;
            }
        } else {
            $exist = false;
        }

        return response(['phone' => $exist], 200);
    }

    public function ifEmailExists(Request $request)
    {
        $email = $request->email;
        $exist = User::where('email', $email)->exists();
        return response(['email' => $exist], 200);
    }

    public function ifEmailExistsOnUpdate(Request $request)
    {
        $email = $request->email;
        $user = User::where('email', $email)->get()->first();

        if ($user) {
            if ($user->id_user === auth()->user()->id_user) {
                $exist = false;
            } else {
                $exist = true;
            }
        } else {
            $exist = false;
        }

        return response(['email' => $exist], 200);
    }
}
