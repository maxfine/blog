<?php

namespace App\Jobs;

use App\Models\Role;
use App\Models\User;
use App\Models\UserGroup;
use Illuminate\Contracts\Bus\SelfHandling;

class UserFormFields extends Job implements SelfHandling
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
        'email' => '',
        'password' => '',
        'group_id' => null,
    ];

    /**
     * Create a new command instance.
     *
     * @param integer $id
     */
    public function __construct($id = null)
    {
        $this->id = $id;
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
         * 得到所有会员组
         * ---------------------------------------------------------
         * EG: $groups = [['label'=>$name, 'value'=>$id], ..]
         */
        $allGroups = UserGroup::all()->toArray();
        foreach($allGroups as $k=>$group){
            $allGroups[$k] = ['label'=>$group['name'], 'value'=>$group['id']];
        }
        array_unshift($allGroups, ['label'=>'≡ 请选择会员组 ≡', 'value'=>null]);
        return array_merge(
            $fields,
            ['allGroups' => $allGroups]
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
        $user = User::customer()->findOrFail($id);

        $fieldNames = array_keys($fields);

        $fields = ['id' => $id];
        foreach ($fieldNames as $field) {
            $fields[$field] = $user->{$field};
        }

        return $fields;
    }
}
