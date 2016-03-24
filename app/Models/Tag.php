<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Tag extends Model
{
    protected $fillable = [
        'tag', 'title', 'subtitle', 'image', 'description', 'layout', 'reverse_direction',
    ];

    protected $appends = ['url'];

    /**
     * 定义文章与标签之间多对多关联关系
     *
     * @return BelongsToMany
     */
    public function posts()
    {
        return $this->belongsToMany('App\Models\Post', 'post_tag_pivot');
    }

    public function getUrlAttribute()
    {
        return url('/tags/list_posts/'. $this->attributes['tag']);
    }

    /**
     * Add any tags needed from the list
     *
     * @param array $tags List of tags to check/add
     */
    public static function addNeededTags(array $tags)
    {
        if (count($tags) === 0) {
            return;
        }

        // 已经存在的标签
        $found = static::whereIn('tag', $tags)->lists('tag')->all();

        // 创建不存在的标签
        foreach (array_diff($tags, $found) as $tag) {
            static::create([
                'tag' => $tag,
                'title' => $tag,
                'subtitle' => 'Subtitle for '.$tag,
                'image' => '',
                'description' => '',
                'layout' => 'tag.layouts.index',
                'reverse_direction' => false,
            ]);
        }
    }
}
