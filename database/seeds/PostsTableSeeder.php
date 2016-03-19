<?php

use Illuminate\Database\Seeder;
use App\Models\Post;

class PostsTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        //Post::truncate();
        \DB::table('posts')->delete();

        /**
        $faker = Faker\Factory::create('zh_CN');
        $content = $faker->paragraphs(mt_rand(3, 6));
        \DB::table('posts')->insert([
            [
                'id' => 1,
                'category_id' => 1,
                'title' => $faker->sentence(mt_rand(3, 10)),
                'keywords' => join(',', $faker->words(mt_rand(1, 4))),
                'slug' => $faker->slug,
                'image' => $faker->imageUlr(680, 300),
                'description' => $faker->realText($faker->numberBetween(10, 20)),
                'content_raw' => join("\n\n", $content),
                'content_html' => join("<br>", $content),
                'list_order' => 100,
                'is_draft' => 0,
                'layout' => 'blog.layouts.show',
                'published_at' => $faker->dateTimeBetween('-1 month', '+3 days')->format('Y-m-d'),
            ],
        ]);
         */
        factory(Post::class, 20)->create();
    }
}
