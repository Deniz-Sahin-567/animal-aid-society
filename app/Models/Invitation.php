<?php

namespace App\Models;

use App\Policies\InvitationPolicy;
use Illuminate\Database\Eloquent\Attributes\UsePolicy;
use Illuminate\Database\Eloquent\Model;

#[UsePolicy(InvitationPolicy::class)]
class Invitation extends Model
{
    protected $fillable = [
        'email',
        'token',
        'expires_at',
    ];
}
