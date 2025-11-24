<?php

use App\Models\Area;
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
        Schema::table('areas', function (Blueprint $table) {
            $table->foreignIdFor(Area::class)->nullable()->after('name');
        });

        Schema::table('cats', function (Blueprint $table) {
            $table->renameColumn('birthdate', 'birth_date');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('areas', function (Blueprint $table) {
            // Remove the foreign key & column added
            $table->dropConstrainedForeignId('area_id'); // or dropForeignIdFor(Area::class) in newer Laravel
        });

        Schema::table('cats', function (Blueprint $table) {
            // Revert the column rename
            $table->renameColumn('birth_date', 'birthdate');
        });
    }
};
