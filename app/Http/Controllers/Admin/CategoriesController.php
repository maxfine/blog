<?php

namespace App\Http\Controllers\Admin;

use App\Models\Category;
use Illuminate\Http\Request;

use App\Http\Requests;
use App\Http\Controllers\BaseController;
use App\Repositories\CategoryRepository;
use App\Jobs\CategoryFormFields;
use App\Http\Requests\CategoryCreateRequest;
use App\Http\Requests\CategoryUpdateRequest;
use Form;
use DB;

class CategoriesController extends BaseController
{
    public function __construct($name = '栏目', $uri = '', CategoryRepository $category)
    {
        parent::__construct($name);
        $this->middleware('admin.permission:admin');
        $this->category = $category;
    }

    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(Request $request)
    {
        /**
         * ---------------------------------------------------------
         * columns, heads为视图配置
         * ---------------------------------------------------------
         */
        $results = [
            'columns' => [
                ['选择', '_xz', 50, function($data, $datas){
                    return Form::checkbox('id[]', $datas['id'], false);
                }],
                ['排序', 'list_order', 60, function($data, $datas){
                    return '<input name="listorders['. $datas['id'] .']" value="'. $data .'" class="form-control listorder" type="text" style="width:60px;">';
                }],
                ['ID', 'id'],
                ['名称', 'name', function($data){
                    return $data;
                }],
                ['创建时间', 'created_at'],
                ['操作', '_buttons', function ($data) {
                    $buttons = [
                        ['编辑']
                    ];
                    array_push($buttons, ['name' => '删除', 'method' => 'DELETE', 'class' => 'btn-danger']);
                    return $buttons;
                }]
            ],
            'heads' => [
                'new'=>false,
            ],
            'foots' => [
                'checkAll'=>true,
                'order'=>'排序',
                'delete'=>'删除',
            ],
        ];
        /**
         * ---------------------------------------------------------
         * 使用PostRepository
         * ---------------------------------------------------------
         */
        $categories = $this->category->index();
        $results['items'] = $categories;

        return $this->view($this->uri . '.index', compact('results'));
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create(CategoryFormFields $categoryFormFields)
    {
        $data = $this->dispatch($categoryFormFields);

        return $this->view($this->uri . '.create', compact('data'));
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(CategoryCreateRequest $request)
    {
        Category::create($request->postFillData());

        return redirect()
            ->route($this->uri . '.index')
            ->withSuccess('栏目已经创建成功');
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function edit($id)
    {
        $data = $this->dispatch(new CategoryFormFields($id));

        return $this->view($this->uri . '.edit', compact('data'));
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(CategoryUpdateRequest $request, $id)
    {
        $post = Category::findOrFail($id);
        $post->fill($request->postFillData());
        $post->save();

        return redirect()
            ->route($this->uri . '.index')
            ->withSuccess('栏目更新完成');
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        $this->category->destroy($id);

        return $this->toIndex();
    }

    /**
     * 批量删除
     *
     * @param Request $request
     */
    public function mulitDestroy(Request $request)
    {
        if( $request->ajax() ) {
            $json = [
                'status' => 0,
                'message' => '失败',
                'data' => [],
            ];

            DB::beginTransaction();
            try {
                $ids = $request->input('id');
                $this->category->mulitDestroy($ids);
                DB::commit();
                $json = array_replace($json, ['status'=>1, 'message'=>'操作成功!']);
            } catch (\Exception $e) {
                DB::rollBack();
                $json = array_replace($json, ['status'=>0, 'message'=>'操作失败!']);
            }

            return json_encode($json);
        }
    }

    /**
     * 批量排序
     *
     * 注意表单数据传过来是字符串类型, 需要转化, intval
     * @param Request $request
     */
    public function listOrder(Request $request)
    {
        if( $request->ajax() ) {
            $json = [
                'status' => 0,
                'message' => '失败',
                'data' => [],
            ];
            $listOrders = $request->input('listorders');

            DB::beginTransaction();
            try {
                foreach ($listOrders as $id => $listorder) {
                    $category = Category::find($id);
                    $category->list_order = intval($listorder);
                    $category->save();
                }
                DB::commit();
                $json = array_replace($json, ['status'=>1, 'message'=>'操作成功!']);
            } catch (\Exception $e) {
                DB::rollBack();
                $json = array_replace($json, ['status'=>0, 'message'=>'操作失败!']);
            }

            return json_encode($json);
        }
    }
}
