<?php
namespace App\Http\Middleware\Admin;

use Closure;

class EntrustPermission {

    /**
     * Handle an incoming request.
     *
     * @param  \Illuminate\Http\Request $request
     * @param  \Closure $next
     * @param null $permissions
     * @return mixed
     */
    public function handle($request, Closure $next, $permissions = null)
    {
        if ($permissions != null && !\Auth::user()->can(explode('|', $permissions))) {
            /**
             * ---------------------------------------------------------
             * 提示非法操作
             * ---------------------------------------------------------
             * 这里为什么不跳转到登录页面?
             * 1. 大多数用户并不想跳转
             */
            return response('非法操作', 403);
        }

        return $next($request);
    }

}