<?php namespace App\Http\Controllers\Auth\Admin;

use App\Http\Controllers\BaseController;
use Illuminate\Foundation\Auth\AuthenticatesAndRegistersUsers;
use Illuminate\Foundation\Auth\ThrottlesLogins;
use Illuminate\View\View;

class AuthController extends BaseController {

    /*
    |--------------------------------------------------------------------------
    | Registration & Login Controller
    |--------------------------------------------------------------------------
    |
    | This controller handles the registration of new users, as well as the
    | authentication of existing users. By default, this controller uses
    | a simple trait to add these behaviors. Why don't you explore it?
    |
    */

    use AuthenticatesAndRegistersUsers, ThrottlesLogins;

    /**
     * @var string
     */
    protected $redirectPath = 'admin';

    /**
     * @var string
     */
    protected $redirectAfterLogout = 'auth/admin/login';

    /**
     * @var string
     */
    protected $loginPath = 'auth/admin/login';

    /**
     * Create a new authentication controller instance.
     */
    public function __construct($uri = '', $name = '')
    {
        parent::__construct($uri, $name);
        $this->middleware('admin.guest', ['except' => 'getLogout']);
        //$this->middleware('admin.permission', ['permissions' => 'admin']);
    }

    /**
     * 后台登录
     *
     * @return View
     */
    public function getLogin() {
        return view('auth.admin.login');
    }
}