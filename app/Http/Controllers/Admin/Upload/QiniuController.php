<?php namespace App\Http\Controllers\Admin\Upload;

use App\Http\Controllers\BaseController;
use Qiniu\Auth;

class QiniuController extends BaseController{

    function token()
    {
        $qiniu = config('site.qiniu');
        $bucket = $qiniu['bucket'];
        $auth = new Auth($qiniu['access_key'], $qiniu['secret_key']);

        return response()->json(['uptoken'=>$auth->uploadToken($bucket)]);
    }
}