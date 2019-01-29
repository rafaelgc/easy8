<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Folder extends Model
{
    public $primaryKey = 'entry_id';
    protected $fillable = ['inbox', 'inbox_name'];
    public $timestamps = false;

    public function entry() {
        return $this->belongsTo('App\Entry');
    }
}
