<?php

namespace App\Http\Controllers\Blog;

use Illuminate\Http\Request;

use App\Http\Requests;
use App\Http\Requests\BlogRequest;
use App\Http\Controllers\BaseController;
use App\Models\Post;
use App\Models\Tag;
use App\Jobs\BlogIndexData;
use App\Repositories\CategoryRepository;

class BlogController extends BaseController
{
    public function __construct($name = '博客', $uri = '', CategoryRepository $category)
    {
        parent::__construct($name);

        /**
         * ---------------------------------------------------------
         * 分享导航数据到所有视图
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

    /**
     * 根据sulg展示blog内页
     * @param $sulg
     * @return string
     */
    public function showBySlug($sulg)
    {
        //初始化
        //验证
        //业务逻辑
        $post = Post::whereSlug($sulg)->firstOrFail();
        $tags = $post->tags;

        return view('blog.show', compact('post', 'tags'));
    }

    /**
     * Display a listing of the resource.
     * orderby create_at desc
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $data = $this->dispatch(new BlogIndexData());

        return view('blog.index', $data);
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $input = $request->all();
        $input['intro'] = mb_substr($request->get('content'),0,64);
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        $post = Post::find($id);
        $layout = !empty($post->layout)? $post->layout : $this->uri . '.show';

        return view($layout, compact('post'));
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function edit($id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        //
    }

}
