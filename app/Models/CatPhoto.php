<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Support\Facades\Storage;

class CatPhoto extends Model
{
    protected $fillable = [
        'cat_id',
        'path',
        'caption',
    ];

    public function cat(): BelongsTo
    {
        return $this->belongsTo(Cat::class);
    }

    // Accessor: return full URL
    public function getPathAttribute(): string
    {
        $path = $this->getRawOriginal('path');
        return asset("storage/{$path}");
    }


    protected static function booted()
    {
        static::deleted(function ($photo) {
            $original = $photo->getRawOriginal('path');
            if ($original && Storage::disk('public')->exists($original)) {
                Storage::disk('public')->delete($original);
            }
        });
    }
}
