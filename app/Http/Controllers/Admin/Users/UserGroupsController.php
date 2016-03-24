<?php

namespace App\Http\Controllers\Admin\Users;

use App\Models\UserGroup;
use Illuminate\Http\Request;

use App\Http\Requests;
use App\Http\Controllers\BaseController;
use App\Repositories\UserGroupRepository;
use App\Http\Requests\UserGroupCreateRequest;
use App\Http\Requests\UserGroupUpdateRequest;
use App\Jobs\UserGroupFormFields;
use Form;

class UserGroupsController extends BaseController
{
    public function __construct($name = '用户组', $uri = '', UserGroupRepository $userGroup)
    {
        parent::__construct($name);
        $this->middleware('admin.permission:admin');
        $this->userGroup = $userGroup;
    }

    public function index(Request $request)
    {
        $results = [
            'columns' => [
                ['选择', '_xz', 50, function($data, $datas){
                    return Form::checkbox('id[]', $datas['id']);
                }],
                ['编号', 'id'],
                ['组名','name'],
                ['折扣','discount'],
                ['升级积分', 'point'],
                ['创建时间', 'created_at'],
                ['更新时间', 'updated_at'],
                ['操作', '_buttons', function ($data) {
                    $buttons = [];
                    if ($data->name != config('site.superuser_role', 'superuser')) {
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
        $paginate = $this->userGroup->index($params, 'customer');
        $results['items'] = $paginate;
        $results['params'] = $params;

        return $this->view($this->uri.'.index', compact('results'));
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        $data = $this->dispatch(new UserGroupFormFields());

        return $this->view($this->uri . '.create', compact('data'));
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(UserGroupCreateRequest $request)
    {
        $user = UserGroup::create($request->postFillData());

        if($user){
            return redirect()
                ->route($this->uri . '.index')
                ->withSuccess('用户组已经创建成功');
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
        $data = $this->dispatch(new UserGroupFormFields($id));

        return $this->view($this->uri . '.edit', compact('data'));
    }

    /**
     * 更新
     *
     * @param UserUpdateRequest $request
     * @param $id
     * @return mixed
     */
    public function update(UserGroupUpdateRequest $request, $id)
    {
        $user = UserGroup::findOrFail($id);
        $user->fill($request->postFillData());
        $user->save();

        return redirect()
            ->route($this->uri . '.index')
            ->withSuccess('更新完成');
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        $this->userGroup->destroy($id);

        return $this->toIndex();
    }
}
