<?php

namespace App\Http\Controllers;

use Illuminate\Foundation\Testing\HttpException;
use Illuminate\Http\Exceptions\HttpResponseException;
use Illuminate\Http\Request;
use App\Entry;
use App\Folder;
use App\User;

class EntryController extends Controller
{
    public function update($id, Request $request) {
        $entry = Entry::find($id);
        if (!$entry || $entry->owner_id != $request->user()->id) {
            return response()->json(['message' => 'File not found.'], 404);
        }

        $this->validateUpdate($entry, $request);
        $this->performUpdate($entry, $request);
    }

    public function delete($id, Request $request) {
        // 1. Check that id is not null. We don't want to allow the
        // user to remove his root folder.
        Entry::where(['id' => $id, 'owner_id' => $request->user()->id])->delete();
    }

    private function validateUpdate($entry, $request) {
        // Name validation.
        if ($request->has('name') && Entry::repeated($entry->id, $entry->parent_id, $request->input('name'))) {
            return response()->json(['message' => 'File already exists.'], 400);
        }

        // Parent validation.
        if ($request->has('parent_id') && $entry->parent_id != $request->input('parent_id')) {
            if ($entry->id == $request->input('parent_id')) {
                throw new HttpResponseException(response()->json(['message' => 'New parent is not valid.'], 404));
            }

            $newParent = $request->input('parent_id');

            $newParentEntry = Entry::find($newParent);
            if (!$newParentEntry || $newParentEntry->owner_id != $request->user()->id) {
                throw new HttpResponseException(response()->json(['message' => 'New parent is not valid.'], 404));
            }
        }
    }

    private function performUpdate($entry, $request) {
        if ($request->has('parent_id')) {
            $entry->parent_id = $request->input('parent_id');

            // We must check if there is a file with the same name in the target
            // folder. If so, we will automatically change the name of the copied
            // file.
            /*$maxAttempts = 100;
            $success = false;
            ////////////// REHACER ESTO:
            $name = $entry->name;
            for ($i = 0; $i < $maxAttempts && !$success; $i++) {
                if (Entry::where(['parent_id' => $entry->parent_id, 'name' => $entry->name])->exists()) {
                    $entry->name = '(' . ($i + 1) . ') ' . $name;
                }
                else {
                    $success = true;
                }
            }
            if (!$success) { $entry->name = str_random(16); }*/
        }

        $entry->fill($request->all());
        $entry->update();
    }

    public function createFolder(Request $request) {
        $entry = new Entry();
        $entry->name = $request->input('name');
        $entry->parent_id = $request->input('parent');
        $entry->owner_id = $request->user()->id;

        // 1. Check that the parent is not null.
        if ($entry->parent_id == null) {
            return response()->json(['message' => 'You must set a parent for the file.'], 400);
        }

        // 2. Check that the user owns the parent.
        if (!Entry::where(['id' => $entry->parent_id, 'owner_id' => $request->user()->id])->exists()) {
            return response()->json(['message' => 'The parent folder does not exist.'], 404);
        }

        // 2. Check that the name of the entry is not repeated in the folder.
        if (Entry::where(['parent_id' => $entry->parent_id, 'name' => $entry->name])->exists()) {
            return response()->json(['message' => 'The file already exists.'], 400);
        }

        $entry->save();

        $entry->folder()->create([
            'inbox' => $request->input('inbox', false),
            'inbox_name' => $request->input('inbox_name', null)
        ]);
    }

    public function updateFolder($id, Request $request) {
        $entry = Entry::find($id);
        $folder = $entry ? $entry->folder()->first() : null;
        if (!$entry || !$folder || $entry->owner_id != $request->user()->id) {
            return response()->json(['message' => 'File not found.'], 404);
        }

        $this->validateUpdate($entry, $request);

        // Inbox validation.
        if ($request->has('folder.inbox') && $request->input('folder.inbox') == true) { // We want the folder to be an inbox.
            // Name is mandatory.
            if (!$request->has('folder.inbox_name') || strlen($request->input('folder.inbox_name')) < 4) { // You have to set a name.
                return response()->json(['message' => 'You must set a name for the inbox with more than 3 characters.'], 400);
            }

            // The name must be unique.
            if (Folder::where('inbox_name', $request->input('folder.inbox_name'))->where('entry_id', '!=', $id)->exists()) {
                return response()->json(['message' => 'Name already in use.'], 400);
            }

            // Password is mandatory.
            $passwordMustBeSet = empty($folder->inbox_password);
            $validPassword = $request->has('folder.inbox_password') && strlen($request->input('folder.inbox_password')) > 4;
            $wantToSetPassword = $request->has('folder.inbox_password');

            if (($passwordMustBeSet || $wantToSetPassword) && !$validPassword) {
                return response()->json(['message' => 'You must set a password for the inbox with more than 4 characters.'], 400);
            }

            $folder->inbox_name = $request->input('folder.inbox_name');
            if ($passwordMustBeSet || $wantToSetPassword) {
                $folder->inbox_password = Hash::make($request->input('folder.inbox_password'));
            }
        }

        if ($request->has('folder.inbox') && $request->input('folder.inbox') == false && $folder->inbox == true) {
            $folder->inbox_name = $folder->inbox_password = null;
        }

        // UPDATE

        $this->performUpdate($entry, $request);
        if ($request->has('folder.inbox')) {
            $folder->inbox = $request->input('folder.inbox');
        }

        $folder->update();
    }

    public function updateSource($id, Request $request) {
        $entry = Entry::find($id);
        $source = $entry ? $entry->source()->first() : null;
        if (!$entry || !$source || $entry->owner_id != $request->user()->id) {
            return response()->json(['message' => 'File not found.'], 404);
        }

        $this->validateUpdate($entry, $request);

        $this->performUpdate($entry, $request);
        $entry->source()->getResults()->fill([
            'content' => $request->input('content', '')
        ])->save();
    }
}
