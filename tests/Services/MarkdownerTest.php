<?php

use Illuminate\Foundation\Testing\WithoutMiddleware;
use Illuminate\Foundation\Testing\DatabaseMigrations;
use Illuminate\Foundation\Testing\DatabaseTransactions;

class MarkdownerTest extends TestCase
{
    protected $markdown;

    /**
     * ---------------------------------------------------------
     * setup应该追加自己的, 而不是重写
     * ---------------------------------------------------------
     */
    public function setup()
    {
        parent::setUp();
        $this->markdown = new \App\Services\Markdowner();
    }

    public function testEndaEditor()
    {
        $str = \EndaEditor::markDecode("#我是markdown语法");
        $str = app('endaEditor')->MarkDecode("#我是markdown语法");
        $this->assertEquals( "<h1>我是markdown语法</h1>", $str);
    }

    public function testSimpleParagraph()
    {
        $this->assertEquals(
            "<p>test</p>\n",
            $this->markdown->toHTML('test')
        );
    }
}
