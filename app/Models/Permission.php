<?php namespace App\Models;
/**
 * Created by maxfine<max_fine@qq.com>
 * Date: 2016/2/12
 * Time: 16:26
 */

use Zizaco\Entrust\EntrustPermission;

class Permission extends EntrustPermission
{
    protected $fillable = [
        'name', 'display_name', 'description',
    ];
}
