<?php namespace App\Repositories;

use App\Models\Category;
use App\Models\Post;
use App\Models\Tag;
use Parsedown;

/**
 * 文章仓库
 *
 * @author maxfine<max_fine@qq.com>
 */
class PostRepository extends BaseRepository
{
    /**
     * @param Post $post
     * @param Category $category
     * @param Tag $tag
     */
    public function __construct(Post $post, Category $category, Tag $tag)
    {
        $this->model = $post;
    }


    #********
    #* 资源 REST 相关的接口函数 START
    #********
    public function index($data = [], $type = '', $size = '10')
    {
        if (!ctype_digit($size)) {
            $size = '10';
        }

        $posts = $this->model->where(
            function ($query) use ($data) {
                if (!empty($data['keywords'])) {
                    $keywords = e($data['keywords']);
                    $query->where('title', 'like', '%' . $keywords . '%');
                }
            })
            ->orderBy('list_order', 'asc')
            ->orderBy('created_at', 'desc')
            ->paginate($size);

        return $posts;
    }

    /**
     * 删除
     *
     * @param int $id
     * @param string $extra
     */
    public function destroy($id = 0, $extra = '')
    {
        $post = $this->model->findOrFail($id);
        $post->tags()->detach();
        return $post->delete();
    }

    #********
    #* 资源 REST 相关的接口函数 END
    #********

    /**
     * 批量删除
     *
     * @param $ids
     */
    public function mulitDestroy($ids)
    {
        foreach($ids as $id){
            $this->destroy($id);
        }
    }
}
