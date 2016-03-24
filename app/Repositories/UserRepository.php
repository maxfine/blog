<?php namespace App\Repositories;

use App\Models\User;
use App\Models\Role;
use App\Models\UserGroup;

/**
 * 用户仓库UserRepository
 *
 * @author maxfine<max_fine@qq.com>
 */
class UserRepository extends BaseRepository
{
    /**
     * The Role instance.
     *
     * @var App\Models\Role
     */
    protected $role;

    /**
     * Create a new UserRepository instance.
     *
     * @param  App\Models\Content $content
     * @param  App\Models\Role $role
     * @return void
     */
    public function __construct(User $user, Role $role, UserGroup $userGroup)
    {
        $this->model = $user;
        $this->role = $role;
        $this->userGroup = $userGroup;
    }

    /**
     * 获取特定id管理员信息
     *
     * @param  int $id
     * @return App\Models\User
     */
    public function manager($id)
    {
        return $this->model->manager()->find($id);
    }

    /**
     * 检查email是否已经存在
     *
     * @param $email
     * @return bool
     */
    public function existsEmail($email)
    {
        $user = $this->model->where('email', '=', $email);
        if (is_null($user)) {
            return false;
        }

        return true;
    }

    #********
    #* 资源 REST 相关的接口函数 START
    #********
    public function index($data = [], $type = 'manager', $size = '10')
    {
        if (!ctype_digit($size)) {
            $size = '10';
        }

        if ($type == 'manager') {
            $users = $this->model->manager()
                ->where(
                    function ($query) use ($data) {
                        if (!empty($data['keywords'])) {
                            $keywords = e($data['keywords']);
                            $query->where('name', 'like', '%' . $keywords . '%');
                        }
                    })
                ->orderBy('id', 'desc')
                ->paginate($size);
        } elseif($type == 'customer') {
            $users = $this->model->customer()
                ->where(
                    function ($query) use ($data) {
                        if (!empty($data['keywords'])) {
                            $keywords = e($data['keywords']);
                            $query->where('name', 'like', '%' . $keywords . '%');
                        }
                    })
                ->orderBy('id', 'desc')
                ->paginate($size);
        }

        return $users;
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
