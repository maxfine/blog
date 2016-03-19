<?php

/*
|--------------------------------------------------------------------------
| Application Routes
|--------------------------------------------------------------------------
|
| Here is where you can register all of the routes for an application.
| It's a breeze. Simply tell Laravel the URIs it should respond to
| and give it the controller to call when that URI is requested.
|
*/

Route::get('test/{id}', function ($idd) {
    // role attach alias
//    $user = App\Models\User::join('role_user', 'users.id', '=', 'role_user.user_id')->whereIn('role_user.role_id', [1, 2])->first();
//    dump($user->roles);
    $users = App\Models\User::customer()->get(); // parameter can be an Role object, array, or id
    dump($users);
/*    dump($idd);
    dump(request()->route('id'));
    $faker = Faker\Factory::create('zh_CN');
    dump($faker->paragraphs(mt_rand(3, 6), true), $faker->sentence(), $faker->dateTimeBetween('-1 month', '+3 d')->format('Y-m-d'));*/
});
//首页
Route::get('/', function () {
    return redirect('/blog');
});

//blog, 博客
Route::resource('blog', 'Blog\BlogController');
Route::group(['prefix' => 'blog', 'namespace' => 'Blog'], function () {
    Route::get('slug/{slug}', 'BlogController@showBySlug');
});
Route::get('tag/{tag}', ['as'=>'tag', 'uses'=>'Tag\TagController@listPosts']);

//后台登录
Route::get('auth/admin/login', 'Auth\Admin\AuthController@getLogin');
Route::post('auth/admin/login', 'Auth\Admin\AuthController@postLogin');
Route::get('auth/admin/logout', 'Auth\Admin\AuthController@getLogout');
//后台首页
Route::group(['prefix' => 'admin',  'namespace' => 'Admin', 'middleware' => ['admin.auth', 'admin.permission:admin']], function()
{
    //后台
    Route::get('/', ['as' => 'admin.home', 'uses' => 'HomeController@home']);

    //后台首页内容页
    Route::get('index', ['as' => 'admin.index', 'uses' => 'HomeController@index']);

    //用户管理
    Route::resource('users', 'UsersController');

    Route::get('qiniu/upload-token', ['as'=>'admin.qiniu.upload-token', 'uses'=>'Upload\QiniuController@token']);

    //权限管理
    Route::group(['namespace' => 'Permissions'], function () {
        Route::resource('roles', 'RolesController');
        Route::resource('permissions', 'PermissionsController');
        Route::resource('admins', 'AdminsController');
        Route::post('roles/assign-permission', ['as' => 'admin.roles.assign-permission', 'uses' => 'RolesController@assignPermission']);
        Route::post('admins/assign-role', ['as' => 'admin.admins.assign-role', 'uses' => 'AdminsController@assignRole']);
    });

    //文章管理
    Route::resource('posts', 'PostsController');
    Route::post('posts/mulit_destroy', 'PostsController@mulitDestroy');
    Route::post('posts/list_order', 'PostsController@listOrder');

    //栏目管理
    Route::resource('categories', 'CategoriesController');
    Route::post('categories/list_order', 'CategoriesController@listOrder');
    Route::post('categories/mulit_destroy', 'CategoriesController@mulitDestroy');
});


//会员登录注册
Route::get('/auth/login', 'Auth\AuthController@getLogin');
Route::post('/auth/login', 'Auth\AuthController@postLogin');
Route::get('/auth/logout', 'Auth\AuthController@getLogout');


//markdown 编辑器
Route::group(['prefix' => 'markdown', 'namespace' => 'Markdown'], function ()
{
    Route::post('image/upload', 'ImageController@postUpload');
});

//domw
Route::group(['prefix' => 'dome', 'namespace' => 'Dome'], function ()
{
    Route::resource('trait', 'TraitDome\TraitController');
    Route::resource('markdown', 'Markdown\MarkdownController');
});

