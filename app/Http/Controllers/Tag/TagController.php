<?php

namespace App\Http\Controllers\Tag;

use Illuminate\Http\Request;

use App\Http\Requests;
use App\Http\Controllers\BaseController;
use App\Models\Tag;
use App\Models\Post;
use App\Jobs\BlogIndexData;
use App\Repositories\CategoryRepository;

class TagController extends BaseController
{
    public function __construct($name = '标签', $uri = '', CategoryRepository $category)
    {
        parent::__construct($name);

        /**
         * ---------------------------------------------------------
         * 共享导航数据到所有视图
         * 共享标签数据
         * 共享最新文章
         * ---------------------------------------------------------
         * todo
         */
        $this->category = $category;
        $categories = [];
        view()->share('categories', $categories);

        $tagClloud = Tag::take(15)->get();
        view()->share('tagClloud', $tagClloud);

        $lastPosts = Post::published()
            ->where('is_draft', 0)
            ->orderBy('published_at', 'desc')
            ->take(3)
            ->get();
        view()->share('lastPosts', $lastPosts);
    }

    public function listPosts($tag)
    {
        $data = $this->dispatch(new BlogIndexData($tag));

        $posts = $data['posts'];
        $tag = $data['tag'];
        $layout = !empty($tag->layout)? $tag->layout : $this->uri . '.index';

        return view($layout, compact('tag', 'posts'));
    }

    public function index()
    {
        //todo
    }
}
