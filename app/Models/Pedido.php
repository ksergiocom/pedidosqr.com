<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Pedido extends Model
{
    use HasUuids;

    protected $table = 'pedidos';
    protected $fillable = [
        'mesa_id',
    ];

    // --- Relaciones -------------------------------------

    public function mesa(): BelongsTo
    {
        return $this->belongsTo(Mesa::class);
    }

    public function detalles(): HasMany
    {
        return $this->hasMany(PedidoDetalle::class, 'pedido_id');
    }

}
