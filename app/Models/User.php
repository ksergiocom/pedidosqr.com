<?php

namespace App\Models;

// use Illuminate\Contracts\Auth\MustVerifyEmail;
use App\Notifications\CustomResetPassword;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\HasManyThrough;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Illuminate\Database\Eloquent\Concerns\HasUuids;

use Filament\Models\Contracts\FilamentUser;
use Filament\Panel;

use App\Models\Mesa;

class User extends Authenticatable implements FilamentUser
{
    /** @use HasFactory<\Database\Factories\UserFactory> */
    use HasFactory, Notifiable, HasUuids;

    /**
     * The attributes that are mass assignable.
     *
     * @var list<string>
     */
    protected $fillable = [
        // 'name',
        'email',
        'password',
    ];

    /**
     * The attributes that should be hidden for serialization.
     *
     * @var list<string>
     */
    protected $hidden = [
        'password',
        'remember_token',
    ];

    /**
     * Get the attributes that should be cast.
     *
     * @return array<string, string>
     */
    protected function casts(): array
    {
        return [
            'email_verified_at' => 'datetime',
            'password' => 'hashed',
        ];
    }

    /**
     * Notificación personalizada para recuperar contraseña.
     * @param mixed $token
     * @return void
     */
    public function sendPasswordResetNotification($token)
    {
        $this->notify(new CustomResetPassword($token));
    }

    /**
     * Mis usuarios no tienen el campo 'name' en vez de eso este
     * atributo devolverá directamente el mail.
     * @return string
     */
    public function getNameAttribute(): string
    {
        return $this->email;
    }

    /**
     * Control de acceso a filament
     */
    public function canAccessPanel(Panel $panel): bool
    {
        // return str_ends_with($this->email, '@yourdomain.com') && $this->hasVerifiedEmail();

        return $this->email === 'sergio@ksergio.com';
    }

    // --- Relaciones -------------------------------------

    public function codigos(): HasMany
    {
        return $this->hasMany(Codigo::class, 'user_id');
    }

    public function articulos(): HasMany
    {
        return $this->hasMany(Articulo::class,'user_id');
    }

    public function pedidos(): HasManyThrough
    {
        return $this->hasManyThrough(Pedido::class, Codigo::class, 'user_id', 'codigo_id');
    }
}
