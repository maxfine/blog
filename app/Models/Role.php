<?php namespace App\Models;
/**
 * Created by maxfine<max_fine@qq.com>
 * Date: 2016/2/12
 * Time: 16:26
 */

use Zizaco\Entrust\EntrustRole;

class Role extends EntrustRole
{
    protected $fillable = [
        'name', 'display_name', 'description',
    ];

    public function permissions()
    {
        $permissions = Permission::join('permission_role', 'permissions.id', '=', 'permission_role.permission_id')
            ->where('permission_role.role_id', '=', $this->id)
            ->get();
        return $permissions;
    }
}
