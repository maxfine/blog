<?php

namespace App\Http\Controllers\Admin\Users;

use App\Http\Controllers\BaseController;
use App\Models\Role;
use App\Models\User;
use App\Http\Requests\UserCreateRequest;
use App\Http\Requests\UserUpdateRequest;
use Illuminate\Http\Request;
use Illuminate\View\View;
use App\Repositories\UserRepository;
use App\Jobs\UserFormFields;
use Form;


class UsersController extends BaseController
{
    public function __construct($name = '用户', $uri = '', UserRepository $user)
    {
        parent::__construct($name);
        $this->middleware('admin.permission:admin');
        $this->user = $user;
    }

    /**
     * 首页
     *
     * @param Request $request
     * @return \App\Http\Controllers\View
     */
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
                        array_push($buttons, ['name' => '删除', 'method' => 'DELETE', 'class' => 'btn-danger']);
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
        $paginate = $this->user->index($params, 'customer');
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
     * 创建页面
     *
     * @return \App\Http\Controllers\View
     */
    public function create()
    {
        $data = $this->dispatch(new UserFormFields());

        return $this->view($this->uri . '.create', compact('data'));
    }

    /**
     * 保存
     *
     * @param UserCreateRequest $request
     * @return mixed
     */
    public function store(UserCreateRequest $request)
    {
        $user = User::create($request->postFillData());

        if($user){
            return redirect()
                ->route($this->uri . '.index')
                ->withSuccess('用户已经创建成功');
        }
    }

    /**
     * 编辑页面
     *
     * @param $id
     * @return \App\Http\Controllers\View
     */
    public function edit($id)
    {
        $data = $this->dispatch(new UserFormFields($id));

        return $this->view($this->uri . '.edit', compact('data'));
    }

    /**
     * 更新
     *
     * @param UserUpdateRequest $request
     * @param $id
     * @return mixed
     */
    public function update(UserUpdateRequest $request, $id)
    {
        $user = User::findOrFail($id);
        $user->fill($request->postFillData());
        $user->save();

        return redirect()
            ->route($this->uri . '.index')
            ->withSuccess('更新完成');
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

    /**
     * 删除用户
     * @param $id
     * @return \Illuminate\Http\RedirectResponse
     */
    public function destroy($id)
    {
        $this->user->destroy($id);

        return $this->toIndex();
    }
}
