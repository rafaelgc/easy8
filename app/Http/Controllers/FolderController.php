<?php

namespace App\Http\Controllers;

use App\Entry;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class FolderController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(Request $request)
    {
        return Entry::where([
            'owner_id' => $request->user()->id,
            'parent_id' => $request->get('parent', null)
        ])->whereExists(function ($query) {
            $query->select('id')->from('folders')->where('entries.id', '=', DB::raw('entry_id'));
        })->with(['folder'])->get();
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $entry = new Entry();
        $entry->name = $request->input('name');
        $entry->parent_id = $request->input('parent');
        $entry->owner_id = $request->user()->id;

        ///// TODO MOVER ESTA VALIDACION A OTRO LUGAR.
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

    /**
     * Display the specified resource.
     *
     * @param  \App\Entry  $entry
     * @return \Illuminate\Http\Response
     */
    public function show(Entry $entry)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Entry  $entry
     * @return \Illuminate\Http\Response
     */
    public function edit(Entry $entry)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Entry  $entry
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Entry $entry)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Entry  $entry
     * @return \Illuminate\Http\Response
     */
    public function destroy(Entry $entry)
    {
        $entry->delete();
    }
}
