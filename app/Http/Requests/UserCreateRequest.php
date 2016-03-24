<?php
namespace App\Http\Requests;

use App\Http\Requests\Request;

class UserCreateRequest extends Request {

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
            'email' => $this->email,
            'password' => bcrypt($this->password),
            'remember_token' => str_random(10),
            'group_id' => !empty($this->group_id)?$this->group_id:null,
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
            'email' => 'required|email|unique:'.config('site.auth.administrator_table', 'users'),
            'password' => 'required|max:20|min:6',
            'group_id' => 'integer',
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
            'email.required' => '请填写邮箱',
            'email.unique'         => '此邮箱已被使用',
            'password.required' => '请填写密码',
            'password.min' => '密码过短, 建议长度大于6',
            'password.max' => '密码过长, 建议长度不要超出20',
            'group_id' => '会员组错误',
        ];
    }
}
