<?php

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateTaggablesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        $table->integer('taggable_id')->unsigned()->index();
        $table->foreign('taggable_id')->references('id')->on('posts')->onDelete('cascade');
        $table->string('taggable_type')->default('App\Models\Post');
        $table->integer('tag_id')->unsigned()->index();
        $table->foreign('tag_id')->references('id')->on('tags')->onDelete('cascade');
        $table->timestamps();
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        //
    }
}
