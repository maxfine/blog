<?php

namespace App\Jobs;

use App\Models\Category;
use Carbon\Carbon;
use Illuminate\Contracts\Bus\SelfHandling;
use App\Repositories\CategoryRepository;

class CategoryFormFields extends Job implements SelfHandling
{

    /**
     * The id (if any) of the Post row
     *
     * @var integer
     */
    protected $id;

    /**
     * List of fields and default value for each field
     *
     * @var array
     */
    protected $fieldList = [
        'name' => '',
        'parent_id' => 0,
        'keywords' => '',
        'image' => '',
        'description' => '',
        'list_order' => 100,
        'show_in_nav' => 0,
        'is_show' => 1,
    ];

    /**
     * Create a new command instance.
     *
     * @param integer $id
     */
    public function __construct($id = null)
    {
        $this->id = $id;
        $this->category = app()->make(CategoryRepository::class);
    }

    /**
     * Execute the command.
     *
     * @return array of fieldnames => values
     */
    public function handle()
    {
        $fields = $this->fieldList;

        if ($this->id) {
            $fields = $this->fieldsFromModel($this->id, $fields);
        }
        foreach ($fields as $fieldName => $fieldValue) {
            $fields[$fieldName] = old($fieldName, $fieldValue);
        }

        /**
         * ---------------------------------------------------------
         * 得到所有栏目, 排除自己(不能自己和自己的子栏目作为自己的父栏目)
         * ---------------------------------------------------------
         * EG: $categories = [['label'=>$name, 'value'=>$id], ..]
         */
        $allCategories = $this->category->getSelectChilds();
        foreach($allCategories as $k=>$category){
            $allCategories[$k] = ['label'=>$category->name, 'value'=>$category->id];
        }
        if($this->id) {
            $exceptIds = $childIds = array_keys($this->category->getChilds($this->id));
            array_unshift($exceptIds, $this->id);
            $allCategories = array_except($allCategories, $exceptIds);
        }
        array_unshift($allCategories, ['label'=>'≡ 作为一级栏目 ≡', 'value'=>0]);

        return array_merge(
            $fields,
            ['allCategories' => $allCategories]
        );
    }

    /**
     * Return the field values from the model
     *
     * @param integer $id
     * @param array $fields
     * @return array
     */
    protected function fieldsFromModel($id, array $fields)
    {
        $category = Category::findOrFail($id);
        $fieldNames = array_keys($fields);
        $fields = ['id' => $id];

        foreach ($fieldNames as $field) {
            $fields[$field] = $category->{$field};
        }

        return $fields;
    }
}
