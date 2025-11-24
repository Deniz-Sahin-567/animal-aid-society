<?php

namespace App\Models;

use App\Observers\CatObserver;
use Illuminate\Database\Eloquent\Attributes\ObservedBy;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

#[ObservedBy(CatObserver::class)]
class Cat extends Model
{
    /** @use HasFactory<\Database\Factories\CatFactory> */
    use HasFactory;

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'name',
        'gender',
        'birth_date',
        'arrival_date',
        'neutered',
        'description',
    ];
}
