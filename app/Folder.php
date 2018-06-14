<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Folder extends Model
{
    public $primaryKey = 'entry_id';
    protected $guarded = [''];
    public $timestamps = false;

    public function entry() {
        return $this->belongsTo('App\Entry');
    }
}
