<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class SystemOption extends Model
{
    protected $table = 'system_options';

    public $timestamps = false; //关闭自动更新时间戳
}

