<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Articulo extends Model
{
    use HasUuids;

    protected $table = 'articulos';
    protected $fillable = [
        'nombre',
        'descripcion',
        'precio',
        'user_id',
        'image_url', 
    ];

    // --- Accesor para precio con dos decimales ---
    public function getPrecioAttribute($value)
    {
        return number_format($value, 2, '.', '');
    }

    // --- Relaciones -------------------------------------

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class, 'user_id');
    }

    public function pedidosDetalles(): HasMany
    {
        return $this->hasMany(PedidoDetalle::class,'articulo_id');
    }

}
