<?php

namespace App\Providers;


use Illuminate\Support\Facades\View;
use Illuminate\Support\ServiceProvider;
use Form;

class QiniuUploadProvider extends ServiceProvider
{

    static $single_inited;

    /**
     * Register the service provider.
     *
     * @return void
     */
    public function register()
    {
    }

    public function boot()
    {
        $this->singleFileUpload();
        $this->multiFilesUpload();
    }

    private function singleFileUpload()
    {
        $handler = function ($name, $label, $percent = 0.5,$platform="qiniu") {
            $js = '';
            $value = MaxfineFormServiceProvider::parseValue($this->model, $name);

            /**
             * ---------------------------------------------------------
             * 非七牛的远程图片链接正确显示
             * ---------------------------------------------------------
             */
            if(0 === strpos($value, 'http://') || 0 === strpos($value, 'https://')){
                $url = $value;
            }else{
                $url = $value ? config('site.qiniu.host') . $value : '/assets/images/upload_add.png';
            }
            $js .= View::make('upload.upload')->with(['name'=>$name])->render(); //编译模板, 返回字符串
            if(!QiniuUploadProvider::$single_inited){
                $js = View::make('upload.upload_js')->render() . $js;
                QiniuUploadProvider::$single_inited = true;
            }
            return $js.'<div class="form-group col-sm-' . ($percent * 12) . '">
                        ' . Form::form_label($label) . '
                        <div class="col-sm-9">
                            <input id="' . $name . '" type="hidden" name="' . $name . '" type="text" value="' . $value . '">
                            <img style="width:58px;height:58px;cursor:pointer;" id="' . $name . '_img" src="' . $url . '">
                        </div>
                    </div>';
        };
        Form::macro('single_file_upload', $handler);
    }

    private function multiFilesUpload()
    {
        Form::macro('multi_file_upload', function ($name, $label, $with_description=true, $percent=0.5,$platform="qiniu") {
            $value = MaxfineFormServiceProvider::parseValue($this->model, $name);
            $url = '/vendor/forone/images/upload_add.png';
            $uploaded_items = '';
            if ($value) {
                $items = explode('|', $value);
                foreach ($items as $item) {
                    $details = explode('~', $item);
                    $idvalue = rand().'';
                    $div = '<div id="'.$idvalue.'div" style="float:left;width:68px;margin-right: 20px">';
                    if(preg_match("/.pdf/", $details[0])){
                        $img = '<img onclick="removeMultiUploadItem(\'' . $idvalue . 'div\',\''.$name.'\')" style="width: 68px; height: 68px;cursor:pointer"
                        src="/vendor/forone/images/upload.png">';
                    }else{
                        $img = '<img onclick="removeMultiUploadItem(\'' . $idvalue . 'div\',\''.$name.'\')" style="width: 68px; height: 68px;cursor:pointer"
                        src="'.config('forone.qiniu.host').$details[0].'?imageView2/1/w/68/h/68">';
                    }

                    $uploaded_items .= $div . $img;
                    $v = '';
                    if (sizeof($details) == 2) {
                        $v = "value='$details[1]'";
                    }
                    $uploaded_items .= '<input '.$v.' type="hidden" onkeyup="fillMultiUploadInput(\''.$name.'\')" style="width: 68px;float: left" placeholder="图片描述"></div>';
                }
            }

            $js = View::make('forone::upload.upload')->with(['multi'=>true,'name'=>$name, 'with_description'=>$with_description])->render();
            if(!QiniuUploadProvider::$single_inited){
                $js = View::make('forone::upload.upload_js')->render() . $js;
                QiniuUploadProvider::$single_inited = true;
            }

            return $js.'<div class="form-group col-sm-' . ($percent * 12) . '">
                        ' . Form::form_label($label) . '
                        <div class="col-sm-9">
                            <input id="'.$name.'" type="hidden" name="' . $name . '" type="text" value="'.$value.'">
                            <img style="width:58px;height:58px;cursor:pointer;float:left;margin-right:20px;" id="'.$name.'_img" src="'.$url.'">
                            <label id="'.$name.'_label"></label>
                            <div id="'.$name.'_div">'.$uploaded_items.'</div>
                        </div>
                    </div>';
        });
    }

}