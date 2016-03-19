<?php namespace App\Http\Requests;

use App\Http\Requests\Request;

class RoleCreateRequest extends Request {

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
		return [
            'name' => 'required|max:20|unique:roles'
        ];
	}

    public function postFillData()
    {
        return [
            'name' => $this->name,
            'display_name' => !empty($this->display_name)?$this->display_name:null,
            'description' => !empty($this->description)?$this->description:null,
        ];
    }

    public function messages()
    {
        return [
            'name.required' => '请填写系统名称',
            'name.max' => '系统名称过长, 建议长度不超过20个',
            'name.unique' => '已有同名系统名称'
        ];
    }
}
