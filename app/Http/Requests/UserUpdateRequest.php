<?php
namespace App\Http\Requests;

use App\Http\Requests\UserCreateRequest;

class UserUpdateRequest extends UserCreateRequest
{
    public function rules()
    {
        return [
            'name' => 'required|max:20|min:2',
            'email' => 'required|email|unique:' . config('site.auth.administrator_table', 'users') . ',email,'. $this->route('users'),
            'group_id' => 'integer',
        ];
    }

    public function postFillData()
    {
        return [
            'name' => $this->name,
            'email' => $this->email,
            'group_id' => !empty($this->group_id)?$this->group_id:null,
        ];
    }

}
