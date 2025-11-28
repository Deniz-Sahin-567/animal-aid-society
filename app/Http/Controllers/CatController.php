<?php

namespace App\Http\Controllers;

use App\Models\Cat;
use App\Http\Requests\StoreCatRequest;
use App\Http\Requests\UpdateCatRequest;
use App\Models\AnimalLocation;
use Inertia\Inertia;

class CatController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return Inertia::render('cats/cat-index/cat-index', [
            'cats' => Cat::all(),
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return Inertia::render('cats/cat-create');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreCatRequest $request)
    {
        $newCat = Cat::create($request->validated());

        return redirect()->route('cats.show', ['cat' => $newCat]);
    }

    /**
     * Display the specified resource.
     */
    public function show(Cat $cat)
    {
        return Inertia::render('cats/cat-show', [
            'cat' => $cat,
            'locations' => $cat->locations()
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Cat $cat)
    {
        return Inertia::render('cats/cat-edit', [
            'cat' => $cat,
            'locations' => $cat->locations(),
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateCatRequest $request, Cat $cat)
    {
        $cat->update($request->validated());

        return redirect()->route('cats.show', ['cat' => $cat]);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Cat $cat)
    {
        $cat->delete();

        return redirect()->route('cats.index');
    }
}
