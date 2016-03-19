<?php

namespace App\Http\Controllers\Dome\TraitDome;

use Illuminate\Http\Request;

use App\Http\Requests;
use App\Http\Controllers\BaseController;
use App\Traits\Dome\TestTrait;
use App\Traits\Dome\CopyTestTrait;

class TraitController extends BaseController
{
    use TestTrait, CopyTestTrait{
        TestTrait::index insteadof CopyTestTrait;
    }

    public $bar;

    public function index()
    {
        $cookieDir= public_path('temp');
        dump($cookieDir);
        $cookieFile = tempnam($cookieDir, 'cookie');
        dump($cookieFile);
        return 'hello';
    }

}
