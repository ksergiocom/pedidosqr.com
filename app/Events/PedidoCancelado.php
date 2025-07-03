<?php

namespace App\Events;

use Illuminate\Broadcasting\PrivateChannel;
use Illuminate\Contracts\Broadcasting\ShouldBroadcast;
use Illuminate\Queue\SerializesModels;

class PedidoCancelado implements ShouldBroadcast
{
    use SerializesModels;

    public string $pedidoId;
    public string $userId;

    public function __construct(string $pedidoId, string $userId)
    {
        $this->pedidoId = $pedidoId;
        $this->userId   = $userId;
    }

    public function broadcastOn(): array
    {
        return [
            new PrivateChannel('user.' . $this->userId),
        ];
    }

    public function broadcastWith(): array
    {
        return [
            'pedidoId' => $this->pedidoId,
        ];
    }

    public function broadcastAs(): string
    {
        return 'PedidoDeleted';
    }
}
