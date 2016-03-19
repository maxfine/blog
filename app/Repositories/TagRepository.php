<?php namespace App\Repositories;

use App\Models\Post;
use App\Models\Tag;

/**
 * 标签仓库
 *
 * @author maxfine<max_fine@qq.com>
 */
class TagRepository extends BaseRepository
{
    /**
     * Create a new UserRepository instance.
     *
     * @param  App\Models\Content $content
     * @param  App\Models\Role $role
     * @return void
     */
    public function __construct(Tag $tag)
    {
        $this->model = $tag;
    }

    public function posts($data = [], $type = '', $size = '10')
    {
        if (!ctype_digit($size)) {
            $size = '10';
        }

        $tag = $this->model->where(
            function ($query) use ($data) {
                if (!empty($data['tag'])) {
                    $tag = e($data['tag']);
                    $query->where('tag', '=', $tag);
                }
            })
            ->first();

        $posts = $tag->posts()
            ->published()
            ->orderBy('list_order', 'asc')
            ->orderBy('created_at', 'desc')
            ->paginate($size);

        return $posts;
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
                    $query->where('tag', 'like', '%' . $keywords . '%');
                }
            })
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
        $tag = $this->model->findOrFail($id);
        $tag->posts()->detach();
        return $tag->delete();
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
