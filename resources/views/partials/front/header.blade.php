<!-- start header -->
<header class="main-header">
</header>
<!-- end header -->

<!-- start navigation -->
<nav class="main-navigation">
    <div class="container">
        <div class="row">
            <div class="col-sm-12">
                <div class="navbar-header">
                        <span class="nav-toggle-button collapsed" data-toggle="collapse" data-target="#main-menu">
                        <span class="sr-only">Toggle navigation</span>
                        <i class="fa fa-bars"></i>
                        </span>
                </div>
                <div class="collapse navbar-collapse" id="main-menu">
                    <ul class="menu">
                        {!! HTML::menu_active('blog', '首页', ['class'=>'nav-current']) !!}
                        {!! HTML::menu_active('tags/list_posts/php', 'PHP', ['class'=>'nav-current']) !!}
                        {!! HTML::menu_active('tags/list_posts/mysql', 'MYSQL', ['class'=>'nav-current']) !!}
                    </ul>
                </div>
            </div>
        </div>
    </div>
</nav>
<!-- end navigation -->
