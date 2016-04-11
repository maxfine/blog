<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use App\Http\Requests;
use App\Http\Controllers\Controller;
use Auth;
use URL;
use Route;
use App\Cache\SystemOptionCache;
use Cache;

class BaseController extends Controller
{

    protected $currentUser;
    protected $pageTitle;
    protected $pageName;
    protected $uri;
    protected $siteConfig = [];

    public function __construct($name = '', $uri = '')
    {
        //共享当前用户
        //站点配置
        //当前页面uri, page_name, title
        $this->setCurrentUser(Auth::user())
            ->setUri($uri)
            ->setPageName($name)
            ->setPageTitle($this->loadPageTitle())
            ->setSiteConfig(config('site.site_config'));

        if(isset($this->currentUser)) view()->share('currentUser', $this->currentUser);

        /*
         * ----------------------------------------------
         * 缓存站点配置
         * ----------------------------------------------
         */
        if (!SystemOptionCache::has('website_title')) {  //如果分类缓存不存在
            SystemOptionCache::cacheStatic();
        }
        //share the config option to all the views
        view()->share('pageTitle', $this->getPageTitle());
        view()->share('title', $this->getPageTitle());
        view()->share('pageName', $this->getPageName());
        view()->share('uri', $this->getUri());
        view()->share('siteConfig', $this->getSiteConfig());
    }

    private function loadPageTitle()
    {
        $menus = config('site.front_menus');
        foreach ($menus as $title => $menu) {
            if (array_key_exists('children', $menu) && $menu['children'] ) {
                foreach ($menu['children'] as $childTitle => $child) {
                    if (strripos(URL::current(), $child['uri'])) {
                        return $title;
                    }
                }
            } else {
                if (strripos(URL::current(), $menu['uri'])) {
                    return $title;
                }
            }
        }
    }

    /**
     * @param null $view
     * @param array $data
     * @param array $mergeData
     * @return View
     */
    protected function view($view = null, $data = [], $mergeData = [])
    {
        return view($view, $data, $mergeData);
    }

    /**
     * @param $error
     * @return $this
     */
    protected function redirectWithError($error)
    {
        return redirect()->to($this->getRedirectUrl())
            ->withErrors(['default' => $error]);
    }

    protected function toIndex($alert='', $routeGroup = '')
    {
        /**
         * ---------------------------------------------------------
         * 最末尾需要包含'.', 如果传入的不包含'.', 则加上
         * ---------------------------------------------------------
         */
        if(!empty($routeGroup) && substr($routeGroup, -2) !== '::')$routeGroup = $routeGroup . '::';

        $redirect = redirect()->route($routeGroup . $this->uri.'.index');
        if ($alert) {
            $redirect->withErrors(['default' => $alert]);
        }
        return $redirect;
    }

    /**
     * @return mixed
     */
    public function getCurrentUser()
    {
        return $this->currentUser;
    }

    /**
     * @param mixed $currentUser
     */
    public function setCurrentUser($currentUser)
    {
        $this->currentUser = $currentUser;
        return $this;
    }

    /**
     * @return mixed
     */
    public function getPageTitle()
    {
        return $this->pageTitle;
    }

    /**
     * @param mixed $pageTitle
     */
    public function setPageTitle($pageTitle)
    {
        $this->pageTitle = $pageTitle;
        return $this;
    }

    /**
     * @return mixed
     */
    public function getPageName()
    {
        return $this->pageName;
    }

    /**
     * @param mixed $pageName
     */
    public function setPageName($pageName)
    {
        $this->pageName = $pageName;
        return $this;
    }

    /**
     * @return string
     */
    public function getUri()
    {
        return $this->uri;
    }

    /**
     * @param string $uri
     */
    public function setUri($uri)
    {
        if(!empty($uri)){
            $this->uri = $uri;
        }else{
            $currentRouteName = Route::currentRouteName();
            if(!empty($pos = strrpos($currentRouteName, '.'))){
                $this->uri = substr($currentRouteName, 0, $pos);
            }
        }

        return $this;
    }

    /**
     * @return array
     */
    public function getSiteConfig()
    {
        return $this->siteConfig;
    }

    /**
     * @param array $siteConfig
     */
    public function setSiteConfig($siteConfig)
    {
        $this->siteConfig = $siteConfig;
        return $this;
    }

}
