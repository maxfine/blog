<!--左侧导航开始-->
<nav class="navbar-default navbar-static-side" role="navigation">
    <div class="nav-close"><i class="fa fa-times-circle"></i>
    </div>
    <div class="sidebar-collapse">
        <ul class="nav" id="side-menu">
            <li class="nav-header">
                <div class="dropdown profile-element">
                    <span><img alt="image" width="64" height="64" class="img-circle logo" src="#" /></span>
                    <a data-toggle="dropdown" class="dropdown-toggle" href="#">
                               <span class="clear">
                                   <span class="block m-t-xs"><strong class="font-bold">{{ $currentUser['name'] }}</strong></span>
                                   <span class="text-muted text-xs block">{{ $currentUser['roles'][0]['display_name'] }}<b class="caret"></b></span>
                               </span>
                    </a>
                    <ul class="dropdown-menu animated fadeInRight m-t-xs">
                        <li><a class="J_menuItem" href="{{ URL('admin/admins/'. \Auth::user()->id .'/edit') }}">修改个人资料</a>
                        </li>
                        <li class="divider"></li>
                        <li><a href="{{ URL('auth/admin/logout') }}">安全退出</a>
                        </li>
                    </ul>
                </div>
                <div class="logo-element">EDC</div>
            </li>

            {!! $tree->getTreeView(1) !!}
        </ul>
    </div>
</nav>
<!--左侧导航结束-->