<?php

namespace App\Models;


use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Support\Carbon;

class Movie extends Model
{
/**
     * The accessors to append to the model's array form.
     *
     * @var array
     */
    protected $appends = ['ensiIlta'];

    /*
     *
     */
    protected $fillable = [
        'googleID', 'nimi', 'wiki', 'imdb', 'kavi', 'img', 'paiva','kuukausi','vuosi'
    ];

    public function actors(): HasMany
    {
        return $this->hasMany(Actor::class,'googleID', 'googleID');
    }

    public function director(): HasMany
    {
        return $this->hasMany(Director::class,'googleID', 'googleID');
    }

    public function distributor(): HasMany
    {
        return $this->hasMany(Distributor::class,'googleID', 'googleID');
    }

    public function writer(): HasMany
    {
        return $this->hasMany(Writer::class,'googleID', 'googleID');
    }

    public function genres(): HasMany
    {
        return $this->hasMany(Genre::class,'googleID', 'googleID');
    }

    public function reviews(): HasMany
    {
        return $this->hasMany(Review::class,'googleID', 'googleID');
    }

    /**
     * Palauttaa elokuvan ensi-iltaa vastaavan aikaleiman.
     *
     * @return Date
     */
    public function getEnsiIltaAttribute()
    {

        $dt = Carbon::now();

        $dt->year = $this->attributes['vuosi'];
        $dt->month = $this->attributes['kuukausi'];
        $dt->day = $this->attributes['paiva'];
        $dt->hour = 18;
        $dt->minute = 00;
        $dt->second = 00;

        return $dt->toDateTimeString();
    }
}
