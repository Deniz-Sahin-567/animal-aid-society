<?php

namespace App\Http\Controllers;

use App\Models\Area;
use Illuminate\Http\Request;
use Inertia\Inertia;


class AreaController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $areas = Area::with('parent')->where('area_id', null)->get();

        switch ($areas->count()) {
            case 0:
                return redirect()->route('areas.create');
            case 1:
                return redirect()->route('areas.show', ['area' => $areas->first()->id]);
        }

        return Inertia::render(
            'areas/area-index/area-index',
            ['areas' => $areas]
        );
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        $areas = Area::with('parent')->get();

        return Inertia::render(
            'areas/area-create',
            ['allAreas' => $areas]
        );
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:50',
            'area_id' => 'nullable|exists:areas,id|integer',
        ]);

        $area = Area::create($validated);

        return redirect()->route('areas.show', ['area' => $area]);
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        $area = Area::with('parent')->findOrFail($id);

        $sub_areas = Area::where('area_id', $id)->get();

        return Inertia::render(
            'areas/area-show',
            ['area' => $area, 'subAreas' => $sub_areas]
        );
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        return Inertia::render(
            'areas/area-edit',
            [
                'area' => Area::findOrFail($id),
                'allAreas' => Area::with('parent')->get()
            ]
        );
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:50',
            'area_id' => 'nullable|exists:areas,id|integer',
        ]);

        Area::findOrFail($id)->update($validated);

        return redirect()->route('areas.show', ['area' => $id]);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        Area::destroy($id);

        return redirect()->route('areas.index');
    }
}
