<?php
namespace App\Http\Controllers\Admin\Permissions;

use App\Http\Controllers\BaseController;
use App\Models\Role;
use App\Models\User;
use App\Http\Requests\AdminCreateRequest;
use App\Http\Requests\AdminUpdateRequest;
use Illuminate\Http\Request;
use Illuminate\View\View;
use App\Repositories\UserRepository;
use App\Jobs\AdminFormFields;
use Form;

/**
 * 管理员
 * Class RolesController
 * @package App\Http\Controllers
 */
class AdminsController extends BaseController {

    public function __construct($name = '管理员', $uri = '', UserRepository $user)
    {
        parent::__construct($name);
        $this->middleware('admin.permission:admin');
        $this->user = $user;
    }

    public function index(Request $request)
    {
        $results = [
            'columns' => [
                ['选择', '_xz', 50, function($data, $datas){
                    return Form::checkbox('id[]', $datas['id']);
                }],
                ['编号', 'id'],
                ['用户名','name'],
                ['邮箱', 'email'],
                ['创建时间', 'created_at'],
                ['更新时间', 'updated_at'],
                ['操作', '_buttons', function ($data) {
                    $buttons = [];
                    if ($data->name != config('site.superuser_role', 'superuser')) {
                        $buttons = [
                            ['编辑'],
                        ];
                        array_push($buttons, ['分配角色', '#modal']);
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
        $paginate = $this->user->index($params);
        $results['items'] = $paginate;
        $results['params'] = $params;

        // 获取顶层权限
        $roles = Role::all();

        foreach ($paginate as $user) {
            $user['role'] = $user->roles;
        }

        return $this->view($this->uri.'.index', compact('results', 'roles'));
    }

    /**
     *
     * @return View
     */
    public function create()
    {
        $data = $this->dispatch(new AdminFormFields());

        return $this->view($this->uri . '.create', compact('data'));
    }

    /**
     *
     * @param CreateRoleRequest $request
     * @return View
     */
    public function store(AdminCreateRequest $request)
    {
        $user = User::create($request->postFillData());
        /**
         * ---------------------------------------------------------
         * 分配管理员角色
         * ---------------------------------------------------------
         */
        $adminRole = Role::where('name', '=', config('site.admin_role_name', 'admin'))->first();
        if(!empty($user) && !empty($adminRole)) $user->attachRole($adminRole->id);

        return redirect()
            ->route($this->uri . '.index')
            ->withSuccess('角色已经创建成功');
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return Response
     */
    public function edit($id)
    {
        $data = $this->dispatch(new AdminFormFields($id));

        return $this->view($this->uri . '.edit', compact('data'));
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  int  $id
     * @return Response
     */
    public function update(AdminUpdateRequest $request, $id)
    {
        $role = User::findOrFail($id);
        $role->fill($request->postFillData());
        $role->save();

        return redirect()
            ->route($this->uri . '.index')
            ->withSuccess('角色更新完成');
    }

    /**
     * 分配角色
     */
    public function assignRole(Request $request)
    {
        $user = User::find($request->get('id'));
        $roles = $request->except(['_token', 'id']);
        $user->detachRoles($user->roles()->get());
        foreach($roles as $name => $status){
            $role = Role::whereName($name)->first();
            if ($status == 'on') {
                $user->attachRole($role->id);
            }
        }

        return redirect()
            ->route($this->uri . '.index')
            ->withSuccess('角色分配完成');
    }
}