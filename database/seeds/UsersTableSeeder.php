<?php

use Illuminate\Database\Seeder;
use App\Models\User;

class UsersTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        \DB::table('users')->delete();

        \DB::table('users')->insert([
            [
                'id' => 1,
                'name' => 'maxfine',
                'email' => 'max_fine@qq.com',
                'password' => bcrypt('i1happy'), // '$2y$10$P/JSWiHyb0fG24BVZZQdTO0EggZbvcca7VAr9QwPFnatOHgcEyVEa',
                'remember_token' => str_random(10), // 'euwOWTIPouKjd15sLlbeZ13fcFPwxhHnloch8zA4HkcM5YQhkGP9Ni9ha1eQ',
                'created_at' => '2016-2-13 19:13:58',
                'updated_at' => '2016-2-13 19:13:58',
            ],
            [
                'id' => 2,
                'name' => 'qq1526469221',
                'email' => '1526469221@qq.com',
                'password' => bcrypt('i1happy'), // '$2y$10$P/JSWiHyb0fG24BVZZQdTO0EggZbvcca7VAr9QwPFnatOHgcEyVEa',
                'remember_token' => str_random(10), // 'euwOWTIPouKjd15sLlbeZ13fcFPwxhHnloch8zA4HkcM5YQhkGP9Ni9ha1eQ',
                'created_at' => '2016-2-13 19:13:58',
                'updated_at' => '2016-2-13 19:13:58',
            ]
        ]);
    }
}
