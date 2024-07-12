<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Achat extends Model
{
    use HasFactory;
    protected $fillable = [
        "price_total", "desc", "email", "telephone", "property_id", "clients_id"
    ];

    public function property(): BelongsTo {
        return $this->belongsTo(Property::class, 'property_id');
    }

}
