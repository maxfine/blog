<?php

namespace App\Http\Controllers\Admin;

use Illuminate\Http\Request;

use App\Http\Requests;
use App\Http\Controllers\BaseController;
use App\Models\User;
use App\Models\Role;
use App\Repositories\UserRepository;
use Redirect;

class UsersController extends BaseController
{
    public function __construct($name = '用户', $uri = '')
    {
        parent::__construct($name);
    }

    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $results = [
            'columns' => [
                ['用户名', 'name'],
                ['邮箱', 'email'],
                ['创建时间', 'created_at'],
                ['操作', 'buttons', function ($data) {
                    $buttons = [
                        ['编辑']
                    ];
                    if (!$data->hasRole('superuser')) {
                        array_push($buttons, ['分配角色', '#modal']);
                    }
                    array_push($buttons, ['name' => '删除', 'method' => 'DELETE', 'class' => 'btn-danger']);
                    return $buttons;
                }]
            ]
        ];
        $roles = Role::all();
        /**
         * ---------------------------------------------------------
         * 可以使用UserRepository重构
         * ---------------------------------------------------------
         */
        $paginate = User::orderBy('created_at', 'desc')->paginate();
        $results['items'] = $paginate;
        $render = $paginate->render();

        foreach ($paginate as $user) {
            $user['roles'] = $user->roles()->get();
        }

        return $this->view($this->uri . '.index', compact('results', 'roles', 'render'));
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        //
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        $user = User::find($id);
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function edit($id)
    {
        $user = User::find($id);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        $user = User::find($id);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        User::destroy($id);

        return $this->toIndex();
    }
}
