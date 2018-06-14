<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Entry extends Model
{
    public function folder() {
        return $this->hasOne('App\Folder');
    }

    public function source() {
        return $this->hasOne('App\Source');
    }
}
