<?php

use App\Models\Agence;
use App\Models\City;
use App\Models\TypeProperty;
use App\Models\User;
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
        Schema::create('properties', function (Blueprint $table) {
            $table->id();
            $table->string("name")->unique();
            $table->integer("price")->nullable();
            $table->string("desc")->nullable();
            $table->string("nombre_piece")->nullable();
            $table->string("nombre_chambre")->nullable();
            $table->string("quartier")->nullable();
            $table->boolean("is_salle_bain")->nullable();
            $table->boolean("is_eau")->nullable();
            $table->boolean("is_electricite")->nullable();
            $table->boolean("is_salle_gym")->nullable();


            $table->foreignIdFor(User::class)->nullable()->onDelete('cascade');

            $table->foreignIdFor(City::class)->nullable()->onDelete('cascade');

            $table->foreignIdFor(TypeProperty::class)->nullable()->onDelete('cascade');
            $table->foreignIdFor(Agence::class)->nullable()->onDelete('cascade');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('properties');
    }
};
