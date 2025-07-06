<?php

namespace App\Events;

use App\Models\Pedido;
use Illuminate\Broadcasting\PrivateChannel;
use Illuminate\Contracts\Broadcasting\ShouldBroadcast;
use Illuminate\Queue\SerializesModels;

class PedidoActualizado implements ShouldBroadcast
{
    use SerializesModels;

    public Pedido $pedido;

    public function __construct(Pedido $pedido)
    {
        // Carga relaciones si las necesitas
        $this->pedido = $pedido->load(['codigo', 'detalles.articulo']);
    }

    public function broadcastOn(): array
    {
        return [
            new PrivateChannel('user.' . $this->pedido->codigo->user_id),
        ];
    }

    public function broadcastWith(): array
    {
        return [
            'model' => $this->pedido->toArray(),
        ];
    }

    public function broadcastAs(): string
    {
        return 'PedidoUpdated';
    }
}
