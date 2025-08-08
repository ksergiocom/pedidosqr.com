<?php

namespace App\Filament\Resources;

use App\Filament\Resources\CodigoResource\Pages;
use App\Filament\Resources\CodigoResource\RelationManagers;
use App\Models\Codigo;
use Filament\Forms;
use Filament\Forms\Components\Select;
use Filament\Forms\Components\TextInput;
use Filament\Forms\Form;
use Filament\Resources\Resource;
use Filament\Tables;
use Filament\Tables\Columns\TextColumn;
use Filament\Tables\Table;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\SoftDeletingScope;
use Illuminate\Validation\Rule;

class CodigoResource extends Resource
{
    protected static ?string $model = Codigo::class;

    protected static ?string $navigationIcon = 'heroicon-o-rectangle-stack';

    public static function form(Form $form): Form
    {
        return $form
            ->schema([
                TextInput::make('nombre')
                    ->label('Nombre')
                    ->maxLength(20)
                    ->unique(
                        table: 'codigos',
                        column: 'nombre',
                        ignoreRecord: true,
                        modifyRuleUsing: fn (Rule $rule) => $rule->where(fn ($query) => $query->where('user_id', auth()->id())),
                    ),
                Select::make('user_id')
                    ->relationship('user', 'email')
                    ->required(),
            ]);
    }

    public static function table(Table $table): Table
    {
        return $table
            ->columns([
                TextColumn::make('nombre')
                    ->searchable()
                    ->sortable(),
                TextColumn::make('user.email')
                    ->searchable()
                    ->sortable()
            ])
            ->filters([
                //
            ])
            ->actions([
                Tables\Actions\EditAction::make(),
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
            //
        ];
    }

    public static function getPages(): array
    {
        return [
            'index' => Pages\ListCodigos::route('/'),
            'create' => Pages\CreateCodigo::route('/create'),
            'edit' => Pages\EditCodigo::route('/{record}/edit'),
        ];
    }
}
