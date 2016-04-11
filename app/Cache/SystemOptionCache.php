<?php namespace App\Cache;

use App\Models\SystemOption as SystemOption;
use Cache;
use Config;

/**
 * Class SystemOptionCache
 *
 * 系统静态（配置项）缓存
 * 操作模型：SystemOption
 * 操作数据表：system_options
 *
 * @author maxfine<max_fine@qq.com>
 *
 * 1. 如果没有缓存, 则进行缓存
 * 2. 获取缓存
 */

class SystemOptionCache
{
    protected static $tags = ['system', 'static'];
    
    /**
     * 缓存系统静态配置
     * 操作SystemOption模型
     *
     * @return void
     */
    public static function cacheStatic()
    {
        /**
         * ---------------------------------------------------------
         * 缓存
         * ---------------------------------------------------------
         * 从数据库中获取数据
         * 如果缓存没有相应数据, 数据放入缓存
         */
        $ststemOptions = SystemOption::all();
        $cacheDrive = Config::get('cache.default');
        foreach($ststemOptions as $so) {
            if($cacheDrive === 'memcached' || $cacheDrive === 'redis') {
                Cache::tags(static::$tags)->forever($so['name'], $so['value']);
            } else {
                Cache::forever($so['name'], $so['value']);
            }
        }
    }

    /**
     * @param $name
     * @return bool
     * 判断是否存在缓存
     */
    public static function has($name)
    {
        $cacheDrive = Config::get('cache.default');
        if($cacheDrive === 'memcached' || $cacheDrive === 'redis') {
            return Cache::tags(static::$tags)->has($name);
        } else {
            return Cache::has($name);
        }

    }

    /**
     * 获取缓存
     * @param $name
     */
    public static function get($name, $default = null)
    {
        $value = null;

        $cacheDrive = Config::get('cache.default');
        if($cacheDrive === 'memcached' || $cacheDrive === 'redis') {
            $value = Cache::tags(static::$tags)->get($name, $default);
        } else {
            $value = Cache::get($name, $default);
        }

        return $value;
    }
    
    /**
     * 清理系统静态配置缓存
     * 操作SystemOption模型
     * 注意这里清理使用到了缓存标签，而：
     * 文件 或 数据库 这类缓存系统均不支持缓存标签. 此外, 使用带有 "forever" 的缓存标签时, 挑选 memcached 这类缓存系统将获得最好的性能, 它会自动清除过期的纪录。
     * 当缓存驱动为file时，实际上是无法清理掉全部系统静态配置缓存的（因为其键名key过多，通过查询数据库获取键名key清理缓存，实际上没有必要），建议直接调用cacheStatic()重建静态缓存
     *
     * @return void
     */
    public static function uncacheStatic()
    {
        $cacheDrive = Config::get('cache.default');
        if ($cacheDrive === 'memcached' || $cacheDrive === 'redis') {
            Cache::tags(static::$tags)->flush();
        }
    }
}
