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
        'codigo_id',
        'estado',
    ];

    protected $with = ['detalles.articulo'];
    protected $appends = ['total'];

    /**
     * Suma del importe total del pedido
     */
    public function getTotalAttribute()
    {
        $total = $this->detalles->sum(function ($detalle) {
            return $detalle->cantidad * $detalle->articulo->precio;
        });

        return round($total, 2);
    }

    // --- Relaciones -------------------------------------

    public function codigo(): BelongsTo
    {
        return $this->belongsTo(Codigo::class);
    }

    public function detalles(): HasMany
    {
        return $this->hasMany(PedidoDetalle::class, 'pedido_id');
    }

}
