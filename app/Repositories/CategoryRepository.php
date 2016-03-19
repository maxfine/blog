<?php namespace App\Repositories;

use App\Models\Category;
use App\Models\Post;

/**
 * 栏目仓库
 *
 * @author maxfine<max_fine@qq.com>
 */
class CategoryRepository extends BaseRepository
{
    /**
     * @param Category $category
     */
    public function __construct(Category $category)
    {
        $this->model = $category;
    }

    /**
     * -----------------------------------------------------
     * 获取所有栏目,二维数组
     * -----------------------------------------------------
     * return [['id'=>1, 'cat_name'=>'xxx', ...], ['id'=>3, 'cat_name'=>'xxx', ..]]
     */
    public function getChilds($id, &$list=[]){
        $categories = $this->model->where('parent_id', $id)->get();

        foreach($categories as $category){
            $list[$category->id] = $category;
            $this->getChilds($category->id, $list);
        }

        return $list;
    }

    /**
     * -----------------------------------------------------
     * 获取栏目深度
     * -----------------------------------------------------
     * 顶级栏目深度为1
     */
    public function getLevel($id){
        $n = 0;

        if($id==0)return $n;
        while($id != 0 ){
            $category = $this->model->findOrFail($id);
            $id = $category->parent_id;
            $n++;
        }

        return $n;
    }

    /**
     * 获取栏目select
     * @param int $selectedId
     * @return mixed
     */
    public function getSelectChilds($selectedId=0, $icon = '├'){
        $categories = $this->getChilds($selectedId);

        foreach($categories as $category){
            $name = $category['name'];
            $prefix = ''; //&nbsp;├

            $n = $this->getLevel($category->id);
            $prefix .= str_repeat('&nbsp;&nbsp;', $n-1);
            if($this->getLevel($category['id'])>1) $prefix .= $icon . '&nbsp';
            $category['name'] = $prefix . $name;
        }

        return $categories;
    }


    #********
    #* 资源 REST 相关的接口函数 START
    #********
    public function index($data = [], $type = '', $size = '10')
    {
        $allCategories = $this->getSelectChilds(0, '├─');

        return $allCategories;
    }

    /**
     * 创建
     *
     * @param array $data
     * @param string $type
     * @param string $size
     */
    public function store($data = [], $type = '', $size = '10')
    {
    }

    /**
     * 删除
     *
     * @param int $id
     * @param string $extra
     */
    public function destroy($id = 0, $extra = '')
    {
        $category = $this->model->findOrFail($id);
        /**
         * ---------------------------------------------------------
         * 删除栏目下的文章
         * ---------------------------------------------------------
         * 如果不删除文章, 因为外键约束, 栏目会无法被删除
         * 因为文章表使用的是软删除, 所以这里必须使用强制删除方法forceDelete
         */
        $category->posts()->forceDelete();
        $category->posts()->withTrashed()->forceDelete();
        return $category->delete();
    }

    #********
    #* 资源 REST 相关的接口函数 END
    #********

    /**
     * 批量删除
     *
     * @param $ids
     */
    public function mulitDestroy($ids)
    {
        foreach($ids as $id){
            $this->destroy($id);
        }
    }
}
