<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Entry extends Model
{
    protected $fillable = ['parent_id', 'owner_id', 'name'];
    public function folder() {
        return $this->hasOne('App\Folder');
    }

    public function source() {
        return $this->hasOne('App\Source');
    }
}
