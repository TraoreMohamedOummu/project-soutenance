<?php

use App\Models\Property;

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
        Schema::create('demande_biens', function (Blueprint $table) {
            $table->id();
            $table->text("desc");
            $table->unsignedBigInteger('client_id');
            $table->foreignIdFor(Property::class)->nullable()->onDelete('cascade');
            $table->foreign('client_id')->references('id')->on('clients')->onDelete('cascade');
           

            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('demande_biens');
    }
};
