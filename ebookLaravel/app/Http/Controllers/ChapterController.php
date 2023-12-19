<?php

namespace App\Http\Controllers;

use App\Models\Chapter;
use Illuminate\Http\Request;

class ChapterController extends Controller
{
    public function index() {

        $chapters = Chapter::orderBy('id')
                ->orderBy('id')->get();

        return response()->json($chapters);
    }
    public function store(Request $request) {
        $fields = $request->validate([
            'book_id' => 'required| int',
            'title' => 'required| string',
            'content' => 'required| string',
        ]);
        $chapter =Chapter::create($fields);
        
        return response()->json([
            'status' => 'OK',
            'message' => 'A new Chapter is added with an id#:' . $chapter->id
        ]);
    } 
    public function update(Request $request, Chapter $chapter) {
        
        $fields = $request->validate ([ 
            'title' => 'string',
            'content' => 'string',
            'book_id' => 'int'
        ]);

        $chapter->update($fields);

        return response()->json([
            'status' => 'OK',
            'message' =>'Chapter with ID#' . $chapter->id . ' has been updated,'
        ]);
    }
    public function destroy(Chapter $chapter) {
        $details = 'Title: ' . $chapter->title;
        $chapter->delete();

        return response()->json([
            'status'=> 'OK',
            'message' =>'The Chapter with ' . $details . ' has been deleted.'
        ]);
    }
}
