<?php
namespace App\Http\Controllers\Admin\Permissions;

use App\Http\Controllers\BaseController;
use App\Models\Permission;
use App\Http\Requests\PermissionCreateRequest;
use App\Http\Requests\PermissionUpdateRequest;
use Illuminate\Http\Request;
use Illuminate\View\View;
use App\Repositories\PermissionRepository;
use App\Jobs\PermissionFormFields;
use Form;

/**
 * 角色
 * Class PermissionsController
 * @package App\Http\Controllers
 */
class PermissionsController extends BaseController {

    public function __construct($name = '角色', $uri = '', PermissionRepository $permission)
    {
        parent::__construct($name);
        $this->middleware('admin.permission:admin');
        $this->permission = $permission;
    }

    public function index(Request $request)
    {
        $results = [
            'columns' => [
                ['选择', '_xz', 50, function($data, $datas){
                    return Form::checkbox('id[]', $datas['id']);
                }],
                ['编号', 'id'],
                ['系统名称','name'],
                ['显示名称', 'display_name'],
                ['创建时间', 'created_at'],
                ['更新时间', 'updated_at'],
                ['操作', '_buttons', function ($data) {
                    $buttons = [];
                    if ($data->name != config('site.superuser_permission', 'superuser')) {
                        $buttons = [
                            ['编辑'],
                        ];
                        array_push($buttons, ['name' => '删除', 'method' => 'DELETE', 'class' => 'btn-danger']);
                    }
                    return $buttons;
                }]
            ],
            'heads' => [
                'new'=>false,
                'search' => '请输入你的关键字',
            ],
        ];

        $params = $request->all();
        $paginate = $this->permission->index($params);
        $results['items'] = $paginate;
        $results['params'] = $params;

        return $this->view($this->uri.'.index', compact('results'));
    }

    /**
     *
     * @return View
     */
    public function create()
    {
        $data = $this->dispatch(new PermissionFormFields());

        return $this->view($this->uri . '.create', compact('data'));
    }

    /**
     *
     * @param CreatePermissionRequest $request
     * @return View
     */
    public function store(PermissionCreateRequest $request)
    {
        $permission = Permission::create($request->postFillData());

        return redirect()
            ->route($this->uri . '.index')
            ->withSuccess($this->getPageName() . '已经创建成功');
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return Response
     */
    public function edit($id)
    {
        $data = $this->dispatch(new PermissionFormFields($id));

        return $this->view($this->uri . '.edit', compact('data'));
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  int  $id
     * @return Response
     */
    public function update(PermissionUpdateRequest $request, $id)
    {
        $permission = Permission::findOrFail($id);
        $permission->fill($request->postFillData());
        $permission->save();

        return redirect()
            ->route($this->uri . '.index')
            ->withSuccess($this->getPageName() . '更新完成');
    }

    /**
     * 删除权限
     *
     * @param $id
     * @return \Illuminate\Http\RedirectResponse
     */
    public function destroy($id)
    {
        $this->permission->destroy($id);

        return $this->toIndex();
    }
}