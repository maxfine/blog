<?php

namespace App\Http\Controllers\Markdown;

use Illuminate\Http\Request;

use App\Http\Requests;
use App\Http\Controllers\BaseController;
use EndaEditor;
use Carbon\Carbon;
use Validator;
use Input;
use Response;
use File;

class ImageController extends BaseController
{
    public function __construct($name = 'markdown图片ajax上传')
    {
        parent::__construct($name);
    }

    /**
     * markdown上传图片
     *
     * @param Request $request
     * @return string
     */
    public function upload(Request $request)
    {
        if( $request->ajax() ) {
            // path 为 public 下面目录，比如我的图片上传到 public/uploads 那么这个参数你传uploads 就行了
            $now = Carbon::now();
            $pathDir = 'uploads'. '/' . $now->year .'/' . $now->format('md');
            $data = EndaEditor::uploadImgFile($pathDir);

            return json_encode($data);
        }
    }

    protected $validatorMessages = [
        'picture.image'   => '文件类型不允许,请上传常规的图片(bmp|gif|jpg|png)文件',
        'picture.max'    => '文件过大,文件大小不得超出2MB',
    ];

    /**
     * ajax上传图片
     *
     * @return mixed
     */
    public function postUpload(Request $request)
    {
        if( $request->ajax() ) {
            // 初始化
            $json = [
                'status' => 0,
                'message' => '失败',
                'data'=>[],
            ];

            if($request->hasFile('file')){
                /**
                 * ---------------------------------------------------------
                 * 验证规则
                 * ---------------------------------------------------------
                 */
                $file = $request->file('file');
                $data = $request->all();
                $rules = [
                    'file'    => 'image|max:2048',
                ];
                $messages = $this->validatorMessages;
                $validator = Validator::make($data, $rules, $messages);

                /**
                 * ---------------------------------------------------------
                 * 验证失败
                 * ---------------------------------------------------------
                 */
                if ($validator->fails()) {
                    $json = $this->format_json_message($validator->messages(), $json);
                    return json_encode($json);
                }

                if (!$file->isValid()) {
                    $json = array_replace($json, ['status' => 0, 'message' => '失败原因为：<span class="text_error">文件类型不允许,请上传常规的图片（bmp|gif|jpg|png）文件</span>']);
                    return $json;
                }

                /**
                 * ---------------------------------------------------------
                 * 验证通过, 上传
                 * ---------------------------------------------------------
                 * 目录格式: uploads/<eg:20160314>/<uniqid>_<秒数>o.<后缀>
                 */
                $realPath = $file->getRealPath();
                $destPath = 'uploads/';
                $savePath = $destPath. '' .date('Ymd', time());
                is_dir($savePath) || mkdir($savePath);  //如果不存在则创建目录
                $name = $file->getClientOriginalName();
                $ext = $file->getClientOriginalExtension();

                $uniqid = uniqid(). '_' .date('s');
                $oFile = $uniqid. 'o.' .$ext;
                $rFile = $uniqid. 'rw300.' .$ext;
                $fullFilename = url(''). '/' .$savePath. '/' .$oFile;  //原始完整路径

                $uploadSuccess = $file->move($savePath, $oFile);  //移动文件
                $json = array_replace($json, ['status' => 1, 'message' => '成功', 'data' => ['url' => $fullFilename]]);
                return $fullFilename;
            }

            return json_encode($json);
        }
    }

    /**
     * 格式化表单校验消息
     *
     * @param  array $messages 未格式化之前数组
     * @return string 格式化之后字符串
     */
    protected function format_message($messages)
    {
        $reason = ' ';
        foreach ($messages->all('<span class="text_error">:message</span>') as $message) {
            $reason .= $message.' ';
        }
        return $reason;
    }

    /**
     * 格式化表单校验消息，并进行json数组化预处理
     *
     * @param  array $messages 未格式化之前数组
     * @param array $json 原始json数组数据
     * @return array
     */
    protected function format_json_message($messages, $json)
    {
        $reason = $this->format_message($messages);
        $info = '失败原因为：'.$reason;
        $json = array_replace($json, ['message' => $info]);
        return $json;
    }

}
