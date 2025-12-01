<?php

namespace App\Models;

use App\Observers\CatObserver;
use Illuminate\Database\Eloquent\Attributes\ObservedBy;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

use Illuminate\Support\Facades\DB;

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

    public function areas()
    {
        return $this->belongsToMany(Area::class, 'animal_locations', 'animal_id', 'location');
    }

    public function locations()
    {
        return DB::table('animal_locations')
            ->join('areas', 'animal_locations.location', '=', 'areas.id')
            ->where('animal_locations.animal_id', $this->id)
            ->select(
                'areas.id',
                'areas.name',
                'areas.area_id'
            )
            ->get();
    }

    public function photos()
    {
        return $this->hasMany(CatPhoto::class);
    }
}
