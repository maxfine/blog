<?php namespace App\Http\Controllers\Admin;

use App\Http\Requests;
use App\Http\Controllers\BaseController;
use Illuminate\Http\Request;
use Config;
use App\Services\Tree;
use View;

class HomeController extends BaseController
{

    public function __construct($name = '后台')
    {
        parent::__construct($name);
        //获取导航
        $backNavs = Config::get('back-nav');
        $tree = new Tree($backNavs, 'parent_id', 'title');
        View::share('tree', $tree);
    }
    /**
     * 后台主页, 带框架
     * @return $this
     */
    public function home()
    {
        //获取导航
        $backNavs = Config::get('back-nav');
        return $this->view($this->uri . '.home')->with('backNavs', $backNavs);
    }

	/**
     * 后台主页
	 * @return Response
	 */
	public function index()
	{
        return $this->view($this->uri . '.index');
	}
}
