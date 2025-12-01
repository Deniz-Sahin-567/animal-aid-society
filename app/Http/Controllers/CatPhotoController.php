<?php

namespace App\Http\Controllers;

use App\Models\Cat;
use App\Models\CatPhoto;
use Illuminate\Http\Request;

class CatPhotoController extends Controller
{
    public function store(Request $request, Cat $cat)
    {
        $request->validate([
            'photos.*' => 'required|image|max:2048',
        ]);

        foreach ($request->file('photos', []) as $photo) {
            $path = $photo->store('cats/photos', 'public');

            $cat->photos()->create([
                'path' => $path,
            ]);
        }

        return redirect()->route('cats.edit', ['cat' => $cat]);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Cat $cat, CatPhoto $photo)
    {
        $photo->delete();

        return redirect()->route('cats.edit', ['cat' => $cat]);
    }
}
