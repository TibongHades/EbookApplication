<?php

use App\Http\Controllers\AuthorController;
use App\Http\Controllers\BookController;
use App\Http\Controllers\ChapterController;
use App\Http\Controllers\UserController;
use App\Models\Author;
use App\Models\Book;
use App\Models\Chapter;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});
Route::get('/book', [BookController::class, 'index']);
Route::get('/book/{book}', [BookController::class, 'show']);
// Route::get('/book/{book}',function(Book $book){
//     return response()->json($book);
// });
Route::post('/book', [BookController::class, 'store']);
Route::patch('/book/{book}', [BookController::class, 'update']);
Route::delete('/book/{book}', [BookController::class, 'destroy']);

Route::get('/author', [AuthorController::class, 'index']);
Route::post('/author', [AuthorController::class, 'store']);
Route::get('/author/{author}',function(Author $author){
    return response()->json($author);
});
Route::patch('/author/{author}', [AuthorController::class, 'update']);
Route::delete('/author/{author}', [AuthorController::class, 'destroy']);


Route::get('/chapter', [ChapterController::class, 'index']);
Route::post('/chapter', [ChapterController::class, 'store']);
Route::get('/chapter/{chapter}',function(Chapter $chapter){
    return response()->json($chapter);
});
Route::patch('/chapter/{chapter}', [ChapterController::class, 'update']);
Route::delete('/chapter/{chapter}', [ChapterController::class, 'destroy']);

