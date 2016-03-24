<?php namespace App\Repositories;

use App\Models\Role;
use App\Models\Permission;

/**
 * 角色仓库
 *
 * @author maxfine<max_fine@qq.com>
 */
class RoleRepository extends BaseRepository
{
    /**
     * @param Role $role
     */
    public function __construct(Role $role)
    {
        $this->model = $role;
    }


    #********
    #* 资源 REST 相关的接口函数 START
    #********
    public function index($data = [], $type = '', $size = '10')
    {
        if (!ctype_digit($size)) {
            $size = '10';
        }

        $roles = $this->model->where(
            function ($query) use ($data) {
                if (!empty($data['keywords'])) {
                    $keywords = e($data['keywords']);
                    $query->where('display_name', 'like', '%' . $keywords . '%');
                }
            })
            ->orderBy('created_at', 'desc')
            ->paginate($size);

        return $roles;
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
        $role->perms()->detach();
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
        foreach($ids as $id){
            $this->destroy($id);
        }
    }
}
