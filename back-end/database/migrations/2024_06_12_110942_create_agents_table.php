<?php

use App\Models\Agence;
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
        Schema::create('agents', function (Blueprint $table) {
            $table->id();
            $table->string("nom")->nullable();
            $table->string("prenom")->nullable();
            $table->string("email");
            $table->string("telephone")->nullable();
            $table->string("adresse")->nullable();
            $table->string("password")->nullable();
            $table->date("date_embouche")->nullable();
            $table->decimal("commission_taux")->nullable();
            $table->string("ville")->nullable();
            $table->string("code_postal")->nullable();
            $table->string("pays")->nullable();
            $table->text("notes")->nullable();

            $table->foreignIdFor(Agence::class)->nullable()->onDelete('cascade');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('agents');
    }
};
