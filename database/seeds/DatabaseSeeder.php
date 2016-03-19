<?php

use Illuminate\Database\Seeder;
use Illuminate\Database\Eloquent\Model;

class DatabaseSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        Model::unguard();

        /**
         * ---------------------------------------------------------
         * 用户组
         * 2016-2-20
         * ---------------------------------------------------------
        $this->call(UserGroupsTableSeeder::class);
         */

        /**
         * ---------------------------------------------------------
         * 用户以及权限
         * 2016-2-21
         * ---------------------------------------------------------
        $this->call(UsersTableSeeder::class);
        $this->call(PermissionsTableSeeder::class);
        $this->call(RolesTableSeeder::class);
        $this->call(PermissionRoleTableSeeder::class);
        $this->call(RoleUserTableSeeder::class);
         */

        /**
         * ---------------------------------------------------------
         * 文章
         * 2016-2-22 19:38:44
         * ---------------------------------------------------------
         */
        $this->call(CategoriesTableSeeder::class);
        $this->call(PostsTableSeeder::class);


        Model::reguard();
    }


}
