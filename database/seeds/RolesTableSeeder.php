<?php

use Illuminate\Database\Seeder;

class RolesTableSeeder extends Seeder {

	/**
	 * Auto generated seed file
	 *
	 * @return void
	 */
	public function run()
	{
        \DB::table('roles')->delete();

        \DB::table('roles')->insert([
            [
                'id' => 1,
                'name' => 'admin',
                'display_name' => '超级管理员',
                'description' => NULL,
                'created_at' => '2015-11-05 19:13:58',
                'updated_at' => '2015-11-05 19:13:58',
            ]
        ]);
    }

}
