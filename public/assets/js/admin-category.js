webpackJsonp([0],{

/***/ 0:
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function($) {/**
	 * 2016年1月29日17:16:13
	 */

	'use strict';

	__webpack_require__(85);
	__webpack_require__(94);
	__webpack_require__(102);
	__webpack_require__(104);

	__webpack_require__(82);
	__webpack_require__(110);
	__webpack_require__(111);
	__webpack_require__(112);

	__webpack_require__(113);
	layer.config({
	    path: '/plugins/layer/' //layer.js所在的目录，可以是绝对目录，也可以是相对目录
	});

	__webpack_require__(114);
	//require('../css/admin/waves.css');
	var Waves = __webpack_require__(116);
	$(function(){
	    Waves.attach('.flat-buttons', ['waves-button']);
	    Waves.init();
	});

	__webpack_require__(117);
	__webpack_require__(119);
	__webpack_require__(120);
	jQuery.datetimepicker.setLocale('zh');

	__webpack_require__(121);

	__webpack_require__(128);
	__webpack_require__(130);
	__webpack_require__(132);

	__webpack_require__(133);
	__webpack_require__(137);

	__webpack_require__(138);
	__webpack_require__(140);

	$(function(){
	    $("select[name='tags[]']").selectize({
	        create: true,
	        maxItems: 10
	    });

	    $("select[name='parent_id']").selectize({
	        create: true
	    });

	    $(".i-checks").iCheck({
	        checkboxClass:"icheckbox_square-green",
	        radioClass: 'icheckbox_square-green'
	    });

	    $(":checkbox[name='show_in_nav']").iCheck({
	        checkboxClass:"icheckbox_square-green",
	        radioClass: 'icheckbox_square-green'
	    });

	    $(":checkbox[name='is_show']").iCheck({
	        checkboxClass:"icheckbox_square-green",
	        radioClass: 'icheckbox_square-green'
	    });
	});

	__webpack_require__(141);



	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(82)))

/***/ },

/***/ 114:
/***/ function(module, exports) {

	// removed by extract-text-webpack-plugin

/***/ },

/***/ 116:
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;/* WEBPACK VAR INJECTION */(function(global) {/*!
	 * Waves v0.7.4
	 * http://fian.my.id/Waves
	 *
	 * Copyright 2014 Alfiana E. Sibuea and other contributors
	 * Released under the MIT license
	 * https://github.com/fians/Waves/blob/master/LICENSE
	 */

	;(function(window, factory) {
	    'use strict';

	    // AMD. Register as an anonymous module.  Wrap in function so we have access
	    // to root via `this`.
	    if (true) {
	        !(__WEBPACK_AMD_DEFINE_ARRAY__ = [], __WEBPACK_AMD_DEFINE_RESULT__ = function() {
	            return factory.apply(window);
	        }.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
	    }

	    // Node. Does not work with strict CommonJS, but only CommonJS-like
	    // environments that support module.exports, like Node.
	    else if (typeof exports === 'object') {
	        module.exports = factory.call(window);
	    }

	    // Browser globals.
	    else {
	        window.Waves = factory.call(window);
	    }
	})(typeof global === 'object' ? global : this, function() {
	    'use strict';

	    var Waves            = Waves || {};
	    var $$               = document.querySelectorAll.bind(document);
	    var toString         = Object.prototype.toString;
	    var isTouchAvailable = 'ontouchstart' in window;


	    // Find exact position of element
	    function isWindow(obj) {
	        return obj !== null && obj === obj.window;
	    }

	    function getWindow(elem) {
	        return isWindow(elem) ? elem : elem.nodeType === 9 && elem.defaultView;
	    }

	    function isObject(value) {
	        var type = typeof value;
	        return type === 'function' || type === 'object' && !!value;
	    }

	    function isDOMNode(obj) {
	        return isObject(obj) && obj.nodeType > 0;
	    }

	    function getWavesElements(nodes) {
	        var stringRepr = toString.call(nodes);

	        if (stringRepr === '[object String]') {
	            return $$(nodes);
	        } else if (isObject(nodes) && /^\[object (HTMLCollection|NodeList|Object)\]$/.test(stringRepr) && nodes.hasOwnProperty('length')) {
	            return nodes;
	        } else if (isDOMNode(nodes)) {
	            return [nodes];
	        }

	        return [];
	    }

	    function offset(elem) {
	        var docElem, win,
	            box = { top: 0, left: 0 },
	            doc = elem && elem.ownerDocument;

	        docElem = doc.documentElement;

	        if (typeof elem.getBoundingClientRect !== typeof undefined) {
	            box = elem.getBoundingClientRect();
	        }
	        win = getWindow(doc);
	        return {
	            top: box.top + win.pageYOffset - docElem.clientTop,
	            left: box.left + win.pageXOffset - docElem.clientLeft
	        };
	    }

	    function convertStyle(styleObj) {
	        var style = '';

	        for (var prop in styleObj) {
	            if (styleObj.hasOwnProperty(prop)) {
	                style += (prop + ':' + styleObj[prop] + ';');
	            }
	        }

	        return style;
	    }

	    var Effect = {

	        // Effect duration
	        duration: 750,

	        // Effect delay (check for scroll before showing effect)
	        delay: 200,

	        show: function(e, element, velocity) {

	            // Disable right click
	            if (e.button === 2) {
	                return false;
	            }

	            element = element || this;

	            // Create ripple
	            var ripple = document.createElement('div');
	            ripple.className = 'waves-ripple waves-rippling';
	            element.appendChild(ripple);

	            // Get click coordinate and element width
	            var pos       = offset(element);
	            var relativeY = 0;
	            var relativeX = 0;
	            // Support for touch devices
	            if('touches' in e && e.touches.length) {
	                relativeY   = (e.touches[0].pageY - pos.top);
	                relativeX   = (e.touches[0].pageX - pos.left);
	            }
	            //Normal case
	            else {
	                relativeY   = (e.pageY - pos.top);
	                relativeX   = (e.pageX - pos.left);
	            }
	            // Support for synthetic events
	            relativeX = relativeX >= 0 ? relativeX : 0;
	            relativeY = relativeY >= 0 ? relativeY : 0;

	            var scale     = 'scale(' + ((element.clientWidth / 100) * 3) + ')';
	            var translate = 'translate(0,0)';

	            if (velocity) {
	                translate = 'translate(' + (velocity.x) + 'px, ' + (velocity.y) + 'px)';
	            }

	            // Attach data to element
	            ripple.setAttribute('data-hold', Date.now());
	            ripple.setAttribute('data-x', relativeX);
	            ripple.setAttribute('data-y', relativeY);
	            ripple.setAttribute('data-scale', scale);
	            ripple.setAttribute('data-translate', translate);

	            // Set ripple position
	            var rippleStyle = {
	                top: relativeY + 'px',
	                left: relativeX + 'px'
	            };

	            ripple.classList.add('waves-notransition');
	            ripple.setAttribute('style', convertStyle(rippleStyle));
	            ripple.classList.remove('waves-notransition');

	            // Scale the ripple
	            rippleStyle['-webkit-transform'] = scale + ' ' + translate;
	            rippleStyle['-moz-transform'] = scale + ' ' + translate;
	            rippleStyle['-ms-transform'] = scale + ' ' + translate;
	            rippleStyle['-o-transform'] = scale + ' ' + translate;
	            rippleStyle.transform = scale + ' ' + translate;
	            rippleStyle.opacity = '1';

	            var duration = e.type === 'mousemove' ? 2500 : Effect.duration;
	            rippleStyle['-webkit-transition-duration'] = duration + 'ms';
	            rippleStyle['-moz-transition-duration']    = duration + 'ms';
	            rippleStyle['-o-transition-duration']      = duration + 'ms';
	            rippleStyle['transition-duration']         = duration + 'ms';

	            ripple.setAttribute('style', convertStyle(rippleStyle));
	        },

	        hide: function(e, element) {
	            element = element || this;

	            var ripples = element.getElementsByClassName('waves-rippling');

	            for (var i = 0, len = ripples.length; i < len; i++) {
	                removeRipple(e, element, ripples[i]);
	            }
	        }
	    };

	    /**
	     * Collection of wrapper for HTML element that only have single tag
	     * like <input> and <img>
	     */
	    var TagWrapper = {

	        // Wrap <input> tag so it can perform the effect
	        input: function(element) {

	            var parent = element.parentNode;

	            // If input already have parent just pass through
	            if (parent.tagName.toLowerCase() === 'i' && parent.classList.contains('waves-effect')) {
	                return;
	            }

	            // Put element class and style to the specified parent
	            var wrapper       = document.createElement('i');
	            wrapper.className = element.className + ' waves-input-wrapper';
	            element.className = 'waves-button-input';

	            // Put element as child
	            parent.replaceChild(wrapper, element);
	            wrapper.appendChild(element);

	            // Apply element color and background color to wrapper
	            var elementStyle    = window.getComputedStyle(element, null);
	            var color           = elementStyle.color;
	            var backgroundColor = elementStyle.backgroundColor;

	            wrapper.setAttribute('style', 'color:' + color + ';background:' + backgroundColor);
	            element.setAttribute('style', 'background-color:rgba(0,0,0,0);');

	        },

	        // Wrap <img> tag so it can perform the effect
	        img: function(element) {

	            var parent = element.parentNode;

	            // If input already have parent just pass through
	            if (parent.tagName.toLowerCase() === 'i' && parent.classList.contains('waves-effect')) {
	                return;
	            }

	            // Put element as child
	            var wrapper  = document.createElement('i');
	            parent.replaceChild(wrapper, element);
	            wrapper.appendChild(element);

	        }
	    };

	    /**
	     * Hide the effect and remove the ripple. Must be
	     * a separate function to pass the JSLint...
	     */
	    function removeRipple(e, el, ripple) {

	        // Check if the ripple still exist
	        if (!ripple) {
	            return;
	        }

	        ripple.classList.remove('waves-rippling');

	        var relativeX = ripple.getAttribute('data-x');
	        var relativeY = ripple.getAttribute('data-y');
	        var scale     = ripple.getAttribute('data-scale');
	        var translate = ripple.getAttribute('data-translate');

	        // Get delay beetween mousedown and mouse leave
	        var diff = Date.now() - Number(ripple.getAttribute('data-hold'));
	        var delay = 350 - diff;

	        if (delay < 0) {
	            delay = 0;
	        }

	        if (e.type === 'mousemove') {
	            delay = 150;
	        }

	        // Fade out ripple after delay
	        var duration = e.type === 'mousemove' ? 2500 : Effect.duration;

	        setTimeout(function() {

	            var style = {
	                top: relativeY + 'px',
	                left: relativeX + 'px',
	                opacity: '0',

	                // Duration
	                '-webkit-transition-duration': duration + 'ms',
	                '-moz-transition-duration': duration + 'ms',
	                '-o-transition-duration': duration + 'ms',
	                'transition-duration': duration + 'ms',
	                '-webkit-transform': scale + ' ' + translate,
	                '-moz-transform': scale + ' ' + translate,
	                '-ms-transform': scale + ' ' + translate,
	                '-o-transform': scale + ' ' + translate,
	                'transform': scale + ' ' + translate
	            };

	            ripple.setAttribute('style', convertStyle(style));

	            setTimeout(function() {
	                try {
	                    el.removeChild(ripple);
	                } catch (e) {
	                    return false;
	                }
	            }, duration);

	        }, delay);
	    }


	    /**
	     * Disable mousedown event for 500ms during and after touch
	     */
	    var TouchHandler = {

	        /* uses an integer rather than bool so there's no issues with
	         * needing to clear timeouts if another touch event occurred
	         * within the 500ms. Cannot mouseup between touchstart and
	         * touchend, nor in the 500ms after touchend. */
	        touches: 0,

	        allowEvent: function(e) {

	            var allow = true;

	            if (/^(mousedown|mousemove)$/.test(e.type) && TouchHandler.touches) {
	                allow = false;
	            }

	            return allow;
	        },
	        registerEvent: function(e) {
	            var eType = e.type;

	            if (eType === 'touchstart') {

	                TouchHandler.touches += 1; // push

	            } else if (/^(touchend|touchcancel)$/.test(eType)) {

	                setTimeout(function() {
	                    if (TouchHandler.touches) {
	                        TouchHandler.touches -= 1; // pop after 500ms
	                    }
	                }, 500);

	            }
	        }
	    };


	    /**
	     * Delegated click handler for .waves-effect element.
	     * returns null when .waves-effect element not in "click tree"
	     */
	    function getWavesEffectElement(e) {

	        if (TouchHandler.allowEvent(e) === false) {
	            return null;
	        }

	        var element = null;
	        var target = e.target || e.srcElement;

	        while (target.parentElement !== null) {
	            if (target.classList.contains('waves-effect') && (!(target instanceof SVGElement))) {
	                element = target;
	                break;
	            }
	            target = target.parentElement;
	        }

	        return element;
	    }

	    /**
	     * Bubble the click and show effect if .waves-effect elem was found
	     */
	    function showEffect(e) {

	        // Disable effect if element has "disabled" property on it
	        // In some cases, the event is not triggered by the current element
	        // if (e.target.getAttribute('disabled') !== null) {
	        //     return;
	        // }

	        var element = getWavesEffectElement(e);

	        if (element !== null) {

	            // Make it sure the element has either disabled property, disabled attribute or 'disabled' class
	            if (element.disabled || element.getAttribute('disabled') || element.classList.contains('disabled')) {
	                return;
	            }

	            TouchHandler.registerEvent(e);

	            if (e.type === 'touchstart' && Effect.delay) {

	                var hidden = false;

	                var timer = setTimeout(function () {
	                    timer = null;
	                    Effect.show(e, element);
	                }, Effect.delay);

	                var hideEffect = function(hideEvent) {

	                    // if touch hasn't moved, and effect not yet started: start effect now
	                    if (timer) {
	                        clearTimeout(timer);
	                        timer = null;
	                        Effect.show(e, element);
	                    }
	                    if (!hidden) {
	                        hidden = true;
	                        Effect.hide(hideEvent, element);
	                    }
	                };

	                var touchMove = function(moveEvent) {
	                    if (timer) {
	                        clearTimeout(timer);
	                        timer = null;
	                    }
	                    hideEffect(moveEvent);
	                };

	                element.addEventListener('touchmove', touchMove, false);
	                element.addEventListener('touchend', hideEffect, false);
	                element.addEventListener('touchcancel', hideEffect, false);

	            } else {

	                Effect.show(e, element);

	                if (isTouchAvailable) {
	                    element.addEventListener('touchend', Effect.hide, false);
	                    element.addEventListener('touchcancel', Effect.hide, false);
	                }

	                element.addEventListener('mouseup', Effect.hide, false);
	                element.addEventListener('mouseleave', Effect.hide, false);
	            }
	        }
	    }

	    Waves.init = function(options) {
	        var body = document.body;

	        options = options || {};

	        if ('duration' in options) {
	            Effect.duration = options.duration;
	        }

	        if ('delay' in options) {
	            Effect.delay = options.delay;
	        }

	        if (isTouchAvailable) {
	            body.addEventListener('touchstart', showEffect, false);
	            body.addEventListener('touchcancel', TouchHandler.registerEvent, false);
	            body.addEventListener('touchend', TouchHandler.registerEvent, false);
	        }

	        body.addEventListener('mousedown', showEffect, false);
	    };


	    /**
	     * Attach Waves to dynamically loaded inputs, or add .waves-effect and other
	     * waves classes to a set of elements. Set drag to true if the ripple mouseover
	     * or skimming effect should be applied to the elements.
	     */
	    Waves.attach = function(elements, classes) {

	        elements = getWavesElements(elements);

	        if (toString.call(classes) === '[object Array]') {
	            classes = classes.join(' ');
	        }

	        classes = classes ? ' ' + classes : '';

	        var element, tagName;

	        for (var i = 0, len = elements.length; i < len; i++) {

	            element = elements[i];
	            tagName = element.tagName.toLowerCase();

	            if (['input', 'img'].indexOf(tagName) !== -1) {
	                TagWrapper[tagName](element);
	                element = element.parentElement;
	            }

	            if (element.className.indexOf('waves-effect') === -1) {
	                element.className += ' waves-effect' + classes;
	            }
	        }
	    };


	    /**
	     * Cause a ripple to appear in an element via code.
	     */
	    Waves.ripple = function(elements, options) {
	        elements = getWavesElements(elements);
	        var elementsLen = elements.length;

	        options          = options || {};
	        options.wait     = options.wait || 0;
	        options.position = options.position || null; // default = centre of element


	        if (elementsLen) {
	            var element, pos, off, centre = {}, i = 0;
	            var mousedown = {
	                type: 'mousedown',
	                button: 1
	            };
	            var hideRipple = function(mouseup, element) {
	                return function() {
	                    Effect.hide(mouseup, element);
	                };
	            };

	            for (; i < elementsLen; i++) {
	                element = elements[i];
	                pos = options.position || {
	                    x: element.clientWidth / 2,
	                    y: element.clientHeight / 2
	                };

	                off      = offset(element);
	                centre.x = off.left + pos.x;
	                centre.y = off.top + pos.y;

	                mousedown.pageX = centre.x;
	                mousedown.pageY = centre.y;

	                Effect.show(mousedown, element);

	                if (options.wait >= 0 && options.wait !== null) {
	                    var mouseup = {
	                        type: 'mouseup',
	                        button: 1
	                    };

	                    setTimeout(hideRipple(mouseup, element), options.wait);
	                }
	            }
	        }
	    };

	    /**
	     * Remove all ripples from an element.
	     */
	    Waves.calm = function(elements) {
	        elements = getWavesElements(elements);
	        var mouseup = {
	            type: 'mouseup',
	            button: 1
	        };

	        for (var i = 0, len = elements.length; i < len; i++) {
	            Effect.hide(mouseup, elements[i]);
	        }
	    };

	    /**
	     * Deprecated API fallback
	     */
	    Waves.displayEffect = function(options) {
	        console.error('Waves.displayEffect() has been deprecated and will be removed in future version. Please use Waves.init() to initialize Waves effect');
	        Waves.init(options);
	    };

	    return Waves;
	});

	/* WEBPACK VAR INJECTION */}.call(exports, (function() { return this; }())))

/***/ },

/***/ 117:
/***/ function(module, exports) {

	// removed by extract-text-webpack-plugin

/***/ },

/***/ 119:
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;/*!
	 * jQuery Mousewheel 3.1.13
	 *
	 * Copyright jQuery Foundation and other contributors
	 * Released under the MIT license
	 * http://jquery.org/license
	 */

	(function (factory) {
	    if ( true ) {
	        // AMD. Register as an anonymous module.
	        !(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(82)], __WEBPACK_AMD_DEFINE_FACTORY__ = (factory), __WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ? (__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
	    } else if (typeof exports === 'object') {
	        // Node/CommonJS style for Browserify
	        module.exports = factory;
	    } else {
	        // Browser globals
	        factory(jQuery);
	    }
	}(function ($) {

	    var toFix  = ['wheel', 'mousewheel', 'DOMMouseScroll', 'MozMousePixelScroll'],
	        toBind = ( 'onwheel' in document || document.documentMode >= 9 ) ?
	                    ['wheel'] : ['mousewheel', 'DomMouseScroll', 'MozMousePixelScroll'],
	        slice  = Array.prototype.slice,
	        nullLowestDeltaTimeout, lowestDelta;

	    if ( $.event.fixHooks ) {
	        for ( var i = toFix.length; i; ) {
	            $.event.fixHooks[ toFix[--i] ] = $.event.mouseHooks;
	        }
	    }

	    var special = $.event.special.mousewheel = {
	        version: '3.1.12',

	        setup: function() {
	            if ( this.addEventListener ) {
	                for ( var i = toBind.length; i; ) {
	                    this.addEventListener( toBind[--i], handler, false );
	                }
	            } else {
	                this.onmousewheel = handler;
	            }
	            // Store the line height and page height for this particular element
	            $.data(this, 'mousewheel-line-height', special.getLineHeight(this));
	            $.data(this, 'mousewheel-page-height', special.getPageHeight(this));
	        },

	        teardown: function() {
	            if ( this.removeEventListener ) {
	                for ( var i = toBind.length; i; ) {
	                    this.removeEventListener( toBind[--i], handler, false );
	                }
	            } else {
	                this.onmousewheel = null;
	            }
	            // Clean up the data we added to the element
	            $.removeData(this, 'mousewheel-line-height');
	            $.removeData(this, 'mousewheel-page-height');
	        },

	        getLineHeight: function(elem) {
	            var $elem = $(elem),
	                $parent = $elem['offsetParent' in $.fn ? 'offsetParent' : 'parent']();
	            if (!$parent.length) {
	                $parent = $('body');
	            }
	            return parseInt($parent.css('fontSize'), 10) || parseInt($elem.css('fontSize'), 10) || 16;
	        },

	        getPageHeight: function(elem) {
	            return $(elem).height();
	        },

	        settings: {
	            adjustOldDeltas: true, // see shouldAdjustOldDeltas() below
	            normalizeOffset: true  // calls getBoundingClientRect for each event
	        }
	    };

	    $.fn.extend({
	        mousewheel: function(fn) {
	            return fn ? this.bind('mousewheel', fn) : this.trigger('mousewheel');
	        },

	        unmousewheel: function(fn) {
	            return this.unbind('mousewheel', fn);
	        }
	    });


	    function handler(event) {
	        var orgEvent   = event || window.event,
	            args       = slice.call(arguments, 1),
	            delta      = 0,
	            deltaX     = 0,
	            deltaY     = 0,
	            absDelta   = 0,
	            offsetX    = 0,
	            offsetY    = 0;
	        event = $.event.fix(orgEvent);
	        event.type = 'mousewheel';

	        // Old school scrollwheel delta
	        if ( 'detail'      in orgEvent ) { deltaY = orgEvent.detail * -1;      }
	        if ( 'wheelDelta'  in orgEvent ) { deltaY = orgEvent.wheelDelta;       }
	        if ( 'wheelDeltaY' in orgEvent ) { deltaY = orgEvent.wheelDeltaY;      }
	        if ( 'wheelDeltaX' in orgEvent ) { deltaX = orgEvent.wheelDeltaX * -1; }

	        // Firefox < 17 horizontal scrolling related to DOMMouseScroll event
	        if ( 'axis' in orgEvent && orgEvent.axis === orgEvent.HORIZONTAL_AXIS ) {
	            deltaX = deltaY * -1;
	            deltaY = 0;
	        }

	        // Set delta to be deltaY or deltaX if deltaY is 0 for backwards compatabilitiy
	        delta = deltaY === 0 ? deltaX : deltaY;

	        // New school wheel delta (wheel event)
	        if ( 'deltaY' in orgEvent ) {
	            deltaY = orgEvent.deltaY * -1;
	            delta  = deltaY;
	        }
	        if ( 'deltaX' in orgEvent ) {
	            deltaX = orgEvent.deltaX;
	            if ( deltaY === 0 ) { delta  = deltaX * -1; }
	        }

	        // No change actually happened, no reason to go any further
	        if ( deltaY === 0 && deltaX === 0 ) { return; }

	        // Need to convert lines and pages to pixels if we aren't already in pixels
	        // There are three delta modes:
	        //   * deltaMode 0 is by pixels, nothing to do
	        //   * deltaMode 1 is by lines
	        //   * deltaMode 2 is by pages
	        if ( orgEvent.deltaMode === 1 ) {
	            var lineHeight = $.data(this, 'mousewheel-line-height');
	            delta  *= lineHeight;
	            deltaY *= lineHeight;
	            deltaX *= lineHeight;
	        } else if ( orgEvent.deltaMode === 2 ) {
	            var pageHeight = $.data(this, 'mousewheel-page-height');
	            delta  *= pageHeight;
	            deltaY *= pageHeight;
	            deltaX *= pageHeight;
	        }

	        // Store lowest absolute delta to normalize the delta values
	        absDelta = Math.max( Math.abs(deltaY), Math.abs(deltaX) );

	        if ( !lowestDelta || absDelta < lowestDelta ) {
	            lowestDelta = absDelta;

	            // Adjust older deltas if necessary
	            if ( shouldAdjustOldDeltas(orgEvent, absDelta) ) {
	                lowestDelta /= 40;
	            }
	        }

	        // Adjust older deltas if necessary
	        if ( shouldAdjustOldDeltas(orgEvent, absDelta) ) {
	            // Divide all the things by 40!
	            delta  /= 40;
	            deltaX /= 40;
	            deltaY /= 40;
	        }

	        // Get a whole, normalized value for the deltas
	        delta  = Math[ delta  >= 1 ? 'floor' : 'ceil' ](delta  / lowestDelta);
	        deltaX = Math[ deltaX >= 1 ? 'floor' : 'ceil' ](deltaX / lowestDelta);
	        deltaY = Math[ deltaY >= 1 ? 'floor' : 'ceil' ](deltaY / lowestDelta);

	        // Normalise offsetX and offsetY properties
	        if ( special.settings.normalizeOffset && this.getBoundingClientRect ) {
	            var boundingRect = this.getBoundingClientRect();
	            offsetX = event.clientX - boundingRect.left;
	            offsetY = event.clientY - boundingRect.top;
	        }

	        // Add information to the event object
	        event.deltaX = deltaX;
	        event.deltaY = deltaY;
	        event.deltaFactor = lowestDelta;
	        event.offsetX = offsetX;
	        event.offsetY = offsetY;
	        // Go ahead and set deltaMode to 0 since we converted to pixels
	        // Although this is a little odd since we overwrite the deltaX/Y
	        // properties with normalized deltas.
	        event.deltaMode = 0;

	        // Add event and delta to the front of the arguments
	        args.unshift(event, delta, deltaX, deltaY);

	        // Clearout lowestDelta after sometime to better
	        // handle multiple device types that give different
	        // a different lowestDelta
	        // Ex: trackpad = 3 and mouse wheel = 120
	        if (nullLowestDeltaTimeout) { clearTimeout(nullLowestDeltaTimeout); }
	        nullLowestDeltaTimeout = setTimeout(nullLowestDelta, 200);

	        return ($.event.dispatch || $.event.handle).apply(this, args);
	    }

	    function nullLowestDelta() {
	        lowestDelta = null;
	    }

	    function shouldAdjustOldDeltas(orgEvent, absDelta) {
	        // If this is an older event and the delta is divisable by 120,
	        // then we are assuming that the browser is treating this as an
	        // older mouse wheel event and that we should divide the deltas
	        // by 40 to try and get a more usable deltaFactor.
	        // Side note, this actually impacts the reported scroll distance
	        // in older browsers and can cause scrolling to be slower than native.
	        // Turn this off by setting $.event.special.mousewheel.settings.adjustOldDeltas to false.
	        return special.settings.adjustOldDeltas && orgEvent.type === 'mousewheel' && absDelta % 120 === 0;
	    }

	}));


/***/ },

/***/ 120:
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;/*!
	 * @copyright Copyright &copy; Kartik Visweswaran, Krajee.com, 2014 - 2015
	 * @version 1.3.3
	 *
	 * Date formatter utility library that allows formatting date/time variables or Date objects using PHP DateTime format.
	 * @see http://php.net/manual/en/function.date.php
	 *
	 * For more JQuery plugins visit http://plugins.krajee.com
	 * For more Yii related demos visit http://demos.krajee.com
	 */
	var DateFormatter;
	(function () {
	    "use strict";

	    var _compare, _lpad, _extend, defaultSettings, DAY, HOUR;
	    DAY = 1000 * 60 * 60 * 24;
	    HOUR = 3600;

	    _compare = function (str1, str2) {
	        return typeof(str1) === 'string' && typeof(str2) === 'string' && str1.toLowerCase() === str2.toLowerCase();
	    };
	    _lpad = function (value, length, char) {
	        var chr = char || '0', val = value.toString();
	        return val.length < length ? _lpad(chr + val, length) : val;
	    };
	    _extend = function (out) {
	        var i, obj;
	        out = out || {};
	        for (i = 1; i < arguments.length; i++) {
	            obj = arguments[i];
	            if (!obj) {
	                continue;
	            }
	            for (var key in obj) {
	                if (obj.hasOwnProperty(key)) {
	                    if (typeof obj[key] === 'object') {
	                        _extend(out[key], obj[key]);
	                    } else {
	                        out[key] = obj[key];
	                    }
	                }
	            }
	        }
	        return out;
	    };
	    defaultSettings = {
	        dateSettings: {
	            days: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
	            daysShort: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
	            months: [
	                'January', 'February', 'March', 'April', 'May', 'June', 'July',
	                'August', 'September', 'October', 'November', 'December'
	            ],
	            monthsShort: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
	            meridiem: ['AM', 'PM'],
	            ordinal: function (number) {
	                var n = number % 10, suffixes = {1: 'st', 2: 'nd', 3: 'rd'};
	                return Math.floor(number % 100 / 10) === 1 || !suffixes[n] ? 'th' : suffixes[n];
	            }
	        },
	        separators: /[ \-+\/\.T:@]/g,
	        validParts: /[dDjlNSwzWFmMntLoYyaABgGhHisueTIOPZcrU]/g,
	        intParts: /[djwNzmnyYhHgGis]/g,
	        tzParts: /\b(?:[PMCEA][SDP]T|(?:Pacific|Mountain|Central|Eastern|Atlantic) (?:Standard|Daylight|Prevailing) Time|(?:GMT|UTC)(?:[-+]\d{4})?)\b/g,
	        tzClip: /[^-+\dA-Z]/g
	    };

	    DateFormatter = function (options) {
	        var self = this, config = _extend(defaultSettings, options);
	        self.dateSettings = config.dateSettings;
	        self.separators = config.separators;
	        self.validParts = config.validParts;
	        self.intParts = config.intParts;
	        self.tzParts = config.tzParts;
	        self.tzClip = config.tzClip;
	    };

	    DateFormatter.prototype = {
	        constructor: DateFormatter,
	        parseDate: function (vDate, vFormat) {
	            var self = this, vFormatParts, vDateParts, i, vDateFlag = false, vTimeFlag = false, vDatePart, iDatePart,
	                vSettings = self.dateSettings, vMonth, vMeriIndex, vMeriOffset, len, mer,
	                out = {date: null, year: null, month: null, day: null, hour: 0, min: 0, sec: 0};
	            if (!vDate) {
	                return undefined;
	            }
	            if (vDate instanceof Date) {
	                return vDate;
	            }
	            if (typeof vDate === 'number') {
	                return new Date(vDate);
	            }
	            if (vFormat === 'U') {
	                i = parseInt(vDate);
	                return i ? new Date(i * 1000) : vDate;
	            }
	            if (typeof vDate !== 'string') {
	                return '';
	            }
	            vFormatParts = vFormat.match(self.validParts);
	            if (!vFormatParts || vFormatParts.length === 0) {
	                throw new Error("Invalid date format definition.");
	            }
	            vDateParts = vDate.replace(self.separators, '\0').split('\0');
	            for (i = 0; i < vDateParts.length; i++) {
	                vDatePart = vDateParts[i];
	                iDatePart = parseInt(vDatePart);
	                switch (vFormatParts[i]) {
	                    case 'y':
	                    case 'Y':
	                        len = vDatePart.length;
	                        if (len === 2) {
	                            out.year = parseInt((iDatePart < 70 ? '20' : '19') + vDatePart);
	                        } else if (len === 4) {
	                            out.year = iDatePart;
	                        }
	                        vDateFlag = true;
	                        break;
	                    case 'm':
	                    case 'n':
	                    case 'M':
	                    case 'F':
	                        if (isNaN(vDatePart)) {
	                            vMonth = vSettings.monthsShort.indexOf(vDatePart);
	                            if (vMonth > -1) {
	                                out.month = vMonth + 1;
	                            }
	                            vMonth = vSettings.months.indexOf(vDatePart);
	                            if (vMonth > -1) {
	                                out.month = vMonth + 1;
	                            }
	                        } else {
	                            if (iDatePart >= 1 && iDatePart <= 12) {
	                                out.month = iDatePart;
	                            }
	                        }
	                        vDateFlag = true;
	                        break;
	                    case 'd':
	                    case 'j':
	                        if (iDatePart >= 1 && iDatePart <= 31) {
	                            out.day = iDatePart;
	                        }
	                        vDateFlag = true;
	                        break;
	                    case 'g':
	                    case 'h':
	                        vMeriIndex = (vFormatParts.indexOf('a') > -1) ? vFormatParts.indexOf('a') :
	                            (vFormatParts.indexOf('A') > -1) ? vFormatParts.indexOf('A') : -1;
	                        mer = vDateParts[vMeriIndex];
	                        if (vMeriIndex > -1) {
	                            vMeriOffset = _compare(mer, vSettings.meridiem[0]) ? 0 :
	                                (_compare(mer, vSettings.meridiem[1]) ? 12 : -1);
	                            if (iDatePart >= 1 && iDatePart <= 12 && vMeriOffset > -1) {
	                                out.hour = iDatePart + vMeriOffset - 1;
	                            } else if (iDatePart >= 0 && iDatePart <= 23) {
	                                out.hour = iDatePart;
	                            }
	                        } else if (iDatePart >= 0 && iDatePart <= 23) {
	                            out.hour = iDatePart;
	                        }
	                        vTimeFlag = true;
	                        break;
	                    case 'G':
	                    case 'H':
	                        if (iDatePart >= 0 && iDatePart <= 23) {
	                            out.hour = iDatePart;
	                        }
	                        vTimeFlag = true;
	                        break;
	                    case 'i':
	                        if (iDatePart >= 0 && iDatePart <= 59) {
	                            out.min = iDatePart;
	                        }
	                        vTimeFlag = true;
	                        break;
	                    case 's':
	                        if (iDatePart >= 0 && iDatePart <= 59) {
	                            out.sec = iDatePart;
	                        }
	                        vTimeFlag = true;
	                        break;
	                }
	            }
	            if (vDateFlag === true && out.year && out.month && out.day) {
	                out.date = new Date(out.year, out.month - 1, out.day, out.hour, out.min, out.sec, 0);
	            } else {
	                if (vTimeFlag !== true) {
	                    return false;
	                }
	                out.date = new Date(0, 0, 0, out.hour, out.min, out.sec, 0);
	            }
	            return out.date;
	        },
	        guessDate: function (vDateStr, vFormat) {
	            if (typeof vDateStr !== 'string') {
	                return vDateStr;
	            }
	            var self = this, vParts = vDateStr.replace(self.separators, '\0').split('\0'), vPattern = /^[djmn]/g,
	                vFormatParts = vFormat.match(self.validParts), vDate = new Date(), vDigit = 0, vYear, i, iPart, iSec;

	            if (!vPattern.test(vFormatParts[0])) {
	                return vDateStr;
	            }

	            for (i = 0; i < vParts.length; i++) {
	                vDigit = 2;
	                iPart = vParts[i];
	                iSec = parseInt(iPart.substr(0, 2));
	                switch (i) {
	                    case 0:
	                        if (vFormatParts[0] === 'm' || vFormatParts[0] === 'n') {
	                            vDate.setMonth(iSec - 1);
	                        } else {
	                            vDate.setDate(iSec);
	                        }
	                        break;
	                    case 1:
	                        if (vFormatParts[0] === 'm' || vFormatParts[0] === 'n') {
	                            vDate.setDate(iSec);
	                        } else {
	                            vDate.setMonth(iSec - 1);
	                        }
	                        break;
	                    case 2:
	                        vYear = vDate.getFullYear();
	                        if (iPart.length < 4) {
	                            vDate.setFullYear(parseInt(vYear.toString().substr(0, 4 - iPart.length) + iPart));
	                            vDigit = iPart.length;
	                        } else {
	                            vDate.setFullYear = parseInt(iPart.substr(0, 4));
	                            vDigit = 4;
	                        }
	                        break;
	                    case 3:
	                        vDate.setHours(iSec);
	                        break;
	                    case 4:
	                        vDate.setMinutes(iSec);
	                        break;
	                    case 5:
	                        vDate.setSeconds(iSec);
	                        break;
	                }
	                if (iPart.substr(vDigit).length > 0) {
	                    vParts.splice(i + 1, 0, iPart.substr(vDigit));
	                }
	            }
	            return vDate;
	        },
	        parseFormat: function (vChar, vDate) {
	            var self = this, vSettings = self.dateSettings, fmt, backspace = /\\?(.?)/gi, doFormat = function (t, s) {
	                return fmt[t] ? fmt[t]() : s;
	            };
	            fmt = {
	                /////////
	                // DAY //
	                /////////
	                /**
	                 * Day of month with leading 0: `01..31`
	                 * @return {string}
	                 */
	                d: function () {
	                    return _lpad(fmt.j(), 2);
	                },
	                /**
	                 * Shorthand day name: `Mon...Sun`
	                 * @return {string}
	                 */
	                D: function () {
	                    return vSettings.daysShort[fmt.w()];
	                },
	                /**
	                 * Day of month: `1..31`
	                 * @return {number}
	                 */
	                j: function () {
	                    return vDate.getDate();
	                },
	                /**
	                 * Full day name: `Monday...Sunday`
	                 * @return {number}
	                 */
	                l: function () {
	                    return vSettings.days[fmt.w()];
	                },
	                /**
	                 * ISO-8601 day of week: `1[Mon]..7[Sun]`
	                 * @return {number}
	                 */
	                N: function () {
	                    return fmt.w() || 7;
	                },
	                /**
	                 * Day of week: `0[Sun]..6[Sat]`
	                 * @return {number}
	                 */
	                w: function () {
	                    return vDate.getDay();
	                },
	                /**
	                 * Day of year: `0..365`
	                 * @return {number}
	                 */
	                z: function () {
	                    var a = new Date(fmt.Y(), fmt.n() - 1, fmt.j()), b = new Date(fmt.Y(), 0, 1);
	                    return Math.round((a - b) / DAY);
	                },

	                //////////
	                // WEEK //
	                //////////
	                /**
	                 * ISO-8601 week number
	                 * @return {number}
	                 */
	                W: function () {
	                    var a = new Date(fmt.Y(), fmt.n() - 1, fmt.j() - fmt.N() + 3), b = new Date(a.getFullYear(), 0, 4);
	                    return _lpad(1 + Math.round((a - b) / DAY / 7), 2);
	                },

	                ///////////
	                // MONTH //
	                ///////////
	                /**
	                 * Full month name: `January...December`
	                 * @return {string}
	                 */
	                F: function () {
	                    return vSettings.months[vDate.getMonth()];
	                },
	                /**
	                 * Month w/leading 0: `01..12`
	                 * @return {string}
	                 */
	                m: function () {
	                    return _lpad(fmt.n(), 2);
	                },
	                /**
	                 * Shorthand month name; `Jan...Dec`
	                 * @return {string}
	                 */
	                M: function () {
	                    return vSettings.monthsShort[vDate.getMonth()];
	                },
	                /**
	                 * Month: `1...12`
	                 * @return {number}
	                 */
	                n: function () {
	                    return vDate.getMonth() + 1;
	                },
	                /**
	                 * Days in month: `28...31`
	                 * @return {number}
	                 */
	                t: function () {
	                    return (new Date(fmt.Y(), fmt.n(), 0)).getDate();
	                },

	                //////////
	                // YEAR //
	                //////////
	                /**
	                 * Is leap year? `0 or 1`
	                 * @return {number}
	                 */
	                L: function () {
	                    var Y = fmt.Y();
	                    return (Y % 4 === 0 && Y % 100 !== 0 || Y % 400 === 0) ? 1 : 0;
	                },
	                /**
	                 * ISO-8601 year
	                 * @return {number}
	                 */
	                o: function () {
	                    var n = fmt.n(), W = fmt.W(), Y = fmt.Y();
	                    return Y + (n === 12 && W < 9 ? 1 : n === 1 && W > 9 ? -1 : 0);
	                },
	                /**
	                 * Full year: `e.g. 1980...2010`
	                 * @return {number}
	                 */
	                Y: function () {
	                    return vDate.getFullYear();
	                },
	                /**
	                 * Last two digits of year: `00...99`
	                 * @return {string}
	                 */
	                y: function () {
	                    return fmt.Y().toString().slice(-2);
	                },

	                //////////
	                // TIME //
	                //////////
	                /**
	                 * Meridian lower: `am or pm`
	                 * @return {string}
	                 */
	                a: function () {
	                    return fmt.A().toLowerCase();
	                },
	                /**
	                 * Meridian upper: `AM or PM`
	                 * @return {string}
	                 */
	                A: function () {
	                    var n = fmt.G() < 12 ? 0 : 1;
	                    return vSettings.meridiem[n];
	                },
	                /**
	                 * Swatch Internet time: `000..999`
	                 * @return {string}
	                 */
	                B: function () {
	                    var H = vDate.getUTCHours() * HOUR, i = vDate.getUTCMinutes() * 60, s = vDate.getUTCSeconds();
	                    return _lpad(Math.floor((H + i + s + HOUR) / 86.4) % 1000, 3);
	                },
	                /**
	                 * 12-Hours: `1..12`
	                 * @return {number}
	                 */
	                g: function () {
	                    return fmt.G() % 12 || 12;
	                },
	                /**
	                 * 24-Hours: `0..23`
	                 * @return {number}
	                 */
	                G: function () {
	                    return vDate.getHours();
	                },
	                /**
	                 * 12-Hours with leading 0: `01..12`
	                 * @return {string}
	                 */
	                h: function () {
	                    return _lpad(fmt.g(), 2);
	                },
	                /**
	                 * 24-Hours w/leading 0: `00..23`
	                 * @return {string}
	                 */
	                H: function () {
	                    return _lpad(fmt.G(), 2);
	                },
	                /**
	                 * Minutes w/leading 0: `00..59`
	                 * @return {string}
	                 */
	                i: function () {
	                    return _lpad(vDate.getMinutes(), 2);
	                },
	                /**
	                 * Seconds w/leading 0: `00..59`
	                 * @return {string}
	                 */
	                s: function () {
	                    return _lpad(vDate.getSeconds(), 2);
	                },
	                /**
	                 * Microseconds: `000000-999000`
	                 * @return {string}
	                 */
	                u: function () {
	                    return _lpad(vDate.getMilliseconds() * 1000, 6);
	                },

	                //////////////
	                // TIMEZONE //
	                //////////////
	                /**
	                 * Timezone identifier: `e.g. Atlantic/Azores, ...`
	                 * @return {string}
	                 */
	                e: function () {
	                    var str = /\((.*)\)/.exec(String(vDate))[1];
	                    return str || 'Coordinated Universal Time';
	                },
	                /**
	                 * Timezone abbreviation: `e.g. EST, MDT, ...`
	                 * @return {string}
	                 */
	                T: function () {
	                    var str = (String(vDate).match(self.tzParts) || [""]).pop().replace(self.tzClip, "");
	                    return str || 'UTC';
	                },
	                /**
	                 * DST observed? `0 or 1`
	                 * @return {number}
	                 */
	                I: function () {
	                    var a = new Date(fmt.Y(), 0), c = Date.UTC(fmt.Y(), 0),
	                        b = new Date(fmt.Y(), 6), d = Date.UTC(fmt.Y(), 6);
	                    return ((a - c) !== (b - d)) ? 1 : 0;
	                },
	                /**
	                 * Difference to GMT in hour format: `e.g. +0200`
	                 * @return {string}
	                 */
	                O: function () {
	                    var tzo = vDate.getTimezoneOffset(), a = Math.abs(tzo);
	                    return (tzo > 0 ? '-' : '+') + _lpad(Math.floor(a / 60) * 100 + a % 60, 4);
	                },
	                /**
	                 * Difference to GMT with colon: `e.g. +02:00`
	                 * @return {string}
	                 */
	                P: function () {
	                    var O = fmt.O();
	                    return (O.substr(0, 3) + ':' + O.substr(3, 2));
	                },
	                /**
	                 * Timezone offset in seconds: `-43200...50400`
	                 * @return {number}
	                 */
	                Z: function () {
	                    return -vDate.getTimezoneOffset() * 60;
	                },

	                ////////////////////
	                // FULL DATE TIME //
	                ////////////////////
	                /**
	                 * ISO-8601 date
	                 * @return {string}
	                 */
	                c: function () {
	                    return 'Y-m-d\\TH:i:sP'.replace(backspace, doFormat);
	                },
	                /**
	                 * RFC 2822 date
	                 * @return {string}
	                 */
	                r: function () {
	                    return 'D, d M Y H:i:s O'.replace(backspace, doFormat);
	                },
	                /**
	                 * Seconds since UNIX epoch
	                 * @return {number}
	                 */
	                U: function () {
	                    return vDate.getTime() / 1000 || 0;
	                }
	            };
	            return doFormat(vChar, vChar);
	        },
	        formatDate: function (vDate, vFormat) {
	            var self = this, i, n, len, str, vChar, vDateStr = '';
	            if (typeof vDate === 'string') {
	                vDate = self.parseDate(vDate, vFormat);
	                if (vDate === false) {
	                    return false;
	                }
	            }
	            if (vDate instanceof Date) {
	                len = vFormat.length;
	                for (i = 0; i < len; i++) {
	                    vChar = vFormat.charAt(i);
	                    if (vChar === 'S') {
	                        continue;
	                    }
	                    str = self.parseFormat(vChar, vDate);
	                    if (i !== (len - 1) && self.intParts.test(vChar) && vFormat.charAt(i + 1) === 'S') {
	                        n = parseInt(str);
	                        str += self.dateSettings.ordinal(n);
	                    }
	                    vDateStr += str;
	                }
	                return vDateStr;
	            }
	            return '';
	        }
	    };
	})();/**
	 * @preserve jQuery DateTimePicker plugin v2.4.9
	 * @homepage http://xdsoft.net/jqplugins/datetimepicker/
	 * @author Chupurnov Valeriy (<chupurnov@gmail.com>)
	 */
	/*global DateFormatter, document,window,jQuery,setTimeout,clearTimeout,HighlightedDate,getCurrentValue*/
	;(function (factory) {
		if ( true ) {
			// AMD. Register as an anonymous module.
			!(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(82), __webpack_require__(119)], __WEBPACK_AMD_DEFINE_FACTORY__ = (factory), __WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ? (__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
		} else if (typeof exports === 'object') {
			// Node/CommonJS style for Browserify
			module.exports = factory;
		} else {
			// Browser globals
			factory(jQuery);
		}
	}(function ($) {
		'use strict';
		var default_options  = {
			i18n: {
				ar: { // Arabic
					months: [
						"كانون الثاني", "شباط", "آذار", "نيسان", "مايو", "حزيران", "تموز", "آب", "أيلول", "تشرين الأول", "تشرين الثاني", "كانون الأول"
					],
					dayOfWeekShort: [
						"ن", "ث", "ع", "خ", "ج", "س", "ح"
					],
					dayOfWeek: ["الأحد", "الاثنين", "الثلاثاء", "الأربعاء", "الخميس", "الجمعة", "السبت", "الأحد"]
				},
				ro: { // Romanian
					months: [
						"Ianuarie", "Februarie", "Martie", "Aprilie", "Mai", "Iunie", "Iulie", "August", "Septembrie", "Octombrie", "Noiembrie", "Decembrie"
					],
					dayOfWeekShort: [
						"Du", "Lu", "Ma", "Mi", "Jo", "Vi", "Sâ"
					],
					dayOfWeek: ["Duminică", "Luni", "Marţi", "Miercuri", "Joi", "Vineri", "Sâmbătă"]
				},
				id: { // Indonesian
					months: [
						"Januari", "Februari", "Maret", "April", "Mei", "Juni", "Juli", "Agustus", "September", "Oktober", "November", "Desember"
					],
					dayOfWeekShort: [
						"Min", "Sen", "Sel", "Rab", "Kam", "Jum", "Sab"
					],
					dayOfWeek: ["Minggu", "Senin", "Selasa", "Rabu", "Kamis", "Jumat", "Sabtu"]
				},
				is: { // Icelandic
					months: [
						"Janúar", "Febrúar", "Mars", "Apríl", "Maí", "Júní", "Júlí", "Ágúst", "September", "Október", "Nóvember", "Desember"
					],
					dayOfWeekShort: [
						"Sun", "Mán", "Þrið", "Mið", "Fim", "Fös", "Lau"
					],
					dayOfWeek: ["Sunnudagur", "Mánudagur", "Þriðjudagur", "Miðvikudagur", "Fimmtudagur", "Föstudagur", "Laugardagur"]
				},
				bg: { // Bulgarian
					months: [
						"Януари", "Февруари", "Март", "Април", "Май", "Юни", "Юли", "Август", "Септември", "Октомври", "Ноември", "Декември"
					],
					dayOfWeekShort: [
						"Нд", "Пн", "Вт", "Ср", "Чт", "Пт", "Сб"
					],
					dayOfWeek: ["Неделя", "Понеделник", "Вторник", "Сряда", "Четвъртък", "Петък", "Събота"]
				},
				fa: { // Persian/Farsi
					months: [
						'فروردین', 'اردیبهشت', 'خرداد', 'تیر', 'مرداد', 'شهریور', 'مهر', 'آبان', 'آذر', 'دی', 'بهمن', 'اسفند'
					],
					dayOfWeekShort: [
						'یکشنبه', 'دوشنبه', 'سه شنبه', 'چهارشنبه', 'پنجشنبه', 'جمعه', 'شنبه'
					],
					dayOfWeek: ["یک‌شنبه", "دوشنبه", "سه‌شنبه", "چهارشنبه", "پنج‌شنبه", "جمعه", "شنبه", "یک‌شنبه"]
				},
				ru: { // Russian
					months: [
						'Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь', 'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь'
					],
					dayOfWeekShort: [
						"Вс", "Пн", "Вт", "Ср", "Чт", "Пт", "Сб"
					],
					dayOfWeek: ["Воскресенье", "Понедельник", "Вторник", "Среда", "Четверг", "Пятница", "Суббота"]
				},
				uk: { // Ukrainian
					months: [
						'Січень', 'Лютий', 'Березень', 'Квітень', 'Травень', 'Червень', 'Липень', 'Серпень', 'Вересень', 'Жовтень', 'Листопад', 'Грудень'
					],
					dayOfWeekShort: [
						"Ндл", "Пнд", "Втр", "Срд", "Чтв", "Птн", "Сбт"
					],
					dayOfWeek: ["Неділя", "Понеділок", "Вівторок", "Середа", "Четвер", "П'ятниця", "Субота"]
				},
				en: { // English
					months: [
						"January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"
					],
					dayOfWeekShort: [
						"Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"
					],
					dayOfWeek: ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]
				},
				el: { // Ελληνικά
					months: [
						"Ιανουάριος", "Φεβρουάριος", "Μάρτιος", "Απρίλιος", "Μάιος", "Ιούνιος", "Ιούλιος", "Αύγουστος", "Σεπτέμβριος", "Οκτώβριος", "Νοέμβριος", "Δεκέμβριος"
					],
					dayOfWeekShort: [
						"Κυρ", "Δευ", "Τρι", "Τετ", "Πεμ", "Παρ", "Σαβ"
					],
					dayOfWeek: ["Κυριακή", "Δευτέρα", "Τρίτη", "Τετάρτη", "Πέμπτη", "Παρασκευή", "Σάββατο"]
				},
				de: { // German
					months: [
						'Januar', 'Februar', 'März', 'April', 'Mai', 'Juni', 'Juli', 'August', 'September', 'Oktober', 'November', 'Dezember'
					],
					dayOfWeekShort: [
						"So", "Mo", "Di", "Mi", "Do", "Fr", "Sa"
					],
					dayOfWeek: ["Sonntag", "Montag", "Dienstag", "Mittwoch", "Donnerstag", "Freitag", "Samstag"]
				},
				nl: { // Dutch
					months: [
						"januari", "februari", "maart", "april", "mei", "juni", "juli", "augustus", "september", "oktober", "november", "december"
					],
					dayOfWeekShort: [
						"zo", "ma", "di", "wo", "do", "vr", "za"
					],
					dayOfWeek: ["zondag", "maandag", "dinsdag", "woensdag", "donderdag", "vrijdag", "zaterdag"]
				},
				tr: { // Turkish
					months: [
						"Ocak", "Şubat", "Mart", "Nisan", "Mayıs", "Haziran", "Temmuz", "Ağustos", "Eylül", "Ekim", "Kasım", "Aralık"
					],
					dayOfWeekShort: [
						"Paz", "Pts", "Sal", "Çar", "Per", "Cum", "Cts"
					],
					dayOfWeek: ["Pazar", "Pazartesi", "Salı", "Çarşamba", "Perşembe", "Cuma", "Cumartesi"]
				},
				fr: { //French
					months: [
						"Janvier", "Février", "Mars", "Avril", "Mai", "Juin", "Juillet", "Août", "Septembre", "Octobre", "Novembre", "Décembre"
					],
					dayOfWeekShort: [
						"Dim", "Lun", "Mar", "Mer", "Jeu", "Ven", "Sam"
					],
					dayOfWeek: ["dimanche", "lundi", "mardi", "mercredi", "jeudi", "vendredi", "samedi"]
				},
				es: { // Spanish
					months: [
						"Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"
					],
					dayOfWeekShort: [
						"Dom", "Lun", "Mar", "Mié", "Jue", "Vie", "Sáb"
					],
					dayOfWeek: ["Domingo", "Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado"]
				},
				th: { // Thai
					months: [
						'มกราคม', 'กุมภาพันธ์', 'มีนาคม', 'เมษายน', 'พฤษภาคม', 'มิถุนายน', 'กรกฎาคม', 'สิงหาคม', 'กันยายน', 'ตุลาคม', 'พฤศจิกายน', 'ธันวาคม'
					],
					dayOfWeekShort: [
						'อา.', 'จ.', 'อ.', 'พ.', 'พฤ.', 'ศ.', 'ส.'
					],
					dayOfWeek: ["อาทิตย์", "จันทร์", "อังคาร", "พุธ", "พฤหัส", "ศุกร์", "เสาร์", "อาทิตย์"]
				},
				pl: { // Polish
					months: [
						"styczeń", "luty", "marzec", "kwiecień", "maj", "czerwiec", "lipiec", "sierpień", "wrzesień", "październik", "listopad", "grudzień"
					],
					dayOfWeekShort: [
						"nd", "pn", "wt", "śr", "cz", "pt", "sb"
					],
					dayOfWeek: ["niedziela", "poniedziałek", "wtorek", "środa", "czwartek", "piątek", "sobota"]
				},
				pt: { // Portuguese
					months: [
						"Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho", "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"
					],
					dayOfWeekShort: [
						"Dom", "Seg", "Ter", "Qua", "Qui", "Sex", "Sab"
					],
					dayOfWeek: ["Domingo", "Segunda", "Terça", "Quarta", "Quinta", "Sexta", "Sábado"]
				},
				ch: { // Simplified Chinese
					months: [
						"一月", "二月", "三月", "四月", "五月", "六月", "七月", "八月", "九月", "十月", "十一月", "十二月"
					],
					dayOfWeekShort: [
						"日", "一", "二", "三", "四", "五", "六"
					]
				},
				se: { // Swedish
					months: [
						"Januari", "Februari", "Mars", "April", "Maj", "Juni", "Juli", "Augusti", "September",  "Oktober", "November", "December"
					],
					dayOfWeekShort: [
						"Sön", "Mån", "Tis", "Ons", "Tor", "Fre", "Lör"
					]
				},
				kr: { // Korean
					months: [
						"1월", "2월", "3월", "4월", "5월", "6월", "7월", "8월", "9월", "10월", "11월", "12월"
					],
					dayOfWeekShort: [
						"일", "월", "화", "수", "목", "금", "토"
					],
					dayOfWeek: ["일요일", "월요일", "화요일", "수요일", "목요일", "금요일", "토요일"]
				},
				it: { // Italian
					months: [
						"Gennaio", "Febbraio", "Marzo", "Aprile", "Maggio", "Giugno", "Luglio", "Agosto", "Settembre", "Ottobre", "Novembre", "Dicembre"
					],
					dayOfWeekShort: [
						"Dom", "Lun", "Mar", "Mer", "Gio", "Ven", "Sab"
					],
					dayOfWeek: ["Domenica", "Lunedì", "Martedì", "Mercoledì", "Giovedì", "Venerdì", "Sabato"]
				},
				da: { // Dansk
					months: [
						"January", "Februar", "Marts", "April", "Maj", "Juni", "July", "August", "September", "Oktober", "November", "December"
					],
					dayOfWeekShort: [
						"Søn", "Man", "Tir", "Ons", "Tor", "Fre", "Lør"
					],
					dayOfWeek: ["søndag", "mandag", "tirsdag", "onsdag", "torsdag", "fredag", "lørdag"]
				},
				no: { // Norwegian
					months: [
						"Januar", "Februar", "Mars", "April", "Mai", "Juni", "Juli", "August", "September", "Oktober", "November", "Desember"
					],
					dayOfWeekShort: [
						"Søn", "Man", "Tir", "Ons", "Tor", "Fre", "Lør"
					],
					dayOfWeek: ['Søndag', 'Mandag', 'Tirsdag', 'Onsdag', 'Torsdag', 'Fredag', 'Lørdag']
				},
				ja: { // Japanese
					months: [
						"1月", "2月", "3月", "4月", "5月", "6月", "7月", "8月", "9月", "10月", "11月", "12月"
					],
					dayOfWeekShort: [
						"日", "月", "火", "水", "木", "金", "土"
					],
					dayOfWeek: ["日曜", "月曜", "火曜", "水曜", "木曜", "金曜", "土曜"]
				},
				vi: { // Vietnamese
					months: [
						"Tháng 1", "Tháng 2", "Tháng 3", "Tháng 4", "Tháng 5", "Tháng 6", "Tháng 7", "Tháng 8", "Tháng 9", "Tháng 10", "Tháng 11", "Tháng 12"
					],
					dayOfWeekShort: [
						"CN", "T2", "T3", "T4", "T5", "T6", "T7"
					],
					dayOfWeek: ["Chủ nhật", "Thứ hai", "Thứ ba", "Thứ tư", "Thứ năm", "Thứ sáu", "Thứ bảy"]
				},
				sl: { // Slovenščina
					months: [
						"Januar", "Februar", "Marec", "April", "Maj", "Junij", "Julij", "Avgust", "September", "Oktober", "November", "December"
					],
					dayOfWeekShort: [
						"Ned", "Pon", "Tor", "Sre", "Čet", "Pet", "Sob"
					],
					dayOfWeek: ["Nedelja", "Ponedeljek", "Torek", "Sreda", "Četrtek", "Petek", "Sobota"]
				},
				cs: { // Čeština
					months: [
						"Leden", "Únor", "Březen", "Duben", "Květen", "Červen", "Červenec", "Srpen", "Září", "Říjen", "Listopad", "Prosinec"
					],
					dayOfWeekShort: [
						"Ne", "Po", "Út", "St", "Čt", "Pá", "So"
					]
				},
				hu: { // Hungarian
					months: [
						"Január", "Február", "Március", "Április", "Május", "Június", "Július", "Augusztus", "Szeptember", "Október", "November", "December"
					],
					dayOfWeekShort: [
						"Va", "Hé", "Ke", "Sze", "Cs", "Pé", "Szo"
					],
					dayOfWeek: ["vasárnap", "hétfő", "kedd", "szerda", "csütörtök", "péntek", "szombat"]
				},
				az: { //Azerbaijanian (Azeri)
					months: [
						"Yanvar", "Fevral", "Mart", "Aprel", "May", "Iyun", "Iyul", "Avqust", "Sentyabr", "Oktyabr", "Noyabr", "Dekabr"
					],
					dayOfWeekShort: [
						"B", "Be", "Ça", "Ç", "Ca", "C", "Ş"
					],
					dayOfWeek: ["Bazar", "Bazar ertəsi", "Çərşənbə axşamı", "Çərşənbə", "Cümə axşamı", "Cümə", "Şənbə"]
				},
				bs: { //Bosanski
					months: [
						"Januar", "Februar", "Mart", "April", "Maj", "Jun", "Jul", "Avgust", "Septembar", "Oktobar", "Novembar", "Decembar"
					],
					dayOfWeekShort: [
						"Ned", "Pon", "Uto", "Sri", "Čet", "Pet", "Sub"
					],
					dayOfWeek: ["Nedjelja","Ponedjeljak", "Utorak", "Srijeda", "Četvrtak", "Petak", "Subota"]
				},
				ca: { //Català
					months: [
						"Gener", "Febrer", "Març", "Abril", "Maig", "Juny", "Juliol", "Agost", "Setembre", "Octubre", "Novembre", "Desembre"
					],
					dayOfWeekShort: [
						"Dg", "Dl", "Dt", "Dc", "Dj", "Dv", "Ds"
					],
					dayOfWeek: ["Diumenge", "Dilluns", "Dimarts", "Dimecres", "Dijous", "Divendres", "Dissabte"]
				},
				'en-GB': { //English (British)
					months: [
						"January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"
					],
					dayOfWeekShort: [
						"Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"
					],
					dayOfWeek: ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]
				},
				et: { //"Eesti"
					months: [
						"Jaanuar", "Veebruar", "Märts", "Aprill", "Mai", "Juuni", "Juuli", "August", "September", "Oktoober", "November", "Detsember"
					],
					dayOfWeekShort: [
						"P", "E", "T", "K", "N", "R", "L"
					],
					dayOfWeek: ["Pühapäev", "Esmaspäev", "Teisipäev", "Kolmapäev", "Neljapäev", "Reede", "Laupäev"]
				},
				eu: { //Euskara
					months: [
						"Urtarrila", "Otsaila", "Martxoa", "Apirila", "Maiatza", "Ekaina", "Uztaila", "Abuztua", "Iraila", "Urria", "Azaroa", "Abendua"
					],
					dayOfWeekShort: [
						"Ig.", "Al.", "Ar.", "Az.", "Og.", "Or.", "La."
					],
					dayOfWeek: ['Igandea', 'Astelehena', 'Asteartea', 'Asteazkena', 'Osteguna', 'Ostirala', 'Larunbata']
				},
				fi: { //Finnish (Suomi)
					months: [
						"Tammikuu", "Helmikuu", "Maaliskuu", "Huhtikuu", "Toukokuu", "Kesäkuu", "Heinäkuu", "Elokuu", "Syyskuu", "Lokakuu", "Marraskuu", "Joulukuu"
					],
					dayOfWeekShort: [
						"Su", "Ma", "Ti", "Ke", "To", "Pe", "La"
					],
					dayOfWeek: ["sunnuntai", "maanantai", "tiistai", "keskiviikko", "torstai", "perjantai", "lauantai"]
				},
				gl: { //Galego
					months: [
						"Xan", "Feb", "Maz", "Abr", "Mai", "Xun", "Xul", "Ago", "Set", "Out", "Nov", "Dec"
					],
					dayOfWeekShort: [
						"Dom", "Lun", "Mar", "Mer", "Xov", "Ven", "Sab"
					],
					dayOfWeek: ["Domingo", "Luns", "Martes", "Mércores", "Xoves", "Venres", "Sábado"]
				},
				hr: { //Hrvatski
					months: [
						"Siječanj", "Veljača", "Ožujak", "Travanj", "Svibanj", "Lipanj", "Srpanj", "Kolovoz", "Rujan", "Listopad", "Studeni", "Prosinac"
					],
					dayOfWeekShort: [
						"Ned", "Pon", "Uto", "Sri", "Čet", "Pet", "Sub"
					],
					dayOfWeek: ["Nedjelja", "Ponedjeljak", "Utorak", "Srijeda", "Četvrtak", "Petak", "Subota"]
				},
				ko: { //Korean (한국어)
					months: [
						"1월", "2월", "3월", "4월", "5월", "6월", "7월", "8월", "9월", "10월", "11월", "12월"
					],
					dayOfWeekShort: [
						"일", "월", "화", "수", "목", "금", "토"
					],
					dayOfWeek: ["일요일", "월요일", "화요일", "수요일", "목요일", "금요일", "토요일"]
				},
				lt: { //Lithuanian (lietuvių)
					months: [
						"Sausio", "Vasario", "Kovo", "Balandžio", "Gegužės", "Birželio", "Liepos", "Rugpjūčio", "Rugsėjo", "Spalio", "Lapkričio", "Gruodžio"
					],
					dayOfWeekShort: [
						"Sek", "Pir", "Ant", "Tre", "Ket", "Pen", "Šeš"
					],
					dayOfWeek: ["Sekmadienis", "Pirmadienis", "Antradienis", "Trečiadienis", "Ketvirtadienis", "Penktadienis", "Šeštadienis"]
				},
				lv: { //Latvian (Latviešu)
					months: [
						"Janvāris", "Februāris", "Marts", "Aprīlis ", "Maijs", "Jūnijs", "Jūlijs", "Augusts", "Septembris", "Oktobris", "Novembris", "Decembris"
					],
					dayOfWeekShort: [
						"Sv", "Pr", "Ot", "Tr", "Ct", "Pk", "St"
					],
					dayOfWeek: ["Svētdiena", "Pirmdiena", "Otrdiena", "Trešdiena", "Ceturtdiena", "Piektdiena", "Sestdiena"]
				},
				mk: { //Macedonian (Македонски)
					months: [
						"јануари", "февруари", "март", "април", "мај", "јуни", "јули", "август", "септември", "октомври", "ноември", "декември"
					],
					dayOfWeekShort: [
						"нед", "пон", "вто", "сре", "чет", "пет", "саб"
					],
					dayOfWeek: ["Недела", "Понеделник", "Вторник", "Среда", "Четврток", "Петок", "Сабота"]
				},
				mn: { //Mongolian (Монгол)
					months: [
						"1-р сар", "2-р сар", "3-р сар", "4-р сар", "5-р сар", "6-р сар", "7-р сар", "8-р сар", "9-р сар", "10-р сар", "11-р сар", "12-р сар"
					],
					dayOfWeekShort: [
						"Дав", "Мяг", "Лха", "Пүр", "Бсн", "Бям", "Ням"
					],
					dayOfWeek: ["Даваа", "Мягмар", "Лхагва", "Пүрэв", "Баасан", "Бямба", "Ням"]
				},
				'pt-BR': { //Português(Brasil)
					months: [
						"Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho", "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"
					],
					dayOfWeekShort: [
						"Dom", "Seg", "Ter", "Qua", "Qui", "Sex", "Sáb"
					],
					dayOfWeek: ["Domingo", "Segunda", "Terça", "Quarta", "Quinta", "Sexta", "Sábado"]
				},
				sk: { //Slovenčina
					months: [
						"Január", "Február", "Marec", "Apríl", "Máj", "Jún", "Júl", "August", "September", "Október", "November", "December"
					],
					dayOfWeekShort: [
						"Ne", "Po", "Ut", "St", "Št", "Pi", "So"
					],
					dayOfWeek: ["Nedeľa", "Pondelok", "Utorok", "Streda", "Štvrtok", "Piatok", "Sobota"]
				},
				sq: { //Albanian (Shqip)
					months: [
						"Janar", "Shkurt", "Mars", "Prill", "Maj", "Qershor", "Korrik", "Gusht", "Shtator", "Tetor", "Nëntor", "Dhjetor"
					],
					dayOfWeekShort: [
						"Die", "Hën", "Mar", "Mër", "Enj", "Pre", "Shtu"
					],
					dayOfWeek: ["E Diel", "E Hënë", "E Martē", "E Mërkurë", "E Enjte", "E Premte", "E Shtunë"]
				},
				'sr-YU': { //Serbian (Srpski)
					months: [
						"Januar", "Februar", "Mart", "April", "Maj", "Jun", "Jul", "Avgust", "Septembar", "Oktobar", "Novembar", "Decembar"
					],
					dayOfWeekShort: [
						"Ned", "Pon", "Uto", "Sre", "čet", "Pet", "Sub"
					],
					dayOfWeek: ["Nedelja","Ponedeljak", "Utorak", "Sreda", "Četvrtak", "Petak", "Subota"]
				},
				sr: { //Serbian Cyrillic (Српски)
					months: [
						"јануар", "фебруар", "март", "април", "мај", "јун", "јул", "август", "септембар", "октобар", "новембар", "децембар"
					],
					dayOfWeekShort: [
						"нед", "пон", "уто", "сре", "чет", "пет", "суб"
					],
					dayOfWeek: ["Недеља","Понедељак", "Уторак", "Среда", "Четвртак", "Петак", "Субота"]
				},
				sv: { //Svenska
					months: [
						"Januari", "Februari", "Mars", "April", "Maj", "Juni", "Juli", "Augusti", "September", "Oktober", "November", "December"
					],
					dayOfWeekShort: [
						"Sön", "Mån", "Tis", "Ons", "Tor", "Fre", "Lör"
					],
					dayOfWeek: ["Söndag", "Måndag", "Tisdag", "Onsdag", "Torsdag", "Fredag", "Lördag"]
				},
				'zh-TW': { //Traditional Chinese (繁體中文)
					months: [
						"一月", "二月", "三月", "四月", "五月", "六月", "七月", "八月", "九月", "十月", "十一月", "十二月"
					],
					dayOfWeekShort: [
						"日", "一", "二", "三", "四", "五", "六"
					],
					dayOfWeek: ["星期日", "星期一", "星期二", "星期三", "星期四", "星期五", "星期六"]
				},
				zh: { //Simplified Chinese (简体中文)
					months: [
						"一月", "二月", "三月", "四月", "五月", "六月", "七月", "八月", "九月", "十月", "十一月", "十二月"
					],
					dayOfWeekShort: [
						"日", "一", "二", "三", "四", "五", "六"
					],
					dayOfWeek: ["星期日", "星期一", "星期二", "星期三", "星期四", "星期五", "星期六"]
				},
				he: { //Hebrew (עברית)
					months: [
						'ינואר', 'פברואר', 'מרץ', 'אפריל', 'מאי', 'יוני', 'יולי', 'אוגוסט', 'ספטמבר', 'אוקטובר', 'נובמבר', 'דצמבר'
					],
					dayOfWeekShort: [
						'א\'', 'ב\'', 'ג\'', 'ד\'', 'ה\'', 'ו\'', 'שבת'
					],
					dayOfWeek: ["ראשון", "שני", "שלישי", "רביעי", "חמישי", "שישי", "שבת", "ראשון"]
				},
				hy: { // Armenian
					months: [
						"Հունվար", "Փետրվար", "Մարտ", "Ապրիլ", "Մայիս", "Հունիս", "Հուլիս", "Օգոստոս", "Սեպտեմբեր", "Հոկտեմբեր", "Նոյեմբեր", "Դեկտեմբեր"
					],
					dayOfWeekShort: [
						"Կի", "Երկ", "Երք", "Չոր", "Հնգ", "Ուրբ", "Շբթ"
					],
					dayOfWeek: ["Կիրակի", "Երկուշաբթի", "Երեքշաբթի", "Չորեքշաբթի", "Հինգշաբթի", "Ուրբաթ", "Շաբաթ"]
				},
				kg: { // Kyrgyz
					months: [
						'Үчтүн айы', 'Бирдин айы', 'Жалган Куран', 'Чын Куран', 'Бугу', 'Кулжа', 'Теке', 'Баш Оона', 'Аяк Оона', 'Тогуздун айы', 'Жетинин айы', 'Бештин айы'
					],
					dayOfWeekShort: [
						"Жек", "Дүй", "Шей", "Шар", "Бей", "Жум", "Ише"
					],
					dayOfWeek: [
						"Жекшемб", "Дүйшөмб", "Шейшемб", "Шаршемб", "Бейшемби", "Жума", "Ишенб"
					]
				},
				rm: { // Romansh
					months: [
						"Schaner", "Favrer", "Mars", "Avrigl", "Matg", "Zercladur", "Fanadur", "Avust", "Settember", "October", "November", "December"
					],
					dayOfWeekShort: [
						"Du", "Gli", "Ma", "Me", "Gie", "Ve", "So"
					],
					dayOfWeek: [
						"Dumengia", "Glindesdi", "Mardi", "Mesemna", "Gievgia", "Venderdi", "Sonda"
					]
				},
			},
			value: '',
			rtl: false,

			format:	'Y/m/d H:i',
			formatTime:	'H:i',
			formatDate:	'Y/m/d',

			startDate:	false, // new Date(), '1986/12/08', '-1970/01/05','-1970/01/05',
			step: 60,
			monthChangeSpinner: true,

			closeOnDateSelect: false,
			closeOnTimeSelect: true,
			closeOnWithoutClick: true,
			closeOnInputClick: true,

			timepicker: true,
			datepicker: true,
			weeks: false,

			defaultTime: false,	// use formatTime format (ex. '10:00' for formatTime:	'H:i')
			defaultDate: false,	// use formatDate format (ex new Date() or '1986/12/08' or '-1970/01/05' or '-1970/01/05')

			minDate: false,
			maxDate: false,
			minTime: false,
			maxTime: false,
			disabledMinTime: false,
			disabledMaxTime: false,

			allowTimes: [],
			opened: false,
			initTime: true,
			inline: false,
			theme: '',

			onSelectDate: function () {},
			onSelectTime: function () {},
			onChangeMonth: function () {},
			onGetWeekOfYear: function () {},
			onChangeYear: function () {},
			onChangeDateTime: function () {},
			onShow: function () {},
			onClose: function () {},
			onGenerate: function () {},

			withoutCopyright: true,
			inverseButton: false,
			hours12: false,
			next: 'xdsoft_next',
			prev : 'xdsoft_prev',
			dayOfWeekStart: 0,
			parentID: 'body',
			timeHeightInTimePicker: 25,
			timepickerScrollbar: true,
			todayButton: true,
			prevButton: true,
			nextButton: true,
			defaultSelect: true,

			scrollMonth: true,
			scrollTime: true,
			scrollInput: true,

			lazyInit: false,
			mask: false,
			validateOnBlur: true,
			allowBlank: true,
			yearStart: 1950,
			yearEnd: 2050,
			monthStart: 0,
			monthEnd: 11,
			style: '',
			id: '',
			fixed: false,
			roundTime: 'round', // ceil, floor
			className: '',
			weekends: [],
			highlightedDates: [],
			highlightedPeriods: [],
			allowDates : [],
			allowDateRe : null,
			disabledDates : [],
			disabledWeekDays: [],
			yearOffset: 0,
			beforeShowDay: null,

			enterLikeTab: true,
	        showApplyButton: false
		};

		var dateHelper = null,
			globalLocaleDefault = 'en',
			globalLocale = 'en';
		
		var dateFormatterOptionsDefault = {
			meridiem: ['AM', 'PM']
		};
		
		var initDateFormatter = function(){
			var locale = default_options.i18n[globalLocale],
				opts = {
					days: locale.dayOfWeek,
					daysShort: locale.dayOfWeekShort,
					months: locale.months,
					monthsShort: $.map(locale.months, function(n){ return n.substring(0, 3) }),			
				};
			
		 	dateHelper = new DateFormatter({
				dateSettings: $.extend({}, dateFormatterOptionsDefault, opts)
			});
		};
			
		// for locale settings
		$.datetimepicker = {
			setLocale: function(locale){
				var newLocale = default_options.i18n[locale]?locale:globalLocaleDefault;
				if(globalLocale != newLocale){
					globalLocale = newLocale;
					// reinit date formatter
					initDateFormatter();
				}
			},
			RFC_2822: 'D, d M Y H:i:s O',
			ATOM: 'Y-m-d\TH:i:sP',
			ISO_8601: 'Y-m-d\TH:i:sO',
			RFC_822: 'D, d M y H:i:s O',
			RFC_850: 'l, d-M-y H:i:s T',
			RFC_1036: 'D, d M y H:i:s O',
			RFC_1123: 'D, d M Y H:i:s O',
			RSS: 'D, d M Y H:i:s O',
			W3C: 'Y-m-d\TH:i:sP'
		};
		
		// first init date formatter
		initDateFormatter();

		// fix for ie8
		if (!window.getComputedStyle) {
			window.getComputedStyle = function (el, pseudo) {
				this.el = el;
				this.getPropertyValue = function (prop) {
					var re = /(\-([a-z]){1})/g;
					if (prop === 'float') {
						prop = 'styleFloat';
					}
					if (re.test(prop)) {
						prop = prop.replace(re, function (a, b, c) {
							return c.toUpperCase();
						});
					}
					return el.currentStyle[prop] || null;
				};
				return this;
			};
		}
		if (!Array.prototype.indexOf) {
			Array.prototype.indexOf = function (obj, start) {
				var i, j;
				for (i = (start || 0), j = this.length; i < j; i += 1) {
					if (this[i] === obj) { return i; }
				}
				return -1;
			};
		}
		Date.prototype.countDaysInMonth = function () {
			return new Date(this.getFullYear(), this.getMonth() + 1, 0).getDate();
		};
		$.fn.xdsoftScroller = function (percent) {
			return this.each(function () {
				var timeboxparent = $(this),
					pointerEventToXY = function (e) {
						var out = {x: 0, y: 0},
							touch;
						if (e.type === 'touchstart' || e.type === 'touchmove' || e.type === 'touchend' || e.type === 'touchcancel') {
							touch  = e.originalEvent.touches[0] || e.originalEvent.changedTouches[0];
							out.x = touch.clientX;
							out.y = touch.clientY;
						} else if (e.type === 'mousedown' || e.type === 'mouseup' || e.type === 'mousemove' || e.type === 'mouseover' || e.type === 'mouseout' || e.type === 'mouseenter' || e.type === 'mouseleave') {
							out.x = e.clientX;
							out.y = e.clientY;
						}
						return out;
					},
					move = 0,
					timebox,
					parentHeight,
					height,
					scrollbar,
					scroller,
					maximumOffset = 100,
					start = false,
					startY = 0,
					startTop = 0,
					h1 = 0,
					touchStart = false,
					startTopScroll = 0,
					calcOffset = function () {};
				if (percent === 'hide') {
					timeboxparent.find('.xdsoft_scrollbar').hide();
					return;
				}
				if (!$(this).hasClass('xdsoft_scroller_box')) {
					timebox = timeboxparent.children().eq(0);
					parentHeight = timeboxparent[0].clientHeight;
					height = timebox[0].offsetHeight;
					scrollbar = $('<div class="xdsoft_scrollbar"></div>');
					scroller = $('<div class="xdsoft_scroller"></div>');
					scrollbar.append(scroller);

					timeboxparent.addClass('xdsoft_scroller_box').append(scrollbar);
					calcOffset = function calcOffset(event) {
						var offset = pointerEventToXY(event).y - startY + startTopScroll;
						if (offset < 0) {
							offset = 0;
						}
						if (offset + scroller[0].offsetHeight > h1) {
							offset = h1 - scroller[0].offsetHeight;
						}
						timeboxparent.trigger('scroll_element.xdsoft_scroller', [maximumOffset ? offset / maximumOffset : 0]);
					};

					scroller
						.on('touchstart.xdsoft_scroller mousedown.xdsoft_scroller', function (event) {
							if (!parentHeight) {
								timeboxparent.trigger('resize_scroll.xdsoft_scroller', [percent]);
							}

							startY = pointerEventToXY(event).y;
							startTopScroll = parseInt(scroller.css('margin-top'), 10);
							h1 = scrollbar[0].offsetHeight;

							if (event.type === 'mousedown' || event.type === 'touchstart') {
								if (document) {
									$(document.body).addClass('xdsoft_noselect');
								}
								$([document.body, window]).on('touchend mouseup.xdsoft_scroller', function arguments_callee() {
									$([document.body, window]).off('touchend mouseup.xdsoft_scroller', arguments_callee)
										.off('mousemove.xdsoft_scroller', calcOffset)
										.removeClass('xdsoft_noselect');
								});
								$(document.body).on('mousemove.xdsoft_scroller', calcOffset);
							} else {
								touchStart = true;
								event.stopPropagation();
								event.preventDefault();
							}
						})
						.on('touchmove', function (event) {
							if (touchStart) {
								event.preventDefault();
								calcOffset(event);
							}
						})
						.on('touchend touchcancel', function (event) {
							touchStart =  false;
							startTopScroll = 0;
						});

					timeboxparent
						.on('scroll_element.xdsoft_scroller', function (event, percentage) {
							if (!parentHeight) {
								timeboxparent.trigger('resize_scroll.xdsoft_scroller', [percentage, true]);
							}
							percentage = percentage > 1 ? 1 : (percentage < 0 || isNaN(percentage)) ? 0 : percentage;

							scroller.css('margin-top', maximumOffset * percentage);

							setTimeout(function () {
								timebox.css('marginTop', -parseInt((timebox[0].offsetHeight - parentHeight) * percentage, 10));
							}, 10);
						})
						.on('resize_scroll.xdsoft_scroller', function (event, percentage, noTriggerScroll) {
							var percent, sh;
							parentHeight = timeboxparent[0].clientHeight;
							height = timebox[0].offsetHeight;
							percent = parentHeight / height;
							sh = percent * scrollbar[0].offsetHeight;
							if (percent > 1) {
								scroller.hide();
							} else {
								scroller.show();
								scroller.css('height', parseInt(sh > 10 ? sh : 10, 10));
								maximumOffset = scrollbar[0].offsetHeight - scroller[0].offsetHeight;
								if (noTriggerScroll !== true) {
									timeboxparent.trigger('scroll_element.xdsoft_scroller', [percentage || Math.abs(parseInt(timebox.css('marginTop'), 10)) / (height - parentHeight)]);
								}
							}
						});

					timeboxparent.on('mousewheel', function (event) {
						var top = Math.abs(parseInt(timebox.css('marginTop'), 10));

						top = top - (event.deltaY * 20);
						if (top < 0) {
							top = 0;
						}

						timeboxparent.trigger('scroll_element.xdsoft_scroller', [top / (height - parentHeight)]);
						event.stopPropagation();
						return false;
					});

					timeboxparent.on('touchstart', function (event) {
						start = pointerEventToXY(event);
						startTop = Math.abs(parseInt(timebox.css('marginTop'), 10));
					});

					timeboxparent.on('touchmove', function (event) {
						if (start) {
							event.preventDefault();
							var coord = pointerEventToXY(event);
							timeboxparent.trigger('scroll_element.xdsoft_scroller', [(startTop - (coord.y - start.y)) / (height - parentHeight)]);
						}
					});

					timeboxparent.on('touchend touchcancel', function (event) {
						start = false;
						startTop = 0;
					});
				}
				timeboxparent.trigger('resize_scroll.xdsoft_scroller', [percent]);
			});
		};

		$.fn.datetimepicker = function (opt, opt2) {
			var result = this,
	            KEY0 = 48,
				KEY9 = 57,
				_KEY0 = 96,
				_KEY9 = 105,
				CTRLKEY = 17,
				DEL = 46,
				ENTER = 13,
				ESC = 27,
				BACKSPACE = 8,
				ARROWLEFT = 37,
				ARROWUP = 38,
				ARROWRIGHT = 39,
				ARROWDOWN = 40,
				TAB = 9,
				F5 = 116,
				AKEY = 65,
				CKEY = 67,
				VKEY = 86,
				ZKEY = 90,
				YKEY = 89,
				ctrlDown	=	false,
				options = ($.isPlainObject(opt) || !opt) ? $.extend(true, {}, default_options, opt) : $.extend(true, {}, default_options),

				lazyInitTimer = 0,
				createDateTimePicker,
				destroyDateTimePicker,

				lazyInit = function (input) {
					input
						.on('open.xdsoft focusin.xdsoft mousedown.xdsoft touchstart', function initOnActionCallback(event) {
							if (input.is(':disabled') || input.data('xdsoft_datetimepicker')) {
								return;
							}
							clearTimeout(lazyInitTimer);
							lazyInitTimer = setTimeout(function () {

								if (!input.data('xdsoft_datetimepicker')) {
									createDateTimePicker(input);
								}
								input
									.off('open.xdsoft focusin.xdsoft mousedown.xdsoft touchstart', initOnActionCallback)
									.trigger('open.xdsoft');
							}, 100);
						});
				};

			createDateTimePicker = function (input) {
				var datetimepicker = $('<div class="xdsoft_datetimepicker xdsoft_noselect"></div>'),
					xdsoft_copyright = $('<div class="xdsoft_copyright"><a target="_blank" href="http://xdsoft.net/jqplugins/datetimepicker/">xdsoft.net</a></div>'),
					datepicker = $('<div class="xdsoft_datepicker active"></div>'),
					mounth_picker = $('<div class="xdsoft_mounthpicker"><button type="button" class="xdsoft_prev"></button><button type="button" class="xdsoft_today_button"></button>' +
						'<div class="xdsoft_label xdsoft_month"><span></span><i></i></div>' +
						'<div class="xdsoft_label xdsoft_year"><span></span><i></i></div>' +
						'<button type="button" class="xdsoft_next"></button></div>'),
					calendar = $('<div class="xdsoft_calendar"></div>'),
					timepicker = $('<div class="xdsoft_timepicker active"><button type="button" class="xdsoft_prev"></button><div class="xdsoft_time_box"></div><button type="button" class="xdsoft_next"></button></div>'),
					timeboxparent = timepicker.find('.xdsoft_time_box').eq(0),
					timebox = $('<div class="xdsoft_time_variant"></div>'),
	                applyButton = $('<button type="button" class="xdsoft_save_selected blue-gradient-button">Save Selected</button>'),

					monthselect = $('<div class="xdsoft_select xdsoft_monthselect"><div></div></div>'),
					yearselect = $('<div class="xdsoft_select xdsoft_yearselect"><div></div></div>'),
					triggerAfterOpen = false,
					XDSoft_datetime,
		
					xchangeTimer,
					timerclick,
					current_time_index,
					setPos,
					timer = 0,
					timer1 = 0,
					_xdsoft_datetime;

				if (options.id) {
					datetimepicker.attr('id', options.id);
				}
				if (options.style) {
					datetimepicker.attr('style', options.style);
				}
				if (options.weeks) {
					datetimepicker.addClass('xdsoft_showweeks');
				}
				if (options.rtl) {
					datetimepicker.addClass('xdsoft_rtl');
				}

				datetimepicker.addClass('xdsoft_' + options.theme);
				datetimepicker.addClass(options.className);

				mounth_picker
					.find('.xdsoft_month span')
						.after(monthselect);
				mounth_picker
					.find('.xdsoft_year span')
						.after(yearselect);

				mounth_picker
					.find('.xdsoft_month,.xdsoft_year')
						.on('touchstart mousedown.xdsoft', function (event) {
						var select = $(this).find('.xdsoft_select').eq(0),
							val = 0,
							top = 0,
							visible = select.is(':visible'),
							items,
							i;

						mounth_picker
							.find('.xdsoft_select')
								.hide();
						if (_xdsoft_datetime.currentTime) {
							val = _xdsoft_datetime.currentTime[$(this).hasClass('xdsoft_month') ? 'getMonth' : 'getFullYear']();
						}

						select[visible ? 'hide' : 'show']();
						for (items = select.find('div.xdsoft_option'), i = 0; i < items.length; i += 1) {
							if (items.eq(i).data('value') === val) {
								break;
							} else {
								top += items[0].offsetHeight;
							}
						}

						select.xdsoftScroller(top / (select.children()[0].offsetHeight - (select[0].clientHeight)));
						event.stopPropagation();
						return false;
					});

				mounth_picker
					.find('.xdsoft_select')
						.xdsoftScroller()
					.on('touchstart mousedown.xdsoft', function (event) {
						event.stopPropagation();
						event.preventDefault();
					})
					.on('touchstart mousedown.xdsoft', '.xdsoft_option', function (event) {
						if (_xdsoft_datetime.currentTime === undefined || _xdsoft_datetime.currentTime === null) {
							_xdsoft_datetime.currentTime = _xdsoft_datetime.now();
						}

						var year = _xdsoft_datetime.currentTime.getFullYear();
						if (_xdsoft_datetime && _xdsoft_datetime.currentTime) {
							_xdsoft_datetime.currentTime[$(this).parent().parent().hasClass('xdsoft_monthselect') ? 'setMonth' : 'setFullYear']($(this).data('value'));
						}

						$(this).parent().parent().hide();

						datetimepicker.trigger('xchange.xdsoft');
						if (options.onChangeMonth && $.isFunction(options.onChangeMonth)) {
							options.onChangeMonth.call(datetimepicker, _xdsoft_datetime.currentTime, datetimepicker.data('input'));
						}

						if (year !== _xdsoft_datetime.currentTime.getFullYear() && $.isFunction(options.onChangeYear)) {
							options.onChangeYear.call(datetimepicker, _xdsoft_datetime.currentTime, datetimepicker.data('input'));
						}
					});

				datetimepicker.getValue = function () {
	                return _xdsoft_datetime.getCurrentTime();
	            };

				datetimepicker.setOptions = function (_options) {
					var highlightedDates = {},
						getCaretPos = function (input) {
							try {
								if (document.selection && document.selection.createRange) {
									var range = document.selection.createRange();
									return range.getBookmark().charCodeAt(2) - 2;
								}
								if (input.setSelectionRange) {
									return input.selectionStart;
								}
							} catch (e) {
								return 0;
							}
						},
						setCaretPos = function (node, pos) {
							node = (typeof node === "string" || node instanceof String) ? document.getElementById(node) : node;
							if (!node) {
								return false;
							}
							if (node.createTextRange) {
								var textRange = node.createTextRange();
								textRange.collapse(true);
								textRange.moveEnd('character', pos);
								textRange.moveStart('character', pos);
								textRange.select();
								return true;
							}
							if (node.setSelectionRange) {
								node.setSelectionRange(pos, pos);
								return true;
							}
							return false;
						},
						isValidValue = function (mask, value) {
							var reg = mask
								.replace(/([\[\]\/\{\}\(\)\-\.\+]{1})/g, '\\$1')
								.replace(/_/g, '{digit+}')
								.replace(/([0-9]{1})/g, '{digit$1}')
								.replace(/\{digit([0-9]{1})\}/g, '[0-$1_]{1}')
								.replace(/\{digit[\+]\}/g, '[0-9_]{1}');
							return (new RegExp(reg)).test(value);
						};
					options = $.extend(true, {}, options, _options);

					if (_options.allowTimes && $.isArray(_options.allowTimes) && _options.allowTimes.length) {
						options.allowTimes = $.extend(true, [], _options.allowTimes);
					}

					if (_options.weekends && $.isArray(_options.weekends) && _options.weekends.length) {
						options.weekends = $.extend(true, [], _options.weekends);
					}

					if (_options.allowDates && $.isArray(_options.allowDates) && _options.allowDates.length) {
						options.allowDates = $.extend(true, [], _options.allowDates);
					}

					if (_options.allowDateRe && Object.prototype.toString.call(_options.allowDateRe)==="[object String]") {
						options.allowDateRe = new RegExp(_options.allowDateRe);
					}
					
					if (_options.highlightedDates && $.isArray(_options.highlightedDates) && _options.highlightedDates.length) {
						$.each(_options.highlightedDates, function (index, value) {
							var splitData = $.map(value.split(','), $.trim),
								exDesc,
								hDate = new HighlightedDate(dateHelper.parseDate(splitData[0], options.formatDate), splitData[1], splitData[2]), // date, desc, style
								keyDate = dateHelper.formatDate(hDate.date, options.formatDate);
							if (highlightedDates[keyDate] !== undefined) {
								exDesc = highlightedDates[keyDate].desc;
								if (exDesc && exDesc.length && hDate.desc && hDate.desc.length) {
									highlightedDates[keyDate].desc = exDesc + "\n" + hDate.desc;
								}
							} else {
								highlightedDates[keyDate] = hDate;
							}
						});

						options.highlightedDates = $.extend(true, [], highlightedDates);
					}

					if (_options.highlightedPeriods && $.isArray(_options.highlightedPeriods) && _options.highlightedPeriods.length) {
						highlightedDates = $.extend(true, [], options.highlightedDates);
						$.each(_options.highlightedPeriods, function (index, value) {
							var dateTest, // start date
								dateEnd,
								desc,
								hDate,
								keyDate,
								exDesc,
								style;
							if ($.isArray(value)) {
								dateTest = value[0];
								dateEnd = value[1];
								desc = value[2];
								style = value[3];
							}
							else {
								var splitData = $.map(value.split(','), $.trim);
								dateTest = dateHelper.parseDate(splitData[0], options.formatDate);
								dateEnd = dateHelper.parseDate(splitData[1], options.formatDate);
								desc = splitData[2];
								style = splitData[3];
							}

							while (dateTest <= dateEnd) {
								hDate = new HighlightedDate(dateTest, desc, style);
								keyDate = dateHelper.formatDate(dateTest, options.formatDate);
								dateTest.setDate(dateTest.getDate() + 1);
								if (highlightedDates[keyDate] !== undefined) {
									exDesc = highlightedDates[keyDate].desc;
									if (exDesc && exDesc.length && hDate.desc && hDate.desc.length) {
										highlightedDates[keyDate].desc = exDesc + "\n" + hDate.desc;
									}
								} else {
									highlightedDates[keyDate] = hDate;
								}
							}
						});

						options.highlightedDates = $.extend(true, [], highlightedDates);
					}

					if (_options.disabledDates && $.isArray(_options.disabledDates) && _options.disabledDates.length) {
						options.disabledDates = $.extend(true, [], _options.disabledDates);
					}

					if (_options.disabledWeekDays && $.isArray(_options.disabledWeekDays) && _options.disabledWeekDays.length) {
					    options.disabledWeekDays = $.extend(true, [], _options.disabledWeekDays);
					}

					if ((options.open || options.opened) && (!options.inline)) {
						input.trigger('open.xdsoft');
					}

					if (options.inline) {
						triggerAfterOpen = true;
						datetimepicker.addClass('xdsoft_inline');
						input.after(datetimepicker).hide();
					}

					if (options.inverseButton) {
						options.next = 'xdsoft_prev';
						options.prev = 'xdsoft_next';
					}

					if (options.datepicker) {
						datepicker.addClass('active');
					} else {
						datepicker.removeClass('active');
					}

					if (options.timepicker) {
						timepicker.addClass('active');
					} else {
						timepicker.removeClass('active');
					}

					if (options.value) {
						_xdsoft_datetime.setCurrentTime(options.value);
						if (input && input.val) {
							input.val(_xdsoft_datetime.str);
						}
					}

					if (isNaN(options.dayOfWeekStart)) {
						options.dayOfWeekStart = 0;
					} else {
						options.dayOfWeekStart = parseInt(options.dayOfWeekStart, 10) % 7;
					}

					if (!options.timepickerScrollbar) {
						timeboxparent.xdsoftScroller('hide');
					}

					if (options.minDate && /^[\+\-](.*)$/.test(options.minDate)) {
						options.minDate = dateHelper.formatDate(_xdsoft_datetime.strToDateTime(options.minDate), options.formatDate);
					}

					if (options.maxDate &&  /^[\+\-](.*)$/.test(options.maxDate)) {
						options.maxDate = dateHelper.formatDate(_xdsoft_datetime.strToDateTime(options.maxDate), options.formatDate);
					}

					applyButton.toggle(options.showApplyButton);

					mounth_picker
						.find('.xdsoft_today_button')
							.css('visibility', !options.todayButton ? 'hidden' : 'visible');

					mounth_picker
						.find('.' + options.prev)
							.css('visibility', !options.prevButton ? 'hidden' : 'visible');

					mounth_picker
						.find('.' + options.next)
							.css('visibility', !options.nextButton ? 'hidden' : 'visible');

					if (options.mask) {
						input.off('keydown.xdsoft');

						if (options.mask === true) {
							options.mask = options.format
								.replace(/Y/g, '9999')
								.replace(/F/g, '9999')
								.replace(/m/g, '19')
								.replace(/d/g, '39')
								.replace(/H/g, '29')
								.replace(/i/g, '59')
								.replace(/s/g, '59');
						}

						if ($.type(options.mask) === 'string') {
							if (!isValidValue(options.mask, input.val())) {
								input.val(options.mask.replace(/[0-9]/g, '_'));
								setCaretPos(input[0], 0);
							}

							input.on('keydown.xdsoft', function (event) {
								var val = this.value,
									key = event.which,
									pos,
									digit;

								if (((key >= KEY0 && key <= KEY9) || (key >= _KEY0 && key <= _KEY9)) || (key === BACKSPACE || key === DEL)) {
									pos = getCaretPos(this);
									digit = (key !== BACKSPACE && key !== DEL) ? String.fromCharCode((_KEY0 <= key && key <= _KEY9) ? key - KEY0 : key) : '_';

									if ((key === BACKSPACE || key === DEL) && pos) {
										pos -= 1;
										digit = '_';
									}

									while (/[^0-9_]/.test(options.mask.substr(pos, 1)) && pos < options.mask.length && pos > 0) {
										pos += (key === BACKSPACE || key === DEL) ? -1 : 1;
									}

									val = val.substr(0, pos) + digit + val.substr(pos + 1);
									if ($.trim(val) === '') {
										val = options.mask.replace(/[0-9]/g, '_');
									} else {
										if (pos === options.mask.length) {
											event.preventDefault();
											return false;
										}
									}

									pos += (key === BACKSPACE || key === DEL) ? 0 : 1;
									while (/[^0-9_]/.test(options.mask.substr(pos, 1)) && pos < options.mask.length && pos > 0) {
										pos += (key === BACKSPACE || key === DEL) ? -1 : 1;
									}

									if (isValidValue(options.mask, val)) {
										this.value = val;
										setCaretPos(this, pos);
									} else if ($.trim(val) === '') {
										this.value = options.mask.replace(/[0-9]/g, '_');
									} else {
										input.trigger('error_input.xdsoft');
									}
								} else {
									if (([AKEY, CKEY, VKEY, ZKEY, YKEY].indexOf(key) !== -1 && ctrlDown) || [ESC, ARROWUP, ARROWDOWN, ARROWLEFT, ARROWRIGHT, F5, CTRLKEY, TAB, ENTER].indexOf(key) !== -1) {
										return true;
									}
								}

								event.preventDefault();
								return false;
							});
						}
					}
					if (options.validateOnBlur) {
						input
							.off('blur.xdsoft')
							.on('blur.xdsoft', function () {
								if (options.allowBlank && !$.trim($(this).val()).length) {
									$(this).val(null);
									datetimepicker.data('xdsoft_datetime').empty();
								} else if (!dateHelper.parseDate($(this).val(), options.format)) {
									var splittedHours   = +([$(this).val()[0], $(this).val()[1]].join('')),
										splittedMinutes = +([$(this).val()[2], $(this).val()[3]].join(''));

									// parse the numbers as 0312 => 03:12
									if (!options.datepicker && options.timepicker && splittedHours >= 0 && splittedHours < 24 && splittedMinutes >= 0 && splittedMinutes < 60) {
										$(this).val([splittedHours, splittedMinutes].map(function (item) {
											return item > 9 ? item : '0' + item;
										}).join(':'));
									} else {
										$(this).val(dateHelper.formatDate(_xdsoft_datetime.now(), options.format));
									}

									datetimepicker.data('xdsoft_datetime').setCurrentTime($(this).val());
								} else {
									datetimepicker.data('xdsoft_datetime').setCurrentTime($(this).val());
								}

								datetimepicker.trigger('changedatetime.xdsoft');
							});
					}
					options.dayOfWeekStartPrev = (options.dayOfWeekStart === 0) ? 6 : options.dayOfWeekStart - 1;

					datetimepicker
						.trigger('xchange.xdsoft')
						.trigger('afterOpen.xdsoft');
				};

				datetimepicker
					.data('options', options)
					.on('touchstart mousedown.xdsoft', function (event) {
						event.stopPropagation();
						event.preventDefault();
						yearselect.hide();
						monthselect.hide();
						return false;
					});

				//scroll_element = timepicker.find('.xdsoft_time_box');
				timeboxparent.append(timebox);
				timeboxparent.xdsoftScroller();

				datetimepicker.on('afterOpen.xdsoft', function () {
					timeboxparent.xdsoftScroller();
				});

				datetimepicker
					.append(datepicker)
					.append(timepicker);

				if (options.withoutCopyright !== true) {
					datetimepicker
						.append(xdsoft_copyright);
				}

				datepicker
					.append(mounth_picker)
					.append(calendar)
					.append(applyButton);

				$(options.parentID)
					.append(datetimepicker);

				XDSoft_datetime = function () {
					var _this = this;
					_this.now = function (norecursion) {
						var d = new Date(),
							date,
							time;

						if (!norecursion && options.defaultDate) {
							date = _this.strToDateTime(options.defaultDate);
							d.setFullYear(date.getFullYear());
							d.setMonth(date.getMonth());
							d.setDate(date.getDate());
						}

						if (options.yearOffset) {
							d.setFullYear(d.getFullYear() + options.yearOffset);
						}

						if (!norecursion && options.defaultTime) {
							time = _this.strtotime(options.defaultTime);
							d.setHours(time.getHours());
							d.setMinutes(time.getMinutes());
						}
						return d;
					};

					_this.isValidDate = function (d) {
						if (Object.prototype.toString.call(d) !== "[object Date]") {
							return false;
						}
						return !isNaN(d.getTime());
					};

					_this.setCurrentTime = function (dTime) {
						_this.currentTime = (typeof dTime === 'string') ? _this.strToDateTime(dTime) : _this.isValidDate(dTime) ? dTime : _this.now();
						datetimepicker.trigger('xchange.xdsoft');
					};

					_this.empty = function () {
						_this.currentTime = null;
					};

					_this.getCurrentTime = function (dTime) {
						return _this.currentTime;
					};

					_this.nextMonth = function () {

						if (_this.currentTime === undefined || _this.currentTime === null) {
							_this.currentTime = _this.now();
						}

						var month = _this.currentTime.getMonth() + 1,
							year;
						if (month === 12) {
							_this.currentTime.setFullYear(_this.currentTime.getFullYear() + 1);
							month = 0;
						}

						year = _this.currentTime.getFullYear();

						_this.currentTime.setDate(
							Math.min(
								new Date(_this.currentTime.getFullYear(), month + 1, 0).getDate(),
								_this.currentTime.getDate()
							)
						);
						_this.currentTime.setMonth(month);

						if (options.onChangeMonth && $.isFunction(options.onChangeMonth)) {
							options.onChangeMonth.call(datetimepicker, _xdsoft_datetime.currentTime, datetimepicker.data('input'));
						}

						if (year !== _this.currentTime.getFullYear() && $.isFunction(options.onChangeYear)) {
							options.onChangeYear.call(datetimepicker, _xdsoft_datetime.currentTime, datetimepicker.data('input'));
						}

						datetimepicker.trigger('xchange.xdsoft');
						return month;
					};

					_this.prevMonth = function () {

						if (_this.currentTime === undefined || _this.currentTime === null) {
							_this.currentTime = _this.now();
						}

						var month = _this.currentTime.getMonth() - 1;
						if (month === -1) {
							_this.currentTime.setFullYear(_this.currentTime.getFullYear() - 1);
							month = 11;
						}
						_this.currentTime.setDate(
							Math.min(
								new Date(_this.currentTime.getFullYear(), month + 1, 0).getDate(),
								_this.currentTime.getDate()
							)
						);
						_this.currentTime.setMonth(month);
						if (options.onChangeMonth && $.isFunction(options.onChangeMonth)) {
							options.onChangeMonth.call(datetimepicker, _xdsoft_datetime.currentTime, datetimepicker.data('input'));
						}
						datetimepicker.trigger('xchange.xdsoft');
						return month;
					};

					_this.getWeekOfYear = function (datetime) {
						if (options.onGetWeekOfYear && $.isFunction(options.onGetWeekOfYear)) {
							var week = options.onGetWeekOfYear.call(datetimepicker, datetime);
							if (typeof week !== 'undefined') {
								return week;
							}
						}
						var onejan = new Date(datetime.getFullYear(), 0, 1);
						//First week of the year is th one with the first Thursday according to ISO8601
						if(onejan.getDay()!=4)
							onejan.setMonth(0, 1 + ((4 - onejan.getDay()+ 7) % 7));
						return Math.ceil((((datetime - onejan) / 86400000) + onejan.getDay() + 1) / 7);
					};

					_this.strToDateTime = function (sDateTime) {
						var tmpDate = [], timeOffset, currentTime;

						if (sDateTime && sDateTime instanceof Date && _this.isValidDate(sDateTime)) {
							return sDateTime;
						}

						tmpDate = /^(\+|\-)(.*)$/.exec(sDateTime);
						if (tmpDate) {
							tmpDate[2] = dateHelper.parseDate(tmpDate[2], options.formatDate);
						}
						if (tmpDate  && tmpDate[2]) {
							timeOffset = tmpDate[2].getTime() - (tmpDate[2].getTimezoneOffset()) * 60000;
							currentTime = new Date((_this.now(true)).getTime() + parseInt(tmpDate[1] + '1', 10) * timeOffset);
						} else {
							currentTime = sDateTime ? dateHelper.parseDate(sDateTime, options.format) : _this.now();
						}

						if (!_this.isValidDate(currentTime)) {
							currentTime = _this.now();
						}

						return currentTime;
					};

					_this.strToDate = function (sDate) {
						if (sDate && sDate instanceof Date && _this.isValidDate(sDate)) {
							return sDate;
						}

						var currentTime = sDate ? dateHelper.parseDate(sDate, options.formatDate) : _this.now(true);
						if (!_this.isValidDate(currentTime)) {
							currentTime = _this.now(true);
						}
						return currentTime;
					};

					_this.strtotime = function (sTime) {
						if (sTime && sTime instanceof Date && _this.isValidDate(sTime)) {
							return sTime;
						}
						var currentTime = sTime ? dateHelper.parseDate(sTime, options.formatTime) : _this.now(true);
						if (!_this.isValidDate(currentTime)) {
							currentTime = _this.now(true);
						}
						return currentTime;
					};

					_this.str = function () {
						return dateHelper.formatDate(_this.currentTime, options.format);
					};
					_this.currentTime = this.now();
				};

				_xdsoft_datetime = new XDSoft_datetime();

				applyButton.on('touchend click', function (e) {//pathbrite
	                e.preventDefault();
	                datetimepicker.data('changed', true);
	                _xdsoft_datetime.setCurrentTime(getCurrentValue());
	                input.val(_xdsoft_datetime.str());
	                datetimepicker.trigger('close.xdsoft');
	            });
				mounth_picker
					.find('.xdsoft_today_button')
					.on('touchend mousedown.xdsoft', function () {
						datetimepicker.data('changed', true);
						_xdsoft_datetime.setCurrentTime(0);
						datetimepicker.trigger('afterOpen.xdsoft');
					}).on('dblclick.xdsoft', function () {
						var currentDate = _xdsoft_datetime.getCurrentTime(), minDate, maxDate;
						currentDate = new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate());
						minDate = _xdsoft_datetime.strToDate(options.minDate);
						minDate = new Date(minDate.getFullYear(), minDate.getMonth(), minDate.getDate());
						if (currentDate < minDate) {
							return;
						}
						maxDate = _xdsoft_datetime.strToDate(options.maxDate);
						maxDate = new Date(maxDate.getFullYear(), maxDate.getMonth(), maxDate.getDate());
						if (currentDate > maxDate) {
							return;
						}
						input.val(_xdsoft_datetime.str());
						input.trigger('change');
						datetimepicker.trigger('close.xdsoft');
					});
				mounth_picker
					.find('.xdsoft_prev,.xdsoft_next')
					.on('touchend mousedown.xdsoft', function () {
						var $this = $(this),
							timer = 0,
							stop = false;

						(function arguments_callee1(v) {
							if ($this.hasClass(options.next)) {
								_xdsoft_datetime.nextMonth();
							} else if ($this.hasClass(options.prev)) {
								_xdsoft_datetime.prevMonth();
							}
							if (options.monthChangeSpinner) {
								if (!stop) {
									timer = setTimeout(arguments_callee1, v || 100);
								}
							}
						}(500));

						$([document.body, window]).on('touchend mouseup.xdsoft', function arguments_callee2() {
							clearTimeout(timer);
							stop = true;
							$([document.body, window]).off('touchend mouseup.xdsoft', arguments_callee2);
						});
					});

				timepicker
					.find('.xdsoft_prev,.xdsoft_next')
					.on('touchend mousedown.xdsoft', function () {
						var $this = $(this),
							timer = 0,
							stop = false,
							period = 110;
						(function arguments_callee4(v) {
							var pheight = timeboxparent[0].clientHeight,
								height = timebox[0].offsetHeight,
								top = Math.abs(parseInt(timebox.css('marginTop'), 10));
							if ($this.hasClass(options.next) && (height - pheight) - options.timeHeightInTimePicker >= top) {
								timebox.css('marginTop', '-' + (top + options.timeHeightInTimePicker) + 'px');
							} else if ($this.hasClass(options.prev) && top - options.timeHeightInTimePicker >= 0) {
								timebox.css('marginTop', '-' + (top - options.timeHeightInTimePicker) + 'px');
							}
							timeboxparent.trigger('scroll_element.xdsoft_scroller', [Math.abs(parseInt(timebox.css('marginTop'), 10) / (height - pheight))]);
							period = (period > 10) ? 10 : period - 10;
							if (!stop) {
								timer = setTimeout(arguments_callee4, v || period);
							}
						}(500));
						$([document.body, window]).on('touchend mouseup.xdsoft', function arguments_callee5() {
							clearTimeout(timer);
							stop = true;
							$([document.body, window])
								.off('touchend mouseup.xdsoft', arguments_callee5);
						});
					});

				xchangeTimer = 0;
				// base handler - generating a calendar and timepicker
				datetimepicker
					.on('xchange.xdsoft', function (event) {
						clearTimeout(xchangeTimer);
						xchangeTimer = setTimeout(function () {

							if (_xdsoft_datetime.currentTime === undefined || _xdsoft_datetime.currentTime === null) {
								_xdsoft_datetime.currentTime = _xdsoft_datetime.now();
							}

							var table =	'',
								start = new Date(_xdsoft_datetime.currentTime.getFullYear(), _xdsoft_datetime.currentTime.getMonth(), 1, 12, 0, 0),
								i = 0,
								j,
								today = _xdsoft_datetime.now(),
								maxDate = false,
								minDate = false,
								hDate,
								day,
								d,
								y,
								m,
								w,
								classes = [],
								customDateSettings,
								newRow = true,
								time = '',
								h = '',
								line_time,
								description;

							while (start.getDay() !== options.dayOfWeekStart) {
								start.setDate(start.getDate() - 1);
							}

							table += '<table><thead><tr>';

							if (options.weeks) {
								table += '<th></th>';
							}

							for (j = 0; j < 7; j += 1) {
								table += '<th>' + options.i18n[globalLocale].dayOfWeekShort[(j + options.dayOfWeekStart) % 7] + '</th>';
							}

							table += '</tr></thead>';
							table += '<tbody>';

							if (options.maxDate !== false) {
								maxDate = _xdsoft_datetime.strToDate(options.maxDate);
								maxDate = new Date(maxDate.getFullYear(), maxDate.getMonth(), maxDate.getDate(), 23, 59, 59, 999);
							}

							if (options.minDate !== false) {
								minDate = _xdsoft_datetime.strToDate(options.minDate);
								minDate = new Date(minDate.getFullYear(), minDate.getMonth(), minDate.getDate());
							}

							while (i < _xdsoft_datetime.currentTime.countDaysInMonth() || start.getDay() !== options.dayOfWeekStart || _xdsoft_datetime.currentTime.getMonth() === start.getMonth()) {
								classes = [];
								i += 1;

								day = start.getDay();
								d = start.getDate();
								y = start.getFullYear();
								m = start.getMonth();
								w = _xdsoft_datetime.getWeekOfYear(start);
								description = '';

								classes.push('xdsoft_date');

								if (options.beforeShowDay && $.isFunction(options.beforeShowDay.call)) {
									customDateSettings = options.beforeShowDay.call(datetimepicker, start);
								} else {
									customDateSettings = null;
								}

								if(options.allowDateRe && Object.prototype.toString.call(options.allowDateRe) === "[object RegExp]"){
									if(!options.allowDateRe.test(start.dateFormat(options.formatDate))){
										classes.push('xdsoft_disabled');
									}
								} else if(options.allowDates && options.allowDates.length>0){
									if(options.allowDates.indexOf(start.dateFormat(options.formatDate)) === -1){
										classes.push('xdsoft_disabled');
									}
								} else if ((maxDate !== false && start > maxDate) || (minDate !== false && start < minDate) || (customDateSettings && customDateSettings[0] === false)) {
									classes.push('xdsoft_disabled');
								} else if (options.disabledDates.indexOf(dateHelper.formatDate(start, options.formatDate)) !== -1) {
									classes.push('xdsoft_disabled');
								} else if (options.disabledWeekDays.indexOf(day) !== -1) {
								    classes.push('xdsoft_disabled');
								}

								if (customDateSettings && customDateSettings[1] !== "") {
									classes.push(customDateSettings[1]);
								}

								if (_xdsoft_datetime.currentTime.getMonth() !== m) {
									classes.push('xdsoft_other_month');
								}

								if ((options.defaultSelect || datetimepicker.data('changed')) && dateHelper.formatDate(_xdsoft_datetime.currentTime, options.formatDate) === dateHelper.formatDate(start, options.formatDate)) {
									classes.push('xdsoft_current');
								}

								if (dateHelper.formatDate(today, options.formatDate) === dateHelper.formatDate(start, options.formatDate)) {
									classes.push('xdsoft_today');
								}

								if (start.getDay() === 0 || start.getDay() === 6 || options.weekends.indexOf(dateHelper.formatDate(start, options.formatDate)) !== -1) {
									classes.push('xdsoft_weekend');
								}

								if (options.highlightedDates[dateHelper.formatDate(start, options.formatDate)] !== undefined) {
									hDate = options.highlightedDates[dateHelper.formatDate(start, options.formatDate)];
									classes.push(hDate.style === undefined ? 'xdsoft_highlighted_default' : hDate.style);
									description = hDate.desc === undefined ? '' : hDate.desc;
								}

								if (options.beforeShowDay && $.isFunction(options.beforeShowDay)) {
									classes.push(options.beforeShowDay(start));
								}

								if (newRow) {
									table += '<tr>';
									newRow = false;
									if (options.weeks) {
										table += '<th>' + w + '</th>';
									}
								}

								table += '<td data-date="' + d + '" data-month="' + m + '" data-year="' + y + '"' + ' class="xdsoft_date xdsoft_day_of_week' + start.getDay() + ' ' + classes.join(' ') + '" title="' + description + '">' +
											'<div>' + d + '</div>' +
										'</td>';

								if (start.getDay() === options.dayOfWeekStartPrev) {
									table += '</tr>';
									newRow = true;
								}

								start.setDate(d + 1);
							}
							table += '</tbody></table>';

							calendar.html(table);

							mounth_picker.find('.xdsoft_label span').eq(0).text(options.i18n[globalLocale].months[_xdsoft_datetime.currentTime.getMonth()]);
							mounth_picker.find('.xdsoft_label span').eq(1).text(_xdsoft_datetime.currentTime.getFullYear());

							// generate timebox
							time = '';
							h = '';
							m = '';

							line_time = function line_time(h, m) {
								var now = _xdsoft_datetime.now(), optionDateTime, current_time,
									isALlowTimesInit = options.allowTimes && $.isArray(options.allowTimes) && options.allowTimes.length;
								now.setHours(h);
								h = parseInt(now.getHours(), 10);
								now.setMinutes(m);
								m = parseInt(now.getMinutes(), 10);
								optionDateTime = new Date(_xdsoft_datetime.currentTime);
								optionDateTime.setHours(h);
								optionDateTime.setMinutes(m);
								classes = [];
								if ((options.minDateTime !== false && options.minDateTime > optionDateTime) || (options.maxTime !== false && _xdsoft_datetime.strtotime(options.maxTime).getTime() < now.getTime()) || (options.minTime !== false && _xdsoft_datetime.strtotime(options.minTime).getTime() > now.getTime())) {
									classes.push('xdsoft_disabled');
								}
								if ((options.minDateTime !== false && options.minDateTime > optionDateTime) || ((options.disabledMinTime !== false && now.getTime() > _xdsoft_datetime.strtotime(options.disabledMinTime).getTime()) && (options.disabledMaxTime !== false && now.getTime() < _xdsoft_datetime.strtotime(options.disabledMaxTime).getTime()))) {
									classes.push('xdsoft_disabled');
								}

								current_time = new Date(_xdsoft_datetime.currentTime);
								current_time.setHours(parseInt(_xdsoft_datetime.currentTime.getHours(), 10));

								if (!isALlowTimesInit) {
									current_time.setMinutes(Math[options.roundTime](_xdsoft_datetime.currentTime.getMinutes() / options.step) * options.step);
								}

								if ((options.initTime || options.defaultSelect || datetimepicker.data('changed')) && current_time.getHours() === parseInt(h, 10) && ((!isALlowTimesInit && options.step > 59) || current_time.getMinutes() === parseInt(m, 10))) {
									if (options.defaultSelect || datetimepicker.data('changed')) {
										classes.push('xdsoft_current');
									} else if (options.initTime) {
										classes.push('xdsoft_init_time');
									}
								}
								if (parseInt(today.getHours(), 10) === parseInt(h, 10) && parseInt(today.getMinutes(), 10) === parseInt(m, 10)) {
									classes.push('xdsoft_today');
								}
								time += '<div class="xdsoft_time ' + classes.join(' ') + '" data-hour="' + h + '" data-minute="' + m + '">' + dateHelper.formatDate(now, options.formatTime) + '</div>';
							};

							if (!options.allowTimes || !$.isArray(options.allowTimes) || !options.allowTimes.length) {
								for (i = 0, j = 0; i < (options.hours12 ? 12 : 24); i += 1) {
									for (j = 0; j < 60; j += options.step) {
										h = (i < 10 ? '0' : '') + i;
										m = (j < 10 ? '0' : '') + j;
										line_time(h, m);
									}
								}
							} else {
								for (i = 0; i < options.allowTimes.length; i += 1) {
									h = _xdsoft_datetime.strtotime(options.allowTimes[i]).getHours();
									m = _xdsoft_datetime.strtotime(options.allowTimes[i]).getMinutes();
									line_time(h, m);
								}
							}

							timebox.html(time);

							opt = '';
							i = 0;

							for (i = parseInt(options.yearStart, 10) + options.yearOffset; i <= parseInt(options.yearEnd, 10) + options.yearOffset; i += 1) {
								opt += '<div class="xdsoft_option ' + (_xdsoft_datetime.currentTime.getFullYear() === i ? 'xdsoft_current' : '') + '" data-value="' + i + '">' + i + '</div>';
							}
							yearselect.children().eq(0)
													.html(opt);

							for (i = parseInt(options.monthStart, 10), opt = ''; i <= parseInt(options.monthEnd, 10); i += 1) {
								opt += '<div class="xdsoft_option ' + (_xdsoft_datetime.currentTime.getMonth() === i ? 'xdsoft_current' : '') + '" data-value="' + i + '">' + options.i18n[globalLocale].months[i] + '</div>';
							}
							monthselect.children().eq(0).html(opt);
							$(datetimepicker)
								.trigger('generate.xdsoft');
						}, 10);
						event.stopPropagation();
					})
					.on('afterOpen.xdsoft', function () {
						if (options.timepicker) {
							var classType, pheight, height, top;
							if (timebox.find('.xdsoft_current').length) {
								classType = '.xdsoft_current';
							} else if (timebox.find('.xdsoft_init_time').length) {
								classType = '.xdsoft_init_time';
							}
							if (classType) {
								pheight = timeboxparent[0].clientHeight;
								height = timebox[0].offsetHeight;
								top = timebox.find(classType).index() * options.timeHeightInTimePicker + 1;
								if ((height - pheight) < top) {
									top = height - pheight;
								}
								timeboxparent.trigger('scroll_element.xdsoft_scroller', [parseInt(top, 10) / (height - pheight)]);
							} else {
								timeboxparent.trigger('scroll_element.xdsoft_scroller', [0]);
							}
						}
					});

				timerclick = 0;
				calendar
					.on('touchend click.xdsoft', 'td', function (xdevent) {
						xdevent.stopPropagation();  // Prevents closing of Pop-ups, Modals and Flyouts in Bootstrap
						timerclick += 1;
						var $this = $(this),
							currentTime = _xdsoft_datetime.currentTime;

						if (currentTime === undefined || currentTime === null) {
							_xdsoft_datetime.currentTime = _xdsoft_datetime.now();
							currentTime = _xdsoft_datetime.currentTime;
						}

						if ($this.hasClass('xdsoft_disabled')) {
							return false;
						}

						currentTime.setDate(1);
						currentTime.setFullYear($this.data('year'));
						currentTime.setMonth($this.data('month'));
						currentTime.setDate($this.data('date'));

						datetimepicker.trigger('select.xdsoft', [currentTime]);

						input.val(_xdsoft_datetime.str());

						if (options.onSelectDate &&	$.isFunction(options.onSelectDate)) {
							options.onSelectDate.call(datetimepicker, _xdsoft_datetime.currentTime, datetimepicker.data('input'), xdevent);
						}

						datetimepicker.data('changed', true);
						datetimepicker.trigger('xchange.xdsoft');
						datetimepicker.trigger('changedatetime.xdsoft');
						if ((timerclick > 1 || (options.closeOnDateSelect === true || (options.closeOnDateSelect === false && !options.timepicker))) && !options.inline) {
							datetimepicker.trigger('close.xdsoft');
						}
						setTimeout(function () {
							timerclick = 0;
						}, 200);
					});

				timebox
					.on('touchend click.xdsoft', 'div', function (xdevent) {
						xdevent.stopPropagation();
						var $this = $(this),
							currentTime = _xdsoft_datetime.currentTime;

						if (currentTime === undefined || currentTime === null) {
							_xdsoft_datetime.currentTime = _xdsoft_datetime.now();
							currentTime = _xdsoft_datetime.currentTime;
						}

						if ($this.hasClass('xdsoft_disabled')) {
							return false;
						}
						currentTime.setHours($this.data('hour'));
						currentTime.setMinutes($this.data('minute'));
						datetimepicker.trigger('select.xdsoft', [currentTime]);

						datetimepicker.data('input').val(_xdsoft_datetime.str());

						if (options.onSelectTime && $.isFunction(options.onSelectTime)) {
							options.onSelectTime.call(datetimepicker, _xdsoft_datetime.currentTime, datetimepicker.data('input'), xdevent);
						}
						datetimepicker.data('changed', true);
						datetimepicker.trigger('xchange.xdsoft');
						datetimepicker.trigger('changedatetime.xdsoft');
						if (options.inline !== true && options.closeOnTimeSelect === true) {
							datetimepicker.trigger('close.xdsoft');
						}
					});


				datepicker
					.on('mousewheel.xdsoft', function (event) {
						if (!options.scrollMonth) {
							return true;
						}
						if (event.deltaY < 0) {
							_xdsoft_datetime.nextMonth();
						} else {
							_xdsoft_datetime.prevMonth();
						}
						return false;
					});

				input
					.on('mousewheel.xdsoft', function (event) {
						if (!options.scrollInput) {
							return true;
						}
						if (!options.datepicker && options.timepicker) {
							current_time_index = timebox.find('.xdsoft_current').length ? timebox.find('.xdsoft_current').eq(0).index() : 0;
							if (current_time_index + event.deltaY >= 0 && current_time_index + event.deltaY < timebox.children().length) {
								current_time_index += event.deltaY;
							}
							if (timebox.children().eq(current_time_index).length) {
								timebox.children().eq(current_time_index).trigger('mousedown');
							}
							return false;
						}
						if (options.datepicker && !options.timepicker) {
							datepicker.trigger(event, [event.deltaY, event.deltaX, event.deltaY]);
							if (input.val) {
								input.val(_xdsoft_datetime.str());
							}
							datetimepicker.trigger('changedatetime.xdsoft');
							return false;
						}
					});

				datetimepicker
					.on('changedatetime.xdsoft', function (event) {
						if (options.onChangeDateTime && $.isFunction(options.onChangeDateTime)) {
							var $input = datetimepicker.data('input');
							options.onChangeDateTime.call(datetimepicker, _xdsoft_datetime.currentTime, $input, event);
							delete options.value;
							$input.trigger('change');
						}
					})
					.on('generate.xdsoft', function () {
						if (options.onGenerate && $.isFunction(options.onGenerate)) {
							options.onGenerate.call(datetimepicker, _xdsoft_datetime.currentTime, datetimepicker.data('input'));
						}
						if (triggerAfterOpen) {
							datetimepicker.trigger('afterOpen.xdsoft');
							triggerAfterOpen = false;
						}
					})
					.on('click.xdsoft', function (xdevent) {
						xdevent.stopPropagation();
					});

				current_time_index = 0;

				setPos = function () {
					/**
	                 * 修复输入框在window最右边，且输入框的宽度小于日期控件宽度情况下，日期控件显示不全的bug。
	                 * Bug fixed - The datetimepicker will overflow-y when the width of the date input less than its, which
	                 * could causes part of the datetimepicker being hidden.
	                 * by Soon start
	                 */
	                var offset = datetimepicker.data('input').offset(),
	                    datetimepickerelement = datetimepicker.data('input')[0],
	                    top = offset.top + datetimepickerelement.offsetHeight - 1,
	                    left = offset.left,
	                    position = "absolute",
	                    node;

	                if ((document.documentElement.clientWidth - offset.left) < datepicker.parent().outerWidth(true)) {
	                    var diff = datepicker.parent().outerWidth(true) - datetimepickerelement.offsetWidth;
	                    left = left - diff;
	                }
	                /**
	                 * by Soon end
	                 */
					if (datetimepicker.data('input').parent().css('direction') == 'rtl')
						left -= (datetimepicker.outerWidth() - datetimepicker.data('input').outerWidth());
					if (options.fixed) {
						top -= $(window).scrollTop();
						left -= $(window).scrollLeft();
						position = "fixed";
					} else {
						if (top + datetimepickerelement.offsetHeight > $(window).height() + $(window).scrollTop()) {
							top = offset.top - datetimepickerelement.offsetHeight + 1;
						}
						if (top < 0) {
							top = 0;
						}
						if (left + datetimepickerelement.offsetWidth > $(window).width()) {
							left = $(window).width() - datetimepickerelement.offsetWidth;
						}
					}

					node = datetimepicker[0];
					do {
						node = node.parentNode;
						if (window.getComputedStyle(node).getPropertyValue('position') === 'relative' && $(window).width() >= node.offsetWidth) {
							left = left - (($(window).width() - node.offsetWidth) / 2);
							break;
						}
					} while (node.nodeName !== 'HTML');
					datetimepicker.css({
						left: left,
						top: top,
						position: position
					});
				};
				datetimepicker
					.on('open.xdsoft', function (event) {
						var onShow = true;
						if (options.onShow && $.isFunction(options.onShow)) {
							onShow = options.onShow.call(datetimepicker, _xdsoft_datetime.currentTime, datetimepicker.data('input'), event);
						}
						if (onShow !== false) {
							datetimepicker.show();
							setPos();
							$(window)
								.off('resize.xdsoft', setPos)
								.on('resize.xdsoft', setPos);

							if (options.closeOnWithoutClick) {
								$([document.body, window]).on('touchstart mousedown.xdsoft', function arguments_callee6() {
									datetimepicker.trigger('close.xdsoft');
									$([document.body, window]).off('touchstart mousedown.xdsoft', arguments_callee6);
								});
							}
						}
					})
					.on('close.xdsoft', function (event) {
						var onClose = true;
						mounth_picker
							.find('.xdsoft_month,.xdsoft_year')
								.find('.xdsoft_select')
									.hide();
						if (options.onClose && $.isFunction(options.onClose)) {
							onClose = options.onClose.call(datetimepicker, _xdsoft_datetime.currentTime, datetimepicker.data('input'), event);
						}
						if (onClose !== false && !options.opened && !options.inline) {
							datetimepicker.hide();
						}
						event.stopPropagation();
					})
					.on('toggle.xdsoft', function (event) {
						if (datetimepicker.is(':visible')) {
							datetimepicker.trigger('close.xdsoft');
						} else {
							datetimepicker.trigger('open.xdsoft');
						}
					})
					.data('input', input);

				timer = 0;
				timer1 = 0;

				datetimepicker.data('xdsoft_datetime', _xdsoft_datetime);
				datetimepicker.setOptions(options);

				function getCurrentValue() {
					var ct = false, time;

					if (options.startDate) {
						ct = _xdsoft_datetime.strToDate(options.startDate);
					} else {
						ct = options.value || ((input && input.val && input.val()) ? input.val() : '');
						if (ct) {
							ct = _xdsoft_datetime.strToDateTime(ct);
						} else if (options.defaultDate) {
							ct = _xdsoft_datetime.strToDateTime(options.defaultDate);
							if (options.defaultTime) {
								time = _xdsoft_datetime.strtotime(options.defaultTime);
								ct.setHours(time.getHours());
								ct.setMinutes(time.getMinutes());
							}
						}
					}

					if (ct && _xdsoft_datetime.isValidDate(ct)) {
						datetimepicker.data('changed', true);
					} else {
						ct = '';
					}

					return ct || 0;
				}

				_xdsoft_datetime.setCurrentTime(getCurrentValue());

				input
					.data('xdsoft_datetimepicker', datetimepicker)
					.on('open.xdsoft focusin.xdsoft mousedown.xdsoft touchstart', function (event) {
						if (input.is(':disabled') || (input.data('xdsoft_datetimepicker').is(':visible') && options.closeOnInputClick)) {
							return;
						}
						clearTimeout(timer);
						timer = setTimeout(function () {
							if (input.is(':disabled')) {
								return;
							}

							triggerAfterOpen = true;
							_xdsoft_datetime.setCurrentTime(getCurrentValue());

							datetimepicker.trigger('open.xdsoft');
						}, 100);
					})
					.on('keydown.xdsoft', function (event) {
						var val = this.value, elementSelector,
							key = event.which;
						if ([ENTER].indexOf(key) !== -1 && options.enterLikeTab) {
							elementSelector = $("input:visible,textarea:visible,button:visible,a:visible");
							datetimepicker.trigger('close.xdsoft');
							elementSelector.eq(elementSelector.index(this) + 1).focus();
							return false;
						}
						if ([TAB].indexOf(key) !== -1) {
							datetimepicker.trigger('close.xdsoft');
							return true;
						}
					});
			};
			destroyDateTimePicker = function (input) {
				var datetimepicker = input.data('xdsoft_datetimepicker');
				if (datetimepicker) {
					datetimepicker.data('xdsoft_datetime', null);
					datetimepicker.remove();
					input
						.data('xdsoft_datetimepicker', null)
						.off('.xdsoft');
					$(window).off('resize.xdsoft');
					$([window, document.body]).off('mousedown.xdsoft touchstart');
					if (input.unmousewheel) {
						input.unmousewheel();
					}
				}
			};
			$(document)
				.off('keydown.xdsoftctrl keyup.xdsoftctrl')
				.on('keydown.xdsoftctrl', function (e) {
					if (e.keyCode === CTRLKEY) {
						ctrlDown = true;
					}
				})
				.on('keyup.xdsoftctrl', function (e) {
					if (e.keyCode === CTRLKEY) {
						ctrlDown = false;
					}
				});
			
	        this.each(function () {
				var datetimepicker = $(this).data('xdsoft_datetimepicker'), $input;
				if (datetimepicker) {
					if ($.type(opt) === 'string') {
						switch (opt) {
						case 'show':
							$(this).select().focus();
							datetimepicker.trigger('open.xdsoft');
							break;
						case 'hide':
							datetimepicker.trigger('close.xdsoft');
							break;
						case 'toggle':
							datetimepicker.trigger('toggle.xdsoft');
							break;
						case 'destroy':
							destroyDateTimePicker($(this));
							break;
						case 'reset':
							this.value = this.defaultValue;
							if (!this.value || !datetimepicker.data('xdsoft_datetime').isValidDate(dateHelper.parseDate(this.value, options.format))) {
								datetimepicker.data('changed', false);
							}
							datetimepicker.data('xdsoft_datetime').setCurrentTime(this.value);
							break;
						case 'validate':
							$input = datetimepicker.data('input');
							$input.trigger('blur.xdsoft');
							break;
	                    default:
	                        if (datetimepicker[opt] && $.isFunction(datetimepicker[opt])) {
	                            result = datetimepicker[opt](opt2);
	                        }
						}
					} else {
						datetimepicker
							.setOptions(opt);
					}
					return 0;
				}
				if ($.type(opt) !== 'string') {
					if (!options.lazyInit || options.open || options.inline) {
						createDateTimePicker($(this));
					} else {
						lazyInit($(this));
					}
				}
			});

	        return result;
		};
		$.fn.datetimepicker.defaults = default_options;

		function HighlightedDate(date, desc, style) {
			"use strict";
			this.date = date;
			this.desc = desc;
			this.style = style;
		}

	}));
	/*!
	 * jQuery Mousewheel 3.1.13
	 *
	 * Copyright jQuery Foundation and other contributors
	 * Released under the MIT license
	 * http://jquery.org/license
	 */

	(function (factory) {
	    if ( true ) {
	        // AMD. Register as an anonymous module.
	        !(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(82)], __WEBPACK_AMD_DEFINE_FACTORY__ = (factory), __WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ? (__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
	    } else if (typeof exports === 'object') {
	        // Node/CommonJS style for Browserify
	        module.exports = factory;
	    } else {
	        // Browser globals
	        factory(jQuery);
	    }
	}(function ($) {

	    var toFix  = ['wheel', 'mousewheel', 'DOMMouseScroll', 'MozMousePixelScroll'],
	        toBind = ( 'onwheel' in document || document.documentMode >= 9 ) ?
	                    ['wheel'] : ['mousewheel', 'DomMouseScroll', 'MozMousePixelScroll'],
	        slice  = Array.prototype.slice,
	        nullLowestDeltaTimeout, lowestDelta;

	    if ( $.event.fixHooks ) {
	        for ( var i = toFix.length; i; ) {
	            $.event.fixHooks[ toFix[--i] ] = $.event.mouseHooks;
	        }
	    }

	    var special = $.event.special.mousewheel = {
	        version: '3.1.12',

	        setup: function() {
	            if ( this.addEventListener ) {
	                for ( var i = toBind.length; i; ) {
	                    this.addEventListener( toBind[--i], handler, false );
	                }
	            } else {
	                this.onmousewheel = handler;
	            }
	            // Store the line height and page height for this particular element
	            $.data(this, 'mousewheel-line-height', special.getLineHeight(this));
	            $.data(this, 'mousewheel-page-height', special.getPageHeight(this));
	        },

	        teardown: function() {
	            if ( this.removeEventListener ) {
	                for ( var i = toBind.length; i; ) {
	                    this.removeEventListener( toBind[--i], handler, false );
	                }
	            } else {
	                this.onmousewheel = null;
	            }
	            // Clean up the data we added to the element
	            $.removeData(this, 'mousewheel-line-height');
	            $.removeData(this, 'mousewheel-page-height');
	        },

	        getLineHeight: function(elem) {
	            var $elem = $(elem),
	                $parent = $elem['offsetParent' in $.fn ? 'offsetParent' : 'parent']();
	            if (!$parent.length) {
	                $parent = $('body');
	            }
	            return parseInt($parent.css('fontSize'), 10) || parseInt($elem.css('fontSize'), 10) || 16;
	        },

	        getPageHeight: function(elem) {
	            return $(elem).height();
	        },

	        settings: {
	            adjustOldDeltas: true, // see shouldAdjustOldDeltas() below
	            normalizeOffset: true  // calls getBoundingClientRect for each event
	        }
	    };

	    $.fn.extend({
	        mousewheel: function(fn) {
	            return fn ? this.bind('mousewheel', fn) : this.trigger('mousewheel');
	        },

	        unmousewheel: function(fn) {
	            return this.unbind('mousewheel', fn);
	        }
	    });


	    function handler(event) {
	        var orgEvent   = event || window.event,
	            args       = slice.call(arguments, 1),
	            delta      = 0,
	            deltaX     = 0,
	            deltaY     = 0,
	            absDelta   = 0,
	            offsetX    = 0,
	            offsetY    = 0;
	        event = $.event.fix(orgEvent);
	        event.type = 'mousewheel';

	        // Old school scrollwheel delta
	        if ( 'detail'      in orgEvent ) { deltaY = orgEvent.detail * -1;      }
	        if ( 'wheelDelta'  in orgEvent ) { deltaY = orgEvent.wheelDelta;       }
	        if ( 'wheelDeltaY' in orgEvent ) { deltaY = orgEvent.wheelDeltaY;      }
	        if ( 'wheelDeltaX' in orgEvent ) { deltaX = orgEvent.wheelDeltaX * -1; }

	        // Firefox < 17 horizontal scrolling related to DOMMouseScroll event
	        if ( 'axis' in orgEvent && orgEvent.axis === orgEvent.HORIZONTAL_AXIS ) {
	            deltaX = deltaY * -1;
	            deltaY = 0;
	        }

	        // Set delta to be deltaY or deltaX if deltaY is 0 for backwards compatabilitiy
	        delta = deltaY === 0 ? deltaX : deltaY;

	        // New school wheel delta (wheel event)
	        if ( 'deltaY' in orgEvent ) {
	            deltaY = orgEvent.deltaY * -1;
	            delta  = deltaY;
	        }
	        if ( 'deltaX' in orgEvent ) {
	            deltaX = orgEvent.deltaX;
	            if ( deltaY === 0 ) { delta  = deltaX * -1; }
	        }

	        // No change actually happened, no reason to go any further
	        if ( deltaY === 0 && deltaX === 0 ) { return; }

	        // Need to convert lines and pages to pixels if we aren't already in pixels
	        // There are three delta modes:
	        //   * deltaMode 0 is by pixels, nothing to do
	        //   * deltaMode 1 is by lines
	        //   * deltaMode 2 is by pages
	        if ( orgEvent.deltaMode === 1 ) {
	            var lineHeight = $.data(this, 'mousewheel-line-height');
	            delta  *= lineHeight;
	            deltaY *= lineHeight;
	            deltaX *= lineHeight;
	        } else if ( orgEvent.deltaMode === 2 ) {
	            var pageHeight = $.data(this, 'mousewheel-page-height');
	            delta  *= pageHeight;
	            deltaY *= pageHeight;
	            deltaX *= pageHeight;
	        }

	        // Store lowest absolute delta to normalize the delta values
	        absDelta = Math.max( Math.abs(deltaY), Math.abs(deltaX) );

	        if ( !lowestDelta || absDelta < lowestDelta ) {
	            lowestDelta = absDelta;

	            // Adjust older deltas if necessary
	            if ( shouldAdjustOldDeltas(orgEvent, absDelta) ) {
	                lowestDelta /= 40;
	            }
	        }

	        // Adjust older deltas if necessary
	        if ( shouldAdjustOldDeltas(orgEvent, absDelta) ) {
	            // Divide all the things by 40!
	            delta  /= 40;
	            deltaX /= 40;
	            deltaY /= 40;
	        }

	        // Get a whole, normalized value for the deltas
	        delta  = Math[ delta  >= 1 ? 'floor' : 'ceil' ](delta  / lowestDelta);
	        deltaX = Math[ deltaX >= 1 ? 'floor' : 'ceil' ](deltaX / lowestDelta);
	        deltaY = Math[ deltaY >= 1 ? 'floor' : 'ceil' ](deltaY / lowestDelta);

	        // Normalise offsetX and offsetY properties
	        if ( special.settings.normalizeOffset && this.getBoundingClientRect ) {
	            var boundingRect = this.getBoundingClientRect();
	            offsetX = event.clientX - boundingRect.left;
	            offsetY = event.clientY - boundingRect.top;
	        }

	        // Add information to the event object
	        event.deltaX = deltaX;
	        event.deltaY = deltaY;
	        event.deltaFactor = lowestDelta;
	        event.offsetX = offsetX;
	        event.offsetY = offsetY;
	        // Go ahead and set deltaMode to 0 since we converted to pixels
	        // Although this is a little odd since we overwrite the deltaX/Y
	        // properties with normalized deltas.
	        event.deltaMode = 0;

	        // Add event and delta to the front of the arguments
	        args.unshift(event, delta, deltaX, deltaY);

	        // Clearout lowestDelta after sometime to better
	        // handle multiple device types that give different
	        // a different lowestDelta
	        // Ex: trackpad = 3 and mouse wheel = 120
	        if (nullLowestDeltaTimeout) { clearTimeout(nullLowestDeltaTimeout); }
	        nullLowestDeltaTimeout = setTimeout(nullLowestDelta, 200);

	        return ($.event.dispatch || $.event.handle).apply(this, args);
	    }

	    function nullLowestDelta() {
	        lowestDelta = null;
	    }

	    function shouldAdjustOldDeltas(orgEvent, absDelta) {
	        // If this is an older event and the delta is divisable by 120,
	        // then we are assuming that the browser is treating this as an
	        // older mouse wheel event and that we should divide the deltas
	        // by 40 to try and get a more usable deltaFactor.
	        // Side note, this actually impacts the reported scroll distance
	        // in older browsers and can cause scrolling to be slower than native.
	        // Turn this off by setting $.event.special.mousewheel.settings.adjustOldDeltas to false.
	        return special.settings.adjustOldDeltas && orgEvent.type === 'mousewheel' && absDelta % 120 === 0;
	    }

	}));


/***/ },

/***/ 121:
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(122);
	__webpack_require__(124);
	//require('markdown/lib/markdown.js');
	//require('marked/lib/marked.js');
	//require('to-markdown/dist/to-markdown.js');
	__webpack_require__(126);
	__webpack_require__(127);



/***/ },

/***/ 122:
/***/ function(module, exports) {

	// removed by extract-text-webpack-plugin

/***/ },

/***/ 124:
/***/ function(module, exports) {

	// removed by extract-text-webpack-plugin

/***/ },

/***/ 126:
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;/* ===================================================
	 * bootstrap-markdown.js v2.10.0
	 * http://github.com/toopay/bootstrap-markdown
	 * ===================================================
	 * Copyright 2013-2016 Taufan Aditya
	 *
	 * Licensed under the Apache License, Version 2.0 (the "License");
	 * you may not use this file except in compliance with the License.
	 * You may obtain a copy of the License at
	 *
	 * http://www.apache.org/licenses/LICENSE-2.0
	 *
	 * Unless required by applicable law or agreed to in writing, software
	 * distributed under the License is distributed on an "AS IS" BASIS,
	 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
	 * See the License for the specific language governing permissions and
	 * limitations under the License.
	 * ========================================================== */

	(function(factory){
	    if (true) {
	        //RequireJS
	        !(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(82)], __WEBPACK_AMD_DEFINE_FACTORY__ = (factory), __WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ? (__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
	    } else if (typeof exports === 'object') {
	        //Backbone.js
	        factory(require('jquery'));
	    } else {
	        //Jquery plugin
	        factory(jQuery);
	    }
	}(function($){
	  "use strict"; // jshint ;_;

	  /* MARKDOWN CLASS DEFINITION
	   * ========================== */

	  var Markdown = function (element, options) {
	    // @TODO : remove this BC on next major release
	    // @see : https://github.com/toopay/bootstrap-markdown/issues/109
	    var opts = ['autofocus', 'savable', 'hideable', 'width', 
	      'height', 'resize', 'iconlibrary', 'language', 
	      'footer', 'fullscreen', 'hiddenButtons', 'disabledButtons'];
	    $.each(opts,function(_, opt){
	      if (typeof $(element).data(opt) !== 'undefined') {
	        options = typeof options == 'object' ? options : {}
	        options[opt] = $(element).data(opt)
	      }
	    });
	    // End BC

	    // Class Properties
	    this.$ns           = 'bootstrap-markdown';
	    this.$element      = $(element);
	    this.$editable     = {el:null, type:null,attrKeys:[], attrValues:[], content:null};
	    this.$options      = $.extend(true, {}, $.fn.markdown.defaults, options, this.$element.data('options'));
	    this.$oldContent   = null;
	    this.$isPreview    = false;
	    this.$isFullscreen = false;
	    this.$editor       = null;
	    this.$textarea     = null;
	    this.$handler      = [];
	    this.$callback     = [];
	    this.$nextTab      = [];

	    this.showEditor();
	  };

	  Markdown.prototype = {

	    constructor: Markdown

	  , __alterButtons: function(name,alter) {
	      var handler = this.$handler, isAll = (name == 'all'),that = this;

	      $.each(handler,function(k,v) {
	        var halt = true;
	        if (isAll) {
	          halt = false;
	        } else {
	          halt = v.indexOf(name) < 0;
	        }

	        if (halt === false) {
	          alter(that.$editor.find('button[data-handler="'+v+'"]'));
	        }
	      });
	    }

	  , __buildButtons: function(buttonsArray, container) {
	      var i,
	          ns = this.$ns,
	          handler = this.$handler,
	          callback = this.$callback;

	      for (i=0;i<buttonsArray.length;i++) {
	        // Build each group container
	        var y, btnGroups = buttonsArray[i];
	        for (y=0;y<btnGroups.length;y++) {
	          // Build each button group
	          var z,
	              buttons = btnGroups[y].data,
	              btnGroupContainer = $('<div/>', {
	                                    'class': 'btn-group'
	                                  });

	          for (z=0;z<buttons.length;z++) {
	            var button = buttons[z],
	                buttonContainer, buttonIconContainer,
	                buttonHandler = ns+'-'+button.name,
	                buttonIcon = this.__getIcon(button.icon),
	                btnText = button.btnText ? button.btnText : '',
	                btnClass = button.btnClass ? button.btnClass : 'btn',
	                tabIndex = button.tabIndex ? button.tabIndex : '-1',
	                hotkey = typeof button.hotkey !== 'undefined' ? button.hotkey : '',
	                hotkeyCaption = typeof jQuery.hotkeys !== 'undefined' && hotkey !== '' ? ' ('+hotkey+')' : '';

	            // Construct the button object
	            buttonContainer = $('<button></button>');
	            buttonContainer.text(' ' + this.__localize(btnText)).addClass('btn-default btn-sm').addClass(btnClass);
	            if(btnClass.match(/btn\-(primary|success|info|warning|danger|link)/)){
	                buttonContainer.removeClass('btn-default');
	            }
	            buttonContainer.attr({
	                'type': 'button',
	                'title': this.__localize(button.title) + hotkeyCaption,
	                'tabindex': tabIndex,
	                'data-provider': ns,
	                'data-handler': buttonHandler,
	                'data-hotkey': hotkey
	            });
	            if (button.toggle === true){
	              buttonContainer.attr('data-toggle', 'button');
	            }
	            buttonIconContainer = $('<span/>');
	            buttonIconContainer.addClass(buttonIcon);
	            buttonIconContainer.prependTo(buttonContainer);

	            // Attach the button object
	            btnGroupContainer.append(buttonContainer);

	            // Register handler and callback
	            handler.push(buttonHandler);
	            callback.push(button.callback);
	          }

	          // Attach the button group into container dom
	          container.append(btnGroupContainer);
	        }
	      }

	      return container;
	    }
	  , __setListener: function() {
	      // Set size and resizable Properties
	      var hasRows = typeof this.$textarea.attr('rows') !== 'undefined',
	          maxRows = this.$textarea.val().split("\n").length > 5 ? this.$textarea.val().split("\n").length : '5',
	          rowsVal = hasRows ? this.$textarea.attr('rows') : maxRows;

	      this.$textarea.attr('rows',rowsVal);
	      if (this.$options.resize) {
	        this.$textarea.css('resize',this.$options.resize);
	      }

	      this.$textarea.on({
	          'focus' : $.proxy(this.focus, this),
	          'keyup' : $.proxy(this.keyup, this),
	          'change' : $.proxy(this.change, this),
	          'select' : $.proxy(this.select, this)
	      });

	      if (this.eventSupported('keydown')) {
	        this.$textarea.on('keydown', $.proxy(this.keydown, this));
	      }

	      if (this.eventSupported('keypress')) {
	        this.$textarea.on('keypress', $.proxy(this.keypress, this))
	      }

	      // Re-attach markdown data
	      this.$textarea.data('markdown',this);
	    }

	  , __handle: function(e) {
	      var target = $(e.currentTarget),
	          handler = this.$handler,
	          callback = this.$callback,
	          handlerName = target.attr('data-handler'),
	          callbackIndex = handler.indexOf(handlerName),
	          callbackHandler = callback[callbackIndex];

	      // Trigger the focusin
	      $(e.currentTarget).focus();

	      callbackHandler(this);

	      // Trigger onChange for each button handle
	      this.change(this);

	      // Unless it was the save handler,
	      // focusin the textarea
	      if (handlerName.indexOf('cmdSave') < 0) {
	        this.$textarea.focus();
	      }

	      e.preventDefault();
	    }

	  , __localize: function(string) {
	      var messages = $.fn.markdown.messages,
	          language = this.$options.language;
	      if (
	        typeof messages !== 'undefined' &&
	        typeof messages[language] !== 'undefined' &&
	        typeof messages[language][string] !== 'undefined'
	      ) {
	        return messages[language][string];
	      }
	      return string;
	    }

	  , __getIcon: function(src) {
	    return typeof src == 'object' ? src[this.$options.iconlibrary] : src;
	  }

	  , setFullscreen: function(mode) {
	    var $editor = this.$editor,
	        $textarea = this.$textarea;

	    if (mode === true) {
	      $editor.addClass('md-fullscreen-mode');
	      $('body').addClass('md-nooverflow');
	      this.$options.onFullscreen(this);
	    } else {
	      $editor.removeClass('md-fullscreen-mode');
	      $('body').removeClass('md-nooverflow');
	      this.$options.onFullscreenExit(this);

	      if (this.$isPreview == true) this.hidePreview().showPreview()
	    }

	    this.$isFullscreen = mode;
	    $textarea.focus();
	  }

	  , showEditor: function() {
	      var instance = this,
	          textarea,
	          ns = this.$ns,
	          container = this.$element,
	          originalHeigth = container.css('height'),
	          originalWidth = container.css('width'),
	          editable = this.$editable,
	          handler = this.$handler,
	          callback = this.$callback,
	          options = this.$options,
	          editor = $( '<div/>', {
	                      'class': 'md-editor',
	                      click: function() {
	                        instance.focus();
	                      }
	                    });

	      // Prepare the editor
	      if (this.$editor === null) {
	        // Create the panel
	        var editorHeader = $('<div/>', {
	                            'class': 'md-header btn-toolbar'
	                            });

	        // Merge the main & additional button groups together
	        var allBtnGroups = [];
	        if (options.buttons.length > 0) allBtnGroups = allBtnGroups.concat(options.buttons[0]);
	        if (options.additionalButtons.length > 0) {
	          // iterate the additional button groups
	          $.each(options.additionalButtons[0], function(idx, buttonGroup){
	            
	            // see if the group name of the addional group matches an existing group
	            var matchingGroups = $.grep(allBtnGroups, function(allButtonGroup, allIdx){
	              return allButtonGroup.name === buttonGroup.name;
	            });

	            // if it matches add the addional buttons to that group, if not just add it to the all buttons group
	            if(matchingGroups.length > 0) {
	              matchingGroups[0].data = matchingGroups[0].data.concat(buttonGroup.data);
	            } else {              
	              allBtnGroups.push(options.additionalButtons[0][idx]);
	            }

	          });
	        } 

	        // Reduce and/or reorder the button groups
	        if (options.reorderButtonGroups.length > 0) {
	          allBtnGroups = allBtnGroups
	              .filter(function(btnGroup) {
	                return options.reorderButtonGroups.indexOf(btnGroup.name) > -1;
	              })
	              .sort(function(a, b) {
	                if (options.reorderButtonGroups.indexOf(a.name) < options.reorderButtonGroups.indexOf(b.name)) return -1;
	                if (options.reorderButtonGroups.indexOf(a.name) > options.reorderButtonGroups.indexOf(b.name)) return 1;
	                return 0;
	              });
	        }

	        // Build the buttons
	        if (allBtnGroups.length > 0) {
	          editorHeader = this.__buildButtons([allBtnGroups], editorHeader);
	        }

	        if (options.fullscreen.enable) {
	          editorHeader.append('<div class="md-controls"><a class="md-control md-control-fullscreen" href="#"><span class="'+this.__getIcon(options.fullscreen.icons.fullscreenOn)+'"></span></a></div>').on('click', '.md-control-fullscreen', function(e) {
	              e.preventDefault();
	              instance.setFullscreen(true);
	          });
	        }

	        editor.append(editorHeader);

	        // Wrap the textarea
	        if (container.is('textarea')) {
	          container.before(editor);
	          textarea = container;
	          textarea.addClass('md-input');
	          editor.append(textarea);
	        } else {
	          var rawContent = (typeof toMarkdown == 'function') ? toMarkdown(container.html()) : container.html(),
	              currentContent = $.trim(rawContent);

	          // This is some arbitrary content that could be edited
	          textarea = $('<textarea/>', {
	                       'class': 'md-input',
	                       'val' : currentContent
	                      });

	          editor.append(textarea);

	          // Save the editable
	          editable.el = container;
	          editable.type = container.prop('tagName').toLowerCase();
	          editable.content = container.html();

	          $(container[0].attributes).each(function(){
	            editable.attrKeys.push(this.nodeName);
	            editable.attrValues.push(this.nodeValue);
	          });

	          // Set editor to blocked the original container
	          container.replaceWith(editor);
	        }

	        var editorFooter = $('<div/>', {
	                           'class': 'md-footer'
	                         }),
	            createFooter = false,
	            footer = '';
	        // Create the footer if savable
	        if (options.savable) {
	          createFooter = true;
	          var saveHandler = 'cmdSave';

	          // Register handler and callback
	          handler.push(saveHandler);
	          callback.push(options.onSave);

	          editorFooter.append('<button class="btn btn-success" data-provider="'
	                              + ns
	                              + '" data-handler="'
	                              + saveHandler
	                              + '"><i class="icon icon-white icon-ok"></i> '
	                              + this.__localize('Save')
	                              + '</button>');


	        }

	        footer = typeof options.footer === 'function' ? options.footer(this) : options.footer;

	        if ($.trim(footer) !== '') {
	          createFooter = true;
	          editorFooter.append(footer);
	        }

	        if (createFooter) editor.append(editorFooter);

	        // Set width
	        if (options.width && options.width !== 'inherit') {
	          if (jQuery.isNumeric(options.width)) {
	            editor.css('display', 'table');
	            textarea.css('width', options.width + 'px');
	          } else {
	            editor.addClass(options.width);
	          }
	        }

	        // Set height
	        if (options.height && options.height !== 'inherit') {
	          if (jQuery.isNumeric(options.height)) {
	            var height = options.height;
	            if (editorHeader) height = Math.max(0, height - editorHeader.outerHeight());
	            if (editorFooter) height = Math.max(0, height - editorFooter.outerHeight());
	            textarea.css('height', height + 'px');
	          } else {
	            editor.addClass(options.height);
	          }
	        }

	        // Reference
	        this.$editor     = editor;
	        this.$textarea   = textarea;
	        this.$editable   = editable;
	        this.$oldContent = this.getContent();

	        this.__setListener();

	        // Set editor attributes, data short-hand API and listener
	        this.$editor.attr('id',(new Date()).getTime());
	        this.$editor.on('click', '[data-provider="bootstrap-markdown"]', $.proxy(this.__handle, this));

	        if (this.$element.is(':disabled') || this.$element.is('[readonly]')) {
	          this.$editor.addClass('md-editor-disabled');
	          this.disableButtons('all');
	        }

	        if (this.eventSupported('keydown') && typeof jQuery.hotkeys === 'object') {
	          editorHeader.find('[data-provider="bootstrap-markdown"]').each(function() {
	            var $button = $(this),
	                hotkey = $button.attr('data-hotkey');
	            if (hotkey.toLowerCase() !== '') {
	              textarea.bind('keydown', hotkey, function() {
	                $button.trigger('click');
	                return false;
	              });
	            }
	          });
	        }

	        if (options.initialstate === 'preview') {
	          this.showPreview();
	        } else if (options.initialstate === 'fullscreen' && options.fullscreen.enable) {
	          this.setFullscreen(true);
	        }

	      } else {
	        this.$editor.show();
	      }

	      if (options.autofocus) {
	        this.$textarea.focus();
	        this.$editor.addClass('active');
	      }

	      if (options.fullscreen.enable && options.fullscreen !== false) {
	        this.$editor.append('<div class="md-fullscreen-controls">'
	                        + '<a href="#" class="exit-fullscreen" title="Exit fullscreen"><span class="' + this.__getIcon(options.fullscreen.icons.fullscreenOff) + '">'
	                        + '</span></a>'
	                        + '</div>');
	        this.$editor.on('click', '.exit-fullscreen', function(e) {
	          e.preventDefault();
	          instance.setFullscreen(false);
	        });
	      }

	      // hide hidden buttons from options
	      this.hideButtons(options.hiddenButtons);

	      // disable disabled buttons from options
	      this.disableButtons(options.disabledButtons);

	      // enable dropZone if available and configured
	      if (options.dropZoneOptions) {
	        if (this.$editor.dropzone) {
	          options.dropZoneOptions.init = function() {
	            var caretPos = 0;
	            this.on('drop', function(e) {
	              caretPos = textarea.prop('selectionStart');
	            });
	            this.on('success', function(file, path) {
	              var text = textarea.val();
	              textarea.val(text.substring(0, caretPos) + '\n![description](' + path + ')\n' + text.substring(caretPos) );
	            });
	            this.on('error', function(file, error, xhr) {
	              console.log('Error:', error);
	            });
	          }
	          this.$textarea.addClass('dropzone');
	          this.$editor.dropzone(options.dropZoneOptions);
	        } else {
	          console.log('dropZoneOptions was configured, but DropZone was not detected.');
	        }
	      }

	      // Trigger the onShow hook
	      options.onShow(this);

	      return this;
	    }

	  , parseContent: function(val) {
	      var content;

	      // parse with supported markdown parser
	      var val = val || this.$textarea.val();

	      if (this.$options.parser) {
	        content = this.$options.parser(val);
	      } else if (typeof markdown == 'object') {
	        content = markdown.toHTML(val);
	      } else if (typeof marked == 'function') {
	        content = marked(val);
	      } else {
	        content = val;
	      }

	      return content;
	    }

	  , showPreview: function() {
	      var options = this.$options,
	          container = this.$textarea,
	          afterContainer = container.next(),
	          replacementContainer = $('<div/>',{'class':'md-preview','data-provider':'markdown-preview'}),
	          content,
	          callbackContent;

	      if (this.$isPreview == true) {
	        // Avoid sequenced element creation on missused scenario
	        // @see https://github.com/toopay/bootstrap-markdown/issues/170
	        return this;
	      }
	      
	      // Give flag that tell the editor enter preview mode
	      this.$isPreview = true;
	      // Disable all buttons
	      this.disableButtons('all').enableButtons('cmdPreview');

	      // Try to get the content from callback
	      callbackContent = options.onPreview(this);
	      // Set the content based from the callback content if string otherwise parse value from textarea
	      content = typeof callbackContent == 'string' ? callbackContent : this.parseContent();

	      // Build preview element
	      replacementContainer.html(content);

	      if (afterContainer && afterContainer.attr('class') == 'md-footer') {
	        // If there is footer element, insert the preview container before it
	        replacementContainer.insertBefore(afterContainer);
	      } else {
	        // Otherwise, just append it after textarea
	        container.parent().append(replacementContainer);
	      }

	      // Set the preview element dimensions
	      replacementContainer.css({
	        width: container.outerWidth() + 'px',
	        height: container.outerHeight() + 'px'
	      });

	      if (this.$options.resize) {
	        replacementContainer.css('resize',this.$options.resize);
	      }

	      // Hide the last-active textarea
	      container.hide();

	      // Attach the editor instances
	      replacementContainer.data('markdown',this);

	      if (this.$element.is(':disabled') || this.$element.is('[readonly]')) {
	        this.$editor.addClass('md-editor-disabled');
	        this.disableButtons('all');
	      }

	      return this;
	    }

	  , hidePreview: function() {
	      // Give flag that tell the editor quit preview mode
	      this.$isPreview = false;

	      // Obtain the preview container
	      var container = this.$editor.find('div[data-provider="markdown-preview"]');

	      // Remove the preview container
	      container.remove();

	      // Enable all buttons
	      this.enableButtons('all');
	      // Disable configured disabled buttons
	      this.disableButtons(this.$options.disabledButtons);

	      // Back to the editor
	      this.$textarea.show();
	      this.__setListener();

	      return this;
	    }

	  , isDirty: function() {
	      return this.$oldContent != this.getContent();
	    }

	  , getContent: function() {
	      return this.$textarea.val();
	    }

	  , setContent: function(content) {
	      this.$textarea.val(content);

	      return this;
	    }

	  , findSelection: function(chunk) {
	    var content = this.getContent(), startChunkPosition;

	    if (startChunkPosition = content.indexOf(chunk), startChunkPosition >= 0 && chunk.length > 0) {
	      var oldSelection = this.getSelection(), selection;

	      this.setSelection(startChunkPosition,startChunkPosition+chunk.length);
	      selection = this.getSelection();

	      this.setSelection(oldSelection.start,oldSelection.end);

	      return selection;
	    } else {
	      return null;
	    }
	  }

	  , getSelection: function() {

	      var e = this.$textarea[0];

	      return (

	          ('selectionStart' in e && function() {
	              var l = e.selectionEnd - e.selectionStart;
	              return { start: e.selectionStart, end: e.selectionEnd, length: l, text: e.value.substr(e.selectionStart, l) };
	          }) ||

	          /* browser not supported */
	          function() {
	            return null;
	          }

	      )();

	    }

	  , setSelection: function(start,end) {

	      var e = this.$textarea[0];

	      return (

	          ('selectionStart' in e && function() {
	              e.selectionStart = start;
	              e.selectionEnd = end;
	              return;
	          }) ||

	          /* browser not supported */
	          function() {
	            return null;
	          }

	      )();

	    }

	  , replaceSelection: function(text) {

	      var e = this.$textarea[0];

	      return (

	          ('selectionStart' in e && function() {
	              e.value = e.value.substr(0, e.selectionStart) + text + e.value.substr(e.selectionEnd, e.value.length);
	              // Set cursor to the last replacement end
	              e.selectionStart = e.value.length;
	              return this;
	          }) ||

	          /* browser not supported */
	          function() {
	              e.value += text;
	              return jQuery(e);
	          }

	      )();
	    }

	  , getNextTab: function() {
	      // Shift the nextTab
	      if (this.$nextTab.length === 0) {
	        return null;
	      } else {
	        var nextTab, tab = this.$nextTab.shift();

	        if (typeof tab == 'function') {
	          nextTab = tab();
	        } else if (typeof tab == 'object' && tab.length > 0) {
	          nextTab = tab;
	        }

	        return nextTab;
	      }
	    }

	  , setNextTab: function(start,end) {
	      // Push new selection into nextTab collections
	      if (typeof start == 'string') {
	        var that = this;
	        this.$nextTab.push(function(){
	          return that.findSelection(start);
	        });
	      } else if (typeof start == 'number' && typeof end == 'number') {
	        var oldSelection = this.getSelection();

	        this.setSelection(start,end);
	        this.$nextTab.push(this.getSelection());

	        this.setSelection(oldSelection.start,oldSelection.end);
	      }

	      return;
	    }

	  , __parseButtonNameParam: function (names) {
	      return typeof names == 'string' ?
	                      names.split(' ') :
	                      names;

	    }

	  , enableButtons: function(name) {
	      var buttons = this.__parseButtonNameParam(name),
	        that = this;

	      $.each(buttons, function(i, v) {
	        that.__alterButtons(buttons[i], function (el) {
	          el.removeAttr('disabled');
	        });
	      });

	      return this;
	    }

	  , disableButtons: function(name) {
	      var buttons = this.__parseButtonNameParam(name),
	        that = this;

	      $.each(buttons, function(i, v) {
	        that.__alterButtons(buttons[i], function (el) {
	          el.attr('disabled','disabled');
	        });
	      });

	      return this;
	    }

	  , hideButtons: function(name) {
	      var buttons = this.__parseButtonNameParam(name),
	        that = this;

	      $.each(buttons, function(i, v) {
	        that.__alterButtons(buttons[i], function (el) {
	          el.addClass('hidden');
	        });
	      });

	      return this;
	    }

	  , showButtons: function(name) {
	      var buttons = this.__parseButtonNameParam(name),
	        that = this;

	      $.each(buttons, function(i, v) {
	        that.__alterButtons(buttons[i], function (el) {
	          el.removeClass('hidden');
	        });
	      });

	      return this;
	    }

	  , eventSupported: function(eventName) {
	      var isSupported = eventName in this.$element;
	      if (!isSupported) {
	        this.$element.setAttribute(eventName, 'return;');
	        isSupported = typeof this.$element[eventName] === 'function';
	      }
	      return isSupported;
	    }

	  , keyup: function (e) {
	      var blocked = false;
	      switch(e.keyCode) {
	        case 40: // down arrow
	        case 38: // up arrow
	        case 16: // shift
	        case 17: // ctrl
	        case 18: // alt
	          break;

	        case 9: // tab
	          var nextTab;
	          if (nextTab = this.getNextTab(),nextTab !== null) {
	            // Get the nextTab if exists
	            var that = this;
	            setTimeout(function(){
	              that.setSelection(nextTab.start,nextTab.end);
	            },500);

	            blocked = true;
	          } else {
	            // The next tab memory contains nothing...
	            // check the cursor position to determine tab action
	            var cursor = this.getSelection();

	            if (cursor.start == cursor.end && cursor.end == this.getContent().length) {
	              // The cursor already reach the end of the content
	              blocked = false;
	            } else {
	              // Put the cursor to the end
	              this.setSelection(this.getContent().length,this.getContent().length);

	              blocked = true;
	            }
	          }

	          break;

	        case 13: // enter
	          blocked = false;
	          break;
	        case 27: // escape
	          if (this.$isFullscreen) this.setFullscreen(false);
	          blocked = false;
	          break;

	        default:
	          blocked = false;
	      }

	      if (blocked) {
	        e.stopPropagation();
	        e.preventDefault();
	      }

	      this.$options.onChange(this);
	    }

	  , change: function(e) {
	      this.$options.onChange(this);
	      return this;
	    }
	  , select: function (e) {
	      this.$options.onSelect(this);
	      return this;
	    }
	  , focus: function (e) {
	      var options = this.$options,
	          isHideable = options.hideable,
	          editor = this.$editor;

	      editor.addClass('active');

	      // Blur other markdown(s)
	      $(document).find('.md-editor').each(function(){
	        if ($(this).attr('id') !== editor.attr('id')) {
	          var attachedMarkdown;

	          if (attachedMarkdown = $(this).find('textarea').data('markdown'),
	              attachedMarkdown === null) {
	              attachedMarkdown = $(this).find('div[data-provider="markdown-preview"]').data('markdown');
	          }

	          if (attachedMarkdown) {
	            attachedMarkdown.blur();
	          }
	        }
	      });

	      // Trigger the onFocus hook
	      options.onFocus(this);

	      return this;
	    }

	  , blur: function (e) {
	      var options = this.$options,
	          isHideable = options.hideable,
	          editor = this.$editor,
	          editable = this.$editable;

	      if (editor.hasClass('active') || this.$element.parent().length === 0) {
	        editor.removeClass('active');

	        if (isHideable) {
	          // Check for editable elements
	          if (editable.el !== null) {
	            // Build the original element
	            var oldElement = $('<'+editable.type+'/>'),
	                content = this.getContent(),
	                currentContent = this.parseContent(content);

	            $(editable.attrKeys).each(function(k,v) {
	              oldElement.attr(editable.attrKeys[k],editable.attrValues[k]);
	            });

	            // Get the editor content
	            oldElement.html(currentContent);

	            editor.replaceWith(oldElement);
	          } else {
	            editor.hide();
	          }
	        }

	        // Trigger the onBlur hook
	        options.onBlur(this);
	      }

	      return this;
	    }

	  };

	 /* MARKDOWN PLUGIN DEFINITION
	  * ========================== */

	  var old = $.fn.markdown;

	  $.fn.markdown = function (option) {
	    return this.each(function () {
	      var $this = $(this)
	        , data = $this.data('markdown')
	        , options = typeof option == 'object' && option;
	      if (!data) $this.data('markdown', (data = new Markdown(this, options)))
	    })
	  };

	  $.fn.markdown.messages = {};

	  $.fn.markdown.defaults = {
	    /* Editor Properties */
	    autofocus: false,
	    hideable: false,
	    savable: false,
	    width: 'inherit',
	    height: 'inherit',
	    resize: 'none',
	    iconlibrary: 'glyph',
	    language: 'en',
	    initialstate: 'editor',
	    parser: null,
	    dropZoneOptions: null,

	    /* Buttons Properties */
	    buttons: [
	      [{
	        name: 'groupFont',
	        data: [{
	          name: 'cmdBold',
	          hotkey: 'Ctrl+B',
	          title: 'Bold',
	          icon: { glyph: 'glyphicon glyphicon-bold', fa: 'fa fa-bold', 'fa-3': 'icon-bold' },
	          callback: function(e){
	            // Give/remove ** surround the selection
	            var chunk, cursor, selected = e.getSelection(), content = e.getContent();

	            if (selected.length === 0) {
	              // Give extra word
	              chunk = e.__localize('strong text');
	            } else {
	              chunk = selected.text;
	            }

	            // transform selection and set the cursor into chunked text
	            if (content.substr(selected.start-2,2) === '**'
	                && content.substr(selected.end,2) === '**' ) {
	              e.setSelection(selected.start-2,selected.end+2);
	              e.replaceSelection(chunk);
	              cursor = selected.start-2;
	            } else {
	              e.replaceSelection('**'+chunk+'**');
	              cursor = selected.start+2;
	            }

	            // Set the cursor
	            e.setSelection(cursor,cursor+chunk.length);
	          }
	        },{
	          name: 'cmdItalic',
	          title: 'Italic',
	          hotkey: 'Ctrl+I',
	          icon: { glyph: 'glyphicon glyphicon-italic', fa: 'fa fa-italic', 'fa-3': 'icon-italic' },
	          callback: function(e){
	            // Give/remove * surround the selection
	            var chunk, cursor, selected = e.getSelection(), content = e.getContent();

	            if (selected.length === 0) {
	              // Give extra word
	              chunk = e.__localize('emphasized text');
	            } else {
	              chunk = selected.text;
	            }

	            // transform selection and set the cursor into chunked text
	            if (content.substr(selected.start-1,1) === '_'
	                && content.substr(selected.end,1) === '_' ) {
	              e.setSelection(selected.start-1,selected.end+1);
	              e.replaceSelection(chunk);
	              cursor = selected.start-1;
	            } else {
	              e.replaceSelection('_'+chunk+'_');
	              cursor = selected.start+1;
	            }

	            // Set the cursor
	            e.setSelection(cursor,cursor+chunk.length);
	          }
	        },{
	          name: 'cmdHeading',
	          title: 'Heading',
	          hotkey: 'Ctrl+H',
	          icon: { glyph: 'glyphicon glyphicon-header', fa: 'fa fa-header', 'fa-3': 'icon-font' },
	          callback: function(e){
	            // Append/remove ### surround the selection
	            var chunk, cursor, selected = e.getSelection(), content = e.getContent(), pointer, prevChar;

	            if (selected.length === 0) {
	              // Give extra word
	              chunk = e.__localize('heading text');
	            } else {
	              chunk = selected.text + '\n';
	            }

	            // transform selection and set the cursor into chunked text
	            if ((pointer = 4, content.substr(selected.start-pointer,pointer) === '### ')
	                || (pointer = 3, content.substr(selected.start-pointer,pointer) === '###')) {
	              e.setSelection(selected.start-pointer,selected.end);
	              e.replaceSelection(chunk);
	              cursor = selected.start-pointer;
	            } else if (selected.start > 0 && (prevChar = content.substr(selected.start-1,1), !!prevChar && prevChar != '\n')) {
	              e.replaceSelection('\n\n### '+chunk);
	              cursor = selected.start+6;
	            } else {
	              // Empty string before element
	              e.replaceSelection('### '+chunk);
	              cursor = selected.start+4;
	            }

	            // Set the cursor
	            e.setSelection(cursor,cursor+chunk.length);
	          }
	        }]
	      },{
	        name: 'groupLink',
	        data: [{
	          name: 'cmdUrl',
	          title: 'URL/Link',
	          hotkey: 'Ctrl+L',
	          icon: { glyph: 'glyphicon glyphicon-link', fa: 'fa fa-link', 'fa-3': 'icon-link' },
	          callback: function(e){
	            // Give [] surround the selection and prepend the link
	            var chunk, cursor, selected = e.getSelection(), content = e.getContent(), link;

	            if (selected.length === 0) {
	              // Give extra word
	              chunk = e.__localize('enter link description here');
	            } else {
	              chunk = selected.text;
	            }

	            link = prompt(e.__localize('Insert Hyperlink'),'http://');

	            var urlRegex = new RegExp('^((http|https)://|(mailto:)|(//))[a-z0-9]', 'i');
	            if (link !== null && link !== '' && link !== 'http://' && urlRegex.test(link)) {
	              var sanitizedLink = $('<div>'+link+'</div>').text();

	              // transform selection and set the cursor into chunked text
	              e.replaceSelection('['+chunk+']('+sanitizedLink+')');
	              cursor = selected.start+1;

	              // Set the cursor
	              e.setSelection(cursor,cursor+chunk.length);
	            }
	          }
	        },{
	          name: 'cmdImage',
	          title: 'Image',
	          hotkey: 'Ctrl+G',
	          icon: { glyph: 'glyphicon glyphicon-picture', fa: 'fa fa-picture-o', 'fa-3': 'icon-picture' },
	          callback: function(e){
	            // Give ![] surround the selection and prepend the image link
	            var chunk, cursor, selected = e.getSelection(), content = e.getContent(), link;

	            if (selected.length === 0) {
	              // Give extra word
	              chunk = e.__localize('enter image description here');
	            } else {
	              chunk = selected.text;
	            }

	            link = prompt(e.__localize('Insert Image Hyperlink'),'http://');

	            var urlRegex = new RegExp('^((http|https)://|(//))[a-z0-9]', 'i');
	            if (link !== null && link !== '' && link !== 'http://' && urlRegex.test(link)) {
	              var sanitizedLink = $('<div>'+link+'</div>').text();

	              // transform selection and set the cursor into chunked text
	              e.replaceSelection('!['+chunk+']('+sanitizedLink+' "'+e.__localize('enter image title here')+'")');
	              cursor = selected.start+2;

	              // Set the next tab
	              e.setNextTab(e.__localize('enter image title here'));

	              // Set the cursor
	              e.setSelection(cursor,cursor+chunk.length);
	            }
	          }
	        }]
	      },{
	        name: 'groupMisc',
	        data: [{
	          name: 'cmdList',
	          hotkey: 'Ctrl+U',
	          title: 'Unordered List',
	          icon: { glyph: 'glyphicon glyphicon-list', fa: 'fa fa-list', 'fa-3': 'icon-list-ul' },
	          callback: function(e){
	            // Prepend/Give - surround the selection
	            var chunk, cursor, selected = e.getSelection(), content = e.getContent();

	            // transform selection and set the cursor into chunked text
	            if (selected.length === 0) {
	              // Give extra word
	              chunk = e.__localize('list text here');

	              e.replaceSelection('- '+chunk);
	              // Set the cursor
	              cursor = selected.start+2;
	            } else {
	              if (selected.text.indexOf('\n') < 0) {
	                chunk = selected.text;

	                e.replaceSelection('- '+chunk);

	                // Set the cursor
	                cursor = selected.start+2;
	              } else {
	                var list = [];

	                list = selected.text.split('\n');
	                chunk = list[0];

	                $.each(list,function(k,v) {
	                  list[k] = '- '+v;
	                });

	                e.replaceSelection('\n\n'+list.join('\n'));

	                // Set the cursor
	                cursor = selected.start+4;
	              }
	            }

	            // Set the cursor
	            e.setSelection(cursor,cursor+chunk.length);
	          }
	        },
	        {
	          name: 'cmdListO',
	          hotkey: 'Ctrl+O',
	          title: 'Ordered List',
	          icon: { glyph: 'glyphicon glyphicon-th-list', fa: 'fa fa-list-ol', 'fa-3': 'icon-list-ol' },
	          callback: function(e) {

	            // Prepend/Give - surround the selection
	            var chunk, cursor, selected = e.getSelection(), content = e.getContent();

	            // transform selection and set the cursor into chunked text
	            if (selected.length === 0) {
	              // Give extra word
	              chunk = e.__localize('list text here');
	              e.replaceSelection('1. '+chunk);
	              // Set the cursor
	              cursor = selected.start+3;
	            } else {
	              if (selected.text.indexOf('\n') < 0) {
	                chunk = selected.text;

	                e.replaceSelection('1. '+chunk);

	                // Set the cursor
	                cursor = selected.start+3;
	              } else {
	                var list = [];

	                list = selected.text.split('\n');
	                chunk = list[0];

	                $.each(list,function(k,v) {
	                  list[k] = '1. '+v;
	                });

	                e.replaceSelection('\n\n'+list.join('\n'));

	                // Set the cursor
	                cursor = selected.start+5;
	              }
	            }

	            // Set the cursor
	            e.setSelection(cursor,cursor+chunk.length);
	          }
	        },
	        {
	          name: 'cmdCode',
	          hotkey: 'Ctrl+K',
	          title: 'Code',
	          icon: { glyph: 'glyphicon glyphicon-asterisk', fa: 'fa fa-code', 'fa-3': 'icon-code' },
	          callback: function(e) {
	            // Give/remove ** surround the selection
	            var chunk, cursor, selected = e.getSelection(), content = e.getContent();

	            if (selected.length === 0) {
	              // Give extra word
	              chunk = e.__localize('code text here');
	            } else {
	              chunk = selected.text;
	            }

	            // transform selection and set the cursor into chunked text
	            if (content.substr(selected.start-4,4) === '```\n'
	                && content.substr(selected.end,4) === '\n```') {
	              e.setSelection(selected.start-4, selected.end+4);
	              e.replaceSelection(chunk);
	              cursor = selected.start-4;
	            } else if (content.substr(selected.start-1,1) === '`'
	                && content.substr(selected.end,1) === '`') {
	              e.setSelection(selected.start-1,selected.end+1);
	              e.replaceSelection(chunk);
	              cursor = selected.start-1;
	            } else if (content.indexOf('\n') > -1) {
	              e.replaceSelection('```\n'+chunk+'\n```');
	              cursor = selected.start+4;
	            } else {
	              e.replaceSelection('`'+chunk+'`');
	              cursor = selected.start+1;
	            }

	            // Set the cursor
	            e.setSelection(cursor,cursor+chunk.length);
	          }
	        },
	        {
	          name: 'cmdQuote',
	          hotkey: 'Ctrl+Q',
	          title: 'Quote',
	          icon: { glyph: 'glyphicon glyphicon-comment', fa: 'fa fa-quote-left', 'fa-3': 'icon-quote-left' },
	          callback: function(e) {
	            // Prepend/Give - surround the selection
	            var chunk, cursor, selected = e.getSelection(), content = e.getContent();

	            // transform selection and set the cursor into chunked text
	            if (selected.length === 0) {
	              // Give extra word
	              chunk = e.__localize('quote here');

	              e.replaceSelection('> '+chunk);

	              // Set the cursor
	              cursor = selected.start+2;
	            } else {
	              if (selected.text.indexOf('\n') < 0) {
	                chunk = selected.text;

	                e.replaceSelection('> '+chunk);

	                // Set the cursor
	                cursor = selected.start+2;
	              } else {
	                var list = [];

	                list = selected.text.split('\n');
	                chunk = list[0];

	                $.each(list,function(k,v) {
	                  list[k] = '> '+v;
	                });

	                e.replaceSelection('\n\n'+list.join('\n'));

	                // Set the cursor
	                cursor = selected.start+4;
	              }
	            }

	            // Set the cursor
	            e.setSelection(cursor,cursor+chunk.length);
	          }
	        }]
	      },{
	        name: 'groupUtil',
	        data: [{
	          name: 'cmdPreview',
	          toggle: true,
	          hotkey: 'Ctrl+P',
	          title: 'Preview',
	          btnText: 'Preview',
	          btnClass: 'btn btn-primary btn-sm',
	          icon: { glyph: 'glyphicon glyphicon-search', fa: 'fa fa-search', 'fa-3': 'icon-search' },
	          callback: function(e){
	            // Check the preview mode and toggle based on this flag
	            var isPreview = e.$isPreview,content;

	            if (isPreview === false) {
	              // Give flag that tell the editor enter preview mode
	              e.showPreview();
	            } else {
	              e.hidePreview();
	            }
	          }
	        }]
	      }]
	    ],
	    additionalButtons:[], // Place to hook more buttons by code
	    reorderButtonGroups:[],
	    hiddenButtons:[], // Default hidden buttons
	    disabledButtons:[], // Default disabled buttons
	    footer: '',
	    fullscreen: {
	      enable: true,
	      icons: {
	        fullscreenOn: {
	          fa: 'fa fa-expand',
	          glyph: 'glyphicon glyphicon-fullscreen',
	          'fa-3': 'icon-resize-full'
	        },
	        fullscreenOff: {
	          fa: 'fa fa-compress',
	          glyph: 'glyphicon glyphicon-fullscreen',
	          'fa-3': 'icon-resize-small'
	        }
	      }
	    },

	    /* Events hook */
	    onShow: function (e) {},
	    onPreview: function (e) {},
	    onSave: function (e) {},
	    onBlur: function (e) {},
	    onFocus: function (e) {},
	    onChange: function(e) {},
	    onFullscreen: function(e) {},
	    onFullscreenExit: function(e) {},
	    onSelect: function (e) {}
	  };

	  $.fn.markdown.Constructor = Markdown;


	 /* MARKDOWN NO CONFLICT
	  * ==================== */

	  $.fn.markdown.noConflict = function () {
	    $.fn.markdown = old;
	    return this;
	  };

	  /* MARKDOWN GLOBAL FUNCTION & DATA-API
	  * ==================================== */
	  var initMarkdown = function(el) {
	    var $this = el;

	    if ($this.data('markdown')) {
	      $this.data('markdown').showEditor();
	      return;
	    }

	    $this.markdown()
	  };

	  var blurNonFocused = function(e) {
	    var $activeElement = $(document.activeElement);

	    // Blur event
	    $(document).find('.md-editor').each(function(){
	      var $this            = $(this),
	          focused          = $activeElement.closest('.md-editor')[0] === this,
	          attachedMarkdown = $this.find('textarea').data('markdown') ||
	                             $this.find('div[data-provider="markdown-preview"]').data('markdown');

	      if (attachedMarkdown && !focused) {
	        attachedMarkdown.blur();
	      }
	    })
	  };

	  $(document)
	    .on('click.markdown.data-api', '[data-provide="markdown-editable"]', function (e) {
	      initMarkdown($(this));
	      e.preventDefault();
	    })
	    .on('click focusin', function (e) {
	      blurNonFocused(e);
	    })
	    .ready(function(){
	      $('textarea[data-provide="markdown"]').each(function(){
	        initMarkdown($(this));
	      })
	    });

	}));


/***/ },

/***/ 127:
/***/ function(module, exports) {

	/**
	 * Chinese translation for bootstrap-markdown
	 * benhaile <denghaier@163.com>
	 */
	(function ($) {
	  $.fn.markdown.messages.zh = {
	    'Bold': "粗体",
	    'Italic': "斜体",
	    'Heading': "标题",
	    'URL/Link': "链接",
	    'Image': "图片",
	    'List': "列表",
	    'Unordered List': "无序列表",
	    'Ordered List': "有序列表",
	    'Code': "代码",
	    'Quote': "引用",
	    'Preview': "预览",
	    'strong text': "粗体",
	    'emphasized text': "强调",
	    'heading text': "标题",
	    'enter link description here': "输入链接说明",
	    'Insert Hyperlink': "URL地址",
	    'enter image description here': "输入图片说明",
	    'Insert Image Hyperlink': "图片URL地址",
	    'enter image title here': "在这里输入图片标题",
	    'list text here': "这里是列表文本",
	    'code text here': "这里输入代码",
	    'quote here': "这里输入引用文本"


	  };
	}(jQuery));


/***/ },

/***/ 128:
/***/ function(module, exports) {

	// removed by extract-text-webpack-plugin

/***/ },

/***/ 130:
/***/ function(module, exports) {

	// removed by extract-text-webpack-plugin

/***/ },

/***/ 132:
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_LOCAL_MODULE_0__;var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_LOCAL_MODULE_1__;var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;/* WEBPACK VAR INJECTION */(function($) {/**
	 * sifter.js
	 * Copyright (c) 2013 Brian Reavis & contributors
	 *
	 * Licensed under the Apache License, Version 2.0 (the "License"); you may not use this
	 * file except in compliance with the License. You may obtain a copy of the License at:
	 * http://www.apache.org/licenses/LICENSE-2.0
	 *
	 * Unless required by applicable law or agreed to in writing, software distributed under
	 * the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF
	 * ANY KIND, either express or implied. See the License for the specific language
	 * governing permissions and limitations under the License.
	 *
	 * @author Brian Reavis <brian@thirdroute.com>
	 */

	(function(root, factory) {
		if (true) {
			!(__WEBPACK_AMD_DEFINE_FACTORY__ = (factory), __WEBPACK_LOCAL_MODULE_0__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ? (__WEBPACK_AMD_DEFINE_FACTORY__.call(exports, __webpack_require__, exports, module)) : __WEBPACK_AMD_DEFINE_FACTORY__));
		} else if (typeof exports === 'object') {
			module.exports = factory();
		} else {
			root.Sifter = factory();
		}
	}(this, function() {

		/**
		 * Textually searches arrays and hashes of objects
		 * by property (or multiple properties). Designed
		 * specifically for autocomplete.
		 *
		 * @constructor
		 * @param {array|object} items
		 * @param {object} items
		 */
		var Sifter = function(items, settings) {
			this.items = items;
			this.settings = settings || {diacritics: true};
		};

		/**
		 * Splits a search string into an array of individual
		 * regexps to be used to match results.
		 *
		 * @param {string} query
		 * @returns {array}
		 */
		Sifter.prototype.tokenize = function(query) {
			query = trim(String(query || '').toLowerCase());
			if (!query || !query.length) return [];

			var i, n, regex, letter;
			var tokens = [];
			var words = query.split(/ +/);

			for (i = 0, n = words.length; i < n; i++) {
				regex = escape_regex(words[i]);
				if (this.settings.diacritics) {
					for (letter in DIACRITICS) {
						if (DIACRITICS.hasOwnProperty(letter)) {
							regex = regex.replace(new RegExp(letter, 'g'), DIACRITICS[letter]);
						}
					}
				}
				tokens.push({
					string : words[i],
					regex  : new RegExp(regex, 'i')
				});
			}

			return tokens;
		};

		/**
		 * Iterates over arrays and hashes.
		 *
		 * ```
		 * this.iterator(this.items, function(item, id) {
		 *    // invoked for each item
		 * });
		 * ```
		 *
		 * @param {array|object} object
		 */
		Sifter.prototype.iterator = function(object, callback) {
			var iterator;
			if (is_array(object)) {
				iterator = Array.prototype.forEach || function(callback) {
					for (var i = 0, n = this.length; i < n; i++) {
						callback(this[i], i, this);
					}
				};
			} else {
				iterator = function(callback) {
					for (var key in this) {
						if (this.hasOwnProperty(key)) {
							callback(this[key], key, this);
						}
					}
				};
			}

			iterator.apply(object, [callback]);
		};

		/**
		 * Returns a function to be used to score individual results.
		 *
		 * Good matches will have a higher score than poor matches.
		 * If an item is not a match, 0 will be returned by the function.
		 *
		 * @param {object|string} search
		 * @param {object} options (optional)
		 * @returns {function}
		 */
		Sifter.prototype.getScoreFunction = function(search, options) {
			var self, fields, tokens, token_count;

			self        = this;
			search      = self.prepareSearch(search, options);
			tokens      = search.tokens;
			fields      = search.options.fields;
			token_count = tokens.length;

			/**
			 * Calculates how close of a match the
			 * given value is against a search token.
			 *
			 * @param {mixed} value
			 * @param {object} token
			 * @return {number}
			 */
			var scoreValue = function(value, token) {
				var score, pos;

				if (!value) return 0;
				value = String(value || '');
				pos = value.search(token.regex);
				if (pos === -1) return 0;
				score = token.string.length / value.length;
				if (pos === 0) score += 0.5;
				return score;
			};

			/**
			 * Calculates the score of an object
			 * against the search query.
			 *
			 * @param {object} token
			 * @param {object} data
			 * @return {number}
			 */
			var scoreObject = (function() {
				var field_count = fields.length;
				if (!field_count) {
					return function() { return 0; };
				}
				if (field_count === 1) {
					return function(token, data) {
						return scoreValue(data[fields[0]], token);
					};
				}
				return function(token, data) {
					for (var i = 0, sum = 0; i < field_count; i++) {
						sum += scoreValue(data[fields[i]], token);
					}
					return sum / field_count;
				};
			})();

			if (!token_count) {
				return function() { return 0; };
			}
			if (token_count === 1) {
				return function(data) {
					return scoreObject(tokens[0], data);
				};
			}

			if (search.options.conjunction === 'and') {
				return function(data) {
					var score;
					for (var i = 0, sum = 0; i < token_count; i++) {
						score = scoreObject(tokens[i], data);
						if (score <= 0) return 0;
						sum += score;
					}
					return sum / token_count;
				};
			} else {
				return function(data) {
					for (var i = 0, sum = 0; i < token_count; i++) {
						sum += scoreObject(tokens[i], data);
					}
					return sum / token_count;
				};
			}
		};

		/**
		 * Returns a function that can be used to compare two
		 * results, for sorting purposes. If no sorting should
		 * be performed, `null` will be returned.
		 *
		 * @param {string|object} search
		 * @param {object} options
		 * @return function(a,b)
		 */
		Sifter.prototype.getSortFunction = function(search, options) {
			var i, n, self, field, fields, fields_count, multiplier, multipliers, get_field, implicit_score, sort;

			self   = this;
			search = self.prepareSearch(search, options);
			sort   = (!search.query && options.sort_empty) || options.sort;

			/**
			 * Fetches the specified sort field value
			 * from a search result item.
			 *
			 * @param  {string} name
			 * @param  {object} result
			 * @return {mixed}
			 */
			get_field = function(name, result) {
				if (name === '$score') return result.score;
				return self.items[result.id][name];
			};

			// parse options
			fields = [];
			if (sort) {
				for (i = 0, n = sort.length; i < n; i++) {
					if (search.query || sort[i].field !== '$score') {
						fields.push(sort[i]);
					}
				}
			}

			// the "$score" field is implied to be the primary
			// sort field, unless it's manually specified
			if (search.query) {
				implicit_score = true;
				for (i = 0, n = fields.length; i < n; i++) {
					if (fields[i].field === '$score') {
						implicit_score = false;
						break;
					}
				}
				if (implicit_score) {
					fields.unshift({field: '$score', direction: 'desc'});
				}
			} else {
				for (i = 0, n = fields.length; i < n; i++) {
					if (fields[i].field === '$score') {
						fields.splice(i, 1);
						break;
					}
				}
			}

			multipliers = [];
			for (i = 0, n = fields.length; i < n; i++) {
				multipliers.push(fields[i].direction === 'desc' ? -1 : 1);
			}

			// build function
			fields_count = fields.length;
			if (!fields_count) {
				return null;
			} else if (fields_count === 1) {
				field = fields[0].field;
				multiplier = multipliers[0];
				return function(a, b) {
					return multiplier * cmp(
						get_field(field, a),
						get_field(field, b)
					);
				};
			} else {
				return function(a, b) {
					var i, result, a_value, b_value, field;
					for (i = 0; i < fields_count; i++) {
						field = fields[i].field;
						result = multipliers[i] * cmp(
							get_field(field, a),
							get_field(field, b)
						);
						if (result) return result;
					}
					return 0;
				};
			}
		};

		/**
		 * Parses a search query and returns an object
		 * with tokens and fields ready to be populated
		 * with results.
		 *
		 * @param {string} query
		 * @param {object} options
		 * @returns {object}
		 */
		Sifter.prototype.prepareSearch = function(query, options) {
			if (typeof query === 'object') return query;

			options = extend({}, options);

			var option_fields     = options.fields;
			var option_sort       = options.sort;
			var option_sort_empty = options.sort_empty;

			if (option_fields && !is_array(option_fields)) options.fields = [option_fields];
			if (option_sort && !is_array(option_sort)) options.sort = [option_sort];
			if (option_sort_empty && !is_array(option_sort_empty)) options.sort_empty = [option_sort_empty];

			return {
				options : options,
				query   : String(query || '').toLowerCase(),
				tokens  : this.tokenize(query),
				total   : 0,
				items   : []
			};
		};

		/**
		 * Searches through all items and returns a sorted array of matches.
		 *
		 * The `options` parameter can contain:
		 *
		 *   - fields {string|array}
		 *   - sort {array}
		 *   - score {function}
		 *   - filter {bool}
		 *   - limit {integer}
		 *
		 * Returns an object containing:
		 *
		 *   - options {object}
		 *   - query {string}
		 *   - tokens {array}
		 *   - total {int}
		 *   - items {array}
		 *
		 * @param {string} query
		 * @param {object} options
		 * @returns {object}
		 */
		Sifter.prototype.search = function(query, options) {
			var self = this, value, score, search, calculateScore;
			var fn_sort;
			var fn_score;

			search  = this.prepareSearch(query, options);
			options = search.options;
			query   = search.query;

			// generate result scoring function
			fn_score = options.score || self.getScoreFunction(search);

			// perform search and sort
			if (query.length) {
				self.iterator(self.items, function(item, id) {
					score = fn_score(item);
					if (options.filter === false || score > 0) {
						search.items.push({'score': score, 'id': id});
					}
				});
			} else {
				self.iterator(self.items, function(item, id) {
					search.items.push({'score': 1, 'id': id});
				});
			}

			fn_sort = self.getSortFunction(search, options);
			if (fn_sort) search.items.sort(fn_sort);

			// apply limits
			search.total = search.items.length;
			if (typeof options.limit === 'number') {
				search.items = search.items.slice(0, options.limit);
			}

			return search;
		};

		// utilities
		// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

		var cmp = function(a, b) {
			if (typeof a === 'number' && typeof b === 'number') {
				return a > b ? 1 : (a < b ? -1 : 0);
			}
			a = asciifold(String(a || ''));
			b = asciifold(String(b || ''));
			if (a > b) return 1;
			if (b > a) return -1;
			return 0;
		};

		var extend = function(a, b) {
			var i, n, k, object;
			for (i = 1, n = arguments.length; i < n; i++) {
				object = arguments[i];
				if (!object) continue;
				for (k in object) {
					if (object.hasOwnProperty(k)) {
						a[k] = object[k];
					}
				}
			}
			return a;
		};

		var trim = function(str) {
			return (str + '').replace(/^\s+|\s+$|/g, '');
		};

		var escape_regex = function(str) {
			return (str + '').replace(/([.?*+^$[\]\\(){}|-])/g, '\\$1');
		};

		var is_array = Array.isArray || ($ && $.isArray) || function(object) {
			return Object.prototype.toString.call(object) === '[object Array]';
		};

		var DIACRITICS = {
			'a': '[aÀÁÂÃÄÅàáâãäåĀāąĄ]',
			'c': '[cÇçćĆčČ]',
			'd': '[dđĐďĎ]',
			'e': '[eÈÉÊËèéêëěĚĒēęĘ]',
			'i': '[iÌÍÎÏìíîïĪī]',
			'l': '[lłŁ]',
			'n': '[nÑñňŇńŃ]',
			'o': '[oÒÓÔÕÕÖØòóôõöøŌō]',
			'r': '[rřŘ]',
			's': '[sŠšśŚ]',
			't': '[tťŤ]',
			'u': '[uÙÚÛÜùúûüůŮŪū]',
			'y': '[yŸÿýÝ]',
			'z': '[zŽžżŻźŹ]'
		};

		var asciifold = (function() {
			var i, n, k, chunk;
			var foreignletters = '';
			var lookup = {};
			for (k in DIACRITICS) {
				if (DIACRITICS.hasOwnProperty(k)) {
					chunk = DIACRITICS[k].substring(2, DIACRITICS[k].length - 1);
					foreignletters += chunk;
					for (i = 0, n = chunk.length; i < n; i++) {
						lookup[chunk.charAt(i)] = k;
					}
				}
			}
			var regexp = new RegExp('[' +  foreignletters + ']', 'g');
			return function(str) {
				return str.replace(regexp, function(foreignletter) {
					return lookup[foreignletter];
				}).toLowerCase();
			};
		})();


		// export
		// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

		return Sifter;
	}));



	/**
	 * microplugin.js
	 * Copyright (c) 2013 Brian Reavis & contributors
	 *
	 * Licensed under the Apache License, Version 2.0 (the "License"); you may not use this
	 * file except in compliance with the License. You may obtain a copy of the License at:
	 * http://www.apache.org/licenses/LICENSE-2.0
	 *
	 * Unless required by applicable law or agreed to in writing, software distributed under
	 * the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF
	 * ANY KIND, either express or implied. See the License for the specific language
	 * governing permissions and limitations under the License.
	 *
	 * @author Brian Reavis <brian@thirdroute.com>
	 */

	(function(root, factory) {
		if (true) {
			!(__WEBPACK_AMD_DEFINE_FACTORY__ = (factory), __WEBPACK_LOCAL_MODULE_1__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ? (__WEBPACK_AMD_DEFINE_FACTORY__.call(exports, __webpack_require__, exports, module)) : __WEBPACK_AMD_DEFINE_FACTORY__));
		} else if (typeof exports === 'object') {
			module.exports = factory();
		} else {
			root.MicroPlugin = factory();
		}
	}(this, function() {
		var MicroPlugin = {};

		MicroPlugin.mixin = function(Interface) {
			Interface.plugins = {};

			/**
			 * Initializes the listed plugins (with options).
			 * Acceptable formats:
			 *
			 * List (without options):
			 *   ['a', 'b', 'c']
			 *
			 * List (with options):
			 *   [{'name': 'a', options: {}}, {'name': 'b', options: {}}]
			 *
			 * Hash (with options):
			 *   {'a': { ... }, 'b': { ... }, 'c': { ... }}
			 *
			 * @param {mixed} plugins
			 */
			Interface.prototype.initializePlugins = function(plugins) {
				var i, n, key;
				var self  = this;
				var queue = [];

				self.plugins = {
					names     : [],
					settings  : {},
					requested : {},
					loaded    : {}
				};

				if (utils.isArray(plugins)) {
					for (i = 0, n = plugins.length; i < n; i++) {
						if (typeof plugins[i] === 'string') {
							queue.push(plugins[i]);
						} else {
							self.plugins.settings[plugins[i].name] = plugins[i].options;
							queue.push(plugins[i].name);
						}
					}
				} else if (plugins) {
					for (key in plugins) {
						if (plugins.hasOwnProperty(key)) {
							self.plugins.settings[key] = plugins[key];
							queue.push(key);
						}
					}
				}

				while (queue.length) {
					self.require(queue.shift());
				}
			};

			Interface.prototype.loadPlugin = function(name) {
				var self    = this;
				var plugins = self.plugins;
				var plugin  = Interface.plugins[name];

				if (!Interface.plugins.hasOwnProperty(name)) {
					throw new Error('Unable to find "' +  name + '" plugin');
				}

				plugins.requested[name] = true;
				plugins.loaded[name] = plugin.fn.apply(self, [self.plugins.settings[name] || {}]);
				plugins.names.push(name);
			};

			/**
			 * Initializes a plugin.
			 *
			 * @param {string} name
			 */
			Interface.prototype.require = function(name) {
				var self = this;
				var plugins = self.plugins;

				if (!self.plugins.loaded.hasOwnProperty(name)) {
					if (plugins.requested[name]) {
						throw new Error('Plugin has circular dependency ("' + name + '")');
					}
					self.loadPlugin(name);
				}

				return plugins.loaded[name];
			};

			/**
			 * Registers a plugin.
			 *
			 * @param {string} name
			 * @param {function} fn
			 */
			Interface.define = function(name, fn) {
				Interface.plugins[name] = {
					'name' : name,
					'fn'   : fn
				};
			};
		};

		var utils = {
			isArray: Array.isArray || function(vArg) {
				return Object.prototype.toString.call(vArg) === '[object Array]';
			}
		};

		return MicroPlugin;
	}));

	/**
	 * selectize.js (v0.12.1)
	 * Copyright (c) 2013–2015 Brian Reavis & contributors
	 *
	 * Licensed under the Apache License, Version 2.0 (the "License"); you may not use this
	 * file except in compliance with the License. You may obtain a copy of the License at:
	 * http://www.apache.org/licenses/LICENSE-2.0
	 *
	 * Unless required by applicable law or agreed to in writing, software distributed under
	 * the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF
	 * ANY KIND, either express or implied. See the License for the specific language
	 * governing permissions and limitations under the License.
	 *
	 * @author Brian Reavis <brian@thirdroute.com>
	 */

	/*jshint curly:false */
	/*jshint browser:true */

	(function(root, factory) {
		if (true) {
			!(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(82),__WEBPACK_LOCAL_MODULE_0__,__WEBPACK_LOCAL_MODULE_1__], __WEBPACK_AMD_DEFINE_FACTORY__ = (factory), __WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ? (__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
		} else if (typeof exports === 'object') {
			module.exports = factory(require('jquery'), require('sifter'), require('microplugin'));
		} else {
			root.Selectize = factory(root.jQuery, root.Sifter, root.MicroPlugin);
		}
	}(this, function($, Sifter, MicroPlugin) {
		'use strict';

		var highlight = function($element, pattern) {
			if (typeof pattern === 'string' && !pattern.length) return;
			var regex = (typeof pattern === 'string') ? new RegExp(pattern, 'i') : pattern;
		
			var highlight = function(node) {
				var skip = 0;
				if (node.nodeType === 3) {
					var pos = node.data.search(regex);
					if (pos >= 0 && node.data.length > 0) {
						var match = node.data.match(regex);
						var spannode = document.createElement('span');
						spannode.className = 'highlight';
						var middlebit = node.splitText(pos);
						var endbit = middlebit.splitText(match[0].length);
						var middleclone = middlebit.cloneNode(true);
						spannode.appendChild(middleclone);
						middlebit.parentNode.replaceChild(spannode, middlebit);
						skip = 1;
					}
				} else if (node.nodeType === 1 && node.childNodes && !/(script|style)/i.test(node.tagName)) {
					for (var i = 0; i < node.childNodes.length; ++i) {
						i += highlight(node.childNodes[i]);
					}
				}
				return skip;
			};
		
			return $element.each(function() {
				highlight(this);
			});
		};
		
		var MicroEvent = function() {};
		MicroEvent.prototype = {
			on: function(event, fct){
				this._events = this._events || {};
				this._events[event] = this._events[event] || [];
				this._events[event].push(fct);
			},
			off: function(event, fct){
				var n = arguments.length;
				if (n === 0) return delete this._events;
				if (n === 1) return delete this._events[event];
		
				this._events = this._events || {};
				if (event in this._events === false) return;
				this._events[event].splice(this._events[event].indexOf(fct), 1);
			},
			trigger: function(event /* , args... */){
				this._events = this._events || {};
				if (event in this._events === false) return;
				for (var i = 0; i < this._events[event].length; i++){
					this._events[event][i].apply(this, Array.prototype.slice.call(arguments, 1));
				}
			}
		};
		
		/**
		 * Mixin will delegate all MicroEvent.js function in the destination object.
		 *
		 * - MicroEvent.mixin(Foobar) will make Foobar able to use MicroEvent
		 *
		 * @param {object} the object which will support MicroEvent
		 */
		MicroEvent.mixin = function(destObject){
			var props = ['on', 'off', 'trigger'];
			for (var i = 0; i < props.length; i++){
				destObject.prototype[props[i]] = MicroEvent.prototype[props[i]];
			}
		};
		
		var IS_MAC        = /Mac/.test(navigator.userAgent);
		
		var KEY_A         = 65;
		var KEY_COMMA     = 188;
		var KEY_RETURN    = 13;
		var KEY_ESC       = 27;
		var KEY_LEFT      = 37;
		var KEY_UP        = 38;
		var KEY_P         = 80;
		var KEY_RIGHT     = 39;
		var KEY_DOWN      = 40;
		var KEY_N         = 78;
		var KEY_BACKSPACE = 8;
		var KEY_DELETE    = 46;
		var KEY_SHIFT     = 16;
		var KEY_CMD       = IS_MAC ? 91 : 17;
		var KEY_CTRL      = IS_MAC ? 18 : 17;
		var KEY_TAB       = 9;
		
		var TAG_SELECT    = 1;
		var TAG_INPUT     = 2;
		
		// for now, android support in general is too spotty to support validity
		var SUPPORTS_VALIDITY_API = !/android/i.test(window.navigator.userAgent) && !!document.createElement('form').validity;
		
		var isset = function(object) {
			return typeof object !== 'undefined';
		};
		
		/**
		 * Converts a scalar to its best string representation
		 * for hash keys and HTML attribute values.
		 *
		 * Transformations:
		 *   'str'     -> 'str'
		 *   null      -> ''
		 *   undefined -> ''
		 *   true      -> '1'
		 *   false     -> '0'
		 *   0         -> '0'
		 *   1         -> '1'
		 *
		 * @param {string} value
		 * @returns {string|null}
		 */
		var hash_key = function(value) {
			if (typeof value === 'undefined' || value === null) return null;
			if (typeof value === 'boolean') return value ? '1' : '0';
			return value + '';
		};
		
		/**
		 * Escapes a string for use within HTML.
		 *
		 * @param {string} str
		 * @returns {string}
		 */
		var escape_html = function(str) {
			return (str + '')
				.replace(/&/g, '&amp;')
				.replace(/</g, '&lt;')
				.replace(/>/g, '&gt;')
				.replace(/"/g, '&quot;');
		};
		
		/**
		 * Escapes "$" characters in replacement strings.
		 *
		 * @param {string} str
		 * @returns {string}
		 */
		var escape_replace = function(str) {
			return (str + '').replace(/\$/g, '$$$$');
		};
		
		var hook = {};
		
		/**
		 * Wraps `method` on `self` so that `fn`
		 * is invoked before the original method.
		 *
		 * @param {object} self
		 * @param {string} method
		 * @param {function} fn
		 */
		hook.before = function(self, method, fn) {
			var original = self[method];
			self[method] = function() {
				fn.apply(self, arguments);
				return original.apply(self, arguments);
			};
		};
		
		/**
		 * Wraps `method` on `self` so that `fn`
		 * is invoked after the original method.
		 *
		 * @param {object} self
		 * @param {string} method
		 * @param {function} fn
		 */
		hook.after = function(self, method, fn) {
			var original = self[method];
			self[method] = function() {
				var result = original.apply(self, arguments);
				fn.apply(self, arguments);
				return result;
			};
		};
		
		/**
		 * Wraps `fn` so that it can only be invoked once.
		 *
		 * @param {function} fn
		 * @returns {function}
		 */
		var once = function(fn) {
			var called = false;
			return function() {
				if (called) return;
				called = true;
				fn.apply(this, arguments);
			};
		};
		
		/**
		 * Wraps `fn` so that it can only be called once
		 * every `delay` milliseconds (invoked on the falling edge).
		 *
		 * @param {function} fn
		 * @param {int} delay
		 * @returns {function}
		 */
		var debounce = function(fn, delay) {
			var timeout;
			return function() {
				var self = this;
				var args = arguments;
				window.clearTimeout(timeout);
				timeout = window.setTimeout(function() {
					fn.apply(self, args);
				}, delay);
			};
		};
		
		/**
		 * Debounce all fired events types listed in `types`
		 * while executing the provided `fn`.
		 *
		 * @param {object} self
		 * @param {array} types
		 * @param {function} fn
		 */
		var debounce_events = function(self, types, fn) {
			var type;
			var trigger = self.trigger;
			var event_args = {};
		
			// override trigger method
			self.trigger = function() {
				var type = arguments[0];
				if (types.indexOf(type) !== -1) {
					event_args[type] = arguments;
				} else {
					return trigger.apply(self, arguments);
				}
			};
		
			// invoke provided function
			fn.apply(self, []);
			self.trigger = trigger;
		
			// trigger queued events
			for (type in event_args) {
				if (event_args.hasOwnProperty(type)) {
					trigger.apply(self, event_args[type]);
				}
			}
		};
		
		/**
		 * A workaround for http://bugs.jquery.com/ticket/6696
		 *
		 * @param {object} $parent - Parent element to listen on.
		 * @param {string} event - Event name.
		 * @param {string} selector - Descendant selector to filter by.
		 * @param {function} fn - Event handler.
		 */
		var watchChildEvent = function($parent, event, selector, fn) {
			$parent.on(event, selector, function(e) {
				var child = e.target;
				while (child && child.parentNode !== $parent[0]) {
					child = child.parentNode;
				}
				e.currentTarget = child;
				return fn.apply(this, [e]);
			});
		};
		
		/**
		 * Determines the current selection within a text input control.
		 * Returns an object containing:
		 *   - start
		 *   - length
		 *
		 * @param {object} input
		 * @returns {object}
		 */
		var getSelection = function(input) {
			var result = {};
			if ('selectionStart' in input) {
				result.start = input.selectionStart;
				result.length = input.selectionEnd - result.start;
			} else if (document.selection) {
				input.focus();
				var sel = document.selection.createRange();
				var selLen = document.selection.createRange().text.length;
				sel.moveStart('character', -input.value.length);
				result.start = sel.text.length - selLen;
				result.length = selLen;
			}
			return result;
		};
		
		/**
		 * Copies CSS properties from one element to another.
		 *
		 * @param {object} $from
		 * @param {object} $to
		 * @param {array} properties
		 */
		var transferStyles = function($from, $to, properties) {
			var i, n, styles = {};
			if (properties) {
				for (i = 0, n = properties.length; i < n; i++) {
					styles[properties[i]] = $from.css(properties[i]);
				}
			} else {
				styles = $from.css();
			}
			$to.css(styles);
		};
		
		/**
		 * Measures the width of a string within a
		 * parent element (in pixels).
		 *
		 * @param {string} str
		 * @param {object} $parent
		 * @returns {int}
		 */
		var measureString = function(str, $parent) {
			if (!str) {
				return 0;
			}
		
			var $test = $('<test>').css({
				position: 'absolute',
				top: -99999,
				left: -99999,
				width: 'auto',
				padding: 0,
				whiteSpace: 'pre'
			}).text(str).appendTo('body');
		
			transferStyles($parent, $test, [
				'letterSpacing',
				'fontSize',
				'fontFamily',
				'fontWeight',
				'textTransform'
			]);
		
			var width = $test.width();
			$test.remove();
		
			return width;
		};
		
		/**
		 * Sets up an input to grow horizontally as the user
		 * types. If the value is changed manually, you can
		 * trigger the "update" handler to resize:
		 *
		 * $input.trigger('update');
		 *
		 * @param {object} $input
		 */
		var autoGrow = function($input) {
			var currentWidth = null;
		
			var update = function(e, options) {
				var value, keyCode, printable, placeholder, width;
				var shift, character, selection;
				e = e || window.event || {};
				options = options || {};
		
				if (e.metaKey || e.altKey) return;
				if (!options.force && $input.data('grow') === false) return;
		
				value = $input.val();
				if (e.type && e.type.toLowerCase() === 'keydown') {
					keyCode = e.keyCode;
					printable = (
						(keyCode >= 97 && keyCode <= 122) || // a-z
						(keyCode >= 65 && keyCode <= 90)  || // A-Z
						(keyCode >= 48 && keyCode <= 57)  || // 0-9
						keyCode === 32 // space
					);
		
					if (keyCode === KEY_DELETE || keyCode === KEY_BACKSPACE) {
						selection = getSelection($input[0]);
						if (selection.length) {
							value = value.substring(0, selection.start) + value.substring(selection.start + selection.length);
						} else if (keyCode === KEY_BACKSPACE && selection.start) {
							value = value.substring(0, selection.start - 1) + value.substring(selection.start + 1);
						} else if (keyCode === KEY_DELETE && typeof selection.start !== 'undefined') {
							value = value.substring(0, selection.start) + value.substring(selection.start + 1);
						}
					} else if (printable) {
						shift = e.shiftKey;
						character = String.fromCharCode(e.keyCode);
						if (shift) character = character.toUpperCase();
						else character = character.toLowerCase();
						value += character;
					}
				}
		
				placeholder = $input.attr('placeholder');
				if (!value && placeholder) {
					value = placeholder;
				}
		
				width = measureString(value, $input) + 4;
				if (width !== currentWidth) {
					currentWidth = width;
					$input.width(width);
					$input.triggerHandler('resize');
				}
			};
		
			$input.on('keydown keyup update blur', update);
			update();
		};
		
		var Selectize = function($input, settings) {
			var key, i, n, dir, input, self = this;
			input = $input[0];
			input.selectize = self;
		
			// detect rtl environment
			var computedStyle = window.getComputedStyle && window.getComputedStyle(input, null);
			dir = computedStyle ? computedStyle.getPropertyValue('direction') : input.currentStyle && input.currentStyle.direction;
			dir = dir || $input.parents('[dir]:first').attr('dir') || '';
		
			// setup default state
			$.extend(self, {
				order            : 0,
				settings         : settings,
				$input           : $input,
				tabIndex         : $input.attr('tabindex') || '',
				tagType          : input.tagName.toLowerCase() === 'select' ? TAG_SELECT : TAG_INPUT,
				rtl              : /rtl/i.test(dir),
		
				eventNS          : '.selectize' + (++Selectize.count),
				highlightedValue : null,
				isOpen           : false,
				isDisabled       : false,
				isRequired       : $input.is('[required]'),
				isInvalid        : false,
				isLocked         : false,
				isFocused        : false,
				isInputHidden    : false,
				isSetup          : false,
				isShiftDown      : false,
				isCmdDown        : false,
				isCtrlDown       : false,
				ignoreFocus      : false,
				ignoreBlur       : false,
				ignoreHover      : false,
				hasOptions       : false,
				currentResults   : null,
				lastValue        : '',
				caretPos         : 0,
				loading          : 0,
				loadedSearches   : {},
		
				$activeOption    : null,
				$activeItems     : [],
		
				optgroups        : {},
				options          : {},
				userOptions      : {},
				items            : [],
				renderCache      : {},
				onSearchChange   : settings.loadThrottle === null ? self.onSearchChange : debounce(self.onSearchChange, settings.loadThrottle)
			});
		
			// search system
			self.sifter = new Sifter(this.options, {diacritics: settings.diacritics});
		
			// build options table
			if (self.settings.options) {
				for (i = 0, n = self.settings.options.length; i < n; i++) {
					self.registerOption(self.settings.options[i]);
				}
				delete self.settings.options;
			}
		
			// build optgroup table
			if (self.settings.optgroups) {
				for (i = 0, n = self.settings.optgroups.length; i < n; i++) {
					self.registerOptionGroup(self.settings.optgroups[i]);
				}
				delete self.settings.optgroups;
			}
		
			// option-dependent defaults
			self.settings.mode = self.settings.mode || (self.settings.maxItems === 1 ? 'single' : 'multi');
			if (typeof self.settings.hideSelected !== 'boolean') {
				self.settings.hideSelected = self.settings.mode === 'multi';
			}
		
			self.initializePlugins(self.settings.plugins);
			self.setupCallbacks();
			self.setupTemplates();
			self.setup();
		};
		
		// mixins
		// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
		
		MicroEvent.mixin(Selectize);
		MicroPlugin.mixin(Selectize);
		
		// methods
		// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
		
		$.extend(Selectize.prototype, {
		
			/**
			 * Creates all elements and sets up event bindings.
			 */
			setup: function() {
				var self      = this;
				var settings  = self.settings;
				var eventNS   = self.eventNS;
				var $window   = $(window);
				var $document = $(document);
				var $input    = self.$input;
		
				var $wrapper;
				var $control;
				var $control_input;
				var $dropdown;
				var $dropdown_content;
				var $dropdown_parent;
				var inputMode;
				var timeout_blur;
				var timeout_focus;
				var classes;
				var classes_plugins;
		
				inputMode         = self.settings.mode;
				classes           = $input.attr('class') || '';
		
				$wrapper          = $('<div>').addClass(settings.wrapperClass).addClass(classes).addClass(inputMode);
				$control          = $('<div>').addClass(settings.inputClass).addClass('items').appendTo($wrapper);
				$control_input    = $('<input type="text" autocomplete="off" />').appendTo($control).attr('tabindex', $input.is(':disabled') ? '-1' : self.tabIndex);
				$dropdown_parent  = $(settings.dropdownParent || $wrapper);
				$dropdown         = $('<div>').addClass(settings.dropdownClass).addClass(inputMode).hide().appendTo($dropdown_parent);
				$dropdown_content = $('<div>').addClass(settings.dropdownContentClass).appendTo($dropdown);
		
				if(self.settings.copyClassesToDropdown) {
					$dropdown.addClass(classes);
				}
		
				$wrapper.css({
					width: $input[0].style.width
				});
		
				if (self.plugins.names.length) {
					classes_plugins = 'plugin-' + self.plugins.names.join(' plugin-');
					$wrapper.addClass(classes_plugins);
					$dropdown.addClass(classes_plugins);
				}
		
				if ((settings.maxItems === null || settings.maxItems > 1) && self.tagType === TAG_SELECT) {
					$input.attr('multiple', 'multiple');
				}
		
				if (self.settings.placeholder) {
					$control_input.attr('placeholder', settings.placeholder);
				}
		
				// if splitOn was not passed in, construct it from the delimiter to allow pasting universally
				if (!self.settings.splitOn && self.settings.delimiter) {
					var delimiterEscaped = self.settings.delimiter.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&');
					self.settings.splitOn = new RegExp('\\s*' + delimiterEscaped + '+\\s*');
				}
		
				if ($input.attr('autocorrect')) {
					$control_input.attr('autocorrect', $input.attr('autocorrect'));
				}
		
				if ($input.attr('autocapitalize')) {
					$control_input.attr('autocapitalize', $input.attr('autocapitalize'));
				}
		
				self.$wrapper          = $wrapper;
				self.$control          = $control;
				self.$control_input    = $control_input;
				self.$dropdown         = $dropdown;
				self.$dropdown_content = $dropdown_content;
		
				$dropdown.on('mouseenter', '[data-selectable]', function() { return self.onOptionHover.apply(self, arguments); });
				$dropdown.on('mousedown click', '[data-selectable]', function() { return self.onOptionSelect.apply(self, arguments); });
				watchChildEvent($control, 'mousedown', '*:not(input)', function() { return self.onItemSelect.apply(self, arguments); });
				autoGrow($control_input);
		
				$control.on({
					mousedown : function() { return self.onMouseDown.apply(self, arguments); },
					click     : function() { return self.onClick.apply(self, arguments); }
				});
		
				$control_input.on({
					mousedown : function(e) { e.stopPropagation(); },
					keydown   : function() { return self.onKeyDown.apply(self, arguments); },
					keyup     : function() { return self.onKeyUp.apply(self, arguments); },
					keypress  : function() { return self.onKeyPress.apply(self, arguments); },
					resize    : function() { self.positionDropdown.apply(self, []); },
					blur      : function() { return self.onBlur.apply(self, arguments); },
					focus     : function() { self.ignoreBlur = false; return self.onFocus.apply(self, arguments); },
					paste     : function() { return self.onPaste.apply(self, arguments); }
				});
		
				$document.on('keydown' + eventNS, function(e) {
					self.isCmdDown = e[IS_MAC ? 'metaKey' : 'ctrlKey'];
					self.isCtrlDown = e[IS_MAC ? 'altKey' : 'ctrlKey'];
					self.isShiftDown = e.shiftKey;
				});
		
				$document.on('keyup' + eventNS, function(e) {
					if (e.keyCode === KEY_CTRL) self.isCtrlDown = false;
					if (e.keyCode === KEY_SHIFT) self.isShiftDown = false;
					if (e.keyCode === KEY_CMD) self.isCmdDown = false;
				});
		
				$document.on('mousedown' + eventNS, function(e) {
					if (self.isFocused) {
						// prevent events on the dropdown scrollbar from causing the control to blur
						if (e.target === self.$dropdown[0] || e.target.parentNode === self.$dropdown[0]) {
							return false;
						}
						// blur on click outside
						if (!self.$control.has(e.target).length && e.target !== self.$control[0]) {
							self.blur(e.target);
						}
					}
				});
		
				$window.on(['scroll' + eventNS, 'resize' + eventNS].join(' '), function() {
					if (self.isOpen) {
						self.positionDropdown.apply(self, arguments);
					}
				});
				$window.on('mousemove' + eventNS, function() {
					self.ignoreHover = false;
				});
		
				// store original children and tab index so that they can be
				// restored when the destroy() method is called.
				this.revertSettings = {
					$children : $input.children().detach(),
					tabindex  : $input.attr('tabindex')
				};
		
				$input.attr('tabindex', -1).hide().after(self.$wrapper);
		
				if ($.isArray(settings.items)) {
					self.setValue(settings.items);
					delete settings.items;
				}
		
				// feature detect for the validation API
				if (SUPPORTS_VALIDITY_API) {
					$input.on('invalid' + eventNS, function(e) {
						e.preventDefault();
						self.isInvalid = true;
						self.refreshState();
					});
				}
		
				self.updateOriginalInput();
				self.refreshItems();
				self.refreshState();
				self.updatePlaceholder();
				self.isSetup = true;
		
				if ($input.is(':disabled')) {
					self.disable();
				}
		
				self.on('change', this.onChange);
		
				$input.data('selectize', self);
				$input.addClass('selectized');
				self.trigger('initialize');
		
				// preload options
				if (settings.preload === true) {
					self.onSearchChange('');
				}
		
			},
		
			/**
			 * Sets up default rendering functions.
			 */
			setupTemplates: function() {
				var self = this;
				var field_label = self.settings.labelField;
				var field_optgroup = self.settings.optgroupLabelField;
		
				var templates = {
					'optgroup': function(data) {
						return '<div class="optgroup">' + data.html + '</div>';
					},
					'optgroup_header': function(data, escape) {
						return '<div class="optgroup-header">' + escape(data[field_optgroup]) + '</div>';
					},
					'option': function(data, escape) {
						return '<div class="option">' + escape(data[field_label]) + '</div>';
					},
					'item': function(data, escape) {
						return '<div class="item">' + escape(data[field_label]) + '</div>';
					},
					'option_create': function(data, escape) {
						return '<div class="create">Add <strong>' + escape(data.input) + '</strong>&hellip;</div>';
					}
				};
		
				self.settings.render = $.extend({}, templates, self.settings.render);
			},
		
			/**
			 * Maps fired events to callbacks provided
			 * in the settings used when creating the control.
			 */
			setupCallbacks: function() {
				var key, fn, callbacks = {
					'initialize'      : 'onInitialize',
					'change'          : 'onChange',
					'item_add'        : 'onItemAdd',
					'item_remove'     : 'onItemRemove',
					'clear'           : 'onClear',
					'option_add'      : 'onOptionAdd',
					'option_remove'   : 'onOptionRemove',
					'option_clear'    : 'onOptionClear',
					'optgroup_add'    : 'onOptionGroupAdd',
					'optgroup_remove' : 'onOptionGroupRemove',
					'optgroup_clear'  : 'onOptionGroupClear',
					'dropdown_open'   : 'onDropdownOpen',
					'dropdown_close'  : 'onDropdownClose',
					'type'            : 'onType',
					'load'            : 'onLoad',
					'focus'           : 'onFocus',
					'blur'            : 'onBlur'
				};
		
				for (key in callbacks) {
					if (callbacks.hasOwnProperty(key)) {
						fn = this.settings[callbacks[key]];
						if (fn) this.on(key, fn);
					}
				}
			},
		
			/**
			 * Triggered when the main control element
			 * has a click event.
			 *
			 * @param {object} e
			 * @return {boolean}
			 */
			onClick: function(e) {
				var self = this;
		
				// necessary for mobile webkit devices (manual focus triggering
				// is ignored unless invoked within a click event)
				if (!self.isFocused) {
					self.focus();
					e.preventDefault();
				}
			},
		
			/**
			 * Triggered when the main control element
			 * has a mouse down event.
			 *
			 * @param {object} e
			 * @return {boolean}
			 */
			onMouseDown: function(e) {
				var self = this;
				var defaultPrevented = e.isDefaultPrevented();
				var $target = $(e.target);
		
				if (self.isFocused) {
					// retain focus by preventing native handling. if the
					// event target is the input it should not be modified.
					// otherwise, text selection within the input won't work.
					if (e.target !== self.$control_input[0]) {
						if (self.settings.mode === 'single') {
							// toggle dropdown
							self.isOpen ? self.close() : self.open();
						} else if (!defaultPrevented) {
							self.setActiveItem(null);
						}
						return false;
					}
				} else {
					// give control focus
					if (!defaultPrevented) {
						window.setTimeout(function() {
							self.focus();
						}, 0);
					}
				}
			},
		
			/**
			 * Triggered when the value of the control has been changed.
			 * This should propagate the event to the original DOM
			 * input / select element.
			 */
			onChange: function() {
				this.$input.trigger('change');
			},
		
			/**
			 * Triggered on <input> paste.
			 *
			 * @param {object} e
			 * @returns {boolean}
			 */
			onPaste: function(e) {
				var self = this;
				if (self.isFull() || self.isInputHidden || self.isLocked) {
					e.preventDefault();
				} else {
					// If a regex or string is included, this will split the pasted
					// input and create Items for each separate value
					if (self.settings.splitOn) {
						setTimeout(function() {
							var splitInput = $.trim(self.$control_input.val() || '').split(self.settings.splitOn);
							for (var i = 0, n = splitInput.length; i < n; i++) {
								self.createItem(splitInput[i]);
							}
						}, 0);
					}
				}
			},
		
			/**
			 * Triggered on <input> keypress.
			 *
			 * @param {object} e
			 * @returns {boolean}
			 */
			onKeyPress: function(e) {
				if (this.isLocked) return e && e.preventDefault();
				var character = String.fromCharCode(e.keyCode || e.which);
				if (this.settings.create && this.settings.mode === 'multi' && character === this.settings.delimiter) {
					this.createItem();
					e.preventDefault();
					return false;
				}
			},
		
			/**
			 * Triggered on <input> keydown.
			 *
			 * @param {object} e
			 * @returns {boolean}
			 */
			onKeyDown: function(e) {
				var isInput = e.target === this.$control_input[0];
				var self = this;
		
				if (self.isLocked) {
					if (e.keyCode !== KEY_TAB) {
						e.preventDefault();
					}
					return;
				}
		
				switch (e.keyCode) {
					case KEY_A:
						if (self.isCmdDown) {
							self.selectAll();
							return;
						}
						break;
					case KEY_ESC:
						if (self.isOpen) {
							e.preventDefault();
							e.stopPropagation();
							self.close();
						}
						return;
					case KEY_N:
						if (!e.ctrlKey || e.altKey) break;
					case KEY_DOWN:
						if (!self.isOpen && self.hasOptions) {
							self.open();
						} else if (self.$activeOption) {
							self.ignoreHover = true;
							var $next = self.getAdjacentOption(self.$activeOption, 1);
							if ($next.length) self.setActiveOption($next, true, true);
						}
						e.preventDefault();
						return;
					case KEY_P:
						if (!e.ctrlKey || e.altKey) break;
					case KEY_UP:
						if (self.$activeOption) {
							self.ignoreHover = true;
							var $prev = self.getAdjacentOption(self.$activeOption, -1);
							if ($prev.length) self.setActiveOption($prev, true, true);
						}
						e.preventDefault();
						return;
					case KEY_RETURN:
						if (self.isOpen && self.$activeOption) {
							self.onOptionSelect({currentTarget: self.$activeOption});
							e.preventDefault();
						}
						return;
					case KEY_LEFT:
						self.advanceSelection(-1, e);
						return;
					case KEY_RIGHT:
						self.advanceSelection(1, e);
						return;
					case KEY_TAB:
						if (self.settings.selectOnTab && self.isOpen && self.$activeOption) {
							self.onOptionSelect({currentTarget: self.$activeOption});
		
							// Default behaviour is to jump to the next field, we only want this
							// if the current field doesn't accept any more entries
							if (!self.isFull()) {
								e.preventDefault();
							}
						}
						if (self.settings.create && self.createItem()) {
							e.preventDefault();
						}
						return;
					case KEY_BACKSPACE:
					case KEY_DELETE:
						self.deleteSelection(e);
						return;
				}
		
				if ((self.isFull() || self.isInputHidden) && !(IS_MAC ? e.metaKey : e.ctrlKey)) {
					e.preventDefault();
					return;
				}
			},
		
			/**
			 * Triggered on <input> keyup.
			 *
			 * @param {object} e
			 * @returns {boolean}
			 */
			onKeyUp: function(e) {
				var self = this;
		
				if (self.isLocked) return e && e.preventDefault();
				var value = self.$control_input.val() || '';
				if (self.lastValue !== value) {
					self.lastValue = value;
					self.onSearchChange(value);
					self.refreshOptions();
					self.trigger('type', value);
				}
			},
		
			/**
			 * Invokes the user-provide option provider / loader.
			 *
			 * Note: this function is debounced in the Selectize
			 * constructor (by `settings.loadDelay` milliseconds)
			 *
			 * @param {string} value
			 */
			onSearchChange: function(value) {
				var self = this;
				var fn = self.settings.load;
				if (!fn) return;
				if (self.loadedSearches.hasOwnProperty(value)) return;
				self.loadedSearches[value] = true;
				self.load(function(callback) {
					fn.apply(self, [value, callback]);
				});
			},
		
			/**
			 * Triggered on <input> focus.
			 *
			 * @param {object} e (optional)
			 * @returns {boolean}
			 */
			onFocus: function(e) {
				var self = this;
				var wasFocused = self.isFocused;
		
				if (self.isDisabled) {
					self.blur();
					e && e.preventDefault();
					return false;
				}
		
				if (self.ignoreFocus) return;
				self.isFocused = true;
				if (self.settings.preload === 'focus') self.onSearchChange('');
		
				if (!wasFocused) self.trigger('focus');
		
				if (!self.$activeItems.length) {
					self.showInput();
					self.setActiveItem(null);
					self.refreshOptions(!!self.settings.openOnFocus);
				}
		
				self.refreshState();
			},
		
			/**
			 * Triggered on <input> blur.
			 *
			 * @param {object} e
			 * @param {Element} dest
			 */
			onBlur: function(e, dest) {
				var self = this;
				if (!self.isFocused) return;
				self.isFocused = false;
		
				if (self.ignoreFocus) {
					return;
				} else if (!self.ignoreBlur && document.activeElement === self.$dropdown_content[0]) {
					// necessary to prevent IE closing the dropdown when the scrollbar is clicked
					self.ignoreBlur = true;
					self.onFocus(e);
					return;
				}
		
				var deactivate = function() {
					self.close();
					self.setTextboxValue('');
					self.setActiveItem(null);
					self.setActiveOption(null);
					self.setCaret(self.items.length);
					self.refreshState();
		
					// IE11 bug: element still marked as active
					(dest || document.body).focus();
		
					self.ignoreFocus = false;
					self.trigger('blur');
				};
		
				self.ignoreFocus = true;
				if (self.settings.create && self.settings.createOnBlur) {
					self.createItem(null, false, deactivate);
				} else {
					deactivate();
				}
			},
		
			/**
			 * Triggered when the user rolls over
			 * an option in the autocomplete dropdown menu.
			 *
			 * @param {object} e
			 * @returns {boolean}
			 */
			onOptionHover: function(e) {
				if (this.ignoreHover) return;
				this.setActiveOption(e.currentTarget, false);
			},
		
			/**
			 * Triggered when the user clicks on an option
			 * in the autocomplete dropdown menu.
			 *
			 * @param {object} e
			 * @returns {boolean}
			 */
			onOptionSelect: function(e) {
				var value, $target, $option, self = this;
		
				if (e.preventDefault) {
					e.preventDefault();
					e.stopPropagation();
				}
		
				$target = $(e.currentTarget);
				if ($target.hasClass('create')) {
					self.createItem(null, function() {
						if (self.settings.closeAfterSelect) {
							self.close();
						}
					});
				} else {
					value = $target.attr('data-value');
					if (typeof value !== 'undefined') {
						self.lastQuery = null;
						self.setTextboxValue('');
						self.addItem(value);
						if (self.settings.closeAfterSelect) {
							self.close();
						} else if (!self.settings.hideSelected && e.type && /mouse/.test(e.type)) {
							self.setActiveOption(self.getOption(value));
						}
					}
				}
			},
		
			/**
			 * Triggered when the user clicks on an item
			 * that has been selected.
			 *
			 * @param {object} e
			 * @returns {boolean}
			 */
			onItemSelect: function(e) {
				var self = this;
		
				if (self.isLocked) return;
				if (self.settings.mode === 'multi') {
					e.preventDefault();
					self.setActiveItem(e.currentTarget, e);
				}
			},
		
			/**
			 * Invokes the provided method that provides
			 * results to a callback---which are then added
			 * as options to the control.
			 *
			 * @param {function} fn
			 */
			load: function(fn) {
				var self = this;
				var $wrapper = self.$wrapper.addClass(self.settings.loadingClass);
		
				self.loading++;
				fn.apply(self, [function(results) {
					self.loading = Math.max(self.loading - 1, 0);
					if (results && results.length) {
						self.addOption(results);
						self.refreshOptions(self.isFocused && !self.isInputHidden);
					}
					if (!self.loading) {
						$wrapper.removeClass(self.settings.loadingClass);
					}
					self.trigger('load', results);
				}]);
			},
		
			/**
			 * Sets the input field of the control to the specified value.
			 *
			 * @param {string} value
			 */
			setTextboxValue: function(value) {
				var $input = this.$control_input;
				var changed = $input.val() !== value;
				if (changed) {
					$input.val(value).triggerHandler('update');
					this.lastValue = value;
				}
			},
		
			/**
			 * Returns the value of the control. If multiple items
			 * can be selected (e.g. <select multiple>), this returns
			 * an array. If only one item can be selected, this
			 * returns a string.
			 *
			 * @returns {mixed}
			 */
			getValue: function() {
				if (this.tagType === TAG_SELECT && this.$input.attr('multiple')) {
					return this.items;
				} else {
					return this.items.join(this.settings.delimiter);
				}
			},
		
			/**
			 * Resets the selected items to the given value.
			 *
			 * @param {mixed} value
			 */
			setValue: function(value, silent) {
				var events = silent ? [] : ['change'];
		
				debounce_events(this, events, function() {
					this.clear(silent);
					this.addItems(value, silent);
				});
			},
		
			/**
			 * Sets the selected item.
			 *
			 * @param {object} $item
			 * @param {object} e (optional)
			 */
			setActiveItem: function($item, e) {
				var self = this;
				var eventName;
				var i, idx, begin, end, item, swap;
				var $last;
		
				if (self.settings.mode === 'single') return;
				$item = $($item);
		
				// clear the active selection
				if (!$item.length) {
					$(self.$activeItems).removeClass('active');
					self.$activeItems = [];
					if (self.isFocused) {
						self.showInput();
					}
					return;
				}
		
				// modify selection
				eventName = e && e.type.toLowerCase();
		
				if (eventName === 'mousedown' && self.isShiftDown && self.$activeItems.length) {
					$last = self.$control.children('.active:last');
					begin = Array.prototype.indexOf.apply(self.$control[0].childNodes, [$last[0]]);
					end   = Array.prototype.indexOf.apply(self.$control[0].childNodes, [$item[0]]);
					if (begin > end) {
						swap  = begin;
						begin = end;
						end   = swap;
					}
					for (i = begin; i <= end; i++) {
						item = self.$control[0].childNodes[i];
						if (self.$activeItems.indexOf(item) === -1) {
							$(item).addClass('active');
							self.$activeItems.push(item);
						}
					}
					e.preventDefault();
				} else if ((eventName === 'mousedown' && self.isCtrlDown) || (eventName === 'keydown' && this.isShiftDown)) {
					if ($item.hasClass('active')) {
						idx = self.$activeItems.indexOf($item[0]);
						self.$activeItems.splice(idx, 1);
						$item.removeClass('active');
					} else {
						self.$activeItems.push($item.addClass('active')[0]);
					}
				} else {
					$(self.$activeItems).removeClass('active');
					self.$activeItems = [$item.addClass('active')[0]];
				}
		
				// ensure control has focus
				self.hideInput();
				if (!this.isFocused) {
					self.focus();
				}
			},
		
			/**
			 * Sets the selected item in the dropdown menu
			 * of available options.
			 *
			 * @param {object} $object
			 * @param {boolean} scroll
			 * @param {boolean} animate
			 */
			setActiveOption: function($option, scroll, animate) {
				var height_menu, height_item, y;
				var scroll_top, scroll_bottom;
				var self = this;
		
				if (self.$activeOption) self.$activeOption.removeClass('active');
				self.$activeOption = null;
		
				$option = $($option);
				if (!$option.length) return;
		
				self.$activeOption = $option.addClass('active');
		
				if (scroll || !isset(scroll)) {
		
					height_menu   = self.$dropdown_content.height();
					height_item   = self.$activeOption.outerHeight(true);
					scroll        = self.$dropdown_content.scrollTop() || 0;
					y             = self.$activeOption.offset().top - self.$dropdown_content.offset().top + scroll;
					scroll_top    = y;
					scroll_bottom = y - height_menu + height_item;
		
					if (y + height_item > height_menu + scroll) {
						self.$dropdown_content.stop().animate({scrollTop: scroll_bottom}, animate ? self.settings.scrollDuration : 0);
					} else if (y < scroll) {
						self.$dropdown_content.stop().animate({scrollTop: scroll_top}, animate ? self.settings.scrollDuration : 0);
					}
		
				}
			},
		
			/**
			 * Selects all items (CTRL + A).
			 */
			selectAll: function() {
				var self = this;
				if (self.settings.mode === 'single') return;
		
				self.$activeItems = Array.prototype.slice.apply(self.$control.children(':not(input)').addClass('active'));
				if (self.$activeItems.length) {
					self.hideInput();
					self.close();
				}
				self.focus();
			},
		
			/**
			 * Hides the input element out of view, while
			 * retaining its focus.
			 */
			hideInput: function() {
				var self = this;
		
				self.setTextboxValue('');
				self.$control_input.css({opacity: 0, position: 'absolute', left: self.rtl ? 10000 : -10000});
				self.isInputHidden = true;
			},
		
			/**
			 * Restores input visibility.
			 */
			showInput: function() {
				this.$control_input.css({opacity: 1, position: 'relative', left: 0});
				this.isInputHidden = false;
			},
		
			/**
			 * Gives the control focus.
			 */
			focus: function() {
				var self = this;
				if (self.isDisabled) return;
		
				self.ignoreFocus = true;
				self.$control_input[0].focus();
				window.setTimeout(function() {
					self.ignoreFocus = false;
					self.onFocus();
				}, 0);
			},
		
			/**
			 * Forces the control out of focus.
			 *
			 * @param {Element} dest
			 */
			blur: function(dest) {
				this.$control_input[0].blur();
				this.onBlur(null, dest);
			},
		
			/**
			 * Returns a function that scores an object
			 * to show how good of a match it is to the
			 * provided query.
			 *
			 * @param {string} query
			 * @param {object} options
			 * @return {function}
			 */
			getScoreFunction: function(query) {
				return this.sifter.getScoreFunction(query, this.getSearchOptions());
			},
		
			/**
			 * Returns search options for sifter (the system
			 * for scoring and sorting results).
			 *
			 * @see https://github.com/brianreavis/sifter.js
			 * @return {object}
			 */
			getSearchOptions: function() {
				var settings = this.settings;
				var sort = settings.sortField;
				if (typeof sort === 'string') {
					sort = [{field: sort}];
				}
		
				return {
					fields      : settings.searchField,
					conjunction : settings.searchConjunction,
					sort        : sort
				};
			},
		
			/**
			 * Searches through available options and returns
			 * a sorted array of matches.
			 *
			 * Returns an object containing:
			 *
			 *   - query {string}
			 *   - tokens {array}
			 *   - total {int}
			 *   - items {array}
			 *
			 * @param {string} query
			 * @returns {object}
			 */
			search: function(query) {
				var i, value, score, result, calculateScore;
				var self     = this;
				var settings = self.settings;
				var options  = this.getSearchOptions();
		
				// validate user-provided result scoring function
				if (settings.score) {
					calculateScore = self.settings.score.apply(this, [query]);
					if (typeof calculateScore !== 'function') {
						throw new Error('Selectize "score" setting must be a function that returns a function');
					}
				}
		
				// perform search
				if (query !== self.lastQuery) {
					self.lastQuery = query;
					result = self.sifter.search(query, $.extend(options, {score: calculateScore}));
					self.currentResults = result;
				} else {
					result = $.extend(true, {}, self.currentResults);
				}
		
				// filter out selected items
				if (settings.hideSelected) {
					for (i = result.items.length - 1; i >= 0; i--) {
						if (self.items.indexOf(hash_key(result.items[i].id)) !== -1) {
							result.items.splice(i, 1);
						}
					}
				}
		
				return result;
			},
		
			/**
			 * Refreshes the list of available options shown
			 * in the autocomplete dropdown menu.
			 *
			 * @param {boolean} triggerDropdown
			 */
			refreshOptions: function(triggerDropdown) {
				var i, j, k, n, groups, groups_order, option, option_html, optgroup, optgroups, html, html_children, has_create_option;
				var $active, $active_before, $create;
		
				if (typeof triggerDropdown === 'undefined') {
					triggerDropdown = true;
				}
		
				var self              = this;
				var query             = $.trim(self.$control_input.val());
				var results           = self.search(query);
				var $dropdown_content = self.$dropdown_content;
				var active_before     = self.$activeOption && hash_key(self.$activeOption.attr('data-value'));
		
				// build markup
				n = results.items.length;
				if (typeof self.settings.maxOptions === 'number') {
					n = Math.min(n, self.settings.maxOptions);
				}
		
				// render and group available options individually
				groups = {};
				groups_order = [];
		
				for (i = 0; i < n; i++) {
					option      = self.options[results.items[i].id];
					option_html = self.render('option', option);
					optgroup    = option[self.settings.optgroupField] || '';
					optgroups   = $.isArray(optgroup) ? optgroup : [optgroup];
		
					for (j = 0, k = optgroups && optgroups.length; j < k; j++) {
						optgroup = optgroups[j];
						if (!self.optgroups.hasOwnProperty(optgroup)) {
							optgroup = '';
						}
						if (!groups.hasOwnProperty(optgroup)) {
							groups[optgroup] = [];
							groups_order.push(optgroup);
						}
						groups[optgroup].push(option_html);
					}
				}
		
				// sort optgroups
				if (this.settings.lockOptgroupOrder) {
					groups_order.sort(function(a, b) {
						var a_order = self.optgroups[a].$order || 0;
						var b_order = self.optgroups[b].$order || 0;
						return a_order - b_order;
					});
				}
		
				// render optgroup headers & join groups
				html = [];
				for (i = 0, n = groups_order.length; i < n; i++) {
					optgroup = groups_order[i];
					if (self.optgroups.hasOwnProperty(optgroup) && groups[optgroup].length) {
						// render the optgroup header and options within it,
						// then pass it to the wrapper template
						html_children = self.render('optgroup_header', self.optgroups[optgroup]) || '';
						html_children += groups[optgroup].join('');
						html.push(self.render('optgroup', $.extend({}, self.optgroups[optgroup], {
							html: html_children
						})));
					} else {
						html.push(groups[optgroup].join(''));
					}
				}
		
				$dropdown_content.html(html.join(''));
		
				// highlight matching terms inline
				if (self.settings.highlight && results.query.length && results.tokens.length) {
					for (i = 0, n = results.tokens.length; i < n; i++) {
						highlight($dropdown_content, results.tokens[i].regex);
					}
				}
		
				// add "selected" class to selected options
				if (!self.settings.hideSelected) {
					for (i = 0, n = self.items.length; i < n; i++) {
						self.getOption(self.items[i]).addClass('selected');
					}
				}
		
				// add create option
				has_create_option = self.canCreate(query);
				if (has_create_option) {
					$dropdown_content.prepend(self.render('option_create', {input: query}));
					$create = $($dropdown_content[0].childNodes[0]);
				}
		
				// activate
				self.hasOptions = results.items.length > 0 || has_create_option;
				if (self.hasOptions) {
					if (results.items.length > 0) {
						$active_before = active_before && self.getOption(active_before);
						if ($active_before && $active_before.length) {
							$active = $active_before;
						} else if (self.settings.mode === 'single' && self.items.length) {
							$active = self.getOption(self.items[0]);
						}
						if (!$active || !$active.length) {
							if ($create && !self.settings.addPrecedence) {
								$active = self.getAdjacentOption($create, 1);
							} else {
								$active = $dropdown_content.find('[data-selectable]:first');
							}
						}
					} else {
						$active = $create;
					}
					self.setActiveOption($active);
					if (triggerDropdown && !self.isOpen) { self.open(); }
				} else {
					self.setActiveOption(null);
					if (triggerDropdown && self.isOpen) { self.close(); }
				}
			},
		
			/**
			 * Adds an available option. If it already exists,
			 * nothing will happen. Note: this does not refresh
			 * the options list dropdown (use `refreshOptions`
			 * for that).
			 *
			 * Usage:
			 *
			 *   this.addOption(data)
			 *
			 * @param {object|array} data
			 */
			addOption: function(data) {
				var i, n, value, self = this;
		
				if ($.isArray(data)) {
					for (i = 0, n = data.length; i < n; i++) {
						self.addOption(data[i]);
					}
					return;
				}
		
				if (value = self.registerOption(data)) {
					self.userOptions[value] = true;
					self.lastQuery = null;
					self.trigger('option_add', value, data);
				}
			},
		
			/**
			 * Registers an option to the pool of options.
			 *
			 * @param {object} data
			 * @return {boolean|string}
			 */
			registerOption: function(data) {
				var key = hash_key(data[this.settings.valueField]);
				if (!key || this.options.hasOwnProperty(key)) return false;
				data.$order = data.$order || ++this.order;
				this.options[key] = data;
				return key;
			},
		
			/**
			 * Registers an option group to the pool of option groups.
			 *
			 * @param {object} data
			 * @return {boolean|string}
			 */
			registerOptionGroup: function(data) {
				var key = hash_key(data[this.settings.optgroupValueField]);
				if (!key) return false;
		
				data.$order = data.$order || ++this.order;
				this.optgroups[key] = data;
				return key;
			},
		
			/**
			 * Registers a new optgroup for options
			 * to be bucketed into.
			 *
			 * @param {string} id
			 * @param {object} data
			 */
			addOptionGroup: function(id, data) {
				data[this.settings.optgroupValueField] = id;
				if (id = this.registerOptionGroup(data)) {
					this.trigger('optgroup_add', id, data);
				}
			},
		
			/**
			 * Removes an existing option group.
			 *
			 * @param {string} id
			 */
			removeOptionGroup: function(id) {
				if (this.optgroups.hasOwnProperty(id)) {
					delete this.optgroups[id];
					this.renderCache = {};
					this.trigger('optgroup_remove', id);
				}
			},
		
			/**
			 * Clears all existing option groups.
			 */
			clearOptionGroups: function() {
				this.optgroups = {};
				this.renderCache = {};
				this.trigger('optgroup_clear');
			},
		
			/**
			 * Updates an option available for selection. If
			 * it is visible in the selected items or options
			 * dropdown, it will be re-rendered automatically.
			 *
			 * @param {string} value
			 * @param {object} data
			 */
			updateOption: function(value, data) {
				var self = this;
				var $item, $item_new;
				var value_new, index_item, cache_items, cache_options, order_old;
		
				value     = hash_key(value);
				value_new = hash_key(data[self.settings.valueField]);
		
				// sanity checks
				if (value === null) return;
				if (!self.options.hasOwnProperty(value)) return;
				if (typeof value_new !== 'string') throw new Error('Value must be set in option data');
		
				order_old = self.options[value].$order;
		
				// update references
				if (value_new !== value) {
					delete self.options[value];
					index_item = self.items.indexOf(value);
					if (index_item !== -1) {
						self.items.splice(index_item, 1, value_new);
					}
				}
				data.$order = data.$order || order_old;
				self.options[value_new] = data;
		
				// invalidate render cache
				cache_items = self.renderCache['item'];
				cache_options = self.renderCache['option'];
		
				if (cache_items) {
					delete cache_items[value];
					delete cache_items[value_new];
				}
				if (cache_options) {
					delete cache_options[value];
					delete cache_options[value_new];
				}
		
				// update the item if it's selected
				if (self.items.indexOf(value_new) !== -1) {
					$item = self.getItem(value);
					$item_new = $(self.render('item', data));
					if ($item.hasClass('active')) $item_new.addClass('active');
					$item.replaceWith($item_new);
				}
		
				// invalidate last query because we might have updated the sortField
				self.lastQuery = null;
		
				// update dropdown contents
				if (self.isOpen) {
					self.refreshOptions(false);
				}
			},
		
			/**
			 * Removes a single option.
			 *
			 * @param {string} value
			 * @param {boolean} silent
			 */
			removeOption: function(value, silent) {
				var self = this;
				value = hash_key(value);
		
				var cache_items = self.renderCache['item'];
				var cache_options = self.renderCache['option'];
				if (cache_items) delete cache_items[value];
				if (cache_options) delete cache_options[value];
		
				delete self.userOptions[value];
				delete self.options[value];
				self.lastQuery = null;
				self.trigger('option_remove', value);
				self.removeItem(value, silent);
			},
		
			/**
			 * Clears all options.
			 */
			clearOptions: function() {
				var self = this;
		
				self.loadedSearches = {};
				self.userOptions = {};
				self.renderCache = {};
				self.options = self.sifter.items = {};
				self.lastQuery = null;
				self.trigger('option_clear');
				self.clear();
			},
		
			/**
			 * Returns the jQuery element of the option
			 * matching the given value.
			 *
			 * @param {string} value
			 * @returns {object}
			 */
			getOption: function(value) {
				return this.getElementWithValue(value, this.$dropdown_content.find('[data-selectable]'));
			},
		
			/**
			 * Returns the jQuery element of the next or
			 * previous selectable option.
			 *
			 * @param {object} $option
			 * @param {int} direction  can be 1 for next or -1 for previous
			 * @return {object}
			 */
			getAdjacentOption: function($option, direction) {
				var $options = this.$dropdown.find('[data-selectable]');
				var index    = $options.index($option) + direction;
		
				return index >= 0 && index < $options.length ? $options.eq(index) : $();
			},
		
			/**
			 * Finds the first element with a "data-value" attribute
			 * that matches the given value.
			 *
			 * @param {mixed} value
			 * @param {object} $els
			 * @return {object}
			 */
			getElementWithValue: function(value, $els) {
				value = hash_key(value);
		
				if (typeof value !== 'undefined' && value !== null) {
					for (var i = 0, n = $els.length; i < n; i++) {
						if ($els[i].getAttribute('data-value') === value) {
							return $($els[i]);
						}
					}
				}
		
				return $();
			},
		
			/**
			 * Returns the jQuery element of the item
			 * matching the given value.
			 *
			 * @param {string} value
			 * @returns {object}
			 */
			getItem: function(value) {
				return this.getElementWithValue(value, this.$control.children());
			},
		
			/**
			 * "Selects" multiple items at once. Adds them to the list
			 * at the current caret position.
			 *
			 * @param {string} value
			 * @param {boolean} silent
			 */
			addItems: function(values, silent) {
				var items = $.isArray(values) ? values : [values];
				for (var i = 0, n = items.length; i < n; i++) {
					this.isPending = (i < n - 1);
					this.addItem(items[i], silent);
				}
			},
		
			/**
			 * "Selects" an item. Adds it to the list
			 * at the current caret position.
			 *
			 * @param {string} value
			 * @param {boolean} silent
			 */
			addItem: function(value, silent) {
				var events = silent ? [] : ['change'];
		
				debounce_events(this, events, function() {
					var $item, $option, $options;
					var self = this;
					var inputMode = self.settings.mode;
					var i, active, value_next, wasFull;
					value = hash_key(value);
		
					if (self.items.indexOf(value) !== -1) {
						if (inputMode === 'single') self.close();
						return;
					}
		
					if (!self.options.hasOwnProperty(value)) return;
					if (inputMode === 'single') self.clear(silent);
					if (inputMode === 'multi' && self.isFull()) return;
		
					$item = $(self.render('item', self.options[value]));
					wasFull = self.isFull();
					self.items.splice(self.caretPos, 0, value);
					self.insertAtCaret($item);
					if (!self.isPending || (!wasFull && self.isFull())) {
						self.refreshState();
					}
		
					if (self.isSetup) {
						$options = self.$dropdown_content.find('[data-selectable]');
		
						// update menu / remove the option (if this is not one item being added as part of series)
						if (!self.isPending) {
							$option = self.getOption(value);
							value_next = self.getAdjacentOption($option, 1).attr('data-value');
							self.refreshOptions(self.isFocused && inputMode !== 'single');
							if (value_next) {
								self.setActiveOption(self.getOption(value_next));
							}
						}
		
						// hide the menu if the maximum number of items have been selected or no options are left
						if (!$options.length || self.isFull()) {
							self.close();
						} else {
							self.positionDropdown();
						}
		
						self.updatePlaceholder();
						self.trigger('item_add', value, $item);
						self.updateOriginalInput({silent: silent});
					}
				});
			},
		
			/**
			 * Removes the selected item matching
			 * the provided value.
			 *
			 * @param {string} value
			 */
			removeItem: function(value, silent) {
				var self = this;
				var $item, i, idx;
		
				$item = (typeof value === 'object') ? value : self.getItem(value);
				value = hash_key($item.attr('data-value'));
				i = self.items.indexOf(value);
		
				if (i !== -1) {
					$item.remove();
					if ($item.hasClass('active')) {
						idx = self.$activeItems.indexOf($item[0]);
						self.$activeItems.splice(idx, 1);
					}
		
					self.items.splice(i, 1);
					self.lastQuery = null;
					if (!self.settings.persist && self.userOptions.hasOwnProperty(value)) {
						self.removeOption(value, silent);
					}
		
					if (i < self.caretPos) {
						self.setCaret(self.caretPos - 1);
					}
		
					self.refreshState();
					self.updatePlaceholder();
					self.updateOriginalInput({silent: silent});
					self.positionDropdown();
					self.trigger('item_remove', value, $item);
				}
			},
		
			/**
			 * Invokes the `create` method provided in the
			 * selectize options that should provide the data
			 * for the new item, given the user input.
			 *
			 * Once this completes, it will be added
			 * to the item list.
			 *
			 * @param {string} value
			 * @param {boolean} [triggerDropdown]
			 * @param {function} [callback]
			 * @return {boolean}
			 */
			createItem: function(input, triggerDropdown) {
				var self  = this;
				var caret = self.caretPos;
				input = input || $.trim(self.$control_input.val() || '');
		
				var callback = arguments[arguments.length - 1];
				if (typeof callback !== 'function') callback = function() {};
		
				if (typeof triggerDropdown !== 'boolean') {
					triggerDropdown = true;
				}
		
				if (!self.canCreate(input)) {
					callback();
					return false;
				}
		
				self.lock();
		
				var setup = (typeof self.settings.create === 'function') ? this.settings.create : function(input) {
					var data = {};
					data[self.settings.labelField] = input;
					data[self.settings.valueField] = input;
					return data;
				};
		
				var create = once(function(data) {
					self.unlock();
		
					if (!data || typeof data !== 'object') return callback();
					var value = hash_key(data[self.settings.valueField]);
					if (typeof value !== 'string') return callback();
		
					self.setTextboxValue('');
					self.addOption(data);
					self.setCaret(caret);
					self.addItem(value);
					self.refreshOptions(triggerDropdown && self.settings.mode !== 'single');
					callback(data);
				});
		
				var output = setup.apply(this, [input, create]);
				if (typeof output !== 'undefined') {
					create(output);
				}
		
				return true;
			},
		
			/**
			 * Re-renders the selected item lists.
			 */
			refreshItems: function() {
				this.lastQuery = null;
		
				if (this.isSetup) {
					this.addItem(this.items);
				}
		
				this.refreshState();
				this.updateOriginalInput();
			},
		
			/**
			 * Updates all state-dependent attributes
			 * and CSS classes.
			 */
			refreshState: function() {
				var invalid, self = this;
				if (self.isRequired) {
					if (self.items.length) self.isInvalid = false;
					self.$control_input.prop('required', invalid);
				}
				self.refreshClasses();
			},
		
			/**
			 * Updates all state-dependent CSS classes.
			 */
			refreshClasses: function() {
				var self     = this;
				var isFull   = self.isFull();
				var isLocked = self.isLocked;
		
				self.$wrapper
					.toggleClass('rtl', self.rtl);
		
				self.$control
					.toggleClass('focus', self.isFocused)
					.toggleClass('disabled', self.isDisabled)
					.toggleClass('required', self.isRequired)
					.toggleClass('invalid', self.isInvalid)
					.toggleClass('locked', isLocked)
					.toggleClass('full', isFull).toggleClass('not-full', !isFull)
					.toggleClass('input-active', self.isFocused && !self.isInputHidden)
					.toggleClass('dropdown-active', self.isOpen)
					.toggleClass('has-options', !$.isEmptyObject(self.options))
					.toggleClass('has-items', self.items.length > 0);
		
				self.$control_input.data('grow', !isFull && !isLocked);
			},
		
			/**
			 * Determines whether or not more items can be added
			 * to the control without exceeding the user-defined maximum.
			 *
			 * @returns {boolean}
			 */
			isFull: function() {
				return this.settings.maxItems !== null && this.items.length >= this.settings.maxItems;
			},
		
			/**
			 * Refreshes the original <select> or <input>
			 * element to reflect the current state.
			 */
			updateOriginalInput: function(opts) {
				var i, n, options, label, self = this;
				opts = opts || {};
		
				if (self.tagType === TAG_SELECT) {
					options = [];
					for (i = 0, n = self.items.length; i < n; i++) {
						label = self.options[self.items[i]][self.settings.labelField] || '';
						options.push('<option value="' + escape_html(self.items[i]) + '" selected="selected">' + escape_html(label) + '</option>');
					}
					if (!options.length && !this.$input.attr('multiple')) {
						options.push('<option value="" selected="selected"></option>');
					}
					self.$input.html(options.join(''));
				} else {
					self.$input.val(self.getValue());
					self.$input.attr('value',self.$input.val());
				}
		
				if (self.isSetup) {
					if (!opts.silent) {
						self.trigger('change', self.$input.val());
					}
				}
			},
		
			/**
			 * Shows/hide the input placeholder depending
			 * on if there items in the list already.
			 */
			updatePlaceholder: function() {
				if (!this.settings.placeholder) return;
				var $input = this.$control_input;
		
				if (this.items.length) {
					$input.removeAttr('placeholder');
				} else {
					$input.attr('placeholder', this.settings.placeholder);
				}
				$input.triggerHandler('update', {force: true});
			},
		
			/**
			 * Shows the autocomplete dropdown containing
			 * the available options.
			 */
			open: function() {
				var self = this;
		
				if (self.isLocked || self.isOpen || (self.settings.mode === 'multi' && self.isFull())) return;
				self.focus();
				self.isOpen = true;
				self.refreshState();
				self.$dropdown.css({visibility: 'hidden', display: 'block'});
				self.positionDropdown();
				self.$dropdown.css({visibility: 'visible'});
				self.trigger('dropdown_open', self.$dropdown);
			},
		
			/**
			 * Closes the autocomplete dropdown menu.
			 */
			close: function() {
				var self = this;
				var trigger = self.isOpen;
		
				if (self.settings.mode === 'single' && self.items.length) {
					self.hideInput();
				}
		
				self.isOpen = false;
				self.$dropdown.hide();
				self.setActiveOption(null);
				self.refreshState();
		
				if (trigger) self.trigger('dropdown_close', self.$dropdown);
			},
		
			/**
			 * Calculates and applies the appropriate
			 * position of the dropdown.
			 */
			positionDropdown: function() {
				var $control = this.$control;
				var offset = this.settings.dropdownParent === 'body' ? $control.offset() : $control.position();
				offset.top += $control.outerHeight(true);
		
				this.$dropdown.css({
					width : $control.outerWidth(),
					top   : offset.top,
					left  : offset.left
				});
			},
		
			/**
			 * Resets / clears all selected items
			 * from the control.
			 *
			 * @param {boolean} silent
			 */
			clear: function(silent) {
				var self = this;
		
				if (!self.items.length) return;
				self.$control.children(':not(input)').remove();
				self.items = [];
				self.lastQuery = null;
				self.setCaret(0);
				self.setActiveItem(null);
				self.updatePlaceholder();
				self.updateOriginalInput({silent: silent});
				self.refreshState();
				self.showInput();
				self.trigger('clear');
			},
		
			/**
			 * A helper method for inserting an element
			 * at the current caret position.
			 *
			 * @param {object} $el
			 */
			insertAtCaret: function($el) {
				var caret = Math.min(this.caretPos, this.items.length);
				if (caret === 0) {
					this.$control.prepend($el);
				} else {
					$(this.$control[0].childNodes[caret]).before($el);
				}
				this.setCaret(caret + 1);
			},
		
			/**
			 * Removes the current selected item(s).
			 *
			 * @param {object} e (optional)
			 * @returns {boolean}
			 */
			deleteSelection: function(e) {
				var i, n, direction, selection, values, caret, option_select, $option_select, $tail;
				var self = this;
		
				direction = (e && e.keyCode === KEY_BACKSPACE) ? -1 : 1;
				selection = getSelection(self.$control_input[0]);
		
				if (self.$activeOption && !self.settings.hideSelected) {
					option_select = self.getAdjacentOption(self.$activeOption, -1).attr('data-value');
				}
		
				// determine items that will be removed
				values = [];
		
				if (self.$activeItems.length) {
					$tail = self.$control.children('.active:' + (direction > 0 ? 'last' : 'first'));
					caret = self.$control.children(':not(input)').index($tail);
					if (direction > 0) { caret++; }
		
					for (i = 0, n = self.$activeItems.length; i < n; i++) {
						values.push($(self.$activeItems[i]).attr('data-value'));
					}
					if (e) {
						e.preventDefault();
						e.stopPropagation();
					}
				} else if ((self.isFocused || self.settings.mode === 'single') && self.items.length) {
					if (direction < 0 && selection.start === 0 && selection.length === 0) {
						values.push(self.items[self.caretPos - 1]);
					} else if (direction > 0 && selection.start === self.$control_input.val().length) {
						values.push(self.items[self.caretPos]);
					}
				}
		
				// allow the callback to abort
				if (!values.length || (typeof self.settings.onDelete === 'function' && self.settings.onDelete.apply(self, [values]) === false)) {
					return false;
				}
		
				// perform removal
				if (typeof caret !== 'undefined') {
					self.setCaret(caret);
				}
				while (values.length) {
					self.removeItem(values.pop());
				}
		
				self.showInput();
				self.positionDropdown();
				self.refreshOptions(true);
		
				// select previous option
				if (option_select) {
					$option_select = self.getOption(option_select);
					if ($option_select.length) {
						self.setActiveOption($option_select);
					}
				}
		
				return true;
			},
		
			/**
			 * Selects the previous / next item (depending
			 * on the `direction` argument).
			 *
			 * > 0 - right
			 * < 0 - left
			 *
			 * @param {int} direction
			 * @param {object} e (optional)
			 */
			advanceSelection: function(direction, e) {
				var tail, selection, idx, valueLength, cursorAtEdge, $tail;
				var self = this;
		
				if (direction === 0) return;
				if (self.rtl) direction *= -1;
		
				tail = direction > 0 ? 'last' : 'first';
				selection = getSelection(self.$control_input[0]);
		
				if (self.isFocused && !self.isInputHidden) {
					valueLength = self.$control_input.val().length;
					cursorAtEdge = direction < 0
						? selection.start === 0 && selection.length === 0
						: selection.start === valueLength;
		
					if (cursorAtEdge && !valueLength) {
						self.advanceCaret(direction, e);
					}
				} else {
					$tail = self.$control.children('.active:' + tail);
					if ($tail.length) {
						idx = self.$control.children(':not(input)').index($tail);
						self.setActiveItem(null);
						self.setCaret(direction > 0 ? idx + 1 : idx);
					}
				}
			},
		
			/**
			 * Moves the caret left / right.
			 *
			 * @param {int} direction
			 * @param {object} e (optional)
			 */
			advanceCaret: function(direction, e) {
				var self = this, fn, $adj;
		
				if (direction === 0) return;
		
				fn = direction > 0 ? 'next' : 'prev';
				if (self.isShiftDown) {
					$adj = self.$control_input[fn]();
					if ($adj.length) {
						self.hideInput();
						self.setActiveItem($adj);
						e && e.preventDefault();
					}
				} else {
					self.setCaret(self.caretPos + direction);
				}
			},
		
			/**
			 * Moves the caret to the specified index.
			 *
			 * @param {int} i
			 */
			setCaret: function(i) {
				var self = this;
		
				if (self.settings.mode === 'single') {
					i = self.items.length;
				} else {
					i = Math.max(0, Math.min(self.items.length, i));
				}
		
				if(!self.isPending) {
					// the input must be moved by leaving it in place and moving the
					// siblings, due to the fact that focus cannot be restored once lost
					// on mobile webkit devices
					var j, n, fn, $children, $child;
					$children = self.$control.children(':not(input)');
					for (j = 0, n = $children.length; j < n; j++) {
						$child = $($children[j]).detach();
						if (j <  i) {
							self.$control_input.before($child);
						} else {
							self.$control.append($child);
						}
					}
				}
		
				self.caretPos = i;
			},
		
			/**
			 * Disables user input on the control. Used while
			 * items are being asynchronously created.
			 */
			lock: function() {
				this.close();
				this.isLocked = true;
				this.refreshState();
			},
		
			/**
			 * Re-enables user input on the control.
			 */
			unlock: function() {
				this.isLocked = false;
				this.refreshState();
			},
		
			/**
			 * Disables user input on the control completely.
			 * While disabled, it cannot receive focus.
			 */
			disable: function() {
				var self = this;
				self.$input.prop('disabled', true);
				self.$control_input.prop('disabled', true).prop('tabindex', -1);
				self.isDisabled = true;
				self.lock();
			},
		
			/**
			 * Enables the control so that it can respond
			 * to focus and user input.
			 */
			enable: function() {
				var self = this;
				self.$input.prop('disabled', false);
				self.$control_input.prop('disabled', false).prop('tabindex', self.tabIndex);
				self.isDisabled = false;
				self.unlock();
			},
		
			/**
			 * Completely destroys the control and
			 * unbinds all event listeners so that it can
			 * be garbage collected.
			 */
			destroy: function() {
				var self = this;
				var eventNS = self.eventNS;
				var revertSettings = self.revertSettings;
		
				self.trigger('destroy');
				self.off();
				self.$wrapper.remove();
				self.$dropdown.remove();
		
				self.$input
					.html('')
					.append(revertSettings.$children)
					.removeAttr('tabindex')
					.removeClass('selectized')
					.attr({tabindex: revertSettings.tabindex})
					.show();
		
				self.$control_input.removeData('grow');
				self.$input.removeData('selectize');
		
				$(window).off(eventNS);
				$(document).off(eventNS);
				$(document.body).off(eventNS);
		
				delete self.$input[0].selectize;
			},
		
			/**
			 * A helper method for rendering "item" and
			 * "option" templates, given the data.
			 *
			 * @param {string} templateName
			 * @param {object} data
			 * @returns {string}
			 */
			render: function(templateName, data) {
				var value, id, label;
				var html = '';
				var cache = false;
				var self = this;
				var regex_tag = /^[\t \r\n]*<([a-z][a-z0-9\-_]*(?:\:[a-z][a-z0-9\-_]*)?)/i;
		
				if (templateName === 'option' || templateName === 'item') {
					value = hash_key(data[self.settings.valueField]);
					cache = !!value;
				}
		
				// pull markup from cache if it exists
				if (cache) {
					if (!isset(self.renderCache[templateName])) {
						self.renderCache[templateName] = {};
					}
					if (self.renderCache[templateName].hasOwnProperty(value)) {
						return self.renderCache[templateName][value];
					}
				}
		
				// render markup
				html = self.settings.render[templateName].apply(this, [data, escape_html]);
		
				// add mandatory attributes
				if (templateName === 'option' || templateName === 'option_create') {
					html = html.replace(regex_tag, '<$1 data-selectable');
				}
				if (templateName === 'optgroup') {
					id = data[self.settings.optgroupValueField] || '';
					html = html.replace(regex_tag, '<$1 data-group="' + escape_replace(escape_html(id)) + '"');
				}
				if (templateName === 'option' || templateName === 'item') {
					html = html.replace(regex_tag, '<$1 data-value="' + escape_replace(escape_html(value || '')) + '"');
				}
		
				// update cache
				if (cache) {
					self.renderCache[templateName][value] = html;
				}
		
				return html;
			},
		
			/**
			 * Clears the render cache for a template. If
			 * no template is given, clears all render
			 * caches.
			 *
			 * @param {string} templateName
			 */
			clearCache: function(templateName) {
				var self = this;
				if (typeof templateName === 'undefined') {
					self.renderCache = {};
				} else {
					delete self.renderCache[templateName];
				}
			},
		
			/**
			 * Determines whether or not to display the
			 * create item prompt, given a user input.
			 *
			 * @param {string} input
			 * @return {boolean}
			 */
			canCreate: function(input) {
				var self = this;
				if (!self.settings.create) return false;
				var filter = self.settings.createFilter;
				return input.length
					&& (typeof filter !== 'function' || filter.apply(self, [input]))
					&& (typeof filter !== 'string' || new RegExp(filter).test(input))
					&& (!(filter instanceof RegExp) || filter.test(input));
			}
		
		});
		
		
		Selectize.count = 0;
		Selectize.defaults = {
			options: [],
			optgroups: [],
		
			plugins: [],
			delimiter: ',',
			splitOn: null, // regexp or string for splitting up values from a paste command
			persist: true,
			diacritics: true,
			create: false,
			createOnBlur: false,
			createFilter: null,
			highlight: true,
			openOnFocus: true,
			maxOptions: 1000,
			maxItems: null,
			hideSelected: null,
			addPrecedence: false,
			selectOnTab: false,
			preload: false,
			allowEmptyOption: false,
			closeAfterSelect: false,
		
			scrollDuration: 60,
			loadThrottle: 300,
			loadingClass: 'loading',
		
			dataAttr: 'data-data',
			optgroupField: 'optgroup',
			valueField: 'value',
			labelField: 'text',
			optgroupLabelField: 'label',
			optgroupValueField: 'value',
			lockOptgroupOrder: false,
		
			sortField: '$order',
			searchField: ['text'],
			searchConjunction: 'and',
		
			mode: null,
			wrapperClass: 'selectize-control',
			inputClass: 'selectize-input',
			dropdownClass: 'selectize-dropdown',
			dropdownContentClass: 'selectize-dropdown-content',
		
			dropdownParent: null,
		
			copyClassesToDropdown: true,
		
			/*
			load                 : null, // function(query, callback) { ... }
			score                : null, // function(search) { ... }
			onInitialize         : null, // function() { ... }
			onChange             : null, // function(value) { ... }
			onItemAdd            : null, // function(value, $item) { ... }
			onItemRemove         : null, // function(value) { ... }
			onClear              : null, // function() { ... }
			onOptionAdd          : null, // function(value, data) { ... }
			onOptionRemove       : null, // function(value) { ... }
			onOptionClear        : null, // function() { ... }
			onOptionGroupAdd     : null, // function(id, data) { ... }
			onOptionGroupRemove  : null, // function(id) { ... }
			onOptionGroupClear   : null, // function() { ... }
			onDropdownOpen       : null, // function($dropdown) { ... }
			onDropdownClose      : null, // function($dropdown) { ... }
			onType               : null, // function(str) { ... }
			onDelete             : null, // function(values) { ... }
			*/
		
			render: {
				/*
				item: null,
				optgroup: null,
				optgroup_header: null,
				option: null,
				option_create: null
				*/
			}
		};
		
		
		$.fn.selectize = function(settings_user) {
			var defaults             = $.fn.selectize.defaults;
			var settings             = $.extend({}, defaults, settings_user);
			var attr_data            = settings.dataAttr;
			var field_label          = settings.labelField;
			var field_value          = settings.valueField;
			var field_optgroup       = settings.optgroupField;
			var field_optgroup_label = settings.optgroupLabelField;
			var field_optgroup_value = settings.optgroupValueField;
		
			/**
			 * Initializes selectize from a <input type="text"> element.
			 *
			 * @param {object} $input
			 * @param {object} settings_element
			 */
			var init_textbox = function($input, settings_element) {
				var i, n, values, option;
		
				var data_raw = $input.attr(attr_data);
		
				if (!data_raw) {
					var value = $.trim($input.val() || '');
					if (!settings.allowEmptyOption && !value.length) return;
					values = value.split(settings.delimiter);
					for (i = 0, n = values.length; i < n; i++) {
						option = {};
						option[field_label] = values[i];
						option[field_value] = values[i];
						settings_element.options.push(option);
					}
					settings_element.items = values;
				} else {
					settings_element.options = JSON.parse(data_raw);
					for (i = 0, n = settings_element.options.length; i < n; i++) {
						settings_element.items.push(settings_element.options[i][field_value]);
					}
				}
			};
		
			/**
			 * Initializes selectize from a <select> element.
			 *
			 * @param {object} $input
			 * @param {object} settings_element
			 */
			var init_select = function($input, settings_element) {
				var i, n, tagName, $children, order = 0;
				var options = settings_element.options;
				var optionsMap = {};
		
				var readData = function($el) {
					var data = attr_data && $el.attr(attr_data);
					if (typeof data === 'string' && data.length) {
						return JSON.parse(data);
					}
					return null;
				};
		
				var addOption = function($option, group) {
					$option = $($option);
		
					var value = hash_key($option.attr('value'));
					if (!value && !settings.allowEmptyOption) return;
		
					// if the option already exists, it's probably been
					// duplicated in another optgroup. in this case, push
					// the current group to the "optgroup" property on the
					// existing option so that it's rendered in both places.
					if (optionsMap.hasOwnProperty(value)) {
						if (group) {
							var arr = optionsMap[value][field_optgroup];
							if (!arr) {
								optionsMap[value][field_optgroup] = group;
							} else if (!$.isArray(arr)) {
								optionsMap[value][field_optgroup] = [arr, group];
							} else {
								arr.push(group);
							}
						}
						return;
					}
		
					var option             = readData($option) || {};
					option[field_label]    = option[field_label] || $option.text();
					option[field_value]    = option[field_value] || value;
					option[field_optgroup] = option[field_optgroup] || group;
		
					optionsMap[value] = option;
					options.push(option);
		
					if ($option.is(':selected')) {
						settings_element.items.push(value);
					}
				};
		
				var addGroup = function($optgroup) {
					var i, n, id, optgroup, $options;
		
					$optgroup = $($optgroup);
					id = $optgroup.attr('label');
		
					if (id) {
						optgroup = readData($optgroup) || {};
						optgroup[field_optgroup_label] = id;
						optgroup[field_optgroup_value] = id;
						settings_element.optgroups.push(optgroup);
					}
		
					$options = $('option', $optgroup);
					for (i = 0, n = $options.length; i < n; i++) {
						addOption($options[i], id);
					}
				};
		
				settings_element.maxItems = $input.attr('multiple') ? null : 1;
		
				$children = $input.children();
				for (i = 0, n = $children.length; i < n; i++) {
					tagName = $children[i].tagName.toLowerCase();
					if (tagName === 'optgroup') {
						addGroup($children[i]);
					} else if (tagName === 'option') {
						addOption($children[i]);
					}
				}
			};
		
			return this.each(function() {
				if (this.selectize) return;
		
				var instance;
				var $input = $(this);
				var tag_name = this.tagName.toLowerCase();
				var placeholder = $input.attr('placeholder') || $input.attr('data-placeholder');
				if (!placeholder && !settings.allowEmptyOption) {
					placeholder = $input.children('option[value=""]').text();
				}
		
				var settings_element = {
					'placeholder' : placeholder,
					'options'     : [],
					'optgroups'   : [],
					'items'       : []
				};
		
				if (tag_name === 'select') {
					init_select($input, settings_element);
				} else {
					init_textbox($input, settings_element);
				}
		
				instance = new Selectize($input, $.extend(true, {}, defaults, settings_element, settings_user));
			});
		};
		
		$.fn.selectize.defaults = Selectize.defaults;
		$.fn.selectize.support = {
			validity: SUPPORTS_VALIDITY_API
		};
		
		
		Selectize.define('drag_drop', function(options) {
			if (!$.fn.sortable) throw new Error('The "drag_drop" plugin requires jQuery UI "sortable".');
			if (this.settings.mode !== 'multi') return;
			var self = this;
		
			self.lock = (function() {
				var original = self.lock;
				return function() {
					var sortable = self.$control.data('sortable');
					if (sortable) sortable.disable();
					return original.apply(self, arguments);
				};
			})();
		
			self.unlock = (function() {
				var original = self.unlock;
				return function() {
					var sortable = self.$control.data('sortable');
					if (sortable) sortable.enable();
					return original.apply(self, arguments);
				};
			})();
		
			self.setup = (function() {
				var original = self.setup;
				return function() {
					original.apply(this, arguments);
		
					var $control = self.$control.sortable({
						items: '[data-value]',
						forcePlaceholderSize: true,
						disabled: self.isLocked,
						start: function(e, ui) {
							ui.placeholder.css('width', ui.helper.css('width'));
							$control.css({overflow: 'visible'});
						},
						stop: function() {
							$control.css({overflow: 'hidden'});
							var active = self.$activeItems ? self.$activeItems.slice() : null;
							var values = [];
							$control.children('[data-value]').each(function() {
								values.push($(this).attr('data-value'));
							});
							self.setValue(values);
							self.setActiveItem(active);
						}
					});
				};
			})();
		
		});
		
		Selectize.define('dropdown_header', function(options) {
			var self = this;
		
			options = $.extend({
				title         : 'Untitled',
				headerClass   : 'selectize-dropdown-header',
				titleRowClass : 'selectize-dropdown-header-title',
				labelClass    : 'selectize-dropdown-header-label',
				closeClass    : 'selectize-dropdown-header-close',
		
				html: function(data) {
					return (
						'<div class="' + data.headerClass + '">' +
							'<div class="' + data.titleRowClass + '">' +
								'<span class="' + data.labelClass + '">' + data.title + '</span>' +
								'<a href="javascript:void(0)" class="' + data.closeClass + '">&times;</a>' +
							'</div>' +
						'</div>'
					);
				}
			}, options);
		
			self.setup = (function() {
				var original = self.setup;
				return function() {
					original.apply(self, arguments);
					self.$dropdown_header = $(options.html(options));
					self.$dropdown.prepend(self.$dropdown_header);
				};
			})();
		
		});
		
		Selectize.define('optgroup_columns', function(options) {
			var self = this;
		
			options = $.extend({
				equalizeWidth  : true,
				equalizeHeight : true
			}, options);
		
			this.getAdjacentOption = function($option, direction) {
				var $options = $option.closest('[data-group]').find('[data-selectable]');
				var index    = $options.index($option) + direction;
		
				return index >= 0 && index < $options.length ? $options.eq(index) : $();
			};
		
			this.onKeyDown = (function() {
				var original = self.onKeyDown;
				return function(e) {
					var index, $option, $options, $optgroup;
		
					if (this.isOpen && (e.keyCode === KEY_LEFT || e.keyCode === KEY_RIGHT)) {
						self.ignoreHover = true;
						$optgroup = this.$activeOption.closest('[data-group]');
						index = $optgroup.find('[data-selectable]').index(this.$activeOption);
		
						if(e.keyCode === KEY_LEFT) {
							$optgroup = $optgroup.prev('[data-group]');
						} else {
							$optgroup = $optgroup.next('[data-group]');
						}
		
						$options = $optgroup.find('[data-selectable]');
						$option  = $options.eq(Math.min($options.length - 1, index));
						if ($option.length) {
							this.setActiveOption($option);
						}
						return;
					}
		
					return original.apply(this, arguments);
				};
			})();
		
			var getScrollbarWidth = function() {
				var div;
				var width = getScrollbarWidth.width;
				var doc = document;
		
				if (typeof width === 'undefined') {
					div = doc.createElement('div');
					div.innerHTML = '<div style="width:50px;height:50px;position:absolute;left:-50px;top:-50px;overflow:auto;"><div style="width:1px;height:100px;"></div></div>';
					div = div.firstChild;
					doc.body.appendChild(div);
					width = getScrollbarWidth.width = div.offsetWidth - div.clientWidth;
					doc.body.removeChild(div);
				}
				return width;
			};
		
			var equalizeSizes = function() {
				var i, n, height_max, width, width_last, width_parent, $optgroups;
		
				$optgroups = $('[data-group]', self.$dropdown_content);
				n = $optgroups.length;
				if (!n || !self.$dropdown_content.width()) return;
		
				if (options.equalizeHeight) {
					height_max = 0;
					for (i = 0; i < n; i++) {
						height_max = Math.max(height_max, $optgroups.eq(i).height());
					}
					$optgroups.css({height: height_max});
				}
		
				if (options.equalizeWidth) {
					width_parent = self.$dropdown_content.innerWidth() - getScrollbarWidth();
					width = Math.round(width_parent / n);
					$optgroups.css({width: width});
					if (n > 1) {
						width_last = width_parent - width * (n - 1);
						$optgroups.eq(n - 1).css({width: width_last});
					}
				}
			};
		
			if (options.equalizeHeight || options.equalizeWidth) {
				hook.after(this, 'positionDropdown', equalizeSizes);
				hook.after(this, 'refreshOptions', equalizeSizes);
			}
		
		
		});
		
		Selectize.define('remove_button', function(options) {
			if (this.settings.mode === 'single') return;
		
			options = $.extend({
				label     : '&times;',
				title     : 'Remove',
				className : 'remove',
				append    : true
			}, options);
		
			var self = this;
			var html = '<a href="javascript:void(0)" class="' + options.className + '" tabindex="-1" title="' + escape_html(options.title) + '">' + options.label + '</a>';
		
			/**
			 * Appends an element as a child (with raw HTML).
			 *
			 * @param {string} html_container
			 * @param {string} html_element
			 * @return {string}
			 */
			var append = function(html_container, html_element) {
				var pos = html_container.search(/(<\/[^>]+>\s*)$/);
				return html_container.substring(0, pos) + html_element + html_container.substring(pos);
			};
		
			this.setup = (function() {
				var original = self.setup;
				return function() {
					// override the item rendering method to add the button to each
					if (options.append) {
						var render_item = self.settings.render.item;
						self.settings.render.item = function(data) {
							return append(render_item.apply(this, arguments), html);
						};
					}
		
					original.apply(this, arguments);
		
					// add event listener
					this.$control.on('click', '.' + options.className, function(e) {
						e.preventDefault();
						if (self.isLocked) return;
		
						var $item = $(e.currentTarget).parent();
						self.setActiveItem($item);
						if (self.deleteSelection()) {
							self.setCaret(self.items.length);
						}
					});
		
				};
			})();
		
		});
		
		Selectize.define('restore_on_backspace', function(options) {
			var self = this;
		
			options.text = options.text || function(option) {
				return option[this.settings.labelField];
			};
		
			this.onKeyDown = (function() {
				var original = self.onKeyDown;
				return function(e) {
					var index, option;
					if (e.keyCode === KEY_BACKSPACE && this.$control_input.val() === '' && !this.$activeItems.length) {
						index = this.caretPos - 1;
						if (index >= 0 && index < this.items.length) {
							option = this.options[this.items[index]];
							if (this.deleteSelection(e)) {
								this.setTextboxValue(options.text.apply(this, [option]));
								this.refreshOptions(true);
							}
							e.preventDefault();
							return;
						}
					}
					return original.apply(this, arguments);
				};
			})();
		});
		

		return Selectize;
	}));
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(82)))

/***/ },

/***/ 133:
/***/ function(module, exports) {

	// removed by extract-text-webpack-plugin

/***/ },

/***/ 137:
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(__webpack_provided_window_dot_jQuery) {/*!
	 * iCheck v1.0.2, http://git.io/arlzeA
	 * ===================================
	 * Powerful jQuery and Zepto plugin for checkboxes and radio buttons customization
	 *
	 * (c) 2013 Damir Sultanov, http://fronteed.com
	 * MIT Licensed
	 */

	(function($) {

	  // Cached vars
	  var _iCheck = 'iCheck',
	    _iCheckHelper = _iCheck + '-helper',
	    _checkbox = 'checkbox',
	    _radio = 'radio',
	    _checked = 'checked',
	    _unchecked = 'un' + _checked,
	    _disabled = 'disabled',a
	    _determinate = 'determinate',
	    _indeterminate = 'in' + _determinate,
	    _update = 'update',
	    _type = 'type',
	    _click = 'click',
	    _touch = 'touchbegin.i touchend.i',
	    _add = 'addClass',
	    _remove = 'removeClass',
	    _callback = 'trigger',
	    _label = 'label',
	    _cursor = 'cursor',
	    _mobile = /ipad|iphone|ipod|android|blackberry|windows phone|opera mini|silk/i.test(navigator.userAgent);

	  // Plugin init
	  $.fn[_iCheck] = function(options, fire) {

	    // Walker
	    var handle = 'input[type="' + _checkbox + '"], input[type="' + _radio + '"]',
	      stack = $(),
	      walker = function(object) {
	        object.each(function() {
	          var self = $(this);

	          if (self.is(handle)) {
	            stack = stack.add(self);
	          } else {
	            stack = stack.add(self.find(handle));
	          }
	        });
	      };

	    // Check if we should operate with some method
	    if (/^(check|uncheck|toggle|indeterminate|determinate|disable|enable|update|destroy)$/i.test(options)) {

	      // Normalize method's name
	      options = options.toLowerCase();

	      // Find checkboxes and radio buttons
	      walker(this);

	      return stack.each(function() {
	        var self = $(this);

	        if (options == 'destroy') {
	          tidy(self, 'ifDestroyed');
	        } else {
	          operate(self, true, options);
	        }

	        // Fire method's callback
	        if ($.isFunction(fire)) {
	          fire();
	        }
	      });

	    // Customization
	    } else if (typeof options == 'object' || !options) {

	      // Check if any options were passed
	      var settings = $.extend({
	          checkedClass: _checked,
	          disabledClass: _disabled,
	          indeterminateClass: _indeterminate,
	          labelHover: true
	        }, options),

	        selector = settings.handle,
	        hoverClass = settings.hoverClass || 'hover',
	        focusClass = settings.focusClass || 'focus',
	        activeClass = settings.activeClass || 'active',
	        labelHover = !!settings.labelHover,
	        labelHoverClass = settings.labelHoverClass || 'hover',

	        // Setup clickable area
	        area = ('' + settings.increaseArea).replace('%', '') | 0;

	      // Selector limit
	      if (selector == _checkbox || selector == _radio) {
	        handle = 'input[type="' + selector + '"]';
	      }

	      // Clickable area limit
	      if (area < -50) {
	        area = -50;
	      }

	      // Walk around the selector
	      walker(this);

	      return stack.each(function() {
	        var self = $(this);

	        // If already customized
	        tidy(self);

	        var node = this,
	          id = node.id,

	          // Layer styles
	          offset = -area + '%',
	          size = 100 + (area * 2) + '%',
	          layer = {
	            position: 'absolute',
	            top: offset,
	            left: offset,
	            display: 'block',
	            width: size,
	            height: size,
	            margin: 0,
	            padding: 0,
	            background: '#fff',
	            border: 0,
	            opacity: 0
	          },

	          // Choose how to hide input
	          hide = _mobile ? {
	            position: 'absolute',
	            visibility: 'hidden'
	          } : area ? layer : {
	            position: 'absolute',
	            opacity: 0
	          },

	          // Get proper class
	          className = node[_type] == _checkbox ? settings.checkboxClass || 'i' + _checkbox : settings.radioClass || 'i' + _radio,

	          // Find assigned labels
	          label = $(_label + '[for="' + id + '"]').add(self.closest(_label)),

	          // Check ARIA option
	          aria = !!settings.aria,

	          // Set ARIA placeholder
	          ariaID = _iCheck + '-' + Math.random().toString(36).substr(2,6),

	          // Parent & helper
	          parent = '<div class="' + className + '" ' + (aria ? 'role="' + node[_type] + '" ' : ''),
	          helper;

	        // Set ARIA "labelledby"
	        if (aria) {
	          label.each(function() {
	            parent += 'aria-labelledby="';

	            if (this.id) {
	              parent += this.id;
	            } else {
	              this.id = ariaID;
	              parent += ariaID;
	            }

	            parent += '"';
	          });
	        }

	        // Wrap input
	        parent = self.wrap(parent + '/>')[_callback]('ifCreated').parent().append(settings.insert);

	        // Layer addition
	        helper = $('<ins class="' + _iCheckHelper + '"/>').css(layer).appendTo(parent);

	        // Finalize customization
	        self.data(_iCheck, {o: settings, s: self.attr('style')}).css(hide);
	        !!settings.inheritClass && parent[_add](node.className || '');
	        !!settings.inheritID && id && parent.attr('id', _iCheck + '-' + id);
	        parent.css('position') == 'static' && parent.css('position', 'relative');
	        operate(self, true, _update);

	        // Label events
	        if (label.length) {
	          label.on(_click + '.i mouseover.i mouseout.i ' + _touch, function(event) {
	            var type = event[_type],
	              item = $(this);

	            // Do nothing if input is disabled
	            if (!node[_disabled]) {

	              // Click
	              if (type == _click) {
	                if ($(event.target).is('a')) {
	                  return;
	                }
	                operate(self, false, true);

	              // Hover state
	              } else if (labelHover) {

	                // mouseout|touchend
	                if (/ut|nd/.test(type)) {
	                  parent[_remove](hoverClass);
	                  item[_remove](labelHoverClass);
	                } else {
	                  parent[_add](hoverClass);
	                  item[_add](labelHoverClass);
	                }
	              }

	              if (_mobile) {
	                event.stopPropagation();
	              } else {
	                return false;
	              }
	            }
	          });
	        }

	        // Input events
	        self.on(_click + '.i focus.i blur.i keyup.i keydown.i keypress.i', function(event) {
	          var type = event[_type],
	            key = event.keyCode;

	          // Click
	          if (type == _click) {
	            return false;

	          // Keydown
	          } else if (type == 'keydown' && key == 32) {
	            if (!(node[_type] == _radio && node[_checked])) {
	              if (node[_checked]) {
	                off(self, _checked);
	              } else {
	                on(self, _checked);
	              }
	            }

	            return false;

	          // Keyup
	          } else if (type == 'keyup' && node[_type] == _radio) {
	            !node[_checked] && on(self, _checked);

	          // Focus/blur
	          } else if (/us|ur/.test(type)) {
	            parent[type == 'blur' ? _remove : _add](focusClass);
	          }
	        });

	        // Helper events
	        helper.on(_click + ' mousedown mouseup mouseover mouseout ' + _touch, function(event) {
	          var type = event[_type],

	            // mousedown|mouseup
	            toggle = /wn|up/.test(type) ? activeClass : hoverClass;

	          // Do nothing if input is disabled
	          if (!node[_disabled]) {

	            // Click
	            if (type == _click) {
	              operate(self, false, true);

	            // Active and hover states
	            } else {

	              // State is on
	              if (/wn|er|in/.test(type)) {

	                // mousedown|mouseover|touchbegin
	                parent[_add](toggle);

	              // State is off
	              } else {
	                parent[_remove](toggle + ' ' + activeClass);
	              }

	              // Label hover
	              if (label.length && labelHover && toggle == hoverClass) {

	                // mouseout|touchend
	                label[/ut|nd/.test(type) ? _remove : _add](labelHoverClass);
	              }
	            }

	            if (_mobile) {
	              event.stopPropagation();
	            } else {
	              return false;
	            }
	          }
	        });
	      });
	    } else {
	      return this;
	    }
	  };

	  // Do something with inputs
	  function operate(input, direct, method) {
	    var node = input[0],
	      state = /er/.test(method) ? _indeterminate : /bl/.test(method) ? _disabled : _checked,
	      active = method == _update ? {
	        checked: node[_checked],
	        disabled: node[_disabled],
	        indeterminate: input.attr(_indeterminate) == 'true' || input.attr(_determinate) == 'false'
	      } : node[state];

	    // Check, disable or indeterminate
	    if (/^(ch|di|in)/.test(method) && !active) {
	      on(input, state);

	    // Uncheck, enable or determinate
	    } else if (/^(un|en|de)/.test(method) && active) {
	      off(input, state);

	    // Update
	    } else if (method == _update) {

	      // Handle states
	      for (var each in active) {
	        if (active[each]) {
	          on(input, each, true);
	        } else {
	          off(input, each, true);
	        }
	      }

	    } else if (!direct || method == 'toggle') {

	      // Helper or label was clicked
	      if (!direct) {
	        input[_callback]('ifClicked');
	      }

	      // Toggle checked state
	      if (active) {
	        if (node[_type] !== _radio) {
	          off(input, state);
	        }
	      } else {
	        on(input, state);
	      }
	    }
	  }

	  // Add checked, disabled or indeterminate state
	  function on(input, state, keep) {
	    var node = input[0],
	      parent = input.parent(),
	      checked = state == _checked,
	      indeterminate = state == _indeterminate,
	      disabled = state == _disabled,
	      callback = indeterminate ? _determinate : checked ? _unchecked : 'enabled',
	      regular = option(input, callback + capitalize(node[_type])),
	      specific = option(input, state + capitalize(node[_type]));

	    // Prevent unnecessary actions
	    if (node[state] !== true) {

	      // Toggle assigned radio buttons
	      if (!keep && state == _checked && node[_type] == _radio && node.name) {
	        var form = input.closest('form'),
	          inputs = 'input[name="' + node.name + '"]';

	        inputs = form.length ? form.find(inputs) : $(inputs);

	        inputs.each(function() {
	          if (this !== node && $(this).data(_iCheck)) {
	            off($(this), state);
	          }
	        });
	      }

	      // Indeterminate state
	      if (indeterminate) {

	        // Add indeterminate state
	        node[state] = true;

	        // Remove checked state
	        if (node[_checked]) {
	          off(input, _checked, 'force');
	        }

	      // Checked or disabled state
	      } else {

	        // Add checked or disabled state
	        if (!keep) {
	          node[state] = true;
	        }

	        // Remove indeterminate state
	        if (checked && node[_indeterminate]) {
	          off(input, _indeterminate, false);
	        }
	      }

	      // Trigger callbacks
	      callbacks(input, checked, state, keep);
	    }

	    // Add proper cursor
	    if (node[_disabled] && !!option(input, _cursor, true)) {
	      parent.find('.' + _iCheckHelper).css(_cursor, 'default');
	    }

	    // Add state class
	    parent[_add](specific || option(input, state) || '');

	    // Set ARIA attribute
	    if (!!parent.attr('role') && !indeterminate) {
	      parent.attr('aria-' + (disabled ? _disabled : _checked), 'true');
	    }

	    // Remove regular state class
	    parent[_remove](regular || option(input, callback) || '');
	  }

	  // Remove checked, disabled or indeterminate state
	  function off(input, state, keep) {
	    var node = input[0],
	      parent = input.parent(),
	      checked = state == _checked,
	      indeterminate = state == _indeterminate,
	      disabled = state == _disabled,
	      callback = indeterminate ? _determinate : checked ? _unchecked : 'enabled',
	      regular = option(input, callback + capitalize(node[_type])),
	      specific = option(input, state + capitalize(node[_type]));

	    // Prevent unnecessary actions
	    if (node[state] !== false) {

	      // Toggle state
	      if (indeterminate || !keep || keep == 'force') {
	        node[state] = false;
	      }

	      // Trigger callbacks
	      callbacks(input, checked, callback, keep);
	    }

	    // Add proper cursor
	    if (!node[_disabled] && !!option(input, _cursor, true)) {
	      parent.find('.' + _iCheckHelper).css(_cursor, 'pointer');
	    }

	    // Remove state class
	    parent[_remove](specific || option(input, state) || '');

	    // Set ARIA attribute
	    if (!!parent.attr('role') && !indeterminate) {
	      parent.attr('aria-' + (disabled ? _disabled : _checked), 'false');
	    }

	    // Add regular state class
	    parent[_add](regular || option(input, callback) || '');
	  }

	  // Remove all traces
	  function tidy(input, callback) {
	    if (input.data(_iCheck)) {

	      // Remove everything except input
	      input.parent().html(input.attr('style', input.data(_iCheck).s || ''));

	      // Callback
	      if (callback) {
	        input[_callback](callback);
	      }

	      // Unbind events
	      input.off('.i').unwrap();
	      $(_label + '[for="' + input[0].id + '"]').add(input.closest(_label)).off('.i');
	    }
	  }

	  // Get some option
	  function option(input, state, regular) {
	    if (input.data(_iCheck)) {
	      return input.data(_iCheck).o[state + (regular ? '' : 'Class')];
	    }
	  }

	  // Capitalize some string
	  function capitalize(string) {
	    return string.charAt(0).toUpperCase() + string.slice(1);
	  }

	  // Executable handlers
	  function callbacks(input, checked, callback, keep) {
	    if (!keep) {
	      if (checked) {
	        input[_callback]('ifToggled');
	      }

	      input[_callback]('ifChanged')[_callback]('if' + capitalize(callback));
	    }
	  }
	})(__webpack_provided_window_dot_jQuery || window.Zepto);

	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(82)))

/***/ },

/***/ 138:
/***/ function(module, exports) {

	// removed by extract-text-webpack-plugin

/***/ },

/***/ 140:
/***/ function(module, exports) {

	/* =========================================================
	 * bootstrap-treeview.js v1.2.0
	 * =========================================================
	 * Copyright 2013 Jonathan Miles
	 * Project URL : http://www.jondmiles.com/bootstrap-treeview
	 *
	 * Licensed under the Apache License, Version 2.0 (the "License");
	 * you may not use this file except in compliance with the License.
	 * You may obtain a copy of the License at
	 *
	 * http://www.apache.org/licenses/LICENSE-2.0
	 *
	 * Unless required by applicable law or agreed to in writing, software
	 * distributed under the License is distributed on an "AS IS" BASIS,
	 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
	 * See the License for the specific language governing permissions and
	 * limitations under the License.
	 * ========================================================= */

	;(function ($, window, document, undefined) {

		/*global jQuery, console*/

		'use strict';

		var pluginName = 'treeview';

		var _default = {};

		_default.settings = {

			injectStyle: true,

			levels: 2,

			expandIcon: 'glyphicon glyphicon-plus',
			collapseIcon: 'glyphicon glyphicon-minus',
			emptyIcon: 'glyphicon',
			nodeIcon: '',
			selectedIcon: '',
			checkedIcon: 'glyphicon glyphicon-check',
			uncheckedIcon: 'glyphicon glyphicon-unchecked',

			color: undefined, // '#000000',
			backColor: undefined, // '#FFFFFF',
			borderColor: undefined, // '#dddddd',
			onhoverColor: '#F5F5F5',
			selectedColor: '#FFFFFF',
			selectedBackColor: '#428bca',
			searchResultColor: '#D9534F',
			searchResultBackColor: undefined, //'#FFFFFF',

			enableLinks: false,
			highlightSelected: true,
			highlightSearchResults: true,
			showBorder: true,
			showIcon: true,
			showCheckbox: false,
			showTags: false,
			multiSelect: false,

			// Event handlers
			onNodeChecked: undefined,
			onNodeCollapsed: undefined,
			onNodeDisabled: undefined,
			onNodeEnabled: undefined,
			onNodeExpanded: undefined,
			onNodeSelected: undefined,
			onNodeUnchecked: undefined,
			onNodeUnselected: undefined,
			onSearchComplete: undefined,
			onSearchCleared: undefined
		};

		_default.options = {
			silent: false,
			ignoreChildren: false
		};

		_default.searchOptions = {
			ignoreCase: true,
			exactMatch: false,
			revealResults: true
		};

		var Tree = function (element, options) {

			this.$element = $(element);
			this.elementId = element.id;
			this.styleId = this.elementId + '-style';

			this.init(options);

			return {

				// Options (public access)
				options: this.options,

				// Initialize / destroy methods
				init: $.proxy(this.init, this),
				remove: $.proxy(this.remove, this),

				// Get methods
				getNode: $.proxy(this.getNode, this),
				getParent: $.proxy(this.getParent, this),
				getSiblings: $.proxy(this.getSiblings, this),
				getSelected: $.proxy(this.getSelected, this),
				getUnselected: $.proxy(this.getUnselected, this),
				getExpanded: $.proxy(this.getExpanded, this),
				getCollapsed: $.proxy(this.getCollapsed, this),
				getChecked: $.proxy(this.getChecked, this),
				getUnchecked: $.proxy(this.getUnchecked, this),
				getDisabled: $.proxy(this.getDisabled, this),
				getEnabled: $.proxy(this.getEnabled, this),

				// Select methods
				selectNode: $.proxy(this.selectNode, this),
				unselectNode: $.proxy(this.unselectNode, this),
				toggleNodeSelected: $.proxy(this.toggleNodeSelected, this),

				// Expand / collapse methods
				collapseAll: $.proxy(this.collapseAll, this),
				collapseNode: $.proxy(this.collapseNode, this),
				expandAll: $.proxy(this.expandAll, this),
				expandNode: $.proxy(this.expandNode, this),
				toggleNodeExpanded: $.proxy(this.toggleNodeExpanded, this),
				revealNode: $.proxy(this.revealNode, this),

				// Expand / collapse methods
				checkAll: $.proxy(this.checkAll, this),
				checkNode: $.proxy(this.checkNode, this),
				uncheckAll: $.proxy(this.uncheckAll, this),
				uncheckNode: $.proxy(this.uncheckNode, this),
				toggleNodeChecked: $.proxy(this.toggleNodeChecked, this),

				// Disable / enable methods
				disableAll: $.proxy(this.disableAll, this),
				disableNode: $.proxy(this.disableNode, this),
				enableAll: $.proxy(this.enableAll, this),
				enableNode: $.proxy(this.enableNode, this),
				toggleNodeDisabled: $.proxy(this.toggleNodeDisabled, this),

				// Search methods
				search: $.proxy(this.search, this),
				clearSearch: $.proxy(this.clearSearch, this)
			};
		};

		Tree.prototype.init = function (options) {

			this.tree = [];
			this.nodes = [];

			if (options.data) {
				if (typeof options.data === 'string') {
					options.data = $.parseJSON(options.data);
				}
				this.tree = $.extend(true, [], options.data);
				delete options.data;
			}
			this.options = $.extend({}, _default.settings, options);

			this.destroy();
			this.subscribeEvents();
			this.setInitialStates({ nodes: this.tree }, 0);
			this.render();
		};

		Tree.prototype.remove = function () {
			this.destroy();
			$.removeData(this, pluginName);
			$('#' + this.styleId).remove();
		};

		Tree.prototype.destroy = function () {

			if (!this.initialized) return;

			this.$wrapper.remove();
			this.$wrapper = null;

			// Switch off events
			this.unsubscribeEvents();

			// Reset this.initialized flag
			this.initialized = false;
		};

		Tree.prototype.unsubscribeEvents = function () {

			this.$element.off('click');
			this.$element.off('nodeChecked');
			this.$element.off('nodeCollapsed');
			this.$element.off('nodeDisabled');
			this.$element.off('nodeEnabled');
			this.$element.off('nodeExpanded');
			this.$element.off('nodeSelected');
			this.$element.off('nodeUnchecked');
			this.$element.off('nodeUnselected');
			this.$element.off('searchComplete');
			this.$element.off('searchCleared');
		};

		Tree.prototype.subscribeEvents = function () {

			this.unsubscribeEvents();

			this.$element.on('click', $.proxy(this.clickHandler, this));

			if (typeof (this.options.onNodeChecked) === 'function') {
				this.$element.on('nodeChecked', this.options.onNodeChecked);
			}

			if (typeof (this.options.onNodeCollapsed) === 'function') {
				this.$element.on('nodeCollapsed', this.options.onNodeCollapsed);
			}

			if (typeof (this.options.onNodeDisabled) === 'function') {
				this.$element.on('nodeDisabled', this.options.onNodeDisabled);
			}

			if (typeof (this.options.onNodeEnabled) === 'function') {
				this.$element.on('nodeEnabled', this.options.onNodeEnabled);
			}

			if (typeof (this.options.onNodeExpanded) === 'function') {
				this.$element.on('nodeExpanded', this.options.onNodeExpanded);
			}

			if (typeof (this.options.onNodeSelected) === 'function') {
				this.$element.on('nodeSelected', this.options.onNodeSelected);
			}

			if (typeof (this.options.onNodeUnchecked) === 'function') {
				this.$element.on('nodeUnchecked', this.options.onNodeUnchecked);
			}

			if (typeof (this.options.onNodeUnselected) === 'function') {
				this.$element.on('nodeUnselected', this.options.onNodeUnselected);
			}

			if (typeof (this.options.onSearchComplete) === 'function') {
				this.$element.on('searchComplete', this.options.onSearchComplete);
			}

			if (typeof (this.options.onSearchCleared) === 'function') {
				this.$element.on('searchCleared', this.options.onSearchCleared);
			}
		};

		/*
			Recurse the tree structure and ensure all nodes have
			valid initial states.  User defined states will be preserved.
			For performance we also take this opportunity to
			index nodes in a flattened structure
		*/
		Tree.prototype.setInitialStates = function (node, level) {

			if (!node.nodes) return;
			level += 1;

			var parent = node;
			var _this = this;
			$.each(node.nodes, function checkStates(index, node) {

				// nodeId : unique, incremental identifier
				node.nodeId = _this.nodes.length;

				// parentId : transversing up the tree
				node.parentId = parent.nodeId;

				// if not provided set selectable default value
				if (!node.hasOwnProperty('selectable')) {
					node.selectable = true;
				}

				// where provided we should preserve states
				node.state = node.state || {};

				// set checked state; unless set always false
				if (!node.state.hasOwnProperty('checked')) {
					node.state.checked = false;
				}

				// set enabled state; unless set always false
				if (!node.state.hasOwnProperty('disabled')) {
					node.state.disabled = false;
				}

				// set expanded state; if not provided based on levels
				if (!node.state.hasOwnProperty('expanded')) {
					if (!node.state.disabled &&
							(level < _this.options.levels) &&
							(node.nodes && node.nodes.length > 0)) {
						node.state.expanded = true;
					}
					else {
						node.state.expanded = false;
					}
				}

				// set selected state; unless set always false
				if (!node.state.hasOwnProperty('selected')) {
					node.state.selected = false;
				}

				// index nodes in a flattened structure for use later
				_this.nodes.push(node);

				// recurse child nodes and transverse the tree
				if (node.nodes) {
					_this.setInitialStates(node, level);
				}
			});
		};

		Tree.prototype.clickHandler = function (event) {

			if (!this.options.enableLinks) event.preventDefault();

			var target = $(event.target);
			var node = this.findNode(target);
			if (!node || node.state.disabled) return;
			
			var classList = target.attr('class') ? target.attr('class').split(' ') : [];
			if ((classList.indexOf('expand-icon') !== -1)) {

				this.toggleExpandedState(node, _default.options);
				this.render();
			}
			else if ((classList.indexOf('check-icon') !== -1)) {
				
				this.toggleCheckedState(node, _default.options);
				this.render();
			}
			else {
				
				if (node.selectable) {
					this.toggleSelectedState(node, _default.options);
				} else {
					this.toggleExpandedState(node, _default.options);
				}

				this.render();
			}
		};

		// Looks up the DOM for the closest parent list item to retrieve the
		// data attribute nodeid, which is used to lookup the node in the flattened structure.
		Tree.prototype.findNode = function (target) {

			var nodeId = target.closest('li.list-group-item').attr('data-nodeid');
			var node = this.nodes[nodeId];

			if (!node) {
				console.log('Error: node does not exist');
			}
			return node;
		};

		Tree.prototype.toggleExpandedState = function (node, options) {
			if (!node) return;
			this.setExpandedState(node, !node.state.expanded, options);
		};

		Tree.prototype.setExpandedState = function (node, state, options) {

			if (state === node.state.expanded) return;

			if (state && node.nodes) {

				// Expand a node
				node.state.expanded = true;
				if (!options.silent) {
					this.$element.trigger('nodeExpanded', $.extend(true, {}, node));
				}
			}
			else if (!state) {

				// Collapse a node
				node.state.expanded = false;
				if (!options.silent) {
					this.$element.trigger('nodeCollapsed', $.extend(true, {}, node));
				}

				// Collapse child nodes
				if (node.nodes && !options.ignoreChildren) {
					$.each(node.nodes, $.proxy(function (index, node) {
						this.setExpandedState(node, false, options);
					}, this));
				}
			}
		};

		Tree.prototype.toggleSelectedState = function (node, options) {
			if (!node) return;
			this.setSelectedState(node, !node.state.selected, options);
		};

		Tree.prototype.setSelectedState = function (node, state, options) {

			if (state === node.state.selected) return;

			if (state) {

				// If multiSelect false, unselect previously selected
				if (!this.options.multiSelect) {
					$.each(this.findNodes('true', 'g', 'state.selected'), $.proxy(function (index, node) {
						this.setSelectedState(node, false, options);
					}, this));
				}

				// Continue selecting node
				node.state.selected = true;
				if (!options.silent) {
					this.$element.trigger('nodeSelected', $.extend(true, {}, node));
				}
			}
			else {

				// Unselect node
				node.state.selected = false;
				if (!options.silent) {
					this.$element.trigger('nodeUnselected', $.extend(true, {}, node));
				}
			}
		};

		Tree.prototype.toggleCheckedState = function (node, options) {
			if (!node) return;
			this.setCheckedState(node, !node.state.checked, options);
		};

		Tree.prototype.setCheckedState = function (node, state, options) {

			if (state === node.state.checked) return;

			if (state) {

				// Check node
				node.state.checked = true;

				if (!options.silent) {
					this.$element.trigger('nodeChecked', $.extend(true, {}, node));
				}
			}
			else {

				// Uncheck node
				node.state.checked = false;
				if (!options.silent) {
					this.$element.trigger('nodeUnchecked', $.extend(true, {}, node));
				}
			}
		};

		Tree.prototype.setDisabledState = function (node, state, options) {

			if (state === node.state.disabled) return;

			if (state) {

				// Disable node
				node.state.disabled = true;

				// Disable all other states
				this.setExpandedState(node, false, options);
				this.setSelectedState(node, false, options);
				this.setCheckedState(node, false, options);

				if (!options.silent) {
					this.$element.trigger('nodeDisabled', $.extend(true, {}, node));
				}
			}
			else {

				// Enabled node
				node.state.disabled = false;
				if (!options.silent) {
					this.$element.trigger('nodeEnabled', $.extend(true, {}, node));
				}
			}
		};

		Tree.prototype.render = function () {

			if (!this.initialized) {

				// Setup first time only components
				this.$element.addClass(pluginName);
				this.$wrapper = $(this.template.list);

				this.injectStyle();

				this.initialized = true;
			}

			this.$element.empty().append(this.$wrapper.empty());

			// Build tree
			this.buildTree(this.tree, 0);
		};

		// Starting from the root node, and recursing down the
		// structure we build the tree one node at a time
		Tree.prototype.buildTree = function (nodes, level) {

			if (!nodes) return;
			level += 1;

			var _this = this;
			$.each(nodes, function addNodes(id, node) {

				var treeItem = $(_this.template.item)
					.addClass('node-' + _this.elementId)
					.addClass(node.state.checked ? 'node-checked' : '')
					.addClass(node.state.disabled ? 'node-disabled': '')
					.addClass(node.state.selected ? 'node-selected' : '')
					.addClass(node.searchResult ? 'search-result' : '') 
					.attr('data-nodeid', node.nodeId)
					.attr('style', _this.buildStyleOverride(node));

				// Add indent/spacer to mimic tree structure
				for (var i = 0; i < (level - 1); i++) {
					treeItem.append(_this.template.indent);
				}

				// Add expand, collapse or empty spacer icons
				var classList = [];
				if (node.nodes) {
					classList.push('expand-icon');
					if (node.state.expanded) {
						classList.push(_this.options.collapseIcon);
					}
					else {
						classList.push(_this.options.expandIcon);
					}
				}
				else {
					classList.push(_this.options.emptyIcon);
				}

				treeItem
					.append($(_this.template.icon)
						.addClass(classList.join(' '))
					);


				// Add node icon
				if (_this.options.showIcon) {
					
					var classList = ['node-icon'];

					classList.push(node.icon || _this.options.nodeIcon);
					if (node.state.selected) {
						classList.pop();
						classList.push(node.selectedIcon || _this.options.selectedIcon || 
										node.icon || _this.options.nodeIcon);
					}

					treeItem
						.append($(_this.template.icon)
							.addClass(classList.join(' '))
						);
				}

				// Add check / unchecked icon
				if (_this.options.showCheckbox) {

					var classList = ['check-icon'];
					if (node.state.checked) {
						classList.push(_this.options.checkedIcon); 
					}
					else {
						classList.push(_this.options.uncheckedIcon);
					}

					treeItem
						.append($(_this.template.icon)
							.addClass(classList.join(' '))
						);
				}

				// Add text
				if (_this.options.enableLinks) {
					// Add hyperlink
					treeItem
						.append($(_this.template.link)
							.attr('href', node.href)
							.append(node.text)
						);
				}
				else {
					// otherwise just text
					treeItem
						.append(node.text);
				}

				// Add tags as badges
				if (_this.options.showTags && node.tags) {
					$.each(node.tags, function addTag(id, tag) {
						treeItem
							.append($(_this.template.badge)
								.append(tag)
							);
					});
				}

				// Add item to the tree
				_this.$wrapper.append(treeItem);

				// Recursively add child ndoes
				if (node.nodes && node.state.expanded && !node.state.disabled) {
					return _this.buildTree(node.nodes, level);
				}
			});
		};

		// Define any node level style override for
		// 1. selectedNode
		// 2. node|data assigned color overrides
		Tree.prototype.buildStyleOverride = function (node) {

			if (node.state.disabled) return '';

			var color = node.color;
			var backColor = node.backColor;

			if (this.options.highlightSelected && node.state.selected) {
				if (this.options.selectedColor) {
					color = this.options.selectedColor;
				}
				if (this.options.selectedBackColor) {
					backColor = this.options.selectedBackColor;
				}
			}

			if (this.options.highlightSearchResults && node.searchResult && !node.state.disabled) {
				if (this.options.searchResultColor) {
					color = this.options.searchResultColor;
				}
				if (this.options.searchResultBackColor) {
					backColor = this.options.searchResultBackColor;
				}
			}

			return 'color:' + color +
				';background-color:' + backColor + ';';
		};

		// Add inline style into head
		Tree.prototype.injectStyle = function () {

			if (this.options.injectStyle && !document.getElementById(this.styleId)) {
				$('<style type="text/css" id="' + this.styleId + '"> ' + this.buildStyle() + ' </style>').appendTo('head');
			}
		};

		// Construct trees style based on user options
		Tree.prototype.buildStyle = function () {

			var style = '.node-' + this.elementId + '{';

			if (this.options.color) {
				style += 'color:' + this.options.color + ';';
			}

			if (this.options.backColor) {
				style += 'background-color:' + this.options.backColor + ';';
			}

			if (!this.options.showBorder) {
				style += 'border:none;';
			}
			else if (this.options.borderColor) {
				style += 'border:1px solid ' + this.options.borderColor + ';';
			}
			style += '}';

			if (this.options.onhoverColor) {
				style += '.node-' + this.elementId + ':not(.node-disabled):hover{' +
					'background-color:' + this.options.onhoverColor + ';' +
				'}';
			}

			return this.css + style;
		};

		Tree.prototype.template = {
			list: '<ul class="list-group"></ul>',
			item: '<li class="list-group-item"></li>',
			indent: '<span class="indent"></span>',
			icon: '<span class="icon"></span>',
			link: '<a href="#" style="color:inherit;"></a>',
			badge: '<span class="badge"></span>'
		};

		Tree.prototype.css = '.treeview .list-group-item{cursor:pointer}.treeview span.indent{margin-left:10px;margin-right:10px}.treeview span.icon{width:12px;margin-right:5px}.treeview .node-disabled{color:silver;cursor:not-allowed}'


		/**
			Returns a single node object that matches the given node id.
			@param {Number} nodeId - A node's unique identifier
			@return {Object} node - Matching node
		*/
		Tree.prototype.getNode = function (nodeId) {
			return this.nodes[nodeId];
		};

		/**
			Returns the parent node of a given node, if valid otherwise returns undefined.
			@param {Object|Number} identifier - A valid node or node id
			@returns {Object} node - The parent node
		*/
		Tree.prototype.getParent = function (identifier) {
			var node = this.identifyNode(identifier);
			return this.nodes[node.parentId];
		};

		/**
			Returns an array of sibling nodes for a given node, if valid otherwise returns undefined.
			@param {Object|Number} identifier - A valid node or node id
			@returns {Array} nodes - Sibling nodes
		*/
		Tree.prototype.getSiblings = function (identifier) {
			var node = this.identifyNode(identifier);
			var parent = this.getParent(node);
			var nodes = parent ? parent.nodes : this.tree;
			return nodes.filter(function (obj) {
					return obj.nodeId !== node.nodeId;
				});
		};

		/**
			Returns an array of selected nodes.
			@returns {Array} nodes - Selected nodes
		*/
		Tree.prototype.getSelected = function () {
			return this.findNodes('true', 'g', 'state.selected');
		};

		/**
			Returns an array of unselected nodes.
			@returns {Array} nodes - Unselected nodes
		*/
		Tree.prototype.getUnselected = function () {
			return this.findNodes('false', 'g', 'state.selected');
		};

		/**
			Returns an array of expanded nodes.
			@returns {Array} nodes - Expanded nodes
		*/
		Tree.prototype.getExpanded = function () {
			return this.findNodes('true', 'g', 'state.expanded');
		};

		/**
			Returns an array of collapsed nodes.
			@returns {Array} nodes - Collapsed nodes
		*/
		Tree.prototype.getCollapsed = function () {
			return this.findNodes('false', 'g', 'state.expanded');
		};

		/**
			Returns an array of checked nodes.
			@returns {Array} nodes - Checked nodes
		*/
		Tree.prototype.getChecked = function () {
			return this.findNodes('true', 'g', 'state.checked');
		};

		/**
			Returns an array of unchecked nodes.
			@returns {Array} nodes - Unchecked nodes
		*/
		Tree.prototype.getUnchecked = function () {
			return this.findNodes('false', 'g', 'state.checked');
		};

		/**
			Returns an array of disabled nodes.
			@returns {Array} nodes - Disabled nodes
		*/
		Tree.prototype.getDisabled = function () {
			return this.findNodes('true', 'g', 'state.disabled');
		};

		/**
			Returns an array of enabled nodes.
			@returns {Array} nodes - Enabled nodes
		*/
		Tree.prototype.getEnabled = function () {
			return this.findNodes('false', 'g', 'state.disabled');
		};


		/**
			Set a node state to selected
			@param {Object|Number} identifiers - A valid node, node id or array of node identifiers
			@param {optional Object} options
		*/
		Tree.prototype.selectNode = function (identifiers, options) {
			this.forEachIdentifier(identifiers, options, $.proxy(function (node, options) {
				this.setSelectedState(node, true, options);
			}, this));

			this.render();
		};

		/**
			Set a node state to unselected
			@param {Object|Number} identifiers - A valid node, node id or array of node identifiers
			@param {optional Object} options
		*/
		Tree.prototype.unselectNode = function (identifiers, options) {
			this.forEachIdentifier(identifiers, options, $.proxy(function (node, options) {
				this.setSelectedState(node, false, options);
			}, this));

			this.render();
		};

		/**
			Toggles a node selected state; selecting if unselected, unselecting if selected.
			@param {Object|Number} identifiers - A valid node, node id or array of node identifiers
			@param {optional Object} options
		*/
		Tree.prototype.toggleNodeSelected = function (identifiers, options) {
			this.forEachIdentifier(identifiers, options, $.proxy(function (node, options) {
				this.toggleSelectedState(node, options);
			}, this));

			this.render();
		};


		/**
			Collapse all tree nodes
			@param {optional Object} options
		*/
		Tree.prototype.collapseAll = function (options) {
			var identifiers = this.findNodes('true', 'g', 'state.expanded');
			this.forEachIdentifier(identifiers, options, $.proxy(function (node, options) {
				this.setExpandedState(node, false, options);
			}, this));

			this.render();
		};

		/**
			Collapse a given tree node
			@param {Object|Number} identifiers - A valid node, node id or array of node identifiers
			@param {optional Object} options
		*/
		Tree.prototype.collapseNode = function (identifiers, options) {
			this.forEachIdentifier(identifiers, options, $.proxy(function (node, options) {
				this.setExpandedState(node, false, options);
			}, this));

			this.render();
		};

		/**
			Expand all tree nodes
			@param {optional Object} options
		*/
		Tree.prototype.expandAll = function (options) {
			options = $.extend({}, _default.options, options);

			if (options && options.levels) {
				this.expandLevels(this.tree, options.levels, options);
			}
			else {
				var identifiers = this.findNodes('false', 'g', 'state.expanded');
				this.forEachIdentifier(identifiers, options, $.proxy(function (node, options) {
					this.setExpandedState(node, true, options);
				}, this));
			}

			this.render();
		};

		/**
			Expand a given tree node
			@param {Object|Number} identifiers - A valid node, node id or array of node identifiers
			@param {optional Object} options
		*/
		Tree.prototype.expandNode = function (identifiers, options) {
			this.forEachIdentifier(identifiers, options, $.proxy(function (node, options) {
				this.setExpandedState(node, true, options);
				if (node.nodes && (options && options.levels)) {
					this.expandLevels(node.nodes, options.levels-1, options);
				}
			}, this));

			this.render();
		};

		Tree.prototype.expandLevels = function (nodes, level, options) {
			options = $.extend({}, _default.options, options);

			$.each(nodes, $.proxy(function (index, node) {
				this.setExpandedState(node, (level > 0) ? true : false, options);
				if (node.nodes) {
					this.expandLevels(node.nodes, level-1, options);
				}
			}, this));
		};

		/**
			Reveals a given tree node, expanding the tree from node to root.
			@param {Object|Number|Array} identifiers - A valid node, node id or array of node identifiers
			@param {optional Object} options
		*/
		Tree.prototype.revealNode = function (identifiers, options) {
			this.forEachIdentifier(identifiers, options, $.proxy(function (node, options) {
				var parentNode = this.getParent(node);
				while (parentNode) {
					this.setExpandedState(parentNode, true, options);
					parentNode = this.getParent(parentNode);
				};
			}, this));

			this.render();
		};

		/**
			Toggles a nodes expanded state; collapsing if expanded, expanding if collapsed.
			@param {Object|Number} identifiers - A valid node, node id or array of node identifiers
			@param {optional Object} options
		*/
		Tree.prototype.toggleNodeExpanded = function (identifiers, options) {
			this.forEachIdentifier(identifiers, options, $.proxy(function (node, options) {
				this.toggleExpandedState(node, options);
			}, this));
			
			this.render();
		};


		/**
			Check all tree nodes
			@param {optional Object} options
		*/
		Tree.prototype.checkAll = function (options) {
			var identifiers = this.findNodes('false', 'g', 'state.checked');
			this.forEachIdentifier(identifiers, options, $.proxy(function (node, options) {
				this.setCheckedState(node, true, options);
			}, this));

			this.render();
		};

		/**
			Check a given tree node
			@param {Object|Number} identifiers - A valid node, node id or array of node identifiers
			@param {optional Object} options
		*/
		Tree.prototype.checkNode = function (identifiers, options) {
			this.forEachIdentifier(identifiers, options, $.proxy(function (node, options) {
				this.setCheckedState(node, true, options);
			}, this));

			this.render();
		};

		/**
			Uncheck all tree nodes
			@param {optional Object} options
		*/
		Tree.prototype.uncheckAll = function (options) {
			var identifiers = this.findNodes('true', 'g', 'state.checked');
			this.forEachIdentifier(identifiers, options, $.proxy(function (node, options) {
				this.setCheckedState(node, false, options);
			}, this));

			this.render();
		};

		/**
			Uncheck a given tree node
			@param {Object|Number} identifiers - A valid node, node id or array of node identifiers
			@param {optional Object} options
		*/
		Tree.prototype.uncheckNode = function (identifiers, options) {
			this.forEachIdentifier(identifiers, options, $.proxy(function (node, options) {
				this.setCheckedState(node, false, options);
			}, this));

			this.render();
		};

		/**
			Toggles a nodes checked state; checking if unchecked, unchecking if checked.
			@param {Object|Number} identifiers - A valid node, node id or array of node identifiers
			@param {optional Object} options
		*/
		Tree.prototype.toggleNodeChecked = function (identifiers, options) {
			this.forEachIdentifier(identifiers, options, $.proxy(function (node, options) {
				this.toggleCheckedState(node, options);
			}, this));

			this.render();
		};


		/**
			Disable all tree nodes
			@param {optional Object} options
		*/
		Tree.prototype.disableAll = function (options) {
			var identifiers = this.findNodes('false', 'g', 'state.disabled');
			this.forEachIdentifier(identifiers, options, $.proxy(function (node, options) {
				this.setDisabledState(node, true, options);
			}, this));

			this.render();
		};

		/**
			Disable a given tree node
			@param {Object|Number} identifiers - A valid node, node id or array of node identifiers
			@param {optional Object} options
		*/
		Tree.prototype.disableNode = function (identifiers, options) {
			this.forEachIdentifier(identifiers, options, $.proxy(function (node, options) {
				this.setDisabledState(node, true, options);
			}, this));

			this.render();
		};

		/**
			Enable all tree nodes
			@param {optional Object} options
		*/
		Tree.prototype.enableAll = function (options) {
			var identifiers = this.findNodes('true', 'g', 'state.disabled');
			this.forEachIdentifier(identifiers, options, $.proxy(function (node, options) {
				this.setDisabledState(node, false, options);
			}, this));

			this.render();
		};

		/**
			Enable a given tree node
			@param {Object|Number} identifiers - A valid node, node id or array of node identifiers
			@param {optional Object} options
		*/
		Tree.prototype.enableNode = function (identifiers, options) {
			this.forEachIdentifier(identifiers, options, $.proxy(function (node, options) {
				this.setDisabledState(node, false, options);
			}, this));

			this.render();
		};

		/**
			Toggles a nodes disabled state; disabling is enabled, enabling if disabled.
			@param {Object|Number} identifiers - A valid node, node id or array of node identifiers
			@param {optional Object} options
		*/
		Tree.prototype.toggleNodeDisabled = function (identifiers, options) {
			this.forEachIdentifier(identifiers, options, $.proxy(function (node, options) {
				this.setDisabledState(node, !node.state.disabled, options);
			}, this));

			this.render();
		};


		/**
			Common code for processing multiple identifiers
		*/
		Tree.prototype.forEachIdentifier = function (identifiers, options, callback) {

			options = $.extend({}, _default.options, options);

			if (!(identifiers instanceof Array)) {
				identifiers = [identifiers];
			}

			$.each(identifiers, $.proxy(function (index, identifier) {
				callback(this.identifyNode(identifier), options);
			}, this));	
		};

		/*
			Identifies a node from either a node id or object
		*/
		Tree.prototype.identifyNode = function (identifier) {
			return ((typeof identifier) === 'number') ?
							this.nodes[identifier] :
							identifier;
		};

		/**
			Searches the tree for nodes (text) that match given criteria
			@param {String} pattern - A given string to match against
			@param {optional Object} options - Search criteria options
			@return {Array} nodes - Matching nodes
		*/
		Tree.prototype.search = function (pattern, options) {
			options = $.extend({}, _default.searchOptions, options);

			this.clearSearch({ render: false });

			var results = [];
			if (pattern && pattern.length > 0) {

				if (options.exactMatch) {
					pattern = '^' + pattern + '$';
				}

				var modifier = 'g';
				if (options.ignoreCase) {
					modifier += 'i';
				}

				results = this.findNodes(pattern, modifier);

				// Add searchResult property to all matching nodes
				// This will be used to apply custom styles
				// and when identifying result to be cleared
				$.each(results, function (index, node) {
					node.searchResult = true;
				})
			}

			// If revealResults, then render is triggered from revealNode
			// otherwise we just call render.
			if (options.revealResults) {
				this.revealNode(results);
			}
			else {
				this.render();
			}

			this.$element.trigger('searchComplete', $.extend(true, {}, results));

			return results;
		};

		/**
			Clears previous search results
		*/
		Tree.prototype.clearSearch = function (options) {

			options = $.extend({}, { render: true }, options);

			var results = $.each(this.findNodes('true', 'g', 'searchResult'), function (index, node) {
				node.searchResult = false;
			});

			if (options.render) {
				this.render();	
			}
			
			this.$element.trigger('searchCleared', $.extend(true, {}, results));
		};

		/**
			Find nodes that match a given criteria
			@param {String} pattern - A given string to match against
			@param {optional String} modifier - Valid RegEx modifiers
			@param {optional String} attribute - Attribute to compare pattern against
			@return {Array} nodes - Nodes that match your criteria
		*/
		Tree.prototype.findNodes = function (pattern, modifier, attribute) {

			modifier = modifier || 'g';
			attribute = attribute || 'text';

			var _this = this;
			return $.grep(this.nodes, function (node) {
				var val = _this.getNodeValue(node, attribute);
				if (typeof val === 'string') {
					return val.match(new RegExp(pattern, modifier));
				}
			});
		};

		/**
			Recursive find for retrieving nested attributes values
			All values are return as strings, unless invalid
			@param {Object} obj - Typically a node, could be any object
			@param {String} attr - Identifies an object property using dot notation
			@return {String} value - Matching attributes string representation
		*/
		Tree.prototype.getNodeValue = function (obj, attr) {
			var index = attr.indexOf('.');
			if (index > 0) {
				var _obj = obj[attr.substring(0, index)];
				var _attr = attr.substring(index + 1, attr.length);
				return this.getNodeValue(_obj, _attr);
			}
			else {
				if (obj.hasOwnProperty(attr)) {
					return obj[attr].toString();
				}
				else {
					return undefined;
				}
			}
		};

		var logError = function (message) {
			if (window.console) {
				window.console.error(message);
			}
		};

		// Prevent against multiple instantiations,
		// handle updates and method calls
		$.fn[pluginName] = function (options, args) {

			var result;

			this.each(function () {
				var _this = $.data(this, pluginName);
				if (typeof options === 'string') {
					if (!_this) {
						logError('Not initialized, can not call method : ' + options);
					}
					else if (!$.isFunction(_this[options]) || options.charAt(0) === '_') {
						logError('No such method : ' + options);
					}
					else {
						if (!(args instanceof Array)) {
							args = [ args ];
						}
						result = _this[options].apply(_this, args);
					}
				}
				else if (typeof options === 'boolean') {
					result = _this;
				}
				else {
					$.data(this, pluginName, new Tree(this, $.extend(true, {}, options)));
				}
			});

			return result || this;
		};

	})(jQuery, window, document);


/***/ },

/***/ 141:
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function($) {var $parentNode = window.parent.document;

	function $childNode(name) {
	    return window.frames[name]
	}

	// tooltips
	$('.tooltip-demo').tooltip({
	    selector: "[data-toggle=tooltip]",
	    container: "body"
	});

	// 使用animation.css修改Bootstrap Modal
	$('.modal').appendTo("body");

	$("[data-toggle=popover]").popover();

	//折叠ibox
	$('.collapse-link').click(function () {
	    var ibox = $(this).closest('div.ibox');
	    var button = $(this).find('i');
	    var content = ibox.find('div.ibox-content');
	    content.slideToggle(200);
	    button.toggleClass('fa-chevron-up').toggleClass('fa-chevron-down');
	    ibox.toggleClass('').toggleClass('border-bottom');
	    setTimeout(function () {
	        ibox.resize();
	        ibox.find('[id^=map-]').resize();
	    }, 50);
	});

	//关闭ibox
	$('.close-link').click(function () {
	    var content = $(this).closest('div.ibox');
	    content.remove();
	});

	//判断当前页面是否在iframe中
	if (top == window) {
	    var gohome = '<div class="gohome"><a class="animated bounceInUp" href="/admin" title="返回首页"><i class="fa fa-home"></i></a></div>';
	    $('body').append(gohome);
	}

	//animation.css
	function animationHover(element, animation) {
	    element = $(element);
	    element.hover(
	        function () {
	            element.addClass('animated ' + animation);
	        },
	        function () {
	            //动画完成之前移除class
	            window.setTimeout(function () {
	                element.removeClass('animated ' + animation);
	            }, 2000);
	        });
	}

	//拖动面板
	function WinMove() {
	    var element = "[class*=col]";
	    var handle = ".ibox-title";
	    var connect = "[class*=col]";
	    $(element).sortable({
	            handle: handle,
	            connectWith: connect,
	            tolerance: 'pointer',
	            forcePlaceholderSize: true,
	            opacity: 0.8,
	        })
	        .disableSelection();
	};

	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(82)))

/***/ }

});