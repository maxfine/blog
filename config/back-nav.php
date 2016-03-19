<?php
/**
 * User: maxfine
 * Email: max_fine@qq.com
 * Date: 2015/8/23
 * Time: 17:41
 *
 * 后台导航配置
 */

return [
    [
        'id' => 1,
        'parent_id' => 0,
        'title' => '后台主页',
        'slug' => 'admin',
        'url' => '',
        'icon' => 'th-large',
        'active' => false,
    ],
    [
        'id' => 2,
        'parent_id' => 1,
        'title' => '控制面板',
        'slug' => '',
        'url' => 'admin/index',
        'icon' => 'th-large',
        'active' => false,
    ],
    [
        'id' => 3,
        'parent_id' => 1,
        'title' => '内容管理',
        'slug' => '',
        'url' => '',
        'icon' => 'edit',
        'active' => false,
    ],
    [
        'id' => 12,
        'parent_id' => 3,
        'title' => '栏目管理',
        'slug' => 'admin/categories',
        'url' => '',
        'icon' => '',
        'active' => false,
    ],
    [
        'id' => 4,
        'parent_id' => 3,
        'title' => '文章列表',
        'slug' => 'admin/posts',
        'url' => '',
        'icon' => '',
        'active' => false,
    ],
    [
        'id' => 5,
        'parent_id' => 1,
        'title' => '用户管理',
        'slug' => '',
        'url' => '',
        'icon' => 'user',
        'active' => false,
    ],
    [
        'id' => 6,
        'parent_id' => 5,
        'title' => '会员组',
        'slug' => 'admin/user_groups',
        'url' => '',
        'icon' => '',
        'active' => false,
    ],
    [
        'id' => 7,
        'parent_id' => 5,
        'title' => '会员',
        'slug' => 'admin/users',
        'url' => '',
        'icon' => '',
        'active' => false,
    ],
    [
        'id' => 8,
        'parent_id' => 1,
        'title' => '权限管理',
        'slug' => 'admin/permissions',
        'url' => '',
        'icon' => 'unlock',
        'active' => false,
    ],
    [
        'id' => 9,
        'parent_id' => 8,
        'title' => '角色',
        'slug' => 'admin/roles',
        'url' => '',
        'icon' => '',
        'active' => false,
    ],
    [
        'id' => 10,
        'parent_id' => 8,
        'title' => '权限',
        'slug' => 'admin/permissions',
        'url' => '',
        'icon' => '',
        'active' => false,
    ],
    [
        'id' => 11,
        'parent_id' => 8,
        'title' => '管理员',
        'slug' => 'admin/admins',
        'url' => '',
        'icon' => '',
        'active' => false,
    ],
];