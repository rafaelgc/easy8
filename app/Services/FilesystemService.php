<?php
namespace App\Services;
/**
 * Created by PhpStorm.
 * User: rafa
 * Date: 6/1/19
 * Time: 6:09 PM
 */
use App\Entry;

class FilesystemService {
    public function nameInUse($name, $containerEntryId, $distinctEntryId = null) {
        $query = Entry::where(['parent_id' => $containerEntryId, 'name' => $name]);

        if ($distinctEntryId) {
            $query->where('id', '!=', $distinctEntryId);
        }

        return $query->exists();
    }
}