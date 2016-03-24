<?php

namespace App\Models;

use Illuminate\Auth\Authenticatable;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Auth\Passwords\CanResetPassword;
use Illuminate\Foundation\Auth\Access\Authorizable;
use Illuminate\Contracts\Auth\Authenticatable as AuthenticatableContract;
use Illuminate\Contracts\Auth\Access\Authorizable as AuthorizableContract;
use Illuminate\Contracts\Auth\CanResetPassword as CanResetPasswordContract;
use Zizaco\Entrust\Traits\EntrustUserTrait;

class User extends Model implements AuthenticatableContract, CanResetPasswordContract
{
    use  Authenticatable, CanResetPassword, EntrustUserTrait;

    /**
     * The database table used by the model.
     *
     * @var string
     */
    protected $table = 'users';

    /**
     * The attributes that are mass assignable.
     * 输入白名单, 其他字段不能赋值到model
     * 避免批量创建时, 用户恶意输入
     *
     * @var array
     */
    protected $fillable = ['name', 'email', 'password', 'remember_token', 'group_id'];

    /**
     * The attributes excluded from the model's JSON form.
     * 输出黑名单, 排除JSON和数组中出现$hidden中的字段
     * 避免保密字段数据外泄
     *
     * @var array
     */
    protected $hidden = ['password', 'remember_token'];

    /**
     * 限定管理员
     */
    public function scopeManager($query)
    {
        $query->join('role_user', 'users.id', '=', 'role_user.user_id')->where('role_user.role_id', '=' ,1);
    }

    /**
     * 限定普通会员
     * 所有关联role_id不等于1
     */
    public function scopeCustomer($query)
    {
        // todo-优化sql
        $query->whereNotIn('id', $this->manager()->lists('id'));
    }

    /**
     * 用户组
     *
     * @return \Illuminate\Database\Eloquent\Relations\BelongsTo
     */
    public function userGroup()
    {
        return $this->belongsTo('App\Models\UserGroup', 'group_id');
    }
}
