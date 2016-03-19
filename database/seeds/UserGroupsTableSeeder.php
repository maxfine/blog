<?php
use Illuminate\Database\Seeder;

class UserGroupsTableSeeder extends Seeder {

    public function run()
    {
        DB::table('user_groups')->delete();
        $datas = [
            [
                'name' => '普通会员',
                'discount' => 0.00,
                'point' => 0,
                'created_at' => new DateTime,
                'updated_at' => new DateTime,
            ],
            [
                'name' => '银牌会员',
                'discount' => 80.00,
                'point' => 10000,
                'created_at' => new DateTime,
                'updated_at' => new DateTime,
            ],
            [
                'name' => '金牌会员',
                'discount' => 60.50,
                'point' => 20000,
                'created_at' => new DateTime,
                'updated_at' => new DateTime,
            ],
            [
                'name' => '钻石会员',
                'discount' => 40.00,
                'point' => 40000,
                'created_at' => new DateTime,
                'updated_at' => new DateTime,
            ]
        ];
        DB::table('user_groups')->insert($datas);
    }
}
