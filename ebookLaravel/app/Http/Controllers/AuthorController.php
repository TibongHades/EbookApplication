<?php

namespace App\Http\Controllers;

use App\Models\Author;
use Illuminate\Http\Request;

class AuthorController extends Controller
{
    public function index() {

        $authors = Author::orderBy('id')
                ->orderBy('id')->get();

        return response()->json($authors);
    }
    public function store(Request $request) {
        $fields = $request->validate([
            'name' => 'required| string',
            'bio' => 'required| string',
        ]);
        $author =Author::create($fields);
        
        return response()->json([
            'status' => 'OK',
            'message' => 'A new author is added with an id#:' . $author->id
        ]);
    }    
    public function update(Request $request, Author $author) {
        
        $fields = $request->validate ([ 
            'name' => 'string',
            'bio' => 'string',
        ]);

        $author->update($fields);

        return response()->json([
            'status' => 'OK',
            'message' =>'Author with ID#' . $author->id . ' has been updated,'
        ]);
    }
    public function destroy(Author $author) {
        $author->delete();

        return response()->json([
            'status'=> 'OK',
            'message' =>'The Author has been deleted.'
        ]);
    }
    
}
