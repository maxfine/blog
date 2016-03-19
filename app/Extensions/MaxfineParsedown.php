<?php namespace App\Extensions;
/**
 * Created by maxfine<max_fine@qq.com>
 * Date: 2016/1/9
 * Time: 10:34
 */

use YuanChao\Editor\Parsedown;

class MaxfineParsedown extends Parsedown
{
    protected function inlineImage($Excerpt)
    {
        if ( ! isset($Excerpt['text'][1]) or $Excerpt['text'][1] !== '[')
        {
            return;
        }

        $Excerpt['text']= substr($Excerpt['text'], 1);

        $Link = $this->inlineLink($Excerpt);

        if ($Link === null)
        {
            return;
        }

        $Inline = array(
            'extent' => $Link['extent'] + 1,
            'element' => array(
                'name' => 'img',
                'attributes' => array(
                    'src' => $Link['element']['attributes']['href'],
                    'alt' => $Link['element']['text'],
                    'width' => '400',
                    'layer-src' => $Link['element']['attributes']['href'],
                    'layer-pid' => '',
                ),
            ),
        );

        $Inline['element']['attributes'] += $Link['element']['attributes'];

        unset($Inline['element']['attributes']['href']);

        return $Inline;
    }

}