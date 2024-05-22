<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;
use App\Models\Property;
use App\Models\Clients;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('contructions', function (Blueprint $table) {
            $table->id();
            $table->date("date_debut");
            $table->date("date_fin");
            $table->decimal("cout_total");
            $table->foreignIdFor(Property::class)->nullable()->onDelete('cascade');
            $table->foreignIdFor(Clients::class)->nullable()->onDelete('cascade');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('contructions');
    }
};
