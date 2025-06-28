<?php

namespace App\Models;

use Illuminate\Broadcasting\PrivateChannel;
use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\BroadcastsEvents;
use Illuminate\Support\Facades\Log;

class Pedido extends Model
{
    use HasUuids;

    protected $table = 'pedidos';
    protected $fillable = [
        'mesa_id',
    ];

    protected static function booted()
    {
        static::created(function ($pedido) {
            Log::info("Pedido creado: Emisión de evento broadcast para Pedido ID {$pedido->id}");
        });
    }

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
