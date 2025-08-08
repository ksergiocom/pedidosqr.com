<?php

namespace App\Filament\Resources;

use App\Filament\Resources\PedidoResource\Pages;
use App\Models\Articulo;
use App\Models\Codigo;
use App\Models\Pedido;
use App\Models\PedidoDetalle;
use Filament\Forms;
use Filament\Forms\Form;
use Filament\Forms\Components\Repeater;
use Filament\Forms\Components\Select;
use Filament\Forms\Components\TextInput;
use Filament\Resources\Resource;
use Filament\Tables;
use Filament\Tables\Filters\SelectFilter;
use Filament\Tables\Table;
use Filament\Tables\Columns\TextColumn;

class PedidoResource extends Resource
{
    protected static ?string $model = Pedido::class;

    protected static ?string $navigationIcon = 'heroicon-o-rectangle-stack';
    protected static ?string $navigationLabel = 'Pedidos';
    protected static ?string $modelLabel = 'Pedido';

    public static function form(Form $form): Form
    {
        return $form
            ->schema([
                Select::make('codigo_id')
                    ->label('Código')
                    ->relationship('codigo', 'nombre')
                    ->searchable()
                    ->required(),

                TextInput::make('estado')
                    ->label('Estado')
                    ->required()
                    ->maxLength(255),

                Repeater::make('detalles')
                    ->label('Detalles del Pedido')
                    ->itemLabel(fn (array $state): string => 'Detalle #' . ($state['id'] ?? 'Nuevo'))
                    ->relationship()
                    ->schema([
                        Select::make('articulo_id')
                            ->label('Artículo')
                            ->relationship('articulo', 'nombre')
                            ->searchable()
                            ->required(),

                        TextInput::make('cantidad')
                            ->label('Cantidad')
                            ->numeric()
                            ->minValue(1)
                            ->required(),
                    ])
                    ->defaultItems(1)
                    ->collapsible()
                    ->reorderable()
                    ->columns(2)
                    ->required(),
            ]);
    }

    public static function table(Table $table): Table
    {
        return $table
            ->columns([
                TextColumn::make('id')
                    ->label('ID')
                    ->searchable()
                    ->toggleable()
                    ->sortable(),

                TextColumn::make('codigo.nombre')
                    ->label('Código')
                    ->sortable()
                    ->searchable(),

                TextColumn::make('estado')
                    ->label('Estado')
                    ->formatStateUsing(fn(string $state): string => ucfirst($state))
                    ->badge()
                    ->color(fn(string $state): string => match (strtolower($state)) {
                        'pendiente' => 'primary',
                        'completado' => 'gray',
                    })
                    ->sortable()
                    ->searchable(),

                TextColumn::make('total')
                    ->label('Total')
                    ->money('EUR') // Usa esto si quieres formato monetario
                    ->sortable(),

                TextColumn::make('created_at')
                    ->label('Fecha de creación')
                    ->dateTime()
                    ->sortable(),
            ])
            ->filters([
                SelectFilter::make('estado')
                    ->label('Filtrar por Estado')
                    ->options([
                        'pendiente' => 'Pendiente',
                        'cancelado' => 'Cancelado',
                    ])
                    ->attribute('estado'),
            ])
            ->actions([
                Tables\Actions\ViewAction::make(), // Opcional
                Tables\Actions\EditAction::make(),
                Tables\Actions\DeleteAction::make(),
            ])
            ->bulkActions([
                Tables\Actions\BulkActionGroup::make([
                    Tables\Actions\DeleteBulkAction::make(),
                ]),
            ]);
    }

    public static function getRelations(): array
    {
        return [
            // Aquí podrías agregar RelationManagers si los defines (opcional)
        ];
    }

    public static function getPages(): array
    {
        return [
            'index' => Pages\ListPedidos::route('/'),
            'create' => Pages\CreatePedido::route('/create'),
            'edit' => Pages\EditPedido::route('/{record}/edit'),
        ];
    }
}
