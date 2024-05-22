<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;
use PhpParser\Node\Expr\FuncCall;

class Property extends Model
{
    use HasFactory;

   

    public function user() : BelongsTo {
        return $this->belongsTo(User::class, 'user_id');
    }

    public function city() : BelongsTo {
        return $this->belongsTo(City::class, 'city_id');
    }

    public function agence() : BelongsTo {
        return $this->belongsTo(Agence::class, 'agence_id');
    }

    public function type_property() : BelongsTo {
        return $this->belongsTo(TypeProperty::class, 'type_property_id');
    }

    public function images() : HasMany {
        return $this->hasMany(Image::class);
    }


    

}
