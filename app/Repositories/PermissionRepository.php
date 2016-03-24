<?php namespace App\Repositories;

use App\Models\Permission;
use App\Models\Role;

/**
 * 权限仓库
 *
 * @author maxfine<max_fine@qq.com>
 */
class PermissionRepository extends BaseRepository
{
    /**
     * @param Role $role
     */
    public function __construct(Permission $permission)
    {
        $this->model = $permission;
    }


    #********
    #* 资源 REST 相关的接口函数 START
    #********
    public function index($data = [], $type = '', $size = '10')
    {
        if (!ctype_digit($size)) {
            $size = '10';
        }

        $permissions = $this->model->where(
            function ($query) use ($data) {
                if (!empty($data['keywords'])) {
                    $keywords = e($data['keywords']);
                    $query->where('display_name', 'like', '%' . $keywords . '%');
                }
            })
            ->orderBy('created_at', 'desc')
            ->paginate($size);

        return $permissions;
    }

    /**
     * 删除
     *
     * @param int $id
     * @param string $extra
     */
    public function destroy($id = 0, $extra = '')
    {
        /**
         * ---------------------------------------------------------
         * 级联清除角色与权限的关系
         * ---------------------------------------------------------
         */
        $permission = $this->model->findOrFail($id);

        /**
         * ---------------------------------------------------------
         * detach清除中间表关联数据
         * ---------------------------------------------------------
         */
        $permission->roles()->detach();

        return $permission->delete();
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
