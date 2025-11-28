<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Area extends Model
{
    protected $fillable = ['name', 'area_id'];

    public function parent()
    {
        return $this->belongsTo(Area::class, 'area_id'); 
    }

    public function children()
    {
        return $this->hasMany(Area::class, 'area_id');
    }

    public function cats()
    {
        return $this->belongsToMany(Cat::class, 'animal_locations', 'location', 'animal_id');
    }
}
