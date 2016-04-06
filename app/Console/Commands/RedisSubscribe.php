<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use Rds;

class RedisSubscribe extends Command
{
    /**
     * 控制台命令名称
     *
     * @var string
     */
    protected $signature = 'redis:subscribe';

    /**
     * 控制台命令描述
     *
     * @var string
     */
    protected $description = 'Subscribe to a Redis channel';

    /**
     * 执行控制台命令
     *
     * @return mixed
     */
    public function handle()
    {
        Rds::subscribe(['test-channel'], function($message) {
            echo $message;
        });
    }
}
