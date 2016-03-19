<?php
/**
 * User: max_fine@qq.com
 * Date: 2015/6/9
 * Time: 15:23
 * 扩展自定义验证类 服务容器
 */

namespace App\Providers;


use App\Extensions\MaxfineValidator;
use Illuminate\Support\ServiceProvider;

class MaxfineValidatorServiceProvider extends ServiceProvider{

    public function boot()
    {
        $this->app['validator']->resolver(function($translator, $data, $rules, $messages, $customAttributes){
           return new MaxfineValidator($translator, $data, $rules, $messages, $customAttributes);
        });
    }

    public function register()
    {
        //
    }
}