<?php

namespace App\Http\Requests;

use App\Http\Requests\PostCreateRequest;

class PostUpdateRequest extends PostCreateRequest
{
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
            'slug'       => 'unique:posts,slug,'. $this->route('posts') . '|max:255' . '|eng_alpha_dash',
            'image'      => ['required'],
            'description' => 'max:255',
            'content' => 'required|min:20',
            'list_order' => 'integer',
            'is_draft'   => 'boolean',
            'layout' => 'required',
        ];
        return $rules;
    }
}
