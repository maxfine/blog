<?php

use Illuminate\Database\Seeder;

class SystemOptionsSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        \DB::table('system_options')->delete();

        \DB::table('system_options')->insert([
            ['name' => 'website_keywords', 'value' => 'my blog'],
            ['name' => 'website_title', 'value' => 'my blog'],
        ]);
    }
}
