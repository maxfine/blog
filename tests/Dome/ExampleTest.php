<?php

use Illuminate\Foundation\Testing\WithoutMiddleware;
use Illuminate\Foundation\Testing\DatabaseMigrations;
use Illuminate\Foundation\Testing\DatabaseTransactions;

class ExampleTest //extends  TestCase
{
    use WithoutMiddleware;
    use DatabaseMigrations;
    //use DatabaseTransactions;

    /**
     * A basic functional test example.
     *
     * @return void
     */
    public function testBasicExample()
    {
        $this->visit('/')
             ->see('blog');
    }

    /**
     * 测试表单提交
     */
    public function testTestMyForm()
    {
        $this->visit('dome/my_form')
            ->type('maxfine', 'username')
            ->select('S', 'size')
            ->check('hobby')
            ->attach('http://laravelacademy.org/wp-content/uploads/2015/11/082051l76zd60zufalcbfc-256x128.jpg', 'image')
            ->press('dosubmit')
            ->seePageIs('/dome/add')
            ->see('添加成功')
            ->dontSee('hobby');
    }

    /**
     * 测试直接post提交, JSON
     */
    public function testTestJson()
    {
        $this->post('dome/json/add', ['name' => 'maxfine'])
            ->seeJson(['name' => 'maxfine']);
    }

    /**
     * 测试session, 模拟用户登录
     */
    public function testTestSession()
    {
        $user = factory('App\Models\User')->create();

        $this->actingAs($user)
            ->withSession(['nickname' => '孔子'])
            ->visit('dome/session')
            ->see('hello, ' . $user->name);
    }

    /**
     * 测试外观模式
     */
    public function testTestFacade()
    {
        Cache::shouldReceive('get') //方法
            ->once()
            ->with('name') //缓存key
            ->andReturn('maxfine'); //缓存value, 模拟需要返回的字符串

        $this->visit('dome/facade')
            ->see('maxfine');
            //->dump();
    }

}
