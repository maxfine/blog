webpackJsonp([8],{

/***/ 102:
/***/ function(module, exports) {

	// removed by extract-text-webpack-plugin

/***/ },

/***/ 104:
/***/ function(module, exports) {

	// removed by extract-text-webpack-plugin

/***/ },

/***/ 110:
/***/ function(module, exports) {

	/*!
	 * Bootstrap v3.3.6 (http://getbootstrap.com)
	 * Copyright 2011-2015 Twitter, Inc.
	 * Licensed under the MIT license
	 */

	if (typeof jQuery === 'undefined') {
	  throw new Error('Bootstrap\'s JavaScript requires jQuery')
	}

	+function ($) {
	  'use strict';
	  var version = $.fn.jquery.split(' ')[0].split('.')
	  if ((version[0] < 2 && version[1] < 9) || (version[0] == 1 && version[1] == 9 && version[2] < 1) || (version[0] > 2)) {
	    throw new Error('Bootstrap\'s JavaScript requires jQuery version 1.9.1 or higher, but lower than version 3')
	  }
	}(jQuery);

	/* ========================================================================
	 * Bootstrap: transition.js v3.3.6
	 * http://getbootstrap.com/javascript/#transitions
	 * ========================================================================
	 * Copyright 2011-2015 Twitter, Inc.
	 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
	 * ======================================================================== */


	+function ($) {
	  'use strict';

	  // CSS TRANSITION SUPPORT (Shoutout: http://www.modernizr.com/)
	  // ============================================================

	  function transitionEnd() {
	    var el = document.createElement('bootstrap')

	    var transEndEventNames = {
	      WebkitTransition : 'webkitTransitionEnd',
	      MozTransition    : 'transitionend',
	      OTransition      : 'oTransitionEnd otransitionend',
	      transition       : 'transitionend'
	    }

	    for (var name in transEndEventNames) {
	      if (el.style[name] !== undefined) {
	        return { end: transEndEventNames[name] }
	      }
	    }

	    return false // explicit for ie8 (  ._.)
	  }

	  // http://blog.alexmaccaw.com/css-transitions
	  $.fn.emulateTransitionEnd = function (duration) {
	    var called = false
	    var $el = this
	    $(this).one('bsTransitionEnd', function () { called = true })
	    var callback = function () { if (!called) $($el).trigger($.support.transition.end) }
	    setTimeout(callback, duration)
	    return this
	  }

	  $(function () {
	    $.support.transition = transitionEnd()

	    if (!$.support.transition) return

	    $.event.special.bsTransitionEnd = {
	      bindType: $.support.transition.end,
	      delegateType: $.support.transition.end,
	      handle: function (e) {
	        if ($(e.target).is(this)) return e.handleObj.handler.apply(this, arguments)
	      }
	    }
	  })

	}(jQuery);

	/* ========================================================================
	 * Bootstrap: alert.js v3.3.6
	 * http://getbootstrap.com/javascript/#alerts
	 * ========================================================================
	 * Copyright 2011-2015 Twitter, Inc.
	 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
	 * ======================================================================== */


	+function ($) {
	  'use strict';

	  // ALERT CLASS DEFINITION
	  // ======================

	  var dismiss = '[data-dismiss="alert"]'
	  var Alert   = function (el) {
	    $(el).on('click', dismiss, this.close)
	  }

	  Alert.VERSION = '3.3.6'

	  Alert.TRANSITION_DURATION = 150

	  Alert.prototype.close = function (e) {
	    var $this    = $(this)
	    var selector = $this.attr('data-target')

	    if (!selector) {
	      selector = $this.attr('href')
	      selector = selector && selector.replace(/.*(?=#[^\s]*$)/, '') // strip for ie7
	    }

	    var $parent = $(selector)

	    if (e) e.preventDefault()

	    if (!$parent.length) {
	      $parent = $this.closest('.alert')
	    }

	    $parent.trigger(e = $.Event('close.bs.alert'))

	    if (e.isDefaultPrevented()) return

	    $parent.removeClass('in')

	    function removeElement() {
	      // detach from parent, fire event then clean up data
	      $parent.detach().trigger('closed.bs.alert').remove()
	    }

	    $.support.transition && $parent.hasClass('fade') ?
	      $parent
	        .one('bsTransitionEnd', removeElement)
	        .emulateTransitionEnd(Alert.TRANSITION_DURATION) :
	      removeElement()
	  }


	  // ALERT PLUGIN DEFINITION
	  // =======================

	  function Plugin(option) {
	    return this.each(function () {
	      var $this = $(this)
	      var data  = $this.data('bs.alert')

	      if (!data) $this.data('bs.alert', (data = new Alert(this)))
	      if (typeof option == 'string') data[option].call($this)
	    })
	  }

	  var old = $.fn.alert

	  $.fn.alert             = Plugin
	  $.fn.alert.Constructor = Alert


	  // ALERT NO CONFLICT
	  // =================

	  $.fn.alert.noConflict = function () {
	    $.fn.alert = old
	    return this
	  }


	  // ALERT DATA-API
	  // ==============

	  $(document).on('click.bs.alert.data-api', dismiss, Alert.prototype.close)

	}(jQuery);

	/* ========================================================================
	 * Bootstrap: button.js v3.3.6
	 * http://getbootstrap.com/javascript/#buttons
	 * ========================================================================
	 * Copyright 2011-2015 Twitter, Inc.
	 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
	 * ======================================================================== */


	+function ($) {
	  'use strict';

	  // BUTTON PUBLIC CLASS DEFINITION
	  // ==============================

	  var Button = function (element, options) {
	    this.$element  = $(element)
	    this.options   = $.extend({}, Button.DEFAULTS, options)
	    this.isLoading = false
	  }

	  Button.VERSION  = '3.3.6'

	  Button.DEFAULTS = {
	    loadingText: 'loading...'
	  }

	  Button.prototype.setState = function (state) {
	    var d    = 'disabled'
	    var $el  = this.$element
	    var val  = $el.is('input') ? 'val' : 'html'
	    var data = $el.data()

	    state += 'Text'

	    if (data.resetText == null) $el.data('resetText', $el[val]())

	    // push to event loop to allow forms to submit
	    setTimeout($.proxy(function () {
	      $el[val](data[state] == null ? this.options[state] : data[state])

	      if (state == 'loadingText') {
	        this.isLoading = true
	        $el.addClass(d).attr(d, d)
	      } else if (this.isLoading) {
	        this.isLoading = false
	        $el.removeClass(d).removeAttr(d)
	      }
	    }, this), 0)
	  }

	  Button.prototype.toggle = function () {
	    var changed = true
	    var $parent = this.$element.closest('[data-toggle="buttons"]')

	    if ($parent.length) {
	      var $input = this.$element.find('input')
	      if ($input.prop('type') == 'radio') {
	        if ($input.prop('checked')) changed = false
	        $parent.find('.active').removeClass('active')
	        this.$element.addClass('active')
	      } else if ($input.prop('type') == 'checkbox') {
	        if (($input.prop('checked')) !== this.$element.hasClass('active')) changed = false
	        this.$element.toggleClass('active')
	      }
	      $input.prop('checked', this.$element.hasClass('active'))
	      if (changed) $input.trigger('change')
	    } else {
	      this.$element.attr('aria-pressed', !this.$element.hasClass('active'))
	      this.$element.toggleClass('active')
	    }
	  }


	  // BUTTON PLUGIN DEFINITION
	  // ========================

	  function Plugin(option) {
	    return this.each(function () {
	      var $this   = $(this)
	      var data    = $this.data('bs.button')
	      var options = typeof option == 'object' && option

	      if (!data) $this.data('bs.button', (data = new Button(this, options)))

	      if (option == 'toggle') data.toggle()
	      else if (option) data.setState(option)
	    })
	  }

	  var old = $.fn.button

	  $.fn.button             = Plugin
	  $.fn.button.Constructor = Button


	  // BUTTON NO CONFLICT
	  // ==================

	  $.fn.button.noConflict = function () {
	    $.fn.button = old
	    return this
	  }


	  // BUTTON DATA-API
	  // ===============

	  $(document)
	    .on('click.bs.button.data-api', '[data-toggle^="button"]', function (e) {
	      var $btn = $(e.target)
	      if (!$btn.hasClass('btn')) $btn = $btn.closest('.btn')
	      Plugin.call($btn, 'toggle')
	      if (!($(e.target).is('input[type="radio"]') || $(e.target).is('input[type="checkbox"]'))) e.preventDefault()
	    })
	    .on('focus.bs.button.data-api blur.bs.button.data-api', '[data-toggle^="button"]', function (e) {
	      $(e.target).closest('.btn').toggleClass('focus', /^focus(in)?$/.test(e.type))
	    })

	}(jQuery);

	/* ========================================================================
	 * Bootstrap: carousel.js v3.3.6
	 * http://getbootstrap.com/javascript/#carousel
	 * ========================================================================
	 * Copyright 2011-2015 Twitter, Inc.
	 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
	 * ======================================================================== */


	+function ($) {
	  'use strict';

	  // CAROUSEL CLASS DEFINITION
	  // =========================

	  var Carousel = function (element, options) {
	    this.$element    = $(element)
	    this.$indicators = this.$element.find('.carousel-indicators')
	    this.options     = options
	    this.paused      = null
	    this.sliding     = null
	    this.interval    = null
	    this.$active     = null
	    this.$items      = null

	    this.options.keyboard && this.$element.on('keydown.bs.carousel', $.proxy(this.keydown, this))

	    this.options.pause == 'hover' && !('ontouchstart' in document.documentElement) && this.$element
	      .on('mouseenter.bs.carousel', $.proxy(this.pause, this))
	      .on('mouseleave.bs.carousel', $.proxy(this.cycle, this))
	  }

	  Carousel.VERSION  = '3.3.6'

	  Carousel.TRANSITION_DURATION = 600

	  Carousel.DEFAULTS = {
	    interval: 5000,
	    pause: 'hover',
	    wrap: true,
	    keyboard: true
	  }

	  Carousel.prototype.keydown = function (e) {
	    if (/input|textarea/i.test(e.target.tagName)) return
	    switch (e.which) {
	      case 37: this.prev(); break
	      case 39: this.next(); break
	      default: return
	    }

	    e.preventDefault()
	  }

	  Carousel.prototype.cycle = function (e) {
	    e || (this.paused = false)

	    this.interval && clearInterval(this.interval)

	    this.options.interval
	      && !this.paused
	      && (this.interval = setInterval($.proxy(this.next, this), this.options.interval))

	    return this
	  }

	  Carousel.prototype.getItemIndex = function (item) {
	    this.$items = item.parent().children('.item')
	    return this.$items.index(item || this.$active)
	  }

	  Carousel.prototype.getItemForDirection = function (direction, active) {
	    var activeIndex = this.getItemIndex(active)
	    var willWrap = (direction == 'prev' && activeIndex === 0)
	                || (direction == 'next' && activeIndex == (this.$items.length - 1))
	    if (willWrap && !this.options.wrap) return active
	    var delta = direction == 'prev' ? -1 : 1
	    var itemIndex = (activeIndex + delta) % this.$items.length
	    return this.$items.eq(itemIndex)
	  }

	  Carousel.prototype.to = function (pos) {
	    var that        = this
	    var activeIndex = this.getItemIndex(this.$active = this.$element.find('.item.active'))

	    if (pos > (this.$items.length - 1) || pos < 0) return

	    if (this.sliding)       return this.$element.one('slid.bs.carousel', function () { that.to(pos) }) // yes, "slid"
	    if (activeIndex == pos) return this.pause().cycle()

	    return this.slide(pos > activeIndex ? 'next' : 'prev', this.$items.eq(pos))
	  }

	  Carousel.prototype.pause = function (e) {
	    e || (this.paused = true)

	    if (this.$element.find('.next, .prev').length && $.support.transition) {
	      this.$element.trigger($.support.transition.end)
	      this.cycle(true)
	    }

	    this.interval = clearInterval(this.interval)

	    return this
	  }

	  Carousel.prototype.next = function () {
	    if (this.sliding) return
	    return this.slide('next')
	  }

	  Carousel.prototype.prev = function () {
	    if (this.sliding) return
	    return this.slide('prev')
	  }

	  Carousel.prototype.slide = function (type, next) {
	    var $active   = this.$element.find('.item.active')
	    var $next     = next || this.getItemForDirection(type, $active)
	    var isCycling = this.interval
	    var direction = type == 'next' ? 'left' : 'right'
	    var that      = this

	    if ($next.hasClass('active')) return (this.sliding = false)

	    var relatedTarget = $next[0]
	    var slideEvent = $.Event('slide.bs.carousel', {
	      relatedTarget: relatedTarget,
	      direction: direction
	    })
	    this.$element.trigger(slideEvent)
	    if (slideEvent.isDefaultPrevented()) return

	    this.sliding = true

	    isCycling && this.pause()

	    if (this.$indicators.length) {
	      this.$indicators.find('.active').removeClass('active')
	      var $nextIndicator = $(this.$indicators.children()[this.getItemIndex($next)])
	      $nextIndicator && $nextIndicator.addClass('active')
	    }

	    var slidEvent = $.Event('slid.bs.carousel', { relatedTarget: relatedTarget, direction: direction }) // yes, "slid"
	    if ($.support.transition && this.$element.hasClass('slide')) {
	      $next.addClass(type)
	      $next[0].offsetWidth // force reflow
	      $active.addClass(direction)
	      $next.addClass(direction)
	      $active
	        .one('bsTransitionEnd', function () {
	          $next.removeClass([type, direction].join(' ')).addClass('active')
	          $active.removeClass(['active', direction].join(' '))
	          that.sliding = false
	          setTimeout(function () {
	            that.$element.trigger(slidEvent)
	          }, 0)
	        })
	        .emulateTransitionEnd(Carousel.TRANSITION_DURATION)
	    } else {
	      $active.removeClass('active')
	      $next.addClass('active')
	      this.sliding = false
	      this.$element.trigger(slidEvent)
	    }

	    isCycling && this.cycle()

	    return this
	  }


	  // CAROUSEL PLUGIN DEFINITION
	  // ==========================

	  function Plugin(option) {
	    return this.each(function () {
	      var $this   = $(this)
	      var data    = $this.data('bs.carousel')
	      var options = $.extend({}, Carousel.DEFAULTS, $this.data(), typeof option == 'object' && option)
	      var action  = typeof option == 'string' ? option : options.slide

	      if (!data) $this.data('bs.carousel', (data = new Carousel(this, options)))
	      if (typeof option == 'number') data.to(option)
	      else if (action) data[action]()
	      else if (options.interval) data.pause().cycle()
	    })
	  }

	  var old = $.fn.carousel

	  $.fn.carousel             = Plugin
	  $.fn.carousel.Constructor = Carousel


	  // CAROUSEL NO CONFLICT
	  // ====================

	  $.fn.carousel.noConflict = function () {
	    $.fn.carousel = old
	    return this
	  }


	  // CAROUSEL DATA-API
	  // =================

	  var clickHandler = function (e) {
	    var href
	    var $this   = $(this)
	    var $target = $($this.attr('data-target') || (href = $this.attr('href')) && href.replace(/.*(?=#[^\s]+$)/, '')) // strip for ie7
	    if (!$target.hasClass('carousel')) return
	    var options = $.extend({}, $target.data(), $this.data())
	    var slideIndex = $this.attr('data-slide-to')
	    if (slideIndex) options.interval = false

	    Plugin.call($target, options)

	    if (slideIndex) {
	      $target.data('bs.carousel').to(slideIndex)
	    }

	    e.preventDefault()
	  }

	  $(document)
	    .on('click.bs.carousel.data-api', '[data-slide]', clickHandler)
	    .on('click.bs.carousel.data-api', '[data-slide-to]', clickHandler)

	  $(window).on('load', function () {
	    $('[data-ride="carousel"]').each(function () {
	      var $carousel = $(this)
	      Plugin.call($carousel, $carousel.data())
	    })
	  })

	}(jQuery);

	/* ========================================================================
	 * Bootstrap: collapse.js v3.3.6
	 * http://getbootstrap.com/javascript/#collapse
	 * ========================================================================
	 * Copyright 2011-2015 Twitter, Inc.
	 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
	 * ======================================================================== */


	+function ($) {
	  'use strict';

	  // COLLAPSE PUBLIC CLASS DEFINITION
	  // ================================

	  var Collapse = function (element, options) {
	    this.$element      = $(element)
	    this.options       = $.extend({}, Collapse.DEFAULTS, options)
	    this.$trigger      = $('[data-toggle="collapse"][href="#' + element.id + '"],' +
	                           '[data-toggle="collapse"][data-target="#' + element.id + '"]')
	    this.transitioning = null

	    if (this.options.parent) {
	      this.$parent = this.getParent()
	    } else {
	      this.addAriaAndCollapsedClass(this.$element, this.$trigger)
	    }

	    if (this.options.toggle) this.toggle()
	  }

	  Collapse.VERSION  = '3.3.6'

	  Collapse.TRANSITION_DURATION = 350

	  Collapse.DEFAULTS = {
	    toggle: true
	  }

	  Collapse.prototype.dimension = function () {
	    var hasWidth = this.$element.hasClass('width')
	    return hasWidth ? 'width' : 'height'
	  }

	  Collapse.prototype.show = function () {
	    if (this.transitioning || this.$element.hasClass('in')) return

	    var activesData
	    var actives = this.$parent && this.$parent.children('.panel').children('.in, .collapsing')

	    if (actives && actives.length) {
	      activesData = actives.data('bs.collapse')
	      if (activesData && activesData.transitioning) return
	    }

	    var startEvent = $.Event('show.bs.collapse')
	    this.$element.trigger(startEvent)
	    if (startEvent.isDefaultPrevented()) return

	    if (actives && actives.length) {
	      Plugin.call(actives, 'hide')
	      activesData || actives.data('bs.collapse', null)
	    }

	    var dimension = this.dimension()

	    this.$element
	      .removeClass('collapse')
	      .addClass('collapsing')[dimension](0)
	      .attr('aria-expanded', true)

	    this.$trigger
	      .removeClass('collapsed')
	      .attr('aria-expanded', true)

	    this.transitioning = 1

	    var complete = function () {
	      this.$element
	        .removeClass('collapsing')
	        .addClass('collapse in')[dimension]('')
	      this.transitioning = 0
	      this.$element
	        .trigger('shown.bs.collapse')
	    }

	    if (!$.support.transition) return complete.call(this)

	    var scrollSize = $.camelCase(['scroll', dimension].join('-'))

	    this.$element
	      .one('bsTransitionEnd', $.proxy(complete, this))
	      .emulateTransitionEnd(Collapse.TRANSITION_DURATION)[dimension](this.$element[0][scrollSize])
	  }

	  Collapse.prototype.hide = function () {
	    if (this.transitioning || !this.$element.hasClass('in')) return

	    var startEvent = $.Event('hide.bs.collapse')
	    this.$element.trigger(startEvent)
	    if (startEvent.isDefaultPrevented()) return

	    var dimension = this.dimension()

	    this.$element[dimension](this.$element[dimension]())[0].offsetHeight

	    this.$element
	      .addClass('collapsing')
	      .removeClass('collapse in')
	      .attr('aria-expanded', false)

	    this.$trigger
	      .addClass('collapsed')
	      .attr('aria-expanded', false)

	    this.transitioning = 1

	    var complete = function () {
	      this.transitioning = 0
	      this.$element
	        .removeClass('collapsing')
	        .addClass('collapse')
	        .trigger('hidden.bs.collapse')
	    }

	    if (!$.support.transition) return complete.call(this)

	    this.$element
	      [dimension](0)
	      .one('bsTransitionEnd', $.proxy(complete, this))
	      .emulateTransitionEnd(Collapse.TRANSITION_DURATION)
	  }

	  Collapse.prototype.toggle = function () {
	    this[this.$element.hasClass('in') ? 'hide' : 'show']()
	  }

	  Collapse.prototype.getParent = function () {
	    return $(this.options.parent)
	      .find('[data-toggle="collapse"][data-parent="' + this.options.parent + '"]')
	      .each($.proxy(function (i, element) {
	        var $element = $(element)
	        this.addAriaAndCollapsedClass(getTargetFromTrigger($element), $element)
	      }, this))
	      .end()
	  }

	  Collapse.prototype.addAriaAndCollapsedClass = function ($element, $trigger) {
	    var isOpen = $element.hasClass('in')

	    $element.attr('aria-expanded', isOpen)
	    $trigger
	      .toggleClass('collapsed', !isOpen)
	      .attr('aria-expanded', isOpen)
	  }

	  function getTargetFromTrigger($trigger) {
	    var href
	    var target = $trigger.attr('data-target')
	      || (href = $trigger.attr('href')) && href.replace(/.*(?=#[^\s]+$)/, '') // strip for ie7

	    return $(target)
	  }


	  // COLLAPSE PLUGIN DEFINITION
	  // ==========================

	  function Plugin(option) {
	    return this.each(function () {
	      var $this   = $(this)
	      var data    = $this.data('bs.collapse')
	      var options = $.extend({}, Collapse.DEFAULTS, $this.data(), typeof option == 'object' && option)

	      if (!data && options.toggle && /show|hide/.test(option)) options.toggle = false
	      if (!data) $this.data('bs.collapse', (data = new Collapse(this, options)))
	      if (typeof option == 'string') data[option]()
	    })
	  }

	  var old = $.fn.collapse

	  $.fn.collapse             = Plugin
	  $.fn.collapse.Constructor = Collapse


	  // COLLAPSE NO CONFLICT
	  // ====================

	  $.fn.collapse.noConflict = function () {
	    $.fn.collapse = old
	    return this
	  }


	  // COLLAPSE DATA-API
	  // =================

	  $(document).on('click.bs.collapse.data-api', '[data-toggle="collapse"]', function (e) {
	    var $this   = $(this)

	    if (!$this.attr('data-target')) e.preventDefault()

	    var $target = getTargetFromTrigger($this)
	    var data    = $target.data('bs.collapse')
	    var option  = data ? 'toggle' : $this.data()

	    Plugin.call($target, option)
	  })

	}(jQuery);

	/* ========================================================================
	 * Bootstrap: dropdown.js v3.3.6
	 * http://getbootstrap.com/javascript/#dropdowns
	 * ========================================================================
	 * Copyright 2011-2015 Twitter, Inc.
	 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
	 * ======================================================================== */


	+function ($) {
	  'use strict';

	  // DROPDOWN CLASS DEFINITION
	  // =========================

	  var backdrop = '.dropdown-backdrop'
	  var toggle   = '[data-toggle="dropdown"]'
	  var Dropdown = function (element) {
	    $(element).on('click.bs.dropdown', this.toggle)
	  }

	  Dropdown.VERSION = '3.3.6'

	  function getParent($this) {
	    var selector = $this.attr('data-target')

	    if (!selector) {
	      selector = $this.attr('href')
	      selector = selector && /#[A-Za-z]/.test(selector) && selector.replace(/.*(?=#[^\s]*$)/, '') // strip for ie7
	    }

	    var $parent = selector && $(selector)

	    return $parent && $parent.length ? $parent : $this.parent()
	  }

	  function clearMenus(e) {
	    if (e && e.which === 3) return
	    $(backdrop).remove()
	    $(toggle).each(function () {
	      var $this         = $(this)
	      var $parent       = getParent($this)
	      var relatedTarget = { relatedTarget: this }

	      if (!$parent.hasClass('open')) return

	      if (e && e.type == 'click' && /input|textarea/i.test(e.target.tagName) && $.contains($parent[0], e.target)) return

	      $parent.trigger(e = $.Event('hide.bs.dropdown', relatedTarget))

	      if (e.isDefaultPrevented()) return

	      $this.attr('aria-expanded', 'false')
	      $parent.removeClass('open').trigger($.Event('hidden.bs.dropdown', relatedTarget))
	    })
	  }

	  Dropdown.prototype.toggle = function (e) {
	    var $this = $(this)

	    if ($this.is('.disabled, :disabled')) return

	    var $parent  = getParent($this)
	    var isActive = $parent.hasClass('open')

	    clearMenus()

	    if (!isActive) {
	      if ('ontouchstart' in document.documentElement && !$parent.closest('.navbar-nav').length) {
	        // if mobile we use a backdrop because click events don't delegate
	        $(document.createElement('div'))
	          .addClass('dropdown-backdrop')
	          .insertAfter($(this))
	          .on('click', clearMenus)
	      }

	      var relatedTarget = { relatedTarget: this }
	      $parent.trigger(e = $.Event('show.bs.dropdown', relatedTarget))

	      if (e.isDefaultPrevented()) return

	      $this
	        .trigger('focus')
	        .attr('aria-expanded', 'true')

	      $parent
	        .toggleClass('open')
	        .trigger($.Event('shown.bs.dropdown', relatedTarget))
	    }

	    return false
	  }

	  Dropdown.prototype.keydown = function (e) {
	    if (!/(38|40|27|32)/.test(e.which) || /input|textarea/i.test(e.target.tagName)) return

	    var $this = $(this)

	    e.preventDefault()
	    e.stopPropagation()

	    if ($this.is('.disabled, :disabled')) return

	    var $parent  = getParent($this)
	    var isActive = $parent.hasClass('open')

	    if (!isActive && e.which != 27 || isActive && e.which == 27) {
	      if (e.which == 27) $parent.find(toggle).trigger('focus')
	      return $this.trigger('click')
	    }

	    var desc = ' li:not(.disabled):visible a'
	    var $items = $parent.find('.dropdown-menu' + desc)

	    if (!$items.length) return

	    var index = $items.index(e.target)

	    if (e.which == 38 && index > 0)                 index--         // up
	    if (e.which == 40 && index < $items.length - 1) index++         // down
	    if (!~index)                                    index = 0

	    $items.eq(index).trigger('focus')
	  }


	  // DROPDOWN PLUGIN DEFINITION
	  // ==========================

	  function Plugin(option) {
	    return this.each(function () {
	      var $this = $(this)
	      var data  = $this.data('bs.dropdown')

	      if (!data) $this.data('bs.dropdown', (data = new Dropdown(this)))
	      if (typeof option == 'string') data[option].call($this)
	    })
	  }

	  var old = $.fn.dropdown

	  $.fn.dropdown             = Plugin
	  $.fn.dropdown.Constructor = Dropdown


	  // DROPDOWN NO CONFLICT
	  // ====================

	  $.fn.dropdown.noConflict = function () {
	    $.fn.dropdown = old
	    return this
	  }


	  // APPLY TO STANDARD DROPDOWN ELEMENTS
	  // ===================================

	  $(document)
	    .on('click.bs.dropdown.data-api', clearMenus)
	    .on('click.bs.dropdown.data-api', '.dropdown form', function (e) { e.stopPropagation() })
	    .on('click.bs.dropdown.data-api', toggle, Dropdown.prototype.toggle)
	    .on('keydown.bs.dropdown.data-api', toggle, Dropdown.prototype.keydown)
	    .on('keydown.bs.dropdown.data-api', '.dropdown-menu', Dropdown.prototype.keydown)

	}(jQuery);

	/* ========================================================================
	 * Bootstrap: modal.js v3.3.6
	 * http://getbootstrap.com/javascript/#modals
	 * ========================================================================
	 * Copyright 2011-2015 Twitter, Inc.
	 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
	 * ======================================================================== */


	+function ($) {
	  'use strict';

	  // MODAL CLASS DEFINITION
	  // ======================

	  var Modal = function (element, options) {
	    this.options             = options
	    this.$body               = $(document.body)
	    this.$element            = $(element)
	    this.$dialog             = this.$element.find('.modal-dialog')
	    this.$backdrop           = null
	    this.isShown             = null
	    this.originalBodyPad     = null
	    this.scrollbarWidth      = 0
	    this.ignoreBackdropClick = false

	    if (this.options.remote) {
	      this.$element
	        .find('.modal-content')
	        .load(this.options.remote, $.proxy(function () {
	          this.$element.trigger('loaded.bs.modal')
	        }, this))
	    }
	  }

	  Modal.VERSION  = '3.3.6'

	  Modal.TRANSITION_DURATION = 300
	  Modal.BACKDROP_TRANSITION_DURATION = 150

	  Modal.DEFAULTS = {
	    backdrop: true,
	    keyboard: true,
	    show: true
	  }

	  Modal.prototype.toggle = function (_relatedTarget) {
	    return this.isShown ? this.hide() : this.show(_relatedTarget)
	  }

	  Modal.prototype.show = function (_relatedTarget) {
	    var that = this
	    var e    = $.Event('show.bs.modal', { relatedTarget: _relatedTarget })

	    this.$element.trigger(e)

	    if (this.isShown || e.isDefaultPrevented()) return

	    this.isShown = true

	    this.checkScrollbar()
	    this.setScrollbar()
	    this.$body.addClass('modal-open')

	    this.escape()
	    this.resize()

	    this.$element.on('click.dismiss.bs.modal', '[data-dismiss="modal"]', $.proxy(this.hide, this))

	    this.$dialog.on('mousedown.dismiss.bs.modal', function () {
	      that.$element.one('mouseup.dismiss.bs.modal', function (e) {
	        if ($(e.target).is(that.$element)) that.ignoreBackdropClick = true
	      })
	    })

	    this.backdrop(function () {
	      var transition = $.support.transition && that.$element.hasClass('fade')

	      if (!that.$element.parent().length) {
	        that.$element.appendTo(that.$body) // don't move modals dom position
	      }

	      that.$element
	        .show()
	        .scrollTop(0)

	      that.adjustDialog()

	      if (transition) {
	        that.$element[0].offsetWidth // force reflow
	      }

	      that.$element.addClass('in')

	      that.enforceFocus()

	      var e = $.Event('shown.bs.modal', { relatedTarget: _relatedTarget })

	      transition ?
	        that.$dialog // wait for modal to slide in
	          .one('bsTransitionEnd', function () {
	            that.$element.trigger('focus').trigger(e)
	          })
	          .emulateTransitionEnd(Modal.TRANSITION_DURATION) :
	        that.$element.trigger('focus').trigger(e)
	    })
	  }

	  Modal.prototype.hide = function (e) {
	    if (e) e.preventDefault()

	    e = $.Event('hide.bs.modal')

	    this.$element.trigger(e)

	    if (!this.isShown || e.isDefaultPrevented()) return

	    this.isShown = false

	    this.escape()
	    this.resize()

	    $(document).off('focusin.bs.modal')

	    this.$element
	      .removeClass('in')
	      .off('click.dismiss.bs.modal')
	      .off('mouseup.dismiss.bs.modal')

	    this.$dialog.off('mousedown.dismiss.bs.modal')

	    $.support.transition && this.$element.hasClass('fade') ?
	      this.$element
	        .one('bsTransitionEnd', $.proxy(this.hideModal, this))
	        .emulateTransitionEnd(Modal.TRANSITION_DURATION) :
	      this.hideModal()
	  }

	  Modal.prototype.enforceFocus = function () {
	    $(document)
	      .off('focusin.bs.modal') // guard against infinite focus loop
	      .on('focusin.bs.modal', $.proxy(function (e) {
	        if (this.$element[0] !== e.target && !this.$element.has(e.target).length) {
	          this.$element.trigger('focus')
	        }
	      }, this))
	  }

	  Modal.prototype.escape = function () {
	    if (this.isShown && this.options.keyboard) {
	      this.$element.on('keydown.dismiss.bs.modal', $.proxy(function (e) {
	        e.which == 27 && this.hide()
	      }, this))
	    } else if (!this.isShown) {
	      this.$element.off('keydown.dismiss.bs.modal')
	    }
	  }

	  Modal.prototype.resize = function () {
	    if (this.isShown) {
	      $(window).on('resize.bs.modal', $.proxy(this.handleUpdate, this))
	    } else {
	      $(window).off('resize.bs.modal')
	    }
	  }

	  Modal.prototype.hideModal = function () {
	    var that = this
	    this.$element.hide()
	    this.backdrop(function () {
	      that.$body.removeClass('modal-open')
	      that.resetAdjustments()
	      that.resetScrollbar()
	      that.$element.trigger('hidden.bs.modal')
	    })
	  }

	  Modal.prototype.removeBackdrop = function () {
	    this.$backdrop && this.$backdrop.remove()
	    this.$backdrop = null
	  }

	  Modal.prototype.backdrop = function (callback) {
	    var that = this
	    var animate = this.$element.hasClass('fade') ? 'fade' : ''

	    if (this.isShown && this.options.backdrop) {
	      var doAnimate = $.support.transition && animate

	      this.$backdrop = $(document.createElement('div'))
	        .addClass('modal-backdrop ' + animate)
	        .appendTo(this.$body)

	      this.$element.on('click.dismiss.bs.modal', $.proxy(function (e) {
	        if (this.ignoreBackdropClick) {
	          this.ignoreBackdropClick = false
	          return
	        }
	        if (e.target !== e.currentTarget) return
	        this.options.backdrop == 'static'
	          ? this.$element[0].focus()
	          : this.hide()
	      }, this))

	      if (doAnimate) this.$backdrop[0].offsetWidth // force reflow

	      this.$backdrop.addClass('in')

	      if (!callback) return

	      doAnimate ?
	        this.$backdrop
	          .one('bsTransitionEnd', callback)
	          .emulateTransitionEnd(Modal.BACKDROP_TRANSITION_DURATION) :
	        callback()

	    } else if (!this.isShown && this.$backdrop) {
	      this.$backdrop.removeClass('in')

	      var callbackRemove = function () {
	        that.removeBackdrop()
	        callback && callback()
	      }
	      $.support.transition && this.$element.hasClass('fade') ?
	        this.$backdrop
	          .one('bsTransitionEnd', callbackRemove)
	          .emulateTransitionEnd(Modal.BACKDROP_TRANSITION_DURATION) :
	        callbackRemove()

	    } else if (callback) {
	      callback()
	    }
	  }

	  // these following methods are used to handle overflowing modals

	  Modal.prototype.handleUpdate = function () {
	    this.adjustDialog()
	  }

	  Modal.prototype.adjustDialog = function () {
	    var modalIsOverflowing = this.$element[0].scrollHeight > document.documentElement.clientHeight

	    this.$element.css({
	      paddingLeft:  !this.bodyIsOverflowing && modalIsOverflowing ? this.scrollbarWidth : '',
	      paddingRight: this.bodyIsOverflowing && !modalIsOverflowing ? this.scrollbarWidth : ''
	    })
	  }

	  Modal.prototype.resetAdjustments = function () {
	    this.$element.css({
	      paddingLeft: '',
	      paddingRight: ''
	    })
	  }

	  Modal.prototype.checkScrollbar = function () {
	    var fullWindowWidth = window.innerWidth
	    if (!fullWindowWidth) { // workaround for missing window.innerWidth in IE8
	      var documentElementRect = document.documentElement.getBoundingClientRect()
	      fullWindowWidth = documentElementRect.right - Math.abs(documentElementRect.left)
	    }
	    this.bodyIsOverflowing = document.body.clientWidth < fullWindowWidth
	    this.scrollbarWidth = this.measureScrollbar()
	  }

	  Modal.prototype.setScrollbar = function () {
	    var bodyPad = parseInt((this.$body.css('padding-right') || 0), 10)
	    this.originalBodyPad = document.body.style.paddingRight || ''
	    if (this.bodyIsOverflowing) this.$body.css('padding-right', bodyPad + this.scrollbarWidth)
	  }

	  Modal.prototype.resetScrollbar = function () {
	    this.$body.css('padding-right', this.originalBodyPad)
	  }

	  Modal.prototype.measureScrollbar = function () { // thx walsh
	    var scrollDiv = document.createElement('div')
	    scrollDiv.className = 'modal-scrollbar-measure'
	    this.$body.append(scrollDiv)
	    var scrollbarWidth = scrollDiv.offsetWidth - scrollDiv.clientWidth
	    this.$body[0].removeChild(scrollDiv)
	    return scrollbarWidth
	  }


	  // MODAL PLUGIN DEFINITION
	  // =======================

	  function Plugin(option, _relatedTarget) {
	    return this.each(function () {
	      var $this   = $(this)
	      var data    = $this.data('bs.modal')
	      var options = $.extend({}, Modal.DEFAULTS, $this.data(), typeof option == 'object' && option)

	      if (!data) $this.data('bs.modal', (data = new Modal(this, options)))
	      if (typeof option == 'string') data[option](_relatedTarget)
	      else if (options.show) data.show(_relatedTarget)
	    })
	  }

	  var old = $.fn.modal

	  $.fn.modal             = Plugin
	  $.fn.modal.Constructor = Modal


	  // MODAL NO CONFLICT
	  // =================

	  $.fn.modal.noConflict = function () {
	    $.fn.modal = old
	    return this
	  }


	  // MODAL DATA-API
	  // ==============

	  $(document).on('click.bs.modal.data-api', '[data-toggle="modal"]', function (e) {
	    var $this   = $(this)
	    var href    = $this.attr('href')
	    var $target = $($this.attr('data-target') || (href && href.replace(/.*(?=#[^\s]+$)/, ''))) // strip for ie7
	    var option  = $target.data('bs.modal') ? 'toggle' : $.extend({ remote: !/#/.test(href) && href }, $target.data(), $this.data())

	    if ($this.is('a')) e.preventDefault()

	    $target.one('show.bs.modal', function (showEvent) {
	      if (showEvent.isDefaultPrevented()) return // only register focus restorer if modal will actually get shown
	      $target.one('hidden.bs.modal', function () {
	        $this.is(':visible') && $this.trigger('focus')
	      })
	    })
	    Plugin.call($target, option, this)
	  })

	}(jQuery);

	/* ========================================================================
	 * Bootstrap: tooltip.js v3.3.6
	 * http://getbootstrap.com/javascript/#tooltip
	 * Inspired by the original jQuery.tipsy by Jason Frame
	 * ========================================================================
	 * Copyright 2011-2015 Twitter, Inc.
	 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
	 * ======================================================================== */


	+function ($) {
	  'use strict';

	  // TOOLTIP PUBLIC CLASS DEFINITION
	  // ===============================

	  var Tooltip = function (element, options) {
	    this.type       = null
	    this.options    = null
	    this.enabled    = null
	    this.timeout    = null
	    this.hoverState = null
	    this.$element   = null
	    this.inState    = null

	    this.init('tooltip', element, options)
	  }

	  Tooltip.VERSION  = '3.3.6'

	  Tooltip.TRANSITION_DURATION = 150

	  Tooltip.DEFAULTS = {
	    animation: true,
	    placement: 'top',
	    selector: false,
	    template: '<div class="tooltip" role="tooltip"><div class="tooltip-arrow"></div><div class="tooltip-inner"></div></div>',
	    trigger: 'hover focus',
	    title: '',
	    delay: 0,
	    html: false,
	    container: false,
	    viewport: {
	      selector: 'body',
	      padding: 0
	    }
	  }

	  Tooltip.prototype.init = function (type, element, options) {
	    this.enabled   = true
	    this.type      = type
	    this.$element  = $(element)
	    this.options   = this.getOptions(options)
	    this.$viewport = this.options.viewport && $($.isFunction(this.options.viewport) ? this.options.viewport.call(this, this.$element) : (this.options.viewport.selector || this.options.viewport))
	    this.inState   = { click: false, hover: false, focus: false }

	    if (this.$element[0] instanceof document.constructor && !this.options.selector) {
	      throw new Error('`selector` option must be specified when initializing ' + this.type + ' on the window.document object!')
	    }

	    var triggers = this.options.trigger.split(' ')

	    for (var i = triggers.length; i--;) {
	      var trigger = triggers[i]

	      if (trigger == 'click') {
	        this.$element.on('click.' + this.type, this.options.selector, $.proxy(this.toggle, this))
	      } else if (trigger != 'manual') {
	        var eventIn  = trigger == 'hover' ? 'mouseenter' : 'focusin'
	        var eventOut = trigger == 'hover' ? 'mouseleave' : 'focusout'

	        this.$element.on(eventIn  + '.' + this.type, this.options.selector, $.proxy(this.enter, this))
	        this.$element.on(eventOut + '.' + this.type, this.options.selector, $.proxy(this.leave, this))
	      }
	    }

	    this.options.selector ?
	      (this._options = $.extend({}, this.options, { trigger: 'manual', selector: '' })) :
	      this.fixTitle()
	  }

	  Tooltip.prototype.getDefaults = function () {
	    return Tooltip.DEFAULTS
	  }

	  Tooltip.prototype.getOptions = function (options) {
	    options = $.extend({}, this.getDefaults(), this.$element.data(), options)

	    if (options.delay && typeof options.delay == 'number') {
	      options.delay = {
	        show: options.delay,
	        hide: options.delay
	      }
	    }

	    return options
	  }

	  Tooltip.prototype.getDelegateOptions = function () {
	    var options  = {}
	    var defaults = this.getDefaults()

	    this._options && $.each(this._options, function (key, value) {
	      if (defaults[key] != value) options[key] = value
	    })

	    return options
	  }

	  Tooltip.prototype.enter = function (obj) {
	    var self = obj instanceof this.constructor ?
	      obj : $(obj.currentTarget).data('bs.' + this.type)

	    if (!self) {
	      self = new this.constructor(obj.currentTarget, this.getDelegateOptions())
	      $(obj.currentTarget).data('bs.' + this.type, self)
	    }

	    if (obj instanceof $.Event) {
	      self.inState[obj.type == 'focusin' ? 'focus' : 'hover'] = true
	    }

	    if (self.tip().hasClass('in') || self.hoverState == 'in') {
	      self.hoverState = 'in'
	      return
	    }

	    clearTimeout(self.timeout)

	    self.hoverState = 'in'

	    if (!self.options.delay || !self.options.delay.show) return self.show()

	    self.timeout = setTimeout(function () {
	      if (self.hoverState == 'in') self.show()
	    }, self.options.delay.show)
	  }

	  Tooltip.prototype.isInStateTrue = function () {
	    for (var key in this.inState) {
	      if (this.inState[key]) return true
	    }

	    return false
	  }

	  Tooltip.prototype.leave = function (obj) {
	    var self = obj instanceof this.constructor ?
	      obj : $(obj.currentTarget).data('bs.' + this.type)

	    if (!self) {
	      self = new this.constructor(obj.currentTarget, this.getDelegateOptions())
	      $(obj.currentTarget).data('bs.' + this.type, self)
	    }

	    if (obj instanceof $.Event) {
	      self.inState[obj.type == 'focusout' ? 'focus' : 'hover'] = false
	    }

	    if (self.isInStateTrue()) return

	    clearTimeout(self.timeout)

	    self.hoverState = 'out'

	    if (!self.options.delay || !self.options.delay.hide) return self.hide()

	    self.timeout = setTimeout(function () {
	      if (self.hoverState == 'out') self.hide()
	    }, self.options.delay.hide)
	  }

	  Tooltip.prototype.show = function () {
	    var e = $.Event('show.bs.' + this.type)

	    if (this.hasContent() && this.enabled) {
	      this.$element.trigger(e)

	      var inDom = $.contains(this.$element[0].ownerDocument.documentElement, this.$element[0])
	      if (e.isDefaultPrevented() || !inDom) return
	      var that = this

	      var $tip = this.tip()

	      var tipId = this.getUID(this.type)

	      this.setContent()
	      $tip.attr('id', tipId)
	      this.$element.attr('aria-describedby', tipId)

	      if (this.options.animation) $tip.addClass('fade')

	      var placement = typeof this.options.placement == 'function' ?
	        this.options.placement.call(this, $tip[0], this.$element[0]) :
	        this.options.placement

	      var autoToken = /\s?auto?\s?/i
	      var autoPlace = autoToken.test(placement)
	      if (autoPlace) placement = placement.replace(autoToken, '') || 'top'

	      $tip
	        .detach()
	        .css({ top: 0, left: 0, display: 'block' })
	        .addClass(placement)
	        .data('bs.' + this.type, this)

	      this.options.container ? $tip.appendTo(this.options.container) : $tip.insertAfter(this.$element)
	      this.$element.trigger('inserted.bs.' + this.type)

	      var pos          = this.getPosition()
	      var actualWidth  = $tip[0].offsetWidth
	      var actualHeight = $tip[0].offsetHeight

	      if (autoPlace) {
	        var orgPlacement = placement
	        var viewportDim = this.getPosition(this.$viewport)

	        placement = placement == 'bottom' && pos.bottom + actualHeight > viewportDim.bottom ? 'top'    :
	                    placement == 'top'    && pos.top    - actualHeight < viewportDim.top    ? 'bottom' :
	                    placement == 'right'  && pos.right  + actualWidth  > viewportDim.width  ? 'left'   :
	                    placement == 'left'   && pos.left   - actualWidth  < viewportDim.left   ? 'right'  :
	                    placement

	        $tip
	          .removeClass(orgPlacement)
	          .addClass(placement)
	      }

	      var calculatedOffset = this.getCalculatedOffset(placement, pos, actualWidth, actualHeight)

	      this.applyPlacement(calculatedOffset, placement)

	      var complete = function () {
	        var prevHoverState = that.hoverState
	        that.$element.trigger('shown.bs.' + that.type)
	        that.hoverState = null

	        if (prevHoverState == 'out') that.leave(that)
	      }

	      $.support.transition && this.$tip.hasClass('fade') ?
	        $tip
	          .one('bsTransitionEnd', complete)
	          .emulateTransitionEnd(Tooltip.TRANSITION_DURATION) :
	        complete()
	    }
	  }

	  Tooltip.prototype.applyPlacement = function (offset, placement) {
	    var $tip   = this.tip()
	    var width  = $tip[0].offsetWidth
	    var height = $tip[0].offsetHeight

	    // manually read margins because getBoundingClientRect includes difference
	    var marginTop = parseInt($tip.css('margin-top'), 10)
	    var marginLeft = parseInt($tip.css('margin-left'), 10)

	    // we must check for NaN for ie 8/9
	    if (isNaN(marginTop))  marginTop  = 0
	    if (isNaN(marginLeft)) marginLeft = 0

	    offset.top  += marginTop
	    offset.left += marginLeft

	    // $.fn.offset doesn't round pixel values
	    // so we use setOffset directly with our own function B-0
	    $.offset.setOffset($tip[0], $.extend({
	      using: function (props) {
	        $tip.css({
	          top: Math.round(props.top),
	          left: Math.round(props.left)
	        })
	      }
	    }, offset), 0)

	    $tip.addClass('in')

	    // check to see if placing tip in new offset caused the tip to resize itself
	    var actualWidth  = $tip[0].offsetWidth
	    var actualHeight = $tip[0].offsetHeight

	    if (placement == 'top' && actualHeight != height) {
	      offset.top = offset.top + height - actualHeight
	    }

	    var delta = this.getViewportAdjustedDelta(placement, offset, actualWidth, actualHeight)

	    if (delta.left) offset.left += delta.left
	    else offset.top += delta.top

	    var isVertical          = /top|bottom/.test(placement)
	    var arrowDelta          = isVertical ? delta.left * 2 - width + actualWidth : delta.top * 2 - height + actualHeight
	    var arrowOffsetPosition = isVertical ? 'offsetWidth' : 'offsetHeight'

	    $tip.offset(offset)
	    this.replaceArrow(arrowDelta, $tip[0][arrowOffsetPosition], isVertical)
	  }

	  Tooltip.prototype.replaceArrow = function (delta, dimension, isVertical) {
	    this.arrow()
	      .css(isVertical ? 'left' : 'top', 50 * (1 - delta / dimension) + '%')
	      .css(isVertical ? 'top' : 'left', '')
	  }

	  Tooltip.prototype.setContent = function () {
	    var $tip  = this.tip()
	    var title = this.getTitle()

	    $tip.find('.tooltip-inner')[this.options.html ? 'html' : 'text'](title)
	    $tip.removeClass('fade in top bottom left right')
	  }

	  Tooltip.prototype.hide = function (callback) {
	    var that = this
	    var $tip = $(this.$tip)
	    var e    = $.Event('hide.bs.' + this.type)

	    function complete() {
	      if (that.hoverState != 'in') $tip.detach()
	      that.$element
	        .removeAttr('aria-describedby')
	        .trigger('hidden.bs.' + that.type)
	      callback && callback()
	    }

	    this.$element.trigger(e)

	    if (e.isDefaultPrevented()) return

	    $tip.removeClass('in')

	    $.support.transition && $tip.hasClass('fade') ?
	      $tip
	        .one('bsTransitionEnd', complete)
	        .emulateTransitionEnd(Tooltip.TRANSITION_DURATION) :
	      complete()

	    this.hoverState = null

	    return this
	  }

	  Tooltip.prototype.fixTitle = function () {
	    var $e = this.$element
	    if ($e.attr('title') || typeof $e.attr('data-original-title') != 'string') {
	      $e.attr('data-original-title', $e.attr('title') || '').attr('title', '')
	    }
	  }

	  Tooltip.prototype.hasContent = function () {
	    return this.getTitle()
	  }

	  Tooltip.prototype.getPosition = function ($element) {
	    $element   = $element || this.$element

	    var el     = $element[0]
	    var isBody = el.tagName == 'BODY'

	    var elRect    = el.getBoundingClientRect()
	    if (elRect.width == null) {
	      // width and height are missing in IE8, so compute them manually; see https://github.com/twbs/bootstrap/issues/14093
	      elRect = $.extend({}, elRect, { width: elRect.right - elRect.left, height: elRect.bottom - elRect.top })
	    }
	    var elOffset  = isBody ? { top: 0, left: 0 } : $element.offset()
	    var scroll    = { scroll: isBody ? document.documentElement.scrollTop || document.body.scrollTop : $element.scrollTop() }
	    var outerDims = isBody ? { width: $(window).width(), height: $(window).height() } : null

	    return $.extend({}, elRect, scroll, outerDims, elOffset)
	  }

	  Tooltip.prototype.getCalculatedOffset = function (placement, pos, actualWidth, actualHeight) {
	    return placement == 'bottom' ? { top: pos.top + pos.height,   left: pos.left + pos.width / 2 - actualWidth / 2 } :
	           placement == 'top'    ? { top: pos.top - actualHeight, left: pos.left + pos.width / 2 - actualWidth / 2 } :
	           placement == 'left'   ? { top: pos.top + pos.height / 2 - actualHeight / 2, left: pos.left - actualWidth } :
	        /* placement == 'right' */ { top: pos.top + pos.height / 2 - actualHeight / 2, left: pos.left + pos.width }

	  }

	  Tooltip.prototype.getViewportAdjustedDelta = function (placement, pos, actualWidth, actualHeight) {
	    var delta = { top: 0, left: 0 }
	    if (!this.$viewport) return delta

	    var viewportPadding = this.options.viewport && this.options.viewport.padding || 0
	    var viewportDimensions = this.getPosition(this.$viewport)

	    if (/right|left/.test(placement)) {
	      var topEdgeOffset    = pos.top - viewportPadding - viewportDimensions.scroll
	      var bottomEdgeOffset = pos.top + viewportPadding - viewportDimensions.scroll + actualHeight
	      if (topEdgeOffset < viewportDimensions.top) { // top overflow
	        delta.top = viewportDimensions.top - topEdgeOffset
	      } else if (bottomEdgeOffset > viewportDimensions.top + viewportDimensions.height) { // bottom overflow
	        delta.top = viewportDimensions.top + viewportDimensions.height - bottomEdgeOffset
	      }
	    } else {
	      var leftEdgeOffset  = pos.left - viewportPadding
	      var rightEdgeOffset = pos.left + viewportPadding + actualWidth
	      if (leftEdgeOffset < viewportDimensions.left) { // left overflow
	        delta.left = viewportDimensions.left - leftEdgeOffset
	      } else if (rightEdgeOffset > viewportDimensions.right) { // right overflow
	        delta.left = viewportDimensions.left + viewportDimensions.width - rightEdgeOffset
	      }
	    }

	    return delta
	  }

	  Tooltip.prototype.getTitle = function () {
	    var title
	    var $e = this.$element
	    var o  = this.options

	    title = $e.attr('data-original-title')
	      || (typeof o.title == 'function' ? o.title.call($e[0]) :  o.title)

	    return title
	  }

	  Tooltip.prototype.getUID = function (prefix) {
	    do prefix += ~~(Math.random() * 1000000)
	    while (document.getElementById(prefix))
	    return prefix
	  }

	  Tooltip.prototype.tip = function () {
	    if (!this.$tip) {
	      this.$tip = $(this.options.template)
	      if (this.$tip.length != 1) {
	        throw new Error(this.type + ' `template` option must consist of exactly 1 top-level element!')
	      }
	    }
	    return this.$tip
	  }

	  Tooltip.prototype.arrow = function () {
	    return (this.$arrow = this.$arrow || this.tip().find('.tooltip-arrow'))
	  }

	  Tooltip.prototype.enable = function () {
	    this.enabled = true
	  }

	  Tooltip.prototype.disable = function () {
	    this.enabled = false
	  }

	  Tooltip.prototype.toggleEnabled = function () {
	    this.enabled = !this.enabled
	  }

	  Tooltip.prototype.toggle = function (e) {
	    var self = this
	    if (e) {
	      self = $(e.currentTarget).data('bs.' + this.type)
	      if (!self) {
	        self = new this.constructor(e.currentTarget, this.getDelegateOptions())
	        $(e.currentTarget).data('bs.' + this.type, self)
	      }
	    }

	    if (e) {
	      self.inState.click = !self.inState.click
	      if (self.isInStateTrue()) self.enter(self)
	      else self.leave(self)
	    } else {
	      self.tip().hasClass('in') ? self.leave(self) : self.enter(self)
	    }
	  }

	  Tooltip.prototype.destroy = function () {
	    var that = this
	    clearTimeout(this.timeout)
	    this.hide(function () {
	      that.$element.off('.' + that.type).removeData('bs.' + that.type)
	      if (that.$tip) {
	        that.$tip.detach()
	      }
	      that.$tip = null
	      that.$arrow = null
	      that.$viewport = null
	    })
	  }


	  // TOOLTIP PLUGIN DEFINITION
	  // =========================

	  function Plugin(option) {
	    return this.each(function () {
	      var $this   = $(this)
	      var data    = $this.data('bs.tooltip')
	      var options = typeof option == 'object' && option

	      if (!data && /destroy|hide/.test(option)) return
	      if (!data) $this.data('bs.tooltip', (data = new Tooltip(this, options)))
	      if (typeof option == 'string') data[option]()
	    })
	  }

	  var old = $.fn.tooltip

	  $.fn.tooltip             = Plugin
	  $.fn.tooltip.Constructor = Tooltip


	  // TOOLTIP NO CONFLICT
	  // ===================

	  $.fn.tooltip.noConflict = function () {
	    $.fn.tooltip = old
	    return this
	  }

	}(jQuery);

	/* ========================================================================
	 * Bootstrap: popover.js v3.3.6
	 * http://getbootstrap.com/javascript/#popovers
	 * ========================================================================
	 * Copyright 2011-2015 Twitter, Inc.
	 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
	 * ======================================================================== */


	+function ($) {
	  'use strict';

	  // POPOVER PUBLIC CLASS DEFINITION
	  // ===============================

	  var Popover = function (element, options) {
	    this.init('popover', element, options)
	  }

	  if (!$.fn.tooltip) throw new Error('Popover requires tooltip.js')

	  Popover.VERSION  = '3.3.6'

	  Popover.DEFAULTS = $.extend({}, $.fn.tooltip.Constructor.DEFAULTS, {
	    placement: 'right',
	    trigger: 'click',
	    content: '',
	    template: '<div class="popover" role="tooltip"><div class="arrow"></div><h3 class="popover-title"></h3><div class="popover-content"></div></div>'
	  })


	  // NOTE: POPOVER EXTENDS tooltip.js
	  // ================================

	  Popover.prototype = $.extend({}, $.fn.tooltip.Constructor.prototype)

	  Popover.prototype.constructor = Popover

	  Popover.prototype.getDefaults = function () {
	    return Popover.DEFAULTS
	  }

	  Popover.prototype.setContent = function () {
	    var $tip    = this.tip()
	    var title   = this.getTitle()
	    var content = this.getContent()

	    $tip.find('.popover-title')[this.options.html ? 'html' : 'text'](title)
	    $tip.find('.popover-content').children().detach().end()[ // we use append for html objects to maintain js events
	      this.options.html ? (typeof content == 'string' ? 'html' : 'append') : 'text'
	    ](content)

	    $tip.removeClass('fade top bottom left right in')

	    // IE8 doesn't accept hiding via the `:empty` pseudo selector, we have to do
	    // this manually by checking the contents.
	    if (!$tip.find('.popover-title').html()) $tip.find('.popover-title').hide()
	  }

	  Popover.prototype.hasContent = function () {
	    return this.getTitle() || this.getContent()
	  }

	  Popover.prototype.getContent = function () {
	    var $e = this.$element
	    var o  = this.options

	    return $e.attr('data-content')
	      || (typeof o.content == 'function' ?
	            o.content.call($e[0]) :
	            o.content)
	  }

	  Popover.prototype.arrow = function () {
	    return (this.$arrow = this.$arrow || this.tip().find('.arrow'))
	  }


	  // POPOVER PLUGIN DEFINITION
	  // =========================

	  function Plugin(option) {
	    return this.each(function () {
	      var $this   = $(this)
	      var data    = $this.data('bs.popover')
	      var options = typeof option == 'object' && option

	      if (!data && /destroy|hide/.test(option)) return
	      if (!data) $this.data('bs.popover', (data = new Popover(this, options)))
	      if (typeof option == 'string') data[option]()
	    })
	  }

	  var old = $.fn.popover

	  $.fn.popover             = Plugin
	  $.fn.popover.Constructor = Popover


	  // POPOVER NO CONFLICT
	  // ===================

	  $.fn.popover.noConflict = function () {
	    $.fn.popover = old
	    return this
	  }

	}(jQuery);

	/* ========================================================================
	 * Bootstrap: scrollspy.js v3.3.6
	 * http://getbootstrap.com/javascript/#scrollspy
	 * ========================================================================
	 * Copyright 2011-2015 Twitter, Inc.
	 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
	 * ======================================================================== */


	+function ($) {
	  'use strict';

	  // SCROLLSPY CLASS DEFINITION
	  // ==========================

	  function ScrollSpy(element, options) {
	    this.$body          = $(document.body)
	    this.$scrollElement = $(element).is(document.body) ? $(window) : $(element)
	    this.options        = $.extend({}, ScrollSpy.DEFAULTS, options)
	    this.selector       = (this.options.target || '') + ' .nav li > a'
	    this.offsets        = []
	    this.targets        = []
	    this.activeTarget   = null
	    this.scrollHeight   = 0

	    this.$scrollElement.on('scroll.bs.scrollspy', $.proxy(this.process, this))
	    this.refresh()
	    this.process()
	  }

	  ScrollSpy.VERSION  = '3.3.6'

	  ScrollSpy.DEFAULTS = {
	    offset: 10
	  }

	  ScrollSpy.prototype.getScrollHeight = function () {
	    return this.$scrollElement[0].scrollHeight || Math.max(this.$body[0].scrollHeight, document.documentElement.scrollHeight)
	  }

	  ScrollSpy.prototype.refresh = function () {
	    var that          = this
	    var offsetMethod  = 'offset'
	    var offsetBase    = 0

	    this.offsets      = []
	    this.targets      = []
	    this.scrollHeight = this.getScrollHeight()

	    if (!$.isWindow(this.$scrollElement[0])) {
	      offsetMethod = 'position'
	      offsetBase   = this.$scrollElement.scrollTop()
	    }

	    this.$body
	      .find(this.selector)
	      .map(function () {
	        var $el   = $(this)
	        var href  = $el.data('target') || $el.attr('href')
	        var $href = /^#./.test(href) && $(href)

	        return ($href
	          && $href.length
	          && $href.is(':visible')
	          && [[$href[offsetMethod]().top + offsetBase, href]]) || null
	      })
	      .sort(function (a, b) { return a[0] - b[0] })
	      .each(function () {
	        that.offsets.push(this[0])
	        that.targets.push(this[1])
	      })
	  }

	  ScrollSpy.prototype.process = function () {
	    var scrollTop    = this.$scrollElement.scrollTop() + this.options.offset
	    var scrollHeight = this.getScrollHeight()
	    var maxScroll    = this.options.offset + scrollHeight - this.$scrollElement.height()
	    var offsets      = this.offsets
	    var targets      = this.targets
	    var activeTarget = this.activeTarget
	    var i

	    if (this.scrollHeight != scrollHeight) {
	      this.refresh()
	    }

	    if (scrollTop >= maxScroll) {
	      return activeTarget != (i = targets[targets.length - 1]) && this.activate(i)
	    }

	    if (activeTarget && scrollTop < offsets[0]) {
	      this.activeTarget = null
	      return this.clear()
	    }

	    for (i = offsets.length; i--;) {
	      activeTarget != targets[i]
	        && scrollTop >= offsets[i]
	        && (offsets[i + 1] === undefined || scrollTop < offsets[i + 1])
	        && this.activate(targets[i])
	    }
	  }

	  ScrollSpy.prototype.activate = function (target) {
	    this.activeTarget = target

	    this.clear()

	    var selector = this.selector +
	      '[data-target="' + target + '"],' +
	      this.selector + '[href="' + target + '"]'

	    var active = $(selector)
	      .parents('li')
	      .addClass('active')

	    if (active.parent('.dropdown-menu').length) {
	      active = active
	        .closest('li.dropdown')
	        .addClass('active')
	    }

	    active.trigger('activate.bs.scrollspy')
	  }

	  ScrollSpy.prototype.clear = function () {
	    $(this.selector)
	      .parentsUntil(this.options.target, '.active')
	      .removeClass('active')
	  }


	  // SCROLLSPY PLUGIN DEFINITION
	  // ===========================

	  function Plugin(option) {
	    return this.each(function () {
	      var $this   = $(this)
	      var data    = $this.data('bs.scrollspy')
	      var options = typeof option == 'object' && option

	      if (!data) $this.data('bs.scrollspy', (data = new ScrollSpy(this, options)))
	      if (typeof option == 'string') data[option]()
	    })
	  }

	  var old = $.fn.scrollspy

	  $.fn.scrollspy             = Plugin
	  $.fn.scrollspy.Constructor = ScrollSpy


	  // SCROLLSPY NO CONFLICT
	  // =====================

	  $.fn.scrollspy.noConflict = function () {
	    $.fn.scrollspy = old
	    return this
	  }


	  // SCROLLSPY DATA-API
	  // ==================

	  $(window).on('load.bs.scrollspy.data-api', function () {
	    $('[data-spy="scroll"]').each(function () {
	      var $spy = $(this)
	      Plugin.call($spy, $spy.data())
	    })
	  })

	}(jQuery);

	/* ========================================================================
	 * Bootstrap: tab.js v3.3.6
	 * http://getbootstrap.com/javascript/#tabs
	 * ========================================================================
	 * Copyright 2011-2015 Twitter, Inc.
	 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
	 * ======================================================================== */


	+function ($) {
	  'use strict';

	  // TAB CLASS DEFINITION
	  // ====================

	  var Tab = function (element) {
	    // jscs:disable requireDollarBeforejQueryAssignment
	    this.element = $(element)
	    // jscs:enable requireDollarBeforejQueryAssignment
	  }

	  Tab.VERSION = '3.3.6'

	  Tab.TRANSITION_DURATION = 150

	  Tab.prototype.show = function () {
	    var $this    = this.element
	    var $ul      = $this.closest('ul:not(.dropdown-menu)')
	    var selector = $this.data('target')

	    if (!selector) {
	      selector = $this.attr('href')
	      selector = selector && selector.replace(/.*(?=#[^\s]*$)/, '') // strip for ie7
	    }

	    if ($this.parent('li').hasClass('active')) return

	    var $previous = $ul.find('.active:last a')
	    var hideEvent = $.Event('hide.bs.tab', {
	      relatedTarget: $this[0]
	    })
	    var showEvent = $.Event('show.bs.tab', {
	      relatedTarget: $previous[0]
	    })

	    $previous.trigger(hideEvent)
	    $this.trigger(showEvent)

	    if (showEvent.isDefaultPrevented() || hideEvent.isDefaultPrevented()) return

	    var $target = $(selector)

	    this.activate($this.closest('li'), $ul)
	    this.activate($target, $target.parent(), function () {
	      $previous.trigger({
	        type: 'hidden.bs.tab',
	        relatedTarget: $this[0]
	      })
	      $this.trigger({
	        type: 'shown.bs.tab',
	        relatedTarget: $previous[0]
	      })
	    })
	  }

	  Tab.prototype.activate = function (element, container, callback) {
	    var $active    = container.find('> .active')
	    var transition = callback
	      && $.support.transition
	      && ($active.length && $active.hasClass('fade') || !!container.find('> .fade').length)

	    function next() {
	      $active
	        .removeClass('active')
	        .find('> .dropdown-menu > .active')
	          .removeClass('active')
	        .end()
	        .find('[data-toggle="tab"]')
	          .attr('aria-expanded', false)

	      element
	        .addClass('active')
	        .find('[data-toggle="tab"]')
	          .attr('aria-expanded', true)

	      if (transition) {
	        element[0].offsetWidth // reflow for transition
	        element.addClass('in')
	      } else {
	        element.removeClass('fade')
	      }

	      if (element.parent('.dropdown-menu').length) {
	        element
	          .closest('li.dropdown')
	            .addClass('active')
	          .end()
	          .find('[data-toggle="tab"]')
	            .attr('aria-expanded', true)
	      }

	      callback && callback()
	    }

	    $active.length && transition ?
	      $active
	        .one('bsTransitionEnd', next)
	        .emulateTransitionEnd(Tab.TRANSITION_DURATION) :
	      next()

	    $active.removeClass('in')
	  }


	  // TAB PLUGIN DEFINITION
	  // =====================

	  function Plugin(option) {
	    return this.each(function () {
	      var $this = $(this)
	      var data  = $this.data('bs.tab')

	      if (!data) $this.data('bs.tab', (data = new Tab(this)))
	      if (typeof option == 'string') data[option]()
	    })
	  }

	  var old = $.fn.tab

	  $.fn.tab             = Plugin
	  $.fn.tab.Constructor = Tab


	  // TAB NO CONFLICT
	  // ===============

	  $.fn.tab.noConflict = function () {
	    $.fn.tab = old
	    return this
	  }


	  // TAB DATA-API
	  // ============

	  var clickHandler = function (e) {
	    e.preventDefault()
	    Plugin.call($(this), 'show')
	  }

	  $(document)
	    .on('click.bs.tab.data-api', '[data-toggle="tab"]', clickHandler)
	    .on('click.bs.tab.data-api', '[data-toggle="pill"]', clickHandler)

	}(jQuery);

	/* ========================================================================
	 * Bootstrap: affix.js v3.3.6
	 * http://getbootstrap.com/javascript/#affix
	 * ========================================================================
	 * Copyright 2011-2015 Twitter, Inc.
	 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
	 * ======================================================================== */


	+function ($) {
	  'use strict';

	  // AFFIX CLASS DEFINITION
	  // ======================

	  var Affix = function (element, options) {
	    this.options = $.extend({}, Affix.DEFAULTS, options)

	    this.$target = $(this.options.target)
	      .on('scroll.bs.affix.data-api', $.proxy(this.checkPosition, this))
	      .on('click.bs.affix.data-api',  $.proxy(this.checkPositionWithEventLoop, this))

	    this.$element     = $(element)
	    this.affixed      = null
	    this.unpin        = null
	    this.pinnedOffset = null

	    this.checkPosition()
	  }

	  Affix.VERSION  = '3.3.6'

	  Affix.RESET    = 'affix affix-top affix-bottom'

	  Affix.DEFAULTS = {
	    offset: 0,
	    target: window
	  }

	  Affix.prototype.getState = function (scrollHeight, height, offsetTop, offsetBottom) {
	    var scrollTop    = this.$target.scrollTop()
	    var position     = this.$element.offset()
	    var targetHeight = this.$target.height()

	    if (offsetTop != null && this.affixed == 'top') return scrollTop < offsetTop ? 'top' : false

	    if (this.affixed == 'bottom') {
	      if (offsetTop != null) return (scrollTop + this.unpin <= position.top) ? false : 'bottom'
	      return (scrollTop + targetHeight <= scrollHeight - offsetBottom) ? false : 'bottom'
	    }

	    var initializing   = this.affixed == null
	    var colliderTop    = initializing ? scrollTop : position.top
	    var colliderHeight = initializing ? targetHeight : height

	    if (offsetTop != null && scrollTop <= offsetTop) return 'top'
	    if (offsetBottom != null && (colliderTop + colliderHeight >= scrollHeight - offsetBottom)) return 'bottom'

	    return false
	  }

	  Affix.prototype.getPinnedOffset = function () {
	    if (this.pinnedOffset) return this.pinnedOffset
	    this.$element.removeClass(Affix.RESET).addClass('affix')
	    var scrollTop = this.$target.scrollTop()
	    var position  = this.$element.offset()
	    return (this.pinnedOffset = position.top - scrollTop)
	  }

	  Affix.prototype.checkPositionWithEventLoop = function () {
	    setTimeout($.proxy(this.checkPosition, this), 1)
	  }

	  Affix.prototype.checkPosition = function () {
	    if (!this.$element.is(':visible')) return

	    var height       = this.$element.height()
	    var offset       = this.options.offset
	    var offsetTop    = offset.top
	    var offsetBottom = offset.bottom
	    var scrollHeight = Math.max($(document).height(), $(document.body).height())

	    if (typeof offset != 'object')         offsetBottom = offsetTop = offset
	    if (typeof offsetTop == 'function')    offsetTop    = offset.top(this.$element)
	    if (typeof offsetBottom == 'function') offsetBottom = offset.bottom(this.$element)

	    var affix = this.getState(scrollHeight, height, offsetTop, offsetBottom)

	    if (this.affixed != affix) {
	      if (this.unpin != null) this.$element.css('top', '')

	      var affixType = 'affix' + (affix ? '-' + affix : '')
	      var e         = $.Event(affixType + '.bs.affix')

	      this.$element.trigger(e)

	      if (e.isDefaultPrevented()) return

	      this.affixed = affix
	      this.unpin = affix == 'bottom' ? this.getPinnedOffset() : null

	      this.$element
	        .removeClass(Affix.RESET)
	        .addClass(affixType)
	        .trigger(affixType.replace('affix', 'affixed') + '.bs.affix')
	    }

	    if (affix == 'bottom') {
	      this.$element.offset({
	        top: scrollHeight - height - offsetBottom
	      })
	    }
	  }


	  // AFFIX PLUGIN DEFINITION
	  // =======================

	  function Plugin(option) {
	    return this.each(function () {
	      var $this   = $(this)
	      var data    = $this.data('bs.affix')
	      var options = typeof option == 'object' && option

	      if (!data) $this.data('bs.affix', (data = new Affix(this, options)))
	      if (typeof option == 'string') data[option]()
	    })
	  }

	  var old = $.fn.affix

	  $.fn.affix             = Plugin
	  $.fn.affix.Constructor = Affix


	  // AFFIX NO CONFLICT
	  // =================

	  $.fn.affix.noConflict = function () {
	    $.fn.affix = old
	    return this
	  }


	  // AFFIX DATA-API
	  // ==============

	  $(window).on('load', function () {
	    $('[data-spy="affix"]').each(function () {
	      var $spy = $(this)
	      var data = $spy.data()

	      data.offset = data.offset || {}

	      if (data.offsetBottom != null) data.offset.bottom = data.offsetBottom
	      if (data.offsetTop    != null) data.offset.top    = data.offsetTop

	      Plugin.call($spy, data)
	    })
	  })

	}(jQuery);


/***/ },

/***/ 111:
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;/*
	 * metismenu - v2.4.0
	 * A jQuery menu plugin
	 * https://github.com/onokumus/metisMenu#readme
	 *
	 * Made by Osman Nuri Okumuş <onokumus@gmail.com> (https://github.com/onokumus)
	 * Under MIT License
	 */

	(function(root, factory) {
	  if (true) {
	    !(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(82)], __WEBPACK_AMD_DEFINE_FACTORY__ = (factory), __WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ? (__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
	  } else if (typeof exports === 'object') {
	    module.exports = factory(require('jquery'));
	  } else {
	    root.sortable = factory(root.jQuery);
	  }
	}(this, function($) {
	  'use strict';

	  function transitionEnd() {
	    var el = document.createElement('mm');

	    var transEndEventNames = {
	      WebkitTransition: 'webkitTransitionEnd',
	      MozTransition: 'transitionend',
	      OTransition: 'oTransitionEnd otransitionend',
	      transition: 'transitionend'
	    };

	    for (var name in transEndEventNames) {
	      if (el.style[name] !== undefined) {
	        return {
	          end: transEndEventNames[name]
	        };
	      }
	    }
	    return false;
	  }

	  $.fn.emulateTransitionEnd = function(duration) {
	    var called = false;
	    var $el = this;
	    $(this).one('mmTransitionEnd', function() {
	      called = true;
	    });
	    var callback = function() {
	      if (!called) {
	        $($el).trigger($transition.end);
	      }
	    };
	    setTimeout(callback, duration);
	    return this;
	  };

	  var $transition = transitionEnd();
	  if (!!$transition) {
	    $.event.special.mmTransitionEnd = {
	      bindType: $transition.end,
	      delegateType: $transition.end,
	      handle: function(e) {
	        if ($(e.target).is(this)) {
	          return e.
	          handleObj.
	          handler.
	          apply(this, arguments);
	        }
	      }
	    };
	  }

	  var MetisMenu = function(element, options) {
	    this.$element = $(element);
	    this.options = $.extend({}, MetisMenu.DEFAULTS, options);
	    this.transitioning = null;

	    this.init();
	  };

	  MetisMenu.TRANSITION_DURATION = 350;

	  MetisMenu.DEFAULTS = {
	    toggle: true,
	    doubleTapToGo: false,
	    preventDefault: true,
	    activeClass: 'active',
	    collapseClass: 'collapse',
	    collapseInClass: 'in',
	    collapsingClass: 'collapsing',
	    onTransitionStart: false,
	    onTransitionEnd: false
	  };

	  MetisMenu.prototype.init = function() {
	    var $this = this;
	    var activeClass = this.options.activeClass;
	    var collapseClass = this.options.collapseClass;
	    var collapseInClass = this.options.collapseInClass;

	    this
	      .$element
	      .find('li.' + activeClass)
	      .has('ul')
	      .children('ul')
	      .attr('aria-expanded', true)
	      .addClass(collapseClass + ' ' + collapseInClass);

	    this
	      .$element
	      .find('li')
	      .not('.' + activeClass)
	      .has('ul')
	      .children('ul')
	      .attr('aria-expanded', false)
	      .addClass(collapseClass);

	    //add the 'doubleTapToGo' class to active items if needed
	    if (this.options.doubleTapToGo) {
	      this
	        .$element
	        .find('li.' + activeClass)
	        .has('ul')
	        .children('a')
	        .addClass('doubleTapToGo');
	    }

	    this
	      .$element
	      .find('li')
	      .has('ul')
	      .children('a')
	      .on('click.metisMenu', function(e) {
	        var self = $(this);
	        var $parent = self.parent('li');
	        var $list = $parent.children('ul');
	        if($this.options.preventDefault){
	          e.preventDefault();
	        }
	        if(self.attr('aria-disabled') === 'true'){
	            return;
	        }
	        if ($parent.hasClass(activeClass) && !$this.options.doubleTapToGo) {
	          $this.hide($list);
	          self.attr('aria-expanded',false);
	        } else {
	          $this.show($list);
	          self.attr('aria-expanded',true);
	        }

	        if($this.options.onTransitionStart) {
	          $this.options.onTransitionStart();
	        }

	        //Do we need to enable the double tap
	        if ($this.options.doubleTapToGo) {
	          //if we hit a second time on the link and the href is valid, navigate to that url
	          if ($this.doubleTapToGo(self) && self.attr('href') !== '#' && self.attr('href') !== '') {
	            e.stopPropagation();
	            document.location = self.attr('href');
	            return;
	          }
	        }
	      });
	  };

	  MetisMenu.prototype.doubleTapToGo = function(elem) {
	    var $this = this.$element;
	    //if the class 'doubleTapToGo' exists, remove it and return
	    if (elem.hasClass('doubleTapToGo')) {
	      elem.removeClass('doubleTapToGo');
	      return true;
	    }
	    //does not exists, add a new class and return false
	    if (elem.parent().children('ul').length) {
	      //first remove all other class
	      $this
	        .find('.doubleTapToGo')
	        .removeClass('doubleTapToGo');
	      //add the class on the current element
	      elem.addClass('doubleTapToGo');
	      return false;
	    }
	  };

	  MetisMenu.prototype.show = function(el) {
	    var activeClass = this.options.activeClass;
	    var collapseClass = this.options.collapseClass;
	    var collapseInClass = this.options.collapseInClass;
	    var collapsingClass = this.options.collapsingClass;
	    var $this = $(el);
	    var $parent = $this.parent('li');
	    if (this.transitioning || $this.hasClass(collapseInClass)) {
	      return;
	    }

	    $parent.addClass(activeClass);

	    if (this.options.toggle) {
	      this.hide($parent.siblings().children('ul.' + collapseInClass).attr('aria-expanded', false));
	    }

	    $this
	      .removeClass(collapseClass)
	      .addClass(collapsingClass)
	      .height(0);

	    this.transitioning = 1;
	    var complete = function() {
	      if(this.transitioning && this.options.onTransitionEnd) {
	        this.options.onTransitionEnd();
	      }
	      $this
	        .removeClass(collapsingClass)
	        .addClass(collapseClass + ' ' + collapseInClass)
	        .height('')
	        .attr('aria-expanded', true);
	      this.transitioning = 0;
	    };
	    if (!$transition) {
	      return complete.call(this);
	    }
	    $this
	      .one('mmTransitionEnd', $.proxy(complete, this))
	      .emulateTransitionEnd(MetisMenu.TRANSITION_DURATION)
	      .height($this[0].scrollHeight);
	  };

	  MetisMenu.prototype.hide = function(el) {
	    var activeClass = this.options.activeClass;
	    var collapseClass = this.options.collapseClass;
	    var collapseInClass = this.options.collapseInClass;
	    var collapsingClass = this.options.collapsingClass;
	    var $this = $(el);

	    if (this.transitioning || !$this.hasClass(collapseInClass)) {
	      return;
	    }

	    $this.parent('li').removeClass(activeClass);
	    $this.height($this.height())[0].offsetHeight;

	    $this
	      .addClass(collapsingClass)
	      .removeClass(collapseClass)
	      .removeClass(collapseInClass);

	    this.transitioning = 1;

	    var complete = function() {
	      if(this.transitioning && this.options.onTransitionEnd) {
	        this.options.onTransitionEnd();
	      }
	      this.transitioning = 0;
	      $this
	        .removeClass(collapsingClass)
	        .addClass(collapseClass)
	        .attr('aria-expanded', false);
	    };

	    if (!$transition) {
	      return complete.call(this);
	    }
	    $this
	      .height(0)
	      .one('mmTransitionEnd', $.proxy(complete, this))
	      .emulateTransitionEnd(MetisMenu.TRANSITION_DURATION);
	  };

	  function Plugin(option) {
	    return this.each(function() {
	      var $this = $(this);
	      var data = $this.data('mm');
	      var options = $.extend({},
	        MetisMenu.DEFAULTS,
	        $this.data(),
	        typeof option === 'object' && option
	      );

	      if (!data) {
	        $this.data('mm', (data = new MetisMenu(this, options)));
	      }
	      if (typeof option === 'string') {
	        data[option]();
	      }
	    });
	  }

	  var old = $.fn.metisMenu;

	  $.fn.metisMenu = Plugin;
	  $.fn.metisMenu.Constructor = MetisMenu;

	  $.fn.metisMenu.noConflict = function() {
	    $.fn.metisMenu = old;
	    return this;
	  };
	}));


/***/ },

/***/ 112:
/***/ function(module, exports) {

	/*! Copyright (c) 2011 Piotr Rochala (http://rocha.la)
	 * Dual licensed under the MIT (http://www.opensource.org/licenses/mit-license.php)
	 * and GPL (http://www.opensource.org/licenses/gpl-license.php) licenses.
	 *
	 * Version: 1.3.7
	 *
	 */
	(function($) {

	  $.fn.extend({
	    slimScroll: function(options) {

	      var defaults = {

	        // width in pixels of the visible scroll area
	        width : 'auto',

	        // height in pixels of the visible scroll area
	        height : '250px',

	        // width in pixels of the scrollbar and rail
	        size : '7px',

	        // scrollbar color, accepts any hex/color value
	        color: '#000',

	        // scrollbar position - left/right
	        position : 'right',

	        // distance in pixels between the side edge and the scrollbar
	        distance : '1px',

	        // default scroll position on load - top / bottom / $('selector')
	        start : 'top',

	        // sets scrollbar opacity
	        opacity : .4,

	        // enables always-on mode for the scrollbar
	        alwaysVisible : false,

	        // check if we should hide the scrollbar when user is hovering over
	        disableFadeOut : false,

	        // sets visibility of the rail
	        railVisible : false,

	        // sets rail color
	        railColor : '#333',

	        // sets rail opacity
	        railOpacity : .2,

	        // whether  we should use jQuery UI Draggable to enable bar dragging
	        railDraggable : true,

	        // defautlt CSS class of the slimscroll rail
	        railClass : 'slimScrollRail',

	        // defautlt CSS class of the slimscroll bar
	        barClass : 'slimScrollBar',

	        // defautlt CSS class of the slimscroll wrapper
	        wrapperClass : 'slimScrollDiv',

	        // check if mousewheel should scroll the window if we reach top/bottom
	        allowPageScroll : false,

	        // scroll amount applied to each mouse wheel step
	        wheelStep : 20,

	        // scroll amount applied when user is using gestures
	        touchScrollStep : 200,

	        // sets border radius
	        borderRadius: '7px',

	        // sets border radius of the rail
	        railBorderRadius : '7px'
	      };

	      var o = $.extend(defaults, options);

	      // do it for every element that matches selector
	      this.each(function(){

	      var isOverPanel, isOverBar, isDragg, queueHide, touchDif,
	        barHeight, percentScroll, lastScroll,
	        divS = '<div></div>',
	        minBarHeight = 30,
	        releaseScroll = false;

	        // used in event handlers and for better minification
	        var me = $(this);

	        // ensure we are not binding it again
	        if (me.parent().hasClass(o.wrapperClass))
	        {
	            // start from last bar position
	            var offset = me.scrollTop();

	            // find bar and rail
	            bar = me.siblings('.' + o.barClass);
	            rail = me.siblings('.' + o.railClass);

	            getBarHeight();

	            // check if we should scroll existing instance
	            if ($.isPlainObject(options))
	            {
	              // Pass height: auto to an existing slimscroll object to force a resize after contents have changed
	              if ( 'height' in options && options.height == 'auto' ) {
	                me.parent().css('height', 'auto');
	                me.css('height', 'auto');
	                var height = me.parent().parent().height();
	                me.parent().css('height', height);
	                me.css('height', height);
	              } else if ('height' in options) {
	                var h = options.height;
	                me.parent().css('height', h);
	                me.css('height', h);
	              }

	              if ('scrollTo' in options)
	              {
	                // jump to a static point
	                offset = parseInt(o.scrollTo);
	              }
	              else if ('scrollBy' in options)
	              {
	                // jump by value pixels
	                offset += parseInt(o.scrollBy);
	              }
	              else if ('destroy' in options)
	              {
	                // remove slimscroll elements
	                bar.remove();
	                rail.remove();
	                me.unwrap();
	                return;
	              }

	              // scroll content by the given offset
	              scrollContent(offset, false, true);
	            }

	            return;
	        }
	        else if ($.isPlainObject(options))
	        {
	            if ('destroy' in options)
	            {
	            	return;
	            }
	        }

	        // optionally set height to the parent's height
	        o.height = (o.height == 'auto') ? me.parent().height() : o.height;

	        // wrap content
	        var wrapper = $(divS)
	          .addClass(o.wrapperClass)
	          .css({
	            position: 'relative',
	            overflow: 'hidden',
	            width: o.width,
	            height: o.height
	          });

	        // update style for the div
	        me.css({
	          overflow: 'hidden',
	          width: o.width,
	          height: o.height
	        });

	        // create scrollbar rail
	        var rail = $(divS)
	          .addClass(o.railClass)
	          .css({
	            width: o.size,
	            height: '100%',
	            position: 'absolute',
	            top: 0,
	            display: (o.alwaysVisible && o.railVisible) ? 'block' : 'none',
	            'border-radius': o.railBorderRadius,
	            background: o.railColor,
	            opacity: o.railOpacity,
	            zIndex: 90
	          });

	        // create scrollbar
	        var bar = $(divS)
	          .addClass(o.barClass)
	          .css({
	            background: o.color,
	            width: o.size,
	            position: 'absolute',
	            top: 0,
	            opacity: o.opacity,
	            display: o.alwaysVisible ? 'block' : 'none',
	            'border-radius' : o.borderRadius,
	            BorderRadius: o.borderRadius,
	            MozBorderRadius: o.borderRadius,
	            WebkitBorderRadius: o.borderRadius,
	            zIndex: 99
	          });

	        // set position
	        var posCss = (o.position == 'right') ? { right: o.distance } : { left: o.distance };
	        rail.css(posCss);
	        bar.css(posCss);

	        // wrap it
	        me.wrap(wrapper);

	        // append to parent div
	        me.parent().append(bar);
	        me.parent().append(rail);

	        // make it draggable and no longer dependent on the jqueryUI
	        if (o.railDraggable){
	          bar.bind("mousedown", function(e) {
	            var $doc = $(document);
	            isDragg = true;
	            t = parseFloat(bar.css('top'));
	            pageY = e.pageY;

	            $doc.bind("mousemove.slimscroll", function(e){
	              currTop = t + e.pageY - pageY;
	              bar.css('top', currTop);
	              scrollContent(0, bar.position().top, false);// scroll content
	            });

	            $doc.bind("mouseup.slimscroll", function(e) {
	              isDragg = false;hideBar();
	              $doc.unbind('.slimscroll');
	            });
	            return false;
	          }).bind("selectstart.slimscroll", function(e){
	            e.stopPropagation();
	            e.preventDefault();
	            return false;
	          });
	        }

	        // on rail over
	        rail.hover(function(){
	          showBar();
	        }, function(){
	          hideBar();
	        });

	        // on bar over
	        bar.hover(function(){
	          isOverBar = true;
	        }, function(){
	          isOverBar = false;
	        });

	        // show on parent mouseover
	        me.hover(function(){
	          isOverPanel = true;
	          showBar();
	          hideBar();
	        }, function(){
	          isOverPanel = false;
	          hideBar();
	        });

	        // support for mobile
	        me.bind('touchstart', function(e,b){
	          if (e.originalEvent.touches.length)
	          {
	            // record where touch started
	            touchDif = e.originalEvent.touches[0].pageY;
	          }
	        });

	        me.bind('touchmove', function(e){
	          // prevent scrolling the page if necessary
	          if(!releaseScroll)
	          {
	  		      e.originalEvent.preventDefault();
			      }
	          if (e.originalEvent.touches.length)
	          {
	            // see how far user swiped
	            var diff = (touchDif - e.originalEvent.touches[0].pageY) / o.touchScrollStep;
	            // scroll content
	            scrollContent(diff, true);
	            touchDif = e.originalEvent.touches[0].pageY;
	          }
	        });

	        // set up initial height
	        getBarHeight();

	        // check start position
	        if (o.start === 'bottom')
	        {
	          // scroll content to bottom
	          bar.css({ top: me.outerHeight() - bar.outerHeight() });
	          scrollContent(0, true);
	        }
	        else if (o.start !== 'top')
	        {
	          // assume jQuery selector
	          scrollContent($(o.start).position().top, null, true);

	          // make sure bar stays hidden
	          if (!o.alwaysVisible) { bar.hide(); }
	        }

	        // attach scroll events
	        attachWheel(this);

	        function _onWheel(e)
	        {
	          // use mouse wheel only when mouse is over
	          if (!isOverPanel) { return; }

	          var e = e || window.event;

	          var delta = 0;
	          if (e.wheelDelta) { delta = -e.wheelDelta/120; }
	          if (e.detail) { delta = e.detail / 3; }

	          var target = e.target || e.srcTarget || e.srcElement;
	          if ($(target).closest('.' + o.wrapperClass).is(me.parent())) {
	            // scroll content
	            scrollContent(delta, true);
	          }

	          // stop window scroll
	          if (e.preventDefault && !releaseScroll) { e.preventDefault(); }
	          if (!releaseScroll) { e.returnValue = false; }
	        }

	        function scrollContent(y, isWheel, isJump)
	        {
	          releaseScroll = false;
	          var delta = y;
	          var maxTop = me.outerHeight() - bar.outerHeight();

	          if (isWheel)
	          {
	            // move bar with mouse wheel
	            delta = parseInt(bar.css('top')) + y * parseInt(o.wheelStep) / 100 * bar.outerHeight();

	            // move bar, make sure it doesn't go out
	            delta = Math.min(Math.max(delta, 0), maxTop);

	            // if scrolling down, make sure a fractional change to the
	            // scroll position isn't rounded away when the scrollbar's CSS is set
	            // this flooring of delta would happened automatically when
	            // bar.css is set below, but we floor here for clarity
	            delta = (y > 0) ? Math.ceil(delta) : Math.floor(delta);

	            // scroll the scrollbar
	            bar.css({ top: delta + 'px' });
	          }

	          // calculate actual scroll amount
	          percentScroll = parseInt(bar.css('top')) / (me.outerHeight() - bar.outerHeight());
	          delta = percentScroll * (me[0].scrollHeight - me.outerHeight());

	          if (isJump)
	          {
	            delta = y;
	            var offsetTop = delta / me[0].scrollHeight * me.outerHeight();
	            offsetTop = Math.min(Math.max(offsetTop, 0), maxTop);
	            bar.css({ top: offsetTop + 'px' });
	          }

	          // scroll content
	          me.scrollTop(delta);

	          // fire scrolling event
	          me.trigger('slimscrolling', ~~delta);

	          // ensure bar is visible
	          showBar();

	          // trigger hide when scroll is stopped
	          hideBar();
	        }

	        function attachWheel(target)
	        {
	          if (window.addEventListener)
	          {
	            target.addEventListener('DOMMouseScroll', _onWheel, false );
	            target.addEventListener('mousewheel', _onWheel, false );
	          }
	          else
	          {
	            document.attachEvent("onmousewheel", _onWheel)
	          }
	        }

	        function getBarHeight()
	        {
	          // calculate scrollbar height and make sure it is not too small
	          barHeight = Math.max((me.outerHeight() / me[0].scrollHeight) * me.outerHeight(), minBarHeight);
	          bar.css({ height: barHeight + 'px' });

	          // hide scrollbar if content is not long enough
	          var display = barHeight == me.outerHeight() ? 'none' : 'block';
	          bar.css({ display: display });
	        }

	        function showBar()
	        {
	          // recalculate bar height
	          getBarHeight();
	          clearTimeout(queueHide);

	          // when bar reached top or bottom
	          if (percentScroll == ~~percentScroll)
	          {
	            //release wheel
	            releaseScroll = o.allowPageScroll;

	            // publish approporiate event
	            if (lastScroll != percentScroll)
	            {
	                var msg = (~~percentScroll == 0) ? 'top' : 'bottom';
	                me.trigger('slimscroll', msg);
	            }
	          }
	          else
	          {
	            releaseScroll = false;
	          }
	          lastScroll = percentScroll;

	          // show only when required
	          if(barHeight >= me.outerHeight()) {
	            //allow window scroll
	            releaseScroll = true;
	            return;
	          }
	          bar.stop(true,true).fadeIn('fast');
	          if (o.railVisible) { rail.stop(true,true).fadeIn('fast'); }
	        }

	        function hideBar()
	        {
	          // only hide when options allow it
	          if (!o.alwaysVisible)
	          {
	            queueHide = setTimeout(function(){
	              if (!(o.disableFadeOut && isOverPanel) && !isOverBar && !isDragg)
	              {
	                bar.fadeOut('slow');
	                rail.fadeOut('slow');
	              }
	            }, 1000);
	          }
	        }

	      });

	      // maintain chainability
	      return this;
	    }
	  });

	  $.fn.extend({
	    slimscroll: $.fn.slimScroll
	  });

	})(jQuery);


/***/ },

/***/ 113:
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_RESULT__;/*!

	 @Name：layer v1.9.3 弹层组件
	 @Author：贤心
	 @Site：http://layer.layui.com
	 @License：LGPL
	        
	 */

	;!function(window, undefined){
	"use strict";

	var $, win, ready = {
	    getPath: function(){
	        var js = document.scripts, script = js[js.length - 1], jsPath = script.src;
	        if(script.getAttribute('merge')) return;
	        return jsPath.substring(0, jsPath.lastIndexOf("/") + 1);
	    }(), 
	    config: {}, end: {},
	    btn: ['&#x786E;&#x5B9A;','&#x53D6;&#x6D88;'],
	    
	    //五种原始层模式
	    type: ['dialog', 'page', 'iframe', 'loading', 'tips']
	};

	//默认内置方法。
	window.layer = {
	    v: '1.9.3',
	    ie6: !!window.ActiveXObject&&!window.XMLHttpRequest,
	    index: 0,
	    path: ready.getPath,
	    config: function(options, fn){
	        var item = 0;
	        options = options || {};
	        layer.cache = ready.config = $.extend(ready.config, options);
	        layer.path = ready.config.path || layer.path;
	        typeof options.extend === 'string' && (options.extend = [options.extend]);
	        layer.use('skin/layer.css', (options.extend && options.extend.length > 0) ? (function loop(){
	            var ext = options.extend;
	            layer.use(ext[ext[item] ? item : item-1], item < ext.length ? function(){
	                ++item; 
	                return loop;
	            }() : fn);
	        }()) : fn);
	        return this;
	    },
	    
	    //载入配件
	    use: function(module, fn, readyMethod){
	        var i = 0, head = $('head')[0];
	        var module = module.replace(/\s/g, '');
	        var iscss = /\.css$/.test(module);
	        var node = document.createElement(iscss ? 'link' : 'script');
	        var id = 'layui_layer_' + module.replace(/\.|\//g, '');
	        if(!layer.path) return;
	        if(iscss){
	            node.rel = 'stylesheet';
	        }
	        node[iscss ? 'href' : 'src'] = /^http:\/\//.test(module) ? module : layer.path + module;
	        node.id = id;
	        if(!$('#'+ id)[0]){
	            head.appendChild(node);
	        }
	        //轮询加载就绪
	        ;(function poll() {
	            ;(iscss ? parseInt($('#'+id).css('width')) === 1989 : layer[readyMethod||id]) ? function(){
	                fn && fn();
	                try { iscss || head.removeChild(node); } catch(e){};
	            }() : setTimeout(poll, 100);
	        }());
	        return this;
	    },
	    
	    ready: function(path, fn){
	        var type = typeof path === 'function';
	        if(type) fn = path;
	        layer.config($.extend(ready.config, function(){
	           return type ? {} : {path: path};
	        }()), fn);
	        return this;
	    },
	    
	    //各种快捷引用
	    alert: function(content, options, yes){
	        var type = typeof options === 'function';
	        if(type) yes = options;
	        return layer.open($.extend({
	            content: content,
	            yes: yes
	        }, type ? {} : options));
	    }, 
	    
	    confirm: function(content, options, yes, cancel){ 
	        var type = typeof options === 'function';
	        if(type){
	            cancel = yes;
	            yes = options;
	        }
	        return layer.open($.extend({
	            content: content,
	            btn: ready.btn,
	            yes: yes,
	            cancel: cancel
	        }, type ? {} : options));
	    },
	    
	    msg: function(content, options, end){ //最常用提示层
	        var type = typeof options === 'function', rskin = ready.config.skin;
	        var skin = (rskin ? rskin + ' ' + rskin + '-msg' : '')||'layui-layer-msg';
	        var shift = doms.anim.length - 1;
	        if(type) end = options;
	        return layer.open($.extend({
	            content: content,
	            time: 3000,
	            shade: false,
	            skin: skin,
	            title: false,
	            closeBtn: false,
	            btn: false,
	            end: end
	        }, (type && !ready.config.skin) ? {
	            skin: skin + ' layui-layer-hui',
	            shift: shift
	        } : function(){
	           options = options || {};
	           if(options.icon === -1 || options.icon === undefined && !ready.config.skin){
	               options.skin = skin + ' ' + (options.skin||'layui-layer-hui');
	           }
	           return options;
	        }()));  
	    },
	    
	    load: function(icon, options){
	        return layer.open($.extend({
	            type: 3,
	            icon: icon || 0,
	            shade: 0.01
	        }, options));
	    }, 
	    
	    tips: function(content, follow, options){
	        return layer.open($.extend({
	            type: 4,
	            content: [content, follow],
	            closeBtn: false,
	            time: 3000,
	            maxWidth: 210
	        }, options));
	    }
	};

	var Class = function(setings){    
	    var that = this;
	    that.index = ++layer.index;
	    that.config = $.extend({}, that.config, ready.config, setings);
	    that.creat();
	};

	Class.pt = Class.prototype;

	//缓存常用字符
	var doms = ['layui-layer', '.layui-layer-title', '.layui-layer-main', '.layui-layer-dialog', 'layui-layer-iframe', 'layui-layer-content', 'layui-layer-btn', 'layui-layer-close'];
	doms.anim = ['layui-anim', 'layui-anim-01', 'layui-anim-02', 'layui-anim-03', 'layui-anim-04', 'layui-anim-05', 'layui-anim-06'];

	//默认配置
	Class.pt.config = {
	    type: 0,
	    shade: 0.3,
	    fix: true,
	    move: doms[1],
	    title: '&#x4FE1;&#x606F;',
	    offset: 'auto',
	    area: 'auto',
	    closeBtn: 1,
	    time: 0, //0表示不自动关闭
	    zIndex: 19891014, 
	    maxWidth: 360,
	    shift: 0,
	    icon: -1,
	    scrollbar: true, //是否允许浏览器滚动条
	    tips: 2
	};

	//容器
	Class.pt.vessel = function(conType, callback){
	    var that = this, times = that.index, config = that.config;
	    var zIndex = config.zIndex + times, titype = typeof config.title === 'object';
	    var ismax = (config.maxmin || config.max) && (config.type === 1 || config.type === 2);
	    var ismin = (config.maxmin || config.min) && (config.type === 1 || config.type === 2);
	    var titleHTML = (config.title ? '<div class="layui-layer-title" style="'+ (titype ? config.title[1] : '') +'">' 
	        + (titype ? config.title[0] : config.title) 
	    + '</div>' : '');
	    
	    config.zIndex = zIndex;
	    callback([
	        //遮罩
	        config.shade ? ('<div class="layui-layer-shade" id="layui-layer-shade'+ times +'" times="'+ times +'" style="'+ ('z-index:'+ (zIndex-1) +'; background-color:'+ (config.shade[1]||'#000') +'; opacity:'+ (config.shade[0]||config.shade) +'; filter:alpha(opacity='+ (config.shade[0]*100||config.shade*100) +');') +'"></div>') : '',
	        
	        //主体
	        '<div class="'+ doms[0] +' '+ (doms.anim[config.shift]||'') + (' layui-layer-'+ready.type[config.type]) + (((config.type == 0 || config.type == 2) && !config.shade) ? ' layui-layer-border' : '') + ' ' + (config.skin||'') +'" id="'+ doms[0] + times +'" type="'+ ready.type[config.type] +'" times="'+ times +'" showtime="'+ config.time +'" conType="'+ (conType ? 'object' : 'string') +'" style="z-index: '+ zIndex +'; width:'+ config.area[0] + ';height:' + config.area[1] + (config.fix ? '' : ';position:absolute;') +'">'
	            + (conType && config.type != 2 ? '' : titleHTML)
	            +'<div class="layui-layer-content'+ ((config.type == 0 && config.icon !== -1) ? ' layui-layer-padding' :'') + (config.type == 3 ? ' layui-layer-loading'+config.icon : '') +'">'
	                + (config.type == 0 && config.icon !== -1 ? '<i class="layui-layer-ico layui-layer-ico'+ config.icon +'"></i>' : '')
	                + (config.type == 1 && conType ? '' : (config.content||''))
	            +'</div>'
	            + '<span class="layui-layer-setwin">'+ function(){
	                var closebtn = '';
	                closebtn += ismin ? '<a class="layui-layer-min" href="javascript:;"><cite></cite></a>' : '';
	                closebtn += ismax ? '<a class="layui-layer-ico layui-layer-max" href="javascript:;"></a>' : '';
	                config.closeBtn && (closebtn += '<a class="layui-layer-ico '+ doms[7] +' '+ doms[7] + (config.title ? config.closeBtn : (config.type == 4 ? '1' : '2')) +'" href="javascript:;"></a>');
	                return closebtn;
	            }() + '</span>'
	            + (config.btn ? function(){
	                var button = '';
	                typeof config.btn === 'string' && (config.btn = [config.btn]);
	                for(var i = 0, len = config.btn.length; i < len; i++){
	                    button += '<a class="'+ doms[6] +''+ i +'">'+ config.btn[i] +'</a>'
	                }
	                return '<div class="'+ doms[6] +'">'+ button +'</div>'
	            }() : '')
	        +'</div>'
	    ], titleHTML);
	    return that;
	};

	//创建骨架
	Class.pt.creat = function(){
	    var that = this, config = that.config, times = that.index, nodeIndex;
	    var content = config.content, conType = typeof content === 'object';
	    
	    if(typeof config.area === 'string'){
	        config.area = config.area === 'auto' ? ['', ''] : [config.area, ''];
	    }
	    
	    switch(config.type){
	        case 0:
	            config.btn = ('btn' in config) ? config.btn : ready.btn[0];
	            layer.closeAll('dialog');
	        break;
	        case 2:
	            var content = config.content = conType ? config.content : [config.content||'http://sentsin.com?from=layer', 'auto'];
	            config.content = '<iframe scrolling="'+ (config.content[1]||'auto') +'" allowtransparency="true" id="'+ doms[4] +''+ times +'" name="'+ doms[4] +''+ times +'" onload="this.className=\'\';" class="layui-layer-load" frameborder="0" src="' + config.content[0] + '"></iframe>';
	        break;
	        case 3:
	            config.title = false;
	            config.closeBtn = false;
	            config.icon === -1 && (config.icon === 0);
	            layer.closeAll('loading');
	        break;
	        case 4:
	            conType || (config.content = [config.content, 'body']);
	            config.follow = config.content[1];
	            config.content = config.content[0] + '<i class="layui-layer-TipsG"></i>';
	            config.title = false;
	            config.shade = false;
	            config.fix = false;
	            config.tips = typeof config.tips === 'object' ? config.tips : [config.tips, true];
	            config.tipsMore || layer.closeAll('tips');
	        break;
	    }
	    
	    //建立容器
	    that.vessel(conType, function(html, titleHTML){
	        $('body').append(html[0]);
	        conType ? function(){
	            (config.type == 2 || config.type == 4) ? function(){
	                $('body').append(html[1]);
	            }() : function(){
	                if(!content.parents('.'+doms[0])[0]){
	                    content.show().addClass('layui-layer-wrap').wrap(html[1]);
	                    $('#'+ doms[0] + times).find('.'+doms[5]).before(titleHTML);
	                }
	            }();
	        }() : $('body').append(html[1]);
	        that.layero = $('#'+ doms[0] + times);
	        config.scrollbar || doms.html.css('overflow', 'hidden').attr('layer-full', times);
	    }).auto(times);

	    config.type == 2 && layer.ie6 && that.layero.find('iframe').attr('src', content[0]);

	    //坐标自适应浏览器窗口尺寸
	    config.type == 4 ? that.tips() : that.offset();
	    if(config.fix){
	        win.on('resize', function(){
	            that.offset();
	            (/^\d+%$/.test(config.area[0]) || /^\d+%$/.test(config.area[1])) && that.auto(times);
	            config.type == 4 && that.tips();
	        });
	    }
	    
	    config.time <= 0 || setTimeout(function(){
	        layer.close(that.index)
	    }, config.time);
	    that.move().callback();
	};

	//自适应
	Class.pt.auto = function(index){
	    var that = this, config = that.config, layero = $('#'+ doms[0] + index);
	    if(config.area[0] === '' && config.maxWidth > 0){
	        //为了修复IE7下一个让人难以理解的bug
	        if(/MSIE 7/.test(navigator.userAgent) && config.btn){
	            layero.width(layero.innerWidth());
	        }
	        layero.outerWidth() > config.maxWidth && layero.width(config.maxWidth);
	    }
	    var area = [layero.innerWidth(), layero.innerHeight()];
	    var titHeight = layero.find(doms[1]).outerHeight() || 0;
	    var btnHeight = layero.find('.'+doms[6]).outerHeight() || 0;
	    function setHeight(elem){
	        elem = layero.find(elem);
	        elem.height(area[1] - titHeight - btnHeight - 2*(parseFloat(elem.css('padding'))|0));
	    }
	    switch(config.type){
	        case 2: 
	            setHeight('iframe');
	        break;
	        default:
	            if(config.area[1] === ''){
	                if(config.fix && area[1] > win.height()){
	                    area[1] = win.height();
	                    setHeight('.'+doms[5]);
	                }
	            } else {
	                setHeight('.'+doms[5]);
	            }
	        break;
	    }
	    return that;
	};

	//计算坐标
	Class.pt.offset = function (times) {
	    var that = this, times = times || that.index, config = that.config, layero = $('#' + doms[0] + times);
	    var area = [layero.outerWidth(), layero.outerHeight()];
	    var type = typeof config.offset === 'object';
	    that.offsetTop = (win.height() - area[1])/2;
	    that.offsetLeft = (win.width() - area[0])/2;
	    if(type){
	        that.offsetTop = config.offset[0];
	        that.offsetLeft = config.offset[1]||that.offsetLeft;
	    } else if(config.offset !== 'auto'){
	        that.offsetTop = config.offset;
	        if(config.offset === 'rb'){ //右下角
	            that.offsetTop = win.height() - area[1];
	            that.offsetLeft = win.width() - area[0];
	        }
	    }
	    if(!config.fix){
	        that.offsetTop = /%$/.test(that.offsetTop) ? 
	            win.height()*parseFloat(that.offsetTop)/100
	        : parseFloat(that.offsetTop);
	        that.offsetLeft = /%$/.test(that.offsetLeft) ? 
	            win.width()*parseFloat(that.offsetLeft)/100
	        : parseFloat(that.offsetLeft);
	        that.offsetTop += win.scrollTop();
	        that.offsetLeft += win.scrollLeft();
	    }
	    layero.css({top: that.offsetTop, left: that.offsetLeft});
	};

	//Tips
	Class.pt.tips = function(){
	    var that = this, config = that.config, layero = that.layero;
	    var layArea = [layero.outerWidth(), layero.outerHeight()], follow = $(config.follow);
	    if(!follow[0]) follow = $('body');
	    var goal = {
	        width: follow.outerWidth(),
	        height: follow.outerHeight(),
	        top: follow.offset().top,
	        left: follow.offset().left
	    }, tipsG = layero.find('.layui-layer-TipsG');
	    
	    var guide = config.tips[0];
	    config.tips[1] || tipsG.remove();
	    
	    goal.autoLeft = function(){
	        if(goal.left + layArea[0] - win.width() > 0){
	            goal.tipLeft = goal.left + goal.width - layArea[0];
	            tipsG.css({right: 12, left: 'auto'});
	        } else {
	            goal.tipLeft = goal.left;
	        };
	    };
	    
	    //辨别tips的方位
	    goal.where = [function(){ //上                
	        goal.autoLeft();
	        goal.tipTop = goal.top - layArea[1] - 10;
	        tipsG.removeClass('layui-layer-TipsB').addClass('layui-layer-TipsT').css('border-right-color', config.tips[1]);
	    }, function(){ //右
	        goal.tipLeft = goal.left + goal.width + 10;
	        goal.tipTop = goal.top;
	        tipsG.removeClass('layui-layer-TipsL').addClass('layui-layer-TipsR').css('border-bottom-color', config.tips[1]); 
	    }, function(){ //下
	        goal.autoLeft();
	        goal.tipTop = goal.top + goal.height + 10;
	        tipsG.removeClass('layui-layer-TipsT').addClass('layui-layer-TipsB').css('border-right-color', config.tips[1]);
	    }, function(){ //左
	        goal.tipLeft = goal.left - layArea[0] - 10;
	        goal.tipTop = goal.top;
	        tipsG.removeClass('layui-layer-TipsR').addClass('layui-layer-TipsL').css('border-bottom-color', config.tips[1]);
	    }];
	    goal.where[guide-1]();
	    
	    /* 8*2为小三角形占据的空间 */
	    if(guide === 1){
	        goal.top - (win.scrollTop() + layArea[1] + 8*2) < 0 && goal.where[2]();
	    } else if(guide === 2){
	        win.width() - (goal.left + goal.width + layArea[0] + 8*2) > 0 || goal.where[3]()
	    } else if(guide === 3){
	        (goal.top - win.scrollTop() + goal.height + layArea[1] + 8*2) - win.height() > 0 && goal.where[0]();
	    } else if(guide === 4){
	       layArea[0] + 8*2 - goal.left > 0 && goal.where[1]()
	    }

	    layero.find('.'+doms[5]).css({
	        'background-color': config.tips[1], 
	        'padding-right': (config.closeBtn ? '30px' : '')
	    });
	    layero.css({left: goal.tipLeft, top: goal.tipTop});
	}

	//拖拽层
	Class.pt.move = function(){
	    var that = this, config = that.config, conf = {
	        setY: 0,
	        moveLayer: function(){
	            var layero = conf.layero, mgleft = parseInt(layero.css('margin-left'));
	            var lefts = parseInt(conf.move.css('left'));
	            mgleft === 0 || (lefts = lefts - mgleft);
	            if(layero.css('position') !== 'fixed'){
	                lefts = lefts - layero.parent().offset().left;
	                conf.setY = 0;
	            }
	            layero.css({left: lefts, top: parseInt(conf.move.css('top')) - conf.setY});
	        }
	    };
	    
	    var movedom = that.layero.find(config.move);
	    config.move && movedom.attr('move', 'ok');
	    movedom.css({cursor: config.move ? 'move' : 'auto'});
	    
	    $(config.move).on('mousedown', function(M){    
	        M.preventDefault();
	        if($(this).attr('move') === 'ok'){
	            conf.ismove = true;
	            conf.layero = $(this).parents('.'+ doms[0]);
	            var border = parseFloat(conf.layero.css('border-width'))*2;
	            var xx = conf.layero.offset().left, yy = conf.layero.offset().top, ww = conf.layero.width() - 6 + border, hh = conf.layero.height() - 6 + border;
	            if(!$('#layui-layer-moves')[0]){
	                $('body').append('<div id="layui-layer-moves" class="layui-layer-moves" style="left:'+ xx +'px; top:'+ yy +'px; width:'+ ww +'px; height:'+ hh +'px; z-index:2147483584"></div>');
	            }
	            conf.move = $('#layui-layer-moves');
	            config.moveType && conf.move.css({visibility: 'hidden'});
	           
	            conf.moveX = M.pageX - conf.move.position().left;
	            conf.moveY = M.pageY - conf.move.position().top;
	            conf.layero.css('position') !== 'fixed' || (conf.setY = win.scrollTop());
	        }
	    });
	    
	    $(document).mousemove(function(M){
	        if(conf.ismove){
	            var offsetX = M.pageX - conf.moveX, offsetY = M.pageY - conf.moveY;
	            M.preventDefault();

	            //控制元素不被拖出窗口外
	            if(!config.moveOut){
	                conf.setY = win.scrollTop();
	                var setRig = win.width() - conf.move.outerWidth(), setTop = conf.setY;               
	                offsetX < 0 && (offsetX = 0);
	                offsetX > setRig && (offsetX = setRig); 
	                offsetY < setTop && (offsetY = setTop);
	                offsetY > win.height() - conf.move.outerHeight() + conf.setY && (offsetY = win.height() - conf.move.outerHeight() + conf.setY);
	            }
	            
	            conf.move.css({left: offsetX, top: offsetY});    
	            config.moveType && conf.moveLayer();
	            
	            offsetX = offsetY = setRig = setTop = null;
	        }                                                 
	    }).mouseup(function(){
	        try{
	            if(conf.ismove){
	                conf.moveLayer();
	                conf.move.remove();
	            }
	            conf.ismove = false;
	        }catch(e){
	            conf.ismove = false;
	        }
	        config.moveEnd && config.moveEnd();
	    });
	    return that;
	};

	Class.pt.callback = function(){
	    var that = this, layero = that.layero, config = that.config;
	    that.openLayer();
	    if(config.success){
	        if(config.type == 2){
	            layero.find('iframe')[0].onload = function(){
	                this.className = '';
	                config.success(layero, that.index);
	            };
	        } else {
	            config.success(layero, that.index);
	        }
	    }
	    layer.ie6 && that.IE6(layero);
	    
	    //按钮
	    layero.find('.'+ doms[6]).children('a').on('click', function(){
	        var index = $(this).index();
	        if(index === 0){
	            config.yes ? config.yes(that.index, layero) : layer.close(that.index);
	        } else if(index === 1){
	            cancel();
	        } else {
	            config['btn'+(index+1)] ? config['btn'+(index+1)](that.index, layero) : layer.close(that.index);
	        }
	    });
	    
	    //取消
	    function cancel(){
	        var close = config.cancel && config.cancel(that.index);
	        close === false || layer.close(that.index);
	    }
	    
	    //右上角关闭回调
	    layero.find('.'+ doms[7]).on('click', cancel);
	    
	    //点遮罩关闭
	    if(config.shadeClose){
	        $('#layui-layer-shade'+ that.index).on('click', function(){
	            layer.close(that.index);
	        });
	    } 
	    
	    //最小化
	    layero.find('.layui-layer-min').on('click', function(){
	        layer.min(that.index, config);
	        config.min && config.min(layero);
	    });
	    
	    //全屏/还原
	    layero.find('.layui-layer-max').on('click', function(){
	        if($(this).hasClass('layui-layer-maxmin')){
	            layer.restore(that.index);
	            config.restore && config.restore(layero);
	        } else {
	            layer.full(that.index, config);
	            config.full && config.full(layero);
	        }
	    });

	    config.end && (ready.end[that.index] = config.end);
	};

	//for ie6 恢复select
	ready.reselect = function(){
	    $.each($('select'), function(index , value){
	        var sthis = $(this);
	        if(!sthis.parents('.'+doms[0])[0]){
	            (sthis.attr('layer') == 1 && $('.'+doms[0]).length < 1) && sthis.removeAttr('layer').show(); 
	        }
	        sthis = null;
	    });
	}; 

	Class.pt.IE6 = function(layero){
	    var that = this, _ieTop = layero.offset().top;
	    
	    //ie6的固定与相对定位
	    function ie6Fix(){
	        layero.css({top : _ieTop + (that.config.fix ? win.scrollTop() : 0)});
	    };
	    ie6Fix();
	    win.scroll(ie6Fix);

	    //隐藏select
	    $('select').each(function(index , value){
	        var sthis = $(this);
	        if(!sthis.parents('.'+doms[0])[0]){
	            sthis.css('display') === 'none' || sthis.attr({'layer' : '1'}).hide();
	        }
	        sthis = null;
	    });
	};

	//需依赖原型的对外方法
	Class.pt.openLayer = function(){
	    var that = this;
	    
	    //置顶当前窗口
	    layer.zIndex = that.config.zIndex;
	    layer.setTop = function(layero){
	        var setZindex = function(){
	            layer.zIndex++;
	            layero.css('z-index', layer.zIndex + 1);
	        };
	        layer.zIndex = parseInt(layero[0].style.zIndex);
	        layero.on('mousedown', setZindex);
	        return layer.zIndex;
	    };
	    layer.autoOffset = function (index) {
	        return that.offset(index);
	    };
	};

	ready.record = function(layero){
	    var area = [
	        layero.outerWidth(),
	        layero.outerHeight(),
	        layero.position().top, 
	        layero.position().left + parseFloat(layero.css('margin-left'))
	    ];
	    layero.find('.layui-layer-max').addClass('layui-layer-maxmin');
	    layero.attr({area: area});
	};

	ready.rescollbar = function(index){
	    if(doms.html.attr('layer-full') == index){
	        if(doms.html[0].style.removeProperty){
	            doms.html[0].style.removeProperty('overflow');
	        } else {
	            doms.html[0].style.removeAttribute('overflow');
	        }
	        doms.html.removeAttr('layer-full');
	    }
	};

	/*! 内置成员 */

	//获取子iframe的DOM
	layer.getChildFrame = function(selector, index){
	    index = index || $('.'+doms[4]).attr('times');
	    return $('#'+ doms[0] + index).find('iframe').contents().find(selector);    
	};

	//得到当前iframe层的索引，子iframe时使用
	layer.getFrameIndex = function(name){
	    return $('#'+ name).parents('.'+doms[4]).attr('times');
	};

	//iframe层自适应宽高
	layer.iframeAuto = function(index){
	    if(!index) return;
	    var heg = layer.getChildFrame('body', index).outerHeight();
	    var layero = $('#'+ doms[0] + index);
	    var titHeight = layero.find(doms[1]).outerHeight() || 0;
	    var btnHeight = layero.find('.'+doms[6]).outerHeight() || 0;
	    layero.css({height: heg + titHeight + btnHeight});
	    layero.find('iframe').css({height: heg});
	};

	//重置iframe url
	layer.iframeSrc = function(index, url){
	    $('#'+ doms[0] + index).find('iframe').attr('src', url);
	};

	//设定层的样式
	layer.style = function(index, options){
	    var layero = $('#'+ doms[0] + index), type = layero.attr('type');
	    var titHeight = layero.find(doms[1]).outerHeight() || 0;
	    var btnHeight = layero.find('.'+doms[6]).outerHeight() || 0;
	    if(type === ready.type[1] || type === ready.type[2]){
	        layero.css(options);
	        if(type === ready.type[2]){
	            layero.find('iframe').css({
	                height: parseFloat(options.height) - titHeight - btnHeight
	            });
	        }
	    }
	};

	//最小化
	layer.min = function(index, options){
	    var layero = $('#'+ doms[0] + index);
	    var titHeight = layero.find(doms[1]).outerHeight() || 0;
	    ready.record(layero);
	    layer.style(index, {width: 180, height: titHeight, overflow: 'hidden'});
	    layero.find('.layui-layer-min').hide();
	    layero.attr('type') === 'page' && layero.find(doms[4]).hide();
	    ready.rescollbar(index);
	};

	//还原
	layer.restore = function(index){
	    var layero = $('#'+ doms[0] + index), area = layero.attr('area').split(',');
	    var type = layero.attr('type');
	    layer.style(index, {
	        width: parseFloat(area[0]), 
	        height: parseFloat(area[1]), 
	        top: parseFloat(area[2]), 
	        left: parseFloat(area[3]),
	        overflow: 'visible'
	    });
	    layero.find('.layui-layer-max').removeClass('layui-layer-maxmin');
	    layero.find('.layui-layer-min').show();
	    layero.attr('type') === 'page' && layero.find(doms[4]).show();
	    ready.rescollbar(index);
	};

	//全屏
	layer.full = function(index){
	    var layero = $('#'+ doms[0] + index), timer;
	    ready.record(layero);
	    if(!doms.html.attr('layer-full')){
	        doms.html.css('overflow','hidden').attr('layer-full', index);
	    }
	    clearTimeout(timer);
	    timer = setTimeout(function(){
	        var isfix = layero.css('position') === 'fixed';
	        layer.style(index, {
	             top: isfix ? 0 : win.scrollTop(),
	             left: isfix ? 0 : win.scrollLeft(),
	             width: win.width(),
	             height: win.height()
	        });
	        layero.find('.layui-layer-min').hide();
	    }, 100);
	};

	//改变title
	layer.title = function(name, index){
	    var title = $('#'+ doms[0] + (index||layer.index)).find(doms[1]);
	    title.html(name);
	};

	//关闭layer总方法
	layer.close = function(index){
	    var layero = $('#'+ doms[0] + index), type = layero.attr('type');
	    if(!layero[0]) return;
	    if(type === ready.type[1] && layero.attr('conType') === 'object'){
	        layero.children(':not(.'+ doms[5] +')').remove();
	        for(var i = 0; i < 2; i++){
	            layero.find('.layui-layer-wrap').unwrap().hide();
	        }
	    } else {
	        //低版本IE 回收 iframe
	        if(type === ready.type[2]){
	            try {
	                var iframe = $('#'+doms[4]+index)[0];
	                iframe.contentWindow.document.write('');
	                iframe.contentWindow.close();
	                layero.find('.'+doms[5])[0].removeChild(iframe);
	            } catch(e){}
	        }
	        layero[0].innerHTML = '';
	        layero.remove();
	    }
	    $('#layui-layer-moves, #layui-layer-shade' + index).remove();
	    layer.ie6 && ready.reselect();
	    ready.rescollbar(index);
	    typeof ready.end[index] === 'function' && ready.end[index]();
	    delete ready.end[index]; 
	};

	//关闭所有层
	layer.closeAll = function(type){
	    $.each($('.'+doms[0]), function(){
	        var othis = $(this);
	        var is = type ? (othis.attr('type') === type) : 1;
	        is && layer.close(othis.attr('times'));
	        is = null;
	    });
	};

	//主入口
	ready.run = function(){
	    $ = jQuery; 
	    win = $(window);
	    doms.html = $('html');
	    layer.open = function(deliver){
	        var o = new Class(deliver);
	        return o.index;
	    };
	};

	 true ? !(__WEBPACK_AMD_DEFINE_RESULT__ = function(){
	    ready.run();
	    return layer;
	}.call(exports, __webpack_require__, exports, module), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__)) : function(){
	   ready.run();
	   layer.use('skin/layer.css');
	}();

	}(window);


/***/ }

});