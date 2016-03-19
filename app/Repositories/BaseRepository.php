<?php namespace App\Repositories;

use App\Interfaces\IRepository;

abstract class BaseRepository implements IRepository
{

    /**
     * The Model instance.
     *
     * @var Illuminate\Database\Eloquent\Model
     */
    protected $model;

    /**
     * Get Model by id.
     *
     * @param  int $id
     * @return App\Models\Model
     */
    public function getById($id)
    {
        return $this->model->findOrFail($id);
    }

    /**
     * IRepository接口store方法
     * 请在子类中重写或重载具体的实现方法
     *
     * @param  array $inputs
     * @param  string|array $extra
     * @return void
     */
    public function store($inputs = [], $extra = ''){
        return;
    }

    /**
     * IRepository接口destory方法
     * 请在子类中重写或重载具体的实现方法
     * 
     * @param  int $id
     * @param  string|array $extra
     * @return void
     */
    public function destroy($id = 0, $extra = '')
    {
        return;
    }

    /**
     * 资源列表
     *
     * @param  array $data 必须传入与模型查询相关的数据
     * @param  string|array $extra 可选额外传入的参数
     * @param  string $size 分页大小（存在默认值）
     * @return Illuminate\Support\Collection
     */
    public function index($data, $extra, $size)
    {

    }


    /**
     * 编辑特定id资源
     *
     * @param  int $id 资源id
     * @param  string|array $extra 可选额外传入的参数
     * @return Illuminate\Support\Collection
     */
    public function edit($id, $extra)
    {

    }

    /**
     * 更新特定id资源
     *
     * @param  int $id 资源id
     * @param  array $inputs 必须传入与更新模型相关的数据
     * @param  string|array $extra 可选额外传入的参数
     * @return void
     */
    public function update($id, $inputs, $extra)
    {

    }
}
