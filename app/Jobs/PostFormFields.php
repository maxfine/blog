<?php

namespace App\Jobs;

use App\Models\Post;
use App\Models\Tag;
use Carbon\Carbon;
use Illuminate\Contracts\Bus\SelfHandling;
use App\Repositories\CategoryRepository;

class PostFormFields extends Job implements SelfHandling
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
        'title' => '',
        'category_id' => null,
        'keywords' => '',
        'slug' => null,
        'image' => '',
        'description' => '',
        'content' => '',
        'list_order' => 100,
        'is_draft' => '0',
        'layout' => 'blog.layouts.show',
        'published_at' => '',
        'tags' => [],
    ];

    /**
     * Create a new command instance.
     *
     * @param integer $id
     */
    public function __construct($id = null)
    {
        $this->id = $id;
        $this->category = app()->make(CategoryRepository::class);
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
        } else {
            $fields['published_at'] = Carbon::now()->format('Y-m-d H:i:s');
        }

        foreach ($fields as $fieldName => $fieldValue) {
            $fields[$fieldName] = old($fieldName, $fieldValue);
        }

        /**
         * ---------------------------------------------------------
         * 得到所有栏目
         * ---------------------------------------------------------
         * EG: $categories = [['label'=>$name, 'value'=>$id], ..]
         */
        $allCategories = $this->category->getSelectChilds();
        foreach($allCategories as $k=>$category){
            $allCategories[$k] = ['label'=>$category->name, 'value'=>$category->id];
        }
        array_unshift($allCategories, ['label'=>'≡ 请选择栏目 ≡', 'value'=>null]);
        return array_merge(
            $fields,
            ['allTags' => Tag::lists('tag')->all()],
            ['allCategories' => $allCategories]
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
        $post = Post::findOrFail($id);

        $fieldNames = array_keys(array_except($fields, ['tags']));

        $fields = ['id' => $id];
        foreach ($fieldNames as $field) {
            $fields[$field] = $post->{$field};
        }

        $fields['tags'] = $post->tags()->lists('tag')->all();

        return $fields;
    }
}
