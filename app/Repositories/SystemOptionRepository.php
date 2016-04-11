<?php
/**
 * Created by PhpStorm.
 * User: maxfine <max_fine@qq.com>
 * Date: 16/4/11
 * Time: 下午12:16
 */

namespace App\Repositories;

use App\Models\SystemOption;

class SystemOptionRepository extends BaseRepository
{
    public function __construct(SystemOption $systemOption)
    {
        $this->model = $systemOption;
    }

}