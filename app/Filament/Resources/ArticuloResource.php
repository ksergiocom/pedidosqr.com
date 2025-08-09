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

    public static function getNavigationBadge(): ?string
    {
        return static::getModel()::count();
    }

    protected static ?string $navigationGroup = 'Recursos';


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

                TextInput::make('precio')
                    ->label('Precio')
                    ->required()
                    ->numeric()
                    ->rule('decimal:0,2'),

                Select::make('user_id')
                    ->relationship('user', 'email')
                    ->required(),

                // FileUpload::make('image_url')
                //     ->label('Imagen')
                //     ->image()
                //     ->disk('public')
                //     ->directory('articulos')
                //     ->maxSize(2048)
                //     ->nullable()
                //     ->imagePreviewHeight('200')
                //     ->hint('Tamaño máximo 2MB')
                //     ->saveUploadedFileUsing(function ($file, $record, $set) {
                //         $path = $file->store('articulos', 'public');
                //         // Devuelvo la URL pública para que se guarde en BD
                //         return '/storage/' . $path;
                //     }),


                Textarea::make('descripcion')
                    ->label('Descripción')
                    ->nullable()
                    ->maxLength(1200),

            ]);
    }

    public static function table(Table $table): Table
    {
        return $table
            ->columns([
                TextColumn::make('nombre')
                    ->searchable()
                    ->sortable(),
                TextColumn::make('precio')
                    ->searchable()
                    ->sortable(),
                TextColumn::make('user.email')
                    ->searchable()
                    ->sortable(),
                TextColumn::make('image_url')
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
