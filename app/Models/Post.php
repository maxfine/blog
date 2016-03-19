<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use Carbon\Carbon as Date;
use App\Services\Markdowner;

class Post extends Model
{
    use SoftDeletes;

    protected $fillable = [
        'title', 'category_id', 'keywords', 'slug', 'image', 'description', 'content_raw',  'content_html', 'list_order', 'is_draft', 'layout', 'published_at'
    ];

    protected $dates = ['published_at'];

    protected $appends = ['url', 'author', 'full_image'];

    /**
     * ---------------------------------------------------------
     * many-to-one
     * ---------------------------------------------------------
     */
    public function category()
    {
        return $this->belongsTo('App\Models\Category');
    }

    /**
     * The many-to-many relationship between posts and tags.
     *
     * @return BelongsToMany
     */
    public function tags()
    {
        return $this->belongsToMany('App\Models\Tag', 'post_tag_pivot');
    }

    /**
     * Set the title attribute and automatically the slug
     *
     * @param string $value
     */
    public function setTitleAttribute($value)
    {
        $this->attributes['title'] = $value;

        if (! $this->exists) {
            $this->setUniqueSlug($value, '');
        }
    }

    /**
     * Recursive routine to set a unique slug
     *
     * @param string $title
     * @param mixed $extra
     */
    protected function setUniqueSlug($title, $extra)
    {
        $slug = str_slug($title.'-'.$extra);

        if (static::whereSlug($slug)->exists()) {
            $this->setUniqueSlug($title, $extra + 1);
            return;
        }

        $this->attributes['slug'] = $slug;
    }

    /**
     * Set the HTML content automatically when the raw content is set
     *
     * @param string $value
     */
    public function setContentRawAttribute($value)
    {
        $markdown = new Markdowner();

        $this->attributes['content_raw'] = $value;
        $this->attributes['content_html'] = $markdown->toHTML($value);
    }

    /**
     * Alias for content_raw
     */
    public function getContentAttribute($value)
    {
        return $this->content_raw;
    }

    /**
     * Sync tag relation adding new tags as needed
     *
     * @param array $tags
     */
    public function syncTags(array $tags)
    {
        Tag::addNeededTags($tags);

        /**
         * ---------------------------------------------------------
         * sync方法接收数组形式的ID并将其放置到中间表, 任何不在该数组中的ID对应记录将会从中间表中移除。
         * ---------------------------------------------------------
         */
        if (count($tags)) {
            $this->tags()->sync(
                Tag::whereIn('tag', $tags)->lists('id')->all()
            );
            return;
        }

        /**
         * ---------------------------------------------------------
         * 移除关系, 会更新中间表
         * ---------------------------------------------------------
         */
        $this->tags()->detach();
    }

    /**
     * ---------------------------------------------------------
     * append attribute url
     * ---------------------------------------------------------
     */
    public function getUrlAttribute()
    {
        if(empty($this->attributes['slug'])) return 'blog/' . $this->attributes['id'];

        return URL('blog/slug/' . $this->attributes['slug']);
    }

    /**
     * ---------------------------------------------------------
     * set published format
     * ---------------------------------------------------------
     */
    public function setPublishedAtAttribute($date)
    {
        $this->attributes['published_at'] = $date instanceof Date ? $date : Date::createFromFormat('Y-m-d',$date);
    }

    /**
     * ---------------------------------------------------------
     * 获取中文时间格式
     * ---------------------------------------------------------
     */
    public function getPublishedAtZhFormatAttribute()
    {
        $date = new Date($this->attributes['published_at']);

        return $date->format('Y年m月d日');
    }


    /**
     * ---------------------------------------------------------
     * 获取文章作者
     * ---------------------------------------------------------
     */
    public function getAuthorAttribute()
    {
        return isset($this->attributes['author']) ? $this->attributes['author'] : 'admin';
    }

    /**
     * ---------------------------------------------------------
     * get published format
     * ---------------------------------------------------------
     */
    public function scopePublished($query)
    {
        $query->where('published_at', '<=', Date::now());
    }

    /**
     * 图片完整路径
     *
     * @return string
     */
    public function getFullImageAttribute()
    {
        if(0 === strpos($this->attributes['image'], 'http://') || 0 === strpos($this->attributes['image'], 'https://')){
            return $this->attributes['image'];
        }
        return URL(config('site.qiniu.host') . $this->attributes['image']);
    }
}
