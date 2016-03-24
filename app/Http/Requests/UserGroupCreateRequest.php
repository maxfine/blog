<?php
namespace App\Http\Requests;

use App\Http\Requests\Request;

class UserGroupCreateRequest extends Request {

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
     * Return the fields and values to create a new post from
     */
    public function postFillData()
    {
        return [
            'name' => $this->name,
            'discount' => $this->discount?$this->discount:0,
            'point' => $this->point?$this->point:0,
        ];
    }

	/**
	 * Get the validation rules that apply to the request.
	 *
	 * @return array
	 */
	public function rules()
	{
		return [
            'name' => 'required|max:20|min:2',
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
            'name.required' => '请填写用户名',
            'name.min' => '用户名过短, 建议长度大于2',
            'name.max' => '用户名过长, 建议长度不要超出20',
        ];
    }
}
