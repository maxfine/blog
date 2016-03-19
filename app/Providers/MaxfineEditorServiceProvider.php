<?php

namespace App\Providers;

use App\Extensions\MaxfineParsedown;
use Illuminate\Support\ServiceProvider;

class MaxfineEditorServiceProvider extends ServiceProvider
{
    /**
     * Bootstrap the application services.
     *
     * @return void
     */
    public function boot()
    {
        $this->app['endaEditor']->resolver(function(){
            return new MaxfineParsedown();
        });
    }

    /**
     * Register the application services.
     *
     * @return void
     */
    public function register()
    {
        //
    }
}
