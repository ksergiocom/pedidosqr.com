<?php

namespace App\Events;

use App\Models\Pedido;
use Illuminate\Broadcasting\PrivateChannel;
use Illuminate\Contracts\Broadcasting\ShouldBroadcast;
use Illuminate\Queue\SerializesModels;

class PedidoCreado implements ShouldBroadcast
{
    use SerializesModels;

    public Pedido $pedido;

    public function __construct(Pedido $pedido)
    {
        $this->pedido = $pedido;
    }

    public function broadcastOn(): array
    {
        return [
            new PrivateChannel('user.' . $this->pedido->mesa->user_id),
        ];
    }

    public function broadcastWith(): array
    {
        return [
            'model' => $this->pedido->toArray()
        ];
    }

    public function broadcastAs(): string
    {
        return 'PedidoCreated';
    }
}
