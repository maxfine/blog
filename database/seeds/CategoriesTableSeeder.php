<?php

use Illuminate\Database\Seeder;
use App\Models\Category;

class CategoriesTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $categories = Category::all();
        foreach($categories as $category){
            $category->posts()->forceDelete();
            $category->posts()->withTrashed()->forceDelete();
            $category->delete();
        }
//        \DB::table('categories')->delete();

        factory(Category::class, 8)->create();
    }
}
