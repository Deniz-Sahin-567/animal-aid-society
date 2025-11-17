<?php

use App\Models\Area;
use App\Models\Cat;
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('areas', function (Blueprint $table) {
            $table->id();
            $table->string('name', 50);
            $table->timestamps();
        });

        Schema::create('cats', function (Blueprint $table) {
            $table->id()->from(10000);
            $table->string('name', 30);
            $table->enum('gender', ['male', 'female', 'unknown'])->default('unknown');
            $table->date('birthdate')->nullable();
            $table->date('arrival_date')->nullable();
            $table->enum('neutered', ['yes', 'no', 'unknown'])->default('unknown');
            $table->string('description', 200)->nullable();
            $table->timestamps();
        });

        Schema::create('animal_locations', function (Blueprint $table) {
            $table->foreignIdFor(Area::class, 'location')->constrained('areas')->onDelete('cascade');
            $table->foreignIdFor(Cat::class, 'animal_id')->constrained('cats')->onDelete('cascade');
            $table->primary(['location', 'animal_id']);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('animal_locations');
        Schema::dropIfExists('cats');
        Schema::dropIfExists('areas');
    }
};
