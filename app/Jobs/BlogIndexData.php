<?php

namespace App\Jobs;

use App\Models\Post;
use App\Models\Tag;
use Carbon\Carbon;
use Illuminate\Contracts\Bus\SelfHandling;
use App\Cache\SystemOptionCache;

class BlogIndexData extends Job implements SelfHandling
{
    protected $tag;

    /**
     * 控制器
     *
     * @param string|null $tag
     */
    public function __construct($tag = null)
    {
        $this->tag = $tag;
    }

    /**
     * Execute the command.
     *
     * @return array
     */
    public function handle()
    {
        if ($this->tag) {
            return $this->tagIndexData($this->tag);
        }

        return $this->normalIndexData();
    }

    /**
     * Return data for normal index page
     *
     * @return array
     */
    protected function normalIndexData()
    {
        $posts = Post::with('tags')
            ->published()
            ->where('is_draft', 0)
            ->orderBy('list_order', 'desc')
            ->orderBy('published_at', 'desc')
            ->paginate(config('blog.posts_per_page'));

        return [
            'title' => SystemOptionCache::get('website_title', 'your title'),
            'subtitle' => SystemOptionCache::get('website_subtitle', 'your subtitle'),
            'posts' => $posts,
            'logo' => SystemOptionCache::get('logo', URL('assets/images/logo.png')),
            'description' => SystemOptionCache::get('website_description', 'your description'),
            'reverse_direction' => false,
            'tag' => null,
        ];
    }

    /**
     * Return data for a tag index page
     *
     * @param string $tag
     * @return array
     */
    protected function tagIndexData($tag)
    {
        $tag = Tag::where('tag', $tag)->firstOrFail();
        $reverse_direction = (bool)$tag->reverse_direction;

        $posts = Post::published()
            ->whereHas('tags', function ($q) use ($tag) {
                $q->where('tag', '=', $tag->tag);
            })
            ->where('is_draft', 0)
            ->orderBy('list_order', $reverse_direction ? 'desc' : 'asc')
            ->orderBy('published_at', $reverse_direction ? 'asc' : 'desc')
            ->paginate(config('blog.posts_per_page'));
        $posts->addQuery('tag', $tag->tag);

        $image = $tag->image ?: config('blog.image');

        return [
            'title' => $tag->title,
            'subtitle' => $tag->subtitle,
            'posts' => $posts,
            'image' => $image,
            'tag' => $tag,
            'reverse_direction' => $reverse_direction,
            'description' => $tag->description ?: config('blog.description'),
        ];
    }
}
