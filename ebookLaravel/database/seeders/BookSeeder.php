<?php

namespace Database\Seeders;

use App\Models\Book;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class BookSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        Book::factory()->create([
            'id'=>1,
            'title' => 'My Wife is a Beautiful CEO',
            'description' => 'This story takes place in Modern China',
            'cover_image' => 'https://novelbin.me/media/novel/my-wife-is-a-beautiful-ceo.jpg',
            // 'author_id'=>fake()->randomElement(Author::pluck('id')),
            'author_id'=>1,
        ]);
        Book::factory(30)->create();
    }
}
