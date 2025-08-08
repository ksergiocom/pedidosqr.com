<?php

namespace App\Filament\Resources;

use App\Filament\Resources\ArticuloResource\Pages;
use App\Filament\Resources\ArticuloResource\RelationManagers;
use App\Models\Articulo;
use Filament\Forms;
use Filament\Forms\Components\FileUpload;
use Filament\Forms\Components\Select;
use Filament\Forms\Components\Textarea;
use Filament\Forms\Components\TextInput;
use Filament\Forms\Form;
use Filament\Resources\Resource;
use Filament\Tables;
use Filament\Tables\Columns\ImageColumn;
use Filament\Tables\Columns\TextColumn;
use Filament\Tables\Table;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\SoftDeletingScope;
use Illuminate\Validation\Rules\Unique;

class ArticuloResource extends Resource
{
    protected static ?string $model = Articulo::class;

    protected static ?string $navigationIcon = 'heroicon-o-rectangle-stack';

    public static function form(Form $form): Form
    {
        return $form
            ->schema([
                TextInput::make('nombre')
                    ->label('Nombre')
                    ->required()
                    ->unique(
                        table: 'articulos',
                        column: 'nombre',
                        ignoreRecord: true,
                        modifyRuleUsing: fn(Unique $rule) => $rule->where(fn($query) => $query->where('user_id', auth()->id())),
                    )
                    ->maxLength(255),

                Textarea::make('descripcion')
                    ->label('Descripción')
                    ->nullable()
                    ->maxLength(1200)
                    ->columnSpanFull(),

                TextInput::make('precio')
                    ->label('Precio')
                    ->required()
                    ->numeric()
                    ->rule('decimal:0,2'),

                FileUpload::make('image_url')
                    ->label('Imagen')
                    ->image()
                    ->directory('articulos') // Carpeta dentro de storage/app/public
                    ->maxSize(2048) // 2 MB en kilobytes
                    ->nullable()
                    ->imagePreviewHeight('200')
                    ->hint('Tamaño máximo 2MB'),

                Select::make('user_id')
                    ->relationship('user', 'email')
                    ->required(),
            ]);
    }

    public static function table(Table $table): Table
    {
        return $table
            ->columns([
                ImageColumn::make('image_url')
                    ->label('Imagen')
                    ->defaultImageUrl(url('/favicon.svg'))
                    ->circular() // O puedes usar ->square() si prefieres
                    ->size(40) // Tamaño de la miniatura
                    ->toggleable(), // Ocultable desde la tabla,
                TextColumn::make('nombre')
                    ->searchable()
                    ->sortable(),
                TextColumn::make('precio')
                    ->searchable()
                    ->sortable(),
                TextColumn::make('user.email')
                    ->searchable()
                    ->sortable(),
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
            'index' => Pages\ListArticulos::route('/'),
            'create' => Pages\CreateArticulo::route('/create'),
            'edit' => Pages\EditArticulo::route('/{record}/edit'),
        ];
    }
}
