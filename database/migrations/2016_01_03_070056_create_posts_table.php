<?php

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreatePostsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('posts', function (Blueprint $table) {
            $table->increments('id');
            $table->integer('category_id')->unsigned();
            $table->string('title');
            $table->string('keywords')->default('');
            $table->string('slug')->unique()->nullable(); //将文章标题转化为URL的一部分，以利于SEO
            $table->string('image'); //文章缩略图（封面图）
            $table->string('description'); //文章备注说明
            $table->text('content_raw');
            $table->text('content_html'); //使用 Markdown 编辑内容但同时保存 HTML 版本
            $table->tinyInteger('list_order')->default(100);
            $table->boolean('is_draft'); //该文章是否是草稿
            $table->string('layout')->default('blog.layouts.show'); //使用的布局
            $table->timestamp('published_at')->index(); //文章正式发布时间
            $table->softDeletes();
            $table->timestamps();

            $table->foreign('category_id')->references('id')->on('categories')->onDelete('restrict'); //不允许级联删除。
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::drop('posts');
    }
}
