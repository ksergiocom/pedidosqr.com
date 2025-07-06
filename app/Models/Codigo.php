<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Codigo extends Model
{
    use HasUuids;

    protected $table = "codigos";
    protected $fillable = [
        "nombre",
        "user_id",
    ];

    // --- Relaciones -------------------------------------
    
    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class,"user_id");
    }

    public function pedidos(): HasMany
    {
        return $this->hasMany(Pedido::class,"codigo_id");
    }
}
