<?php

namespace App\Http\Controllers;

use App\Models\Author;
use App\Models\Book;
use Illuminate\Http\Request;

class BookController extends Controller
{
    public function index() {
        $books = Book::with('chapters')->get();
        return response()->json($books);
    }
    public function show(Book $book)
    {
        $chapters = $book->chapters()->select('title', 'content')->get();
    
        return response()->json([
            'id' => $book->id,
            'title' => $book->title,
            'cover_image' => $book->cover_image,
            'description' => $book->description,
            'content' => $book->content,
            'chapters' => $chapters,
        ]);
    }
    
    public function store(Request $request) {
        $fields = $request->validate([
            'title' => 'required| string',
            'description' => 'required| string',
            'cover_image' => 'required| string',
            'author_id' => 'required| int',
        ]);
        $book =Book::create($fields);
        
        return response()->json([
            'status' => 'OK',
            'message' => 'A new book is added with an id#:' . $book->id
        ]);
    }    
    public function update(Request $request, Book $book) {
        
        $fields = $request->validate ([ 
            'title' => 'string',
            'description' => 'string',
            'cover_image' => 'string',
            'author_id' => 'int',
        ]);

        $book->update($fields);

        return response()->json([
            'status' => 'OK',
            'message' =>'Book with ID#' . $book->id . ' has been updated,'
        ]);
    }
    public function destroy(Book $book) {
        $details = 'Title: ' . $book->title;
        $book->delete();

        return response()->json([
            'status'=> 'OK',
            'message' =>'The Book with ' . $details . ' has been deleted.'
        ]);
    }

    public function read(Book $book)
    {
        return response()->json(['book' => $book]);
    }

    
    
}
