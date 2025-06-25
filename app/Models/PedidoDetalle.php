<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class PedidoDetalle extends Model
{
    use HasUuids;

    protected $table = "pedidos_detalles";
    protected $fillable = [
    'pedido_id',
    'articulo_id',
    'cantidad',
    ];

    public function pedido(): BelongsTo
    {
        return $this->belongsTo(Pedido::class,'pedido_id');
    }

    public function articulos(): BelongsTo
    {
        return $this->belongsTo(Articulo::class,'articulo_id');
    }
}
