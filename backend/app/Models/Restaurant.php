<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Restaurant extends Model {
    use HasFactory;

    protected $fillable = ['id', 'name', 'location', 'cuisine']; // Allow mass assignment of these fields

    public function orders(): HasMany {
        return $this->hasMany(Order::class); // Define the one-to-many relationship with orders
    }
}