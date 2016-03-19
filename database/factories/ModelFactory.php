<?php

/*
|--------------------------------------------------------------------------
| Model Factories
|--------------------------------------------------------------------------
|
| Here you may define all of your model factories. Model factories give
| you a convenient way to create models for testing and seeding your
| database. Just tell the factory how a default model should look.
|
*/

$factory->define(App\Models\User::class, function (Faker\Generator $faker) {
    return [
        'name' => $faker->name,
        'email' => $faker->email,
        'password' => bcrypt(str_random(10)),
        'remember_token' => str_random(10),
    ];
});

$factory->define(App\Models\Category::class, function (Faker\Generator $faker) {
    return [
        'name' => $faker->words(mt_rand(1, 4), true),
        'parent_id' => 0,
        'keywords' => join(',', $faker->words(mt_rand(1, 4))),
        'image' => $faker->imageUrl(680, 300),
        'description' => $faker->realText($faker->numberBetween(100, 200)),
        'list_order' => mt_rand(0, 100),
        'show_in_nav' => 1,
        'is_show' => 1,
    ];
});

$factory->define(App\Models\Post::class, function (Faker\Generator $faker) {
    $content = $faker->paragraphs(mt_rand(3, 6));

    return [
        'category_id' => App\Models\Category::firstOrFail()->id,
        'title' => $faker->sentence(mt_rand(3, 10)),
        'keywords' => join(',', $faker->words(mt_rand(1, 4))),
        'slug' => $faker->slug,
        'image' => $faker->imageUrl(680, 300),
        'description' => $faker->realText($faker->numberBetween(100, 200)),
        'content_raw' => join("\n\n", $content),
//        'content_html' => join("<br>", $content),
        'list_order' => mt_rand(0, 100),
        'is_draft' => 0,
        'layout' => 'blog.layouts.show',
        'published_at' => $faker->dateTimeBetween('-1 month', '+3 days')->format('Y-m-d'),
    ];
});
