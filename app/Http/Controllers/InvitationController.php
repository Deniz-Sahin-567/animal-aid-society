<?php

namespace App\Http\Controllers;

use App\Models\Invitation;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Mail;
use App\Mail\InvitationMail;
use Illuminate\Support\Facades\Gate;
use Inertia\Inertia;

class InvitationController extends Controller
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
        Gate::authorize('create', Invitation::class);

        return Inertia::render('invitations/invitation-create');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        Gate::authorize('create', Invitation::class);

        $validated = $request->validate([
            'email' => 'required|email|max:50|unique:invitations,email|unique:users,email',
        ]);

        $invite = Invitation::create([
            'email' => $validated['email'],
            'token' => random_int(1000000000, 9999999999),
            'expires_at' => now()->addDays(1),
        ]);

        Mail::to($invite->email)->send(new InvitationMail($invite));

        return redirect()->back()->with('status', 'Invitation sent successfully!');
    }

    /**
     * Display the specified resource.
     */
    public function show(Invitation $invitation)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Invitation $invitation)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Invitation $invitation)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Invitation $invitation)
    {
        //
    }
}
