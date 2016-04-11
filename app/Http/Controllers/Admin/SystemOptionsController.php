<?php

namespace App\Http\Controllers\Admin;

use Illuminate\Http\Request;

use App\Http\Requests;
use App\Http\Controllers\BaseController;
use App\Cache\SystemOptionCache;
use App\Repositories\SystemOptionRepository;
use App\Models\SystemOption;
use DB;

class SystemOptionsController extends BaseController
{
    public function __construct($name = '系统配置', $uri = 'admin.system_options',
                                SystemOptionRepository $systemOption)
    {
        parent::__construct($name, $uri);
        $this->middleware('admin.permission:admin');
        $this->sysytemOption = $systemOption;
    }

    /**
     * 系统配置表单页面
     */
    public function index()
    {
        //todo
        /**
         * ---------------------------------------------------------
         * annotation
         * ---------------------------------------------------------
         * 数据库里查询所有系统配置项,
         *
         */
        $datas = SystemOption::all();
        return $this->view($this->uri . '.index', compact('datas'));
    }

    /**
     * 系统配置更新
     */
    public function update(Request $request)
    {
        $datas = $request->input('values');

        DB::beginTransaction();
        try {
            foreach ($datas as $id=>$value)
            {
                $systemOption = SystemOption::findOrFail($id);
                $systemOption->value = $value;
                $systemOption->save();
            }
            DB::commit();
        } catch (\Exception $e) {
            DB::rollBack();
            return redirect()
                ->route($this->uri . '.index')
                ->withErrors($this->pageName . '更新失败');
        }

        SystemOptionCache::cacheStatic();

        return redirect()
            ->route($this->uri . '.index')
            ->withSuccess($this->pageName . '更新成功');
    }

}
