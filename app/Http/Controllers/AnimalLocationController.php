<?php

namespace App\Http\Controllers;

use App\Models\AnimalLocation;
use App\Models\Cat;
use App\Models\Area;
use Illuminate\Http\Request;
use Inertia\Inertia;

class AnimalLocationController extends Controller
{
    // Store the new AnimalLocation
    public function store(Request $request, Cat $cat)
    {
        $request->validate([
            'location' => 'required|exists:areas,id',
        ]);

        // Create or ignore if already exists
        AnimalLocation::firstOrCreate([
            'animal_id' => $cat->id,
            'location' => $request->location,
        ]);

        return redirect()->route('cats.show', ['cat' => $cat]);;
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create(Cat $cat)
    {
        $areas = Area::with('parent')->get();

        return Inertia::render(
            'locations/animal-location-create',
            ['cat' => $cat, 'allAreas' => $areas]
        );
    }

    public function destroy(Cat $cat, Area $animal_location)
    {
        AnimalLocation::where('animal_id', $cat->id)
            ->where('location', $animal_location->id)
            ->delete();

        return redirect()->route('cats.edit', ['cat' => $cat]);
    }
}
