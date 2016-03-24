<?php namespace App\Repositories;

use App\Models\User;
use App\Models\Role;
use App\Models\UserGroup;

/**
 * 用户组仓库UserRepository
 *
 * @author maxfine<max_fine@qq.com>
 */
class UserGroupRepository extends BaseRepository
{

    /**
     * Create a new UserRepository instance.
     *
     * @param  App\Models\Content $content
     * @param  App\Models\Role $role
     * @return void
     */
    public function __construct(UserGroup $userGroup, User $user)
    {
        $this->model = $userGroup;
        $this->user = $user;
    }

    #********
    #* 资源 REST 相关的接口函数 START
    #********
    public function index($data = [], $type = '', $size = '10')
    {
        if (!ctype_digit($size)) {
            $size = '10';
        }

        $userGroups = $this->model->where(
            function ($query) use ($data) {
                if (!empty($data['keywords'])) {
                    $keywords = e($data['keywords']);
                    $query->where('name', 'like', '%' . $keywords . '%');
                }
            })
            ->orderBy('id', 'desc')
            ->paginate($size);

        return $userGroups;
    }

    /**
     * 删除
     *
     * @param int $id
     * @param string $extra
     */
    public function destroy($id = 0, $extra = '')
    {
        $role = $this->model->findOrFail($id);
        return $role->delete();
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
        foreach ($ids as $id) {
            $this->destroy($id);
        }
    }
}
