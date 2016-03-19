<?php
namespace App\Http\Requests;

use App\Http\Requests\PermissionCreateRequest;

class PermissionUpdateRequest extends PermissionCreateRequest {

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
            'name' => 'required|max:20|unique:permissions,name,'. $this->route('permissions'),
        ];
    }

}
