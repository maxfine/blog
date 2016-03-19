<?php

use Illuminate\Database\Seeder;

class PermissionsTableSeeder extends Seeder {

	/**
	 * Auto generated seed file
	 *
	 * @return void
	 */
	public function run()
	{
		\DB::table('permissions')->delete();

        \DB::table('permissions')->insert(
            [
                [
                    'id' => 1,
                    'name' => 'admin',
                    'display_name' => '超级管理员权限',
                    'description' => NULL,
                    'created_at' => '2016-2-13 19:13:58',
                    'updated_at' => '2016-2-13 19:13:58',
                ],
            ]);
    }

}
