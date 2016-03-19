<?php

namespace App\Http\Requests;

use App\Http\Requests\Request;
use Carbon\Carbon;

class PostCreateRequest extends Request
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
            'title'      => 'required|max:255',
            'category_id' => 'required|integer',
            'keywords' => 'max:255',
            'slug'       => 'unique:posts|max:255|eng_alpha_dash',
            'image'      => ['required', 'regex:/\.(jpeg|jpg|png|bmp|gif|svg)$/'],
            'description' => 'max:255',
            'content' => 'required|min:20',
            'list_order' => 'integer',
            'is_draft'   => 'boolean',
            'layout' => 'required',
        ];
        return $rules;
    }

    /**
     * Return the fields and values to create a new post from
     */
    public function postFillData()
    {
        $published_at = new Carbon($this->published_at);
        return [
            'title' => $this->title,
            'category_id' => $this->category_id,
            'keywords' => $this->keywords,
            'slug' => !empty($this->slug)?$this->slug:null,
            'image' => $this->image,
            'description' => $this->description,
            'content_raw' => $this->get('content'),
            'is_draft' => (bool)$this->is_draft,
            'layout' => $this->layout,
            'published_at' => $published_at,
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
            'title.required'      => '请填写文章标题',
            'title.max'           => '文章标题过长，建议长度不要超出60',
            'category_id.required'   => '请选择栏目',
            'keywords.max'           => '关键词过长，建议长度不要超出100',
            'slug.required'       => '请填写缩略名',
            'slug.max'            => '缩略名过长',
            'slug.unique'         => '已有同名缩略名',
            'slug.eng_alpha_dash' => '缩略名只能数字、字母、下划线与横杠（0-9A-Za-z_-）组合',
            'image.required'      => '封面图不能为空',
            'image.regex'      => '封面图格式不正确',
            'description.required'    => '请填写文章简介',
            'content.required'    => '请填写正文',
            'content.min'         => '单页正文过短，长度不得少于20',
            'is_draft.boolean'      => '是草稿顶必须为布尔值',
        ];
    }
}
