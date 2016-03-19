<?php
namespace App\Http\Requests;

use App\Http\Requests\AdminCreateRequest;

class AdminUpdateRequest extends AdminCreateRequest
{
    public function rules()
    {
        return [
            'name' => 'required|max:20|min:2',
            'email' => 'required|email|unique:' . config('site.auth.administrator_table', 'users') . ',email,'. $this->route('admins'),
        ];
    }

    public function postFillData()
    {
        return [
            'name' => $this->name,
            'email' => $this->email,
        ];
    }

}
