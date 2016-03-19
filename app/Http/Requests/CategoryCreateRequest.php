<?php

namespace App\Http\Requests;

use App\Http\Requests\Request;
use Carbon\Carbon;

class CategoryCreateRequest extends Request
{
    /**
     * Determine if the user is authorized to make this request.
     *
     * @return bool
     */
    public function authorize()
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array
     */
    public function rules()
    {
        $rules = [
            'name' => 'required|max:60', //是60字还是60字节
            'parent_id' => 'required|integer',
            'keywords' => 'max:255',
            'image' => ['max:90', 'regex:/\.(jpeg|jpg|png|bmp|gif|svg)$/'],
            'description' => 'max:255',
            'list_order' => 'integer',
            'show_in_nav' => 'boolean',
            'is_show' => 'boolean',
        ];

        return $rules;
    }

    /**
     * Return the fields and values to create a new post from
     */
    public function postFillData()
    {
        return [
            'name' => $this->name,
            'parent_id' => !empty($this->parent_id)?$this->parent_id:0,
            'keywords' => $this->keywords,
            'image' => $this->image,
            'description' => $this->description,
            'list_order' => $this->list_order,
            'show_in_nav' => (bool)$this->show_in_nav,
            'is_show' => (bool)$this->is_show,
        ];
    }

    /**
     * 自定义验证信息
     *
     * @return array
     */
    public function messages()
    {
        return [
            'name.required'      => '请填写栏目名称',
            'name.max'           => '栏目名称,建议长度不要超出60',
            'parent_id.required' => '请指定上级栏目',
            'keywords.max'      => '栏目关键字,长度不要超出255',
            'image.required'      => '图片不能为空',
            'image.regex'      => '图片格式不正确',
            'description.max'      => '栏目简介,长度不要超出255',
            'show_in_nav.boolean'      => '是否显示在导航顶必须为布尔值',
            'is_show.boolean'      => '是否显示顶必须为布尔值',
        ];
    }
}
