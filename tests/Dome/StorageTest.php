<?php

use Illuminate\Foundation\Testing\WithoutMiddleware;
use Illuminate\Foundation\Testing\DatabaseMigrations;
use Illuminate\Foundation\Testing\DatabaseTransactions;

class StorageTest extends  TestCase
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
        $path = 'dome.txt';
        $contents = 'hello Storage';
        $disk = \Storage::disk('local');

        if($disk->exists($path)) die('文件存在, 不能再创建, error in ' . __FILE__ . '::' .  __FUNCTION__);

        $disk->put($path, $contents);
        if($disk->exists($path)){
            $putedContents = $disk->get($path);
            $this->assertEquals($putedContents, $contents);
            $disk->delete($path);
        }
    }

}
