webpackJsonp([5],{

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
	var pace = __webpack_require__(165);
	pace.start({
	    document: false
	});
	__webpack_require__(113);
	layer.config({
	    path: '/plugins/layer/' //layer.js所在的目录，可以是绝对目录，也可以是相对目录
	});
	__webpack_require__(166);
	__webpack_require__(167);
	var logoUrl = __webpack_require__(168);
	$(function(){
	   $('img.logo').attr('src', logoUrl);
	});


	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(82)))

/***/ },

/***/ 165:
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_RESULT__;(function() {
	  var AjaxMonitor, Bar, DocumentMonitor, ElementMonitor, ElementTracker, EventLagMonitor, Evented, Events, NoTargetError, RequestIntercept, SOURCE_KEYS, Scaler, SocketRequestTracker, XHRRequestTracker, animation, avgAmplitude, bar, cancelAnimation, cancelAnimationFrame, defaultOptions, extend, extendNative, getFromDOM, getIntercept, handlePushState, ignoreStack, init, now, options, requestAnimationFrame, result, runAnimation, scalers, shouldIgnoreURL, shouldTrack, source, sources, uniScaler, _WebSocket, _XDomainRequest, _XMLHttpRequest, _i, _intercept, _len, _pushState, _ref, _ref1, _replaceState,
	    __slice = [].slice,
	    __hasProp = {}.hasOwnProperty,
	    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
	    __indexOf = [].indexOf || function(item) { for (var i = 0, l = this.length; i < l; i++) { if (i in this && this[i] === item) return i; } return -1; };

	  defaultOptions = {
	    catchupTime: 500,
	    initialRate: .03,
	    minTime: 500,
	    ghostTime: 500,
	    maxProgressPerFrame: 10,
	    easeFactor: 1.25,
	    startOnPageLoad: true,
	    restartOnPushState: true,
	    restartOnRequestAfter: 500,
	    target: 'body',
	    elements: {
	      checkInterval: 100,
	      selectors: ['body']
	    },
	    eventLag: {
	      minSamples: 10,
	      sampleCount: 3,
	      lagThreshold: 3
	    },
	    ajax: {
	      trackMethods: ['GET'],
	      trackWebSockets: true,
	      ignoreURLs: []
	    }
	  };

	  now = function() {
	    var _ref;
	    return (_ref = typeof performance !== "undefined" && performance !== null ? typeof performance.now === "function" ? performance.now() : void 0 : void 0) != null ? _ref : +(new Date);
	  };

	  requestAnimationFrame = window.requestAnimationFrame || window.mozRequestAnimationFrame || window.webkitRequestAnimationFrame || window.msRequestAnimationFrame;

	  cancelAnimationFrame = window.cancelAnimationFrame || window.mozCancelAnimationFrame;

	  if (requestAnimationFrame == null) {
	    requestAnimationFrame = function(fn) {
	      return setTimeout(fn, 50);
	    };
	    cancelAnimationFrame = function(id) {
	      return clearTimeout(id);
	    };
	  }

	  runAnimation = function(fn) {
	    var last, tick;
	    last = now();
	    tick = function() {
	      var diff;
	      diff = now() - last;
	      if (diff >= 33) {
	        last = now();
	        return fn(diff, function() {
	          return requestAnimationFrame(tick);
	        });
	      } else {
	        return setTimeout(tick, 33 - diff);
	      }
	    };
	    return tick();
	  };

	  result = function() {
	    var args, key, obj;
	    obj = arguments[0], key = arguments[1], args = 3 <= arguments.length ? __slice.call(arguments, 2) : [];
	    if (typeof obj[key] === 'function') {
	      return obj[key].apply(obj, args);
	    } else {
	      return obj[key];
	    }
	  };

	  extend = function() {
	    var key, out, source, sources, val, _i, _len;
	    out = arguments[0], sources = 2 <= arguments.length ? __slice.call(arguments, 1) : [];
	    for (_i = 0, _len = sources.length; _i < _len; _i++) {
	      source = sources[_i];
	      if (source) {
	        for (key in source) {
	          if (!__hasProp.call(source, key)) continue;
	          val = source[key];
	          if ((out[key] != null) && typeof out[key] === 'object' && (val != null) && typeof val === 'object') {
	            extend(out[key], val);
	          } else {
	            out[key] = val;
	          }
	        }
	      }
	    }
	    return out;
	  };

	  avgAmplitude = function(arr) {
	    var count, sum, v, _i, _len;
	    sum = count = 0;
	    for (_i = 0, _len = arr.length; _i < _len; _i++) {
	      v = arr[_i];
	      sum += Math.abs(v);
	      count++;
	    }
	    return sum / count;
	  };

	  getFromDOM = function(key, json) {
	    var data, e, el;
	    if (key == null) {
	      key = 'options';
	    }
	    if (json == null) {
	      json = true;
	    }
	    el = document.querySelector("[data-pace-" + key + "]");
	    if (!el) {
	      return;
	    }
	    data = el.getAttribute("data-pace-" + key);
	    if (!json) {
	      return data;
	    }
	    try {
	      return JSON.parse(data);
	    } catch (_error) {
	      e = _error;
	      return typeof console !== "undefined" && console !== null ? console.error("Error parsing inline pace options", e) : void 0;
	    }
	  };

	  Evented = (function() {
	    function Evented() {}

	    Evented.prototype.on = function(event, handler, ctx, once) {
	      var _base;
	      if (once == null) {
	        once = false;
	      }
	      if (this.bindings == null) {
	        this.bindings = {};
	      }
	      if ((_base = this.bindings)[event] == null) {
	        _base[event] = [];
	      }
	      return this.bindings[event].push({
	        handler: handler,
	        ctx: ctx,
	        once: once
	      });
	    };

	    Evented.prototype.once = function(event, handler, ctx) {
	      return this.on(event, handler, ctx, true);
	    };

	    Evented.prototype.off = function(event, handler) {
	      var i, _ref, _results;
	      if (((_ref = this.bindings) != null ? _ref[event] : void 0) == null) {
	        return;
	      }
	      if (handler == null) {
	        return delete this.bindings[event];
	      } else {
	        i = 0;
	        _results = [];
	        while (i < this.bindings[event].length) {
	          if (this.bindings[event][i].handler === handler) {
	            _results.push(this.bindings[event].splice(i, 1));
	          } else {
	            _results.push(i++);
	          }
	        }
	        return _results;
	      }
	    };

	    Evented.prototype.trigger = function() {
	      var args, ctx, event, handler, i, once, _ref, _ref1, _results;
	      event = arguments[0], args = 2 <= arguments.length ? __slice.call(arguments, 1) : [];
	      if ((_ref = this.bindings) != null ? _ref[event] : void 0) {
	        i = 0;
	        _results = [];
	        while (i < this.bindings[event].length) {
	          _ref1 = this.bindings[event][i], handler = _ref1.handler, ctx = _ref1.ctx, once = _ref1.once;
	          handler.apply(ctx != null ? ctx : this, args);
	          if (once) {
	            _results.push(this.bindings[event].splice(i, 1));
	          } else {
	            _results.push(i++);
	          }
	        }
	        return _results;
	      }
	    };

	    return Evented;

	  })();

	  if (window.Pace == null) {
	    window.Pace = {};
	  }

	  extend(Pace, Evented.prototype);

	  options = Pace.options = extend({}, defaultOptions, window.paceOptions, getFromDOM());

	  _ref = ['ajax', 'document', 'eventLag', 'elements'];
	  for (_i = 0, _len = _ref.length; _i < _len; _i++) {
	    source = _ref[_i];
	    if (options[source] === true) {
	      options[source] = defaultOptions[source];
	    }
	  }

	  NoTargetError = (function(_super) {
	    __extends(NoTargetError, _super);

	    function NoTargetError() {
	      _ref1 = NoTargetError.__super__.constructor.apply(this, arguments);
	      return _ref1;
	    }

	    return NoTargetError;

	  })(Error);

	  Bar = (function() {
	    function Bar() {
	      this.progress = 0;
	    }

	    Bar.prototype.getElement = function() {
	      var targetElement;
	      if (this.el == null) {
	        targetElement = document.querySelector(options.target);
	        if (!targetElement) {
	          throw new NoTargetError;
	        }
	        this.el = document.createElement('div');
	        this.el.className = "pace pace-active";
	        document.body.className = document.body.className.replace(/pace-done/g, '');
	        document.body.className += ' pace-running';
	        this.el.innerHTML = '<div class="pace-progress">\n  <div class="pace-progress-inner"></div>\n</div>\n<div class="pace-activity"></div>';
	        if (targetElement.firstChild != null) {
	          targetElement.insertBefore(this.el, targetElement.firstChild);
	        } else {
	          targetElement.appendChild(this.el);
	        }
	      }
	      return this.el;
	    };

	    Bar.prototype.finish = function() {
	      var el;
	      el = this.getElement();
	      el.className = el.className.replace('pace-active', '');
	      el.className += ' pace-inactive';
	      document.body.className = document.body.className.replace('pace-running', '');
	      return document.body.className += ' pace-done';
	    };

	    Bar.prototype.update = function(prog) {
	      this.progress = prog;
	      return this.render();
	    };

	    Bar.prototype.destroy = function() {
	      try {
	        this.getElement().parentNode.removeChild(this.getElement());
	      } catch (_error) {
	        NoTargetError = _error;
	      }
	      return this.el = void 0;
	    };

	    Bar.prototype.render = function() {
	      var el, progressStr;
	      if (document.querySelector(options.target) == null) {
	        return false;
	      }
	      el = this.getElement();
	      el.children[0].style.width = "" + this.progress + "%";
	      if (!this.lastRenderedProgress || this.lastRenderedProgress | 0 !== this.progress | 0) {
	        el.children[0].setAttribute('data-progress-text', "" + (this.progress | 0) + "%");
	        if (this.progress >= 100) {
	          progressStr = '99';
	        } else {
	          progressStr = this.progress < 10 ? "0" : "";
	          progressStr += this.progress | 0;
	        }
	        el.children[0].setAttribute('data-progress', "" + progressStr);
	      }
	      return this.lastRenderedProgress = this.progress;
	    };

	    Bar.prototype.done = function() {
	      return this.progress >= 100;
	    };

	    return Bar;

	  })();

	  Events = (function() {
	    function Events() {
	      this.bindings = {};
	    }

	    Events.prototype.trigger = function(name, val) {
	      var binding, _j, _len1, _ref2, _results;
	      if (this.bindings[name] != null) {
	        _ref2 = this.bindings[name];
	        _results = [];
	        for (_j = 0, _len1 = _ref2.length; _j < _len1; _j++) {
	          binding = _ref2[_j];
	          _results.push(binding.call(this, val));
	        }
	        return _results;
	      }
	    };

	    Events.prototype.on = function(name, fn) {
	      var _base;
	      if ((_base = this.bindings)[name] == null) {
	        _base[name] = [];
	      }
	      return this.bindings[name].push(fn);
	    };

	    return Events;

	  })();

	  _XMLHttpRequest = window.XMLHttpRequest;

	  _XDomainRequest = window.XDomainRequest;

	  _WebSocket = window.WebSocket;

	  extendNative = function(to, from) {
	    var e, key, val, _results;
	    _results = [];
	    for (key in from.prototype) {
	      try {
	        val = from.prototype[key];
	        if ((to[key] == null) && typeof val !== 'function') {
	          _results.push(to[key] = val);
	        } else {
	          _results.push(void 0);
	        }
	      } catch (_error) {
	        e = _error;
	      }
	    }
	    return _results;
	  };

	  ignoreStack = [];

	  Pace.ignore = function() {
	    var args, fn, ret;
	    fn = arguments[0], args = 2 <= arguments.length ? __slice.call(arguments, 1) : [];
	    ignoreStack.unshift('ignore');
	    ret = fn.apply(null, args);
	    ignoreStack.shift();
	    return ret;
	  };

	  Pace.track = function() {
	    var args, fn, ret;
	    fn = arguments[0], args = 2 <= arguments.length ? __slice.call(arguments, 1) : [];
	    ignoreStack.unshift('track');
	    ret = fn.apply(null, args);
	    ignoreStack.shift();
	    return ret;
	  };

	  shouldTrack = function(method) {
	    var _ref2;
	    if (method == null) {
	      method = 'GET';
	    }
	    if (ignoreStack[0] === 'track') {
	      return 'force';
	    }
	    if (!ignoreStack.length && options.ajax) {
	      if (method === 'socket' && options.ajax.trackWebSockets) {
	        return true;
	      } else if (_ref2 = method.toUpperCase(), __indexOf.call(options.ajax.trackMethods, _ref2) >= 0) {
	        return true;
	      }
	    }
	    return false;
	  };

	  RequestIntercept = (function(_super) {
	    __extends(RequestIntercept, _super);

	    function RequestIntercept() {
	      var monitorXHR,
	        _this = this;
	      RequestIntercept.__super__.constructor.apply(this, arguments);
	      monitorXHR = function(req) {
	        var _open;
	        _open = req.open;
	        return req.open = function(type, url, async) {
	          if (shouldTrack(type)) {
	            _this.trigger('request', {
	              type: type,
	              url: url,
	              request: req
	            });
	          }
	          return _open.apply(req, arguments);
	        };
	      };
	      window.XMLHttpRequest = function(flags) {
	        var req;
	        req = new _XMLHttpRequest(flags);
	        monitorXHR(req);
	        return req;
	      };
	      extendNative(window.XMLHttpRequest, _XMLHttpRequest);
	      if (_XDomainRequest != null) {
	        window.XDomainRequest = function() {
	          var req;
	          req = new _XDomainRequest;
	          monitorXHR(req);
	          return req;
	        };
	        extendNative(window.XDomainRequest, _XDomainRequest);
	      }
	      if ((_WebSocket != null) && options.ajax.trackWebSockets) {
	        window.WebSocket = function(url, protocols) {
	          var req;
	          if (protocols != null) {
	            req = new _WebSocket(url, protocols);
	          } else {
	            req = new _WebSocket(url);
	          }
	          if (shouldTrack('socket')) {
	            _this.trigger('request', {
	              type: 'socket',
	              url: url,
	              protocols: protocols,
	              request: req
	            });
	          }
	          return req;
	        };
	        extendNative(window.WebSocket, _WebSocket);
	      }
	    }

	    return RequestIntercept;

	  })(Events);

	  _intercept = null;

	  getIntercept = function() {
	    if (_intercept == null) {
	      _intercept = new RequestIntercept;
	    }
	    return _intercept;
	  };

	  shouldIgnoreURL = function(url) {
	    var pattern, _j, _len1, _ref2;
	    _ref2 = options.ajax.ignoreURLs;
	    for (_j = 0, _len1 = _ref2.length; _j < _len1; _j++) {
	      pattern = _ref2[_j];
	      if (typeof pattern === 'string') {
	        if (url.indexOf(pattern) !== -1) {
	          return true;
	        }
	      } else {
	        if (pattern.test(url)) {
	          return true;
	        }
	      }
	    }
	    return false;
	  };

	  getIntercept().on('request', function(_arg) {
	    var after, args, request, type, url;
	    type = _arg.type, request = _arg.request, url = _arg.url;
	    if (shouldIgnoreURL(url)) {
	      return;
	    }
	    if (!Pace.running && (options.restartOnRequestAfter !== false || shouldTrack(type) === 'force')) {
	      args = arguments;
	      after = options.restartOnRequestAfter || 0;
	      if (typeof after === 'boolean') {
	        after = 0;
	      }
	      return setTimeout(function() {
	        var stillActive, _j, _len1, _ref2, _ref3, _results;
	        if (type === 'socket') {
	          stillActive = request.readyState < 2;
	        } else {
	          stillActive = (0 < (_ref2 = request.readyState) && _ref2 < 4);
	        }
	        if (stillActive) {
	          Pace.restart();
	          _ref3 = Pace.sources;
	          _results = [];
	          for (_j = 0, _len1 = _ref3.length; _j < _len1; _j++) {
	            source = _ref3[_j];
	            if (source instanceof AjaxMonitor) {
	              source.watch.apply(source, args);
	              break;
	            } else {
	              _results.push(void 0);
	            }
	          }
	          return _results;
	        }
	      }, after);
	    }
	  });

	  AjaxMonitor = (function() {
	    function AjaxMonitor() {
	      var _this = this;
	      this.elements = [];
	      getIntercept().on('request', function() {
	        return _this.watch.apply(_this, arguments);
	      });
	    }

	    AjaxMonitor.prototype.watch = function(_arg) {
	      var request, tracker, type, url;
	      type = _arg.type, request = _arg.request, url = _arg.url;
	      if (shouldIgnoreURL(url)) {
	        return;
	      }
	      if (type === 'socket') {
	        tracker = new SocketRequestTracker(request);
	      } else {
	        tracker = new XHRRequestTracker(request);
	      }
	      return this.elements.push(tracker);
	    };

	    return AjaxMonitor;

	  })();

	  XHRRequestTracker = (function() {
	    function XHRRequestTracker(request) {
	      var event, size, _j, _len1, _onreadystatechange, _ref2,
	        _this = this;
	      this.progress = 0;
	      if (window.ProgressEvent != null) {
	        size = null;
	        request.addEventListener('progress', function(evt) {
	          if (evt.lengthComputable) {
	            return _this.progress = 100 * evt.loaded / evt.total;
	          } else {
	            return _this.progress = _this.progress + (100 - _this.progress) / 2;
	          }
	        });
	        _ref2 = ['load', 'abort', 'timeout', 'error'];
	        for (_j = 0, _len1 = _ref2.length; _j < _len1; _j++) {
	          event = _ref2[_j];
	          request.addEventListener(event, function() {
	            return _this.progress = 100;
	          });
	        }
	      } else {
	        _onreadystatechange = request.onreadystatechange;
	        request.onreadystatechange = function() {
	          var _ref3;
	          if ((_ref3 = request.readyState) === 0 || _ref3 === 4) {
	            _this.progress = 100;
	          } else if (request.readyState === 3) {
	            _this.progress = 50;
	          }
	          return typeof _onreadystatechange === "function" ? _onreadystatechange.apply(null, arguments) : void 0;
	        };
	      }
	    }

	    return XHRRequestTracker;

	  })();

	  SocketRequestTracker = (function() {
	    function SocketRequestTracker(request) {
	      var event, _j, _len1, _ref2,
	        _this = this;
	      this.progress = 0;
	      _ref2 = ['error', 'open'];
	      for (_j = 0, _len1 = _ref2.length; _j < _len1; _j++) {
	        event = _ref2[_j];
	        request.addEventListener(event, function() {
	          return _this.progress = 100;
	        });
	      }
	    }

	    return SocketRequestTracker;

	  })();

	  ElementMonitor = (function() {
	    function ElementMonitor(options) {
	      var selector, _j, _len1, _ref2;
	      if (options == null) {
	        options = {};
	      }
	      this.elements = [];
	      if (options.selectors == null) {
	        options.selectors = [];
	      }
	      _ref2 = options.selectors;
	      for (_j = 0, _len1 = _ref2.length; _j < _len1; _j++) {
	        selector = _ref2[_j];
	        this.elements.push(new ElementTracker(selector));
	      }
	    }

	    return ElementMonitor;

	  })();

	  ElementTracker = (function() {
	    function ElementTracker(selector) {
	      this.selector = selector;
	      this.progress = 0;
	      this.check();
	    }

	    ElementTracker.prototype.check = function() {
	      var _this = this;
	      if (document.querySelector(this.selector)) {
	        return this.done();
	      } else {
	        return setTimeout((function() {
	          return _this.check();
	        }), options.elements.checkInterval);
	      }
	    };

	    ElementTracker.prototype.done = function() {
	      return this.progress = 100;
	    };

	    return ElementTracker;

	  })();

	  DocumentMonitor = (function() {
	    DocumentMonitor.prototype.states = {
	      loading: 0,
	      interactive: 50,
	      complete: 100
	    };

	    function DocumentMonitor() {
	      var _onreadystatechange, _ref2,
	        _this = this;
	      this.progress = (_ref2 = this.states[document.readyState]) != null ? _ref2 : 100;
	      _onreadystatechange = document.onreadystatechange;
	      document.onreadystatechange = function() {
	        if (_this.states[document.readyState] != null) {
	          _this.progress = _this.states[document.readyState];
	        }
	        return typeof _onreadystatechange === "function" ? _onreadystatechange.apply(null, arguments) : void 0;
	      };
	    }

	    return DocumentMonitor;

	  })();

	  EventLagMonitor = (function() {
	    function EventLagMonitor() {
	      var avg, interval, last, points, samples,
	        _this = this;
	      this.progress = 0;
	      avg = 0;
	      samples = [];
	      points = 0;
	      last = now();
	      interval = setInterval(function() {
	        var diff;
	        diff = now() - last - 50;
	        last = now();
	        samples.push(diff);
	        if (samples.length > options.eventLag.sampleCount) {
	          samples.shift();
	        }
	        avg = avgAmplitude(samples);
	        if (++points >= options.eventLag.minSamples && avg < options.eventLag.lagThreshold) {
	          _this.progress = 100;
	          return clearInterval(interval);
	        } else {
	          return _this.progress = 100 * (3 / (avg + 3));
	        }
	      }, 50);
	    }

	    return EventLagMonitor;

	  })();

	  Scaler = (function() {
	    function Scaler(source) {
	      this.source = source;
	      this.last = this.sinceLastUpdate = 0;
	      this.rate = options.initialRate;
	      this.catchup = 0;
	      this.progress = this.lastProgress = 0;
	      if (this.source != null) {
	        this.progress = result(this.source, 'progress');
	      }
	    }

	    Scaler.prototype.tick = function(frameTime, val) {
	      var scaling;
	      if (val == null) {
	        val = result(this.source, 'progress');
	      }
	      if (val >= 100) {
	        this.done = true;
	      }
	      if (val === this.last) {
	        this.sinceLastUpdate += frameTime;
	      } else {
	        if (this.sinceLastUpdate) {
	          this.rate = (val - this.last) / this.sinceLastUpdate;
	        }
	        this.catchup = (val - this.progress) / options.catchupTime;
	        this.sinceLastUpdate = 0;
	        this.last = val;
	      }
	      if (val > this.progress) {
	        this.progress += this.catchup * frameTime;
	      }
	      scaling = 1 - Math.pow(this.progress / 100, options.easeFactor);
	      this.progress += scaling * this.rate * frameTime;
	      this.progress = Math.min(this.lastProgress + options.maxProgressPerFrame, this.progress);
	      this.progress = Math.max(0, this.progress);
	      this.progress = Math.min(100, this.progress);
	      this.lastProgress = this.progress;
	      return this.progress;
	    };

	    return Scaler;

	  })();

	  sources = null;

	  scalers = null;

	  bar = null;

	  uniScaler = null;

	  animation = null;

	  cancelAnimation = null;

	  Pace.running = false;

	  handlePushState = function() {
	    if (options.restartOnPushState) {
	      return Pace.restart();
	    }
	  };

	  if (window.history.pushState != null) {
	    _pushState = window.history.pushState;
	    window.history.pushState = function() {
	      handlePushState();
	      return _pushState.apply(window.history, arguments);
	    };
	  }

	  if (window.history.replaceState != null) {
	    _replaceState = window.history.replaceState;
	    window.history.replaceState = function() {
	      handlePushState();
	      return _replaceState.apply(window.history, arguments);
	    };
	  }

	  SOURCE_KEYS = {
	    ajax: AjaxMonitor,
	    elements: ElementMonitor,
	    document: DocumentMonitor,
	    eventLag: EventLagMonitor
	  };

	  (init = function() {
	    var type, _j, _k, _len1, _len2, _ref2, _ref3, _ref4;
	    Pace.sources = sources = [];
	    _ref2 = ['ajax', 'elements', 'document', 'eventLag'];
	    for (_j = 0, _len1 = _ref2.length; _j < _len1; _j++) {
	      type = _ref2[_j];
	      if (options[type] !== false) {
	        sources.push(new SOURCE_KEYS[type](options[type]));
	      }
	    }
	    _ref4 = (_ref3 = options.extraSources) != null ? _ref3 : [];
	    for (_k = 0, _len2 = _ref4.length; _k < _len2; _k++) {
	      source = _ref4[_k];
	      sources.push(new source(options));
	    }
	    Pace.bar = bar = new Bar;
	    scalers = [];
	    return uniScaler = new Scaler;
	  })();

	  Pace.stop = function() {
	    Pace.trigger('stop');
	    Pace.running = false;
	    bar.destroy();
	    cancelAnimation = true;
	    if (animation != null) {
	      if (typeof cancelAnimationFrame === "function") {
	        cancelAnimationFrame(animation);
	      }
	      animation = null;
	    }
	    return init();
	  };

	  Pace.restart = function() {
	    Pace.trigger('restart');
	    Pace.stop();
	    return Pace.start();
	  };

	  Pace.go = function() {
	    var start;
	    Pace.running = true;
	    bar.render();
	    start = now();
	    cancelAnimation = false;
	    return animation = runAnimation(function(frameTime, enqueueNextFrame) {
	      var avg, count, done, element, elements, i, j, remaining, scaler, scalerList, sum, _j, _k, _len1, _len2, _ref2;
	      remaining = 100 - bar.progress;
	      count = sum = 0;
	      done = true;
	      for (i = _j = 0, _len1 = sources.length; _j < _len1; i = ++_j) {
	        source = sources[i];
	        scalerList = scalers[i] != null ? scalers[i] : scalers[i] = [];
	        elements = (_ref2 = source.elements) != null ? _ref2 : [source];
	        for (j = _k = 0, _len2 = elements.length; _k < _len2; j = ++_k) {
	          element = elements[j];
	          scaler = scalerList[j] != null ? scalerList[j] : scalerList[j] = new Scaler(element);
	          done &= scaler.done;
	          if (scaler.done) {
	            continue;
	          }
	          count++;
	          sum += scaler.tick(frameTime);
	        }
	      }
	      avg = sum / count;
	      bar.update(uniScaler.tick(frameTime, avg));
	      if (bar.done() || done || cancelAnimation) {
	        bar.update(100);
	        Pace.trigger('done');
	        return setTimeout(function() {
	          bar.finish();
	          Pace.running = false;
	          return Pace.trigger('hide');
	        }, Math.max(options.ghostTime, Math.max(options.minTime - (now() - start), 0)));
	      } else {
	        return enqueueNextFrame();
	      }
	    });
	  };

	  Pace.start = function(_options) {
	    extend(options, _options);
	    Pace.running = true;
	    try {
	      bar.render();
	    } catch (_error) {
	      NoTargetError = _error;
	    }
	    if (!document.querySelector('.pace')) {
	      return setTimeout(Pace.start, 50);
	    } else {
	      Pace.trigger('start');
	      return Pace.go();
	    }
	  };

	  if (true) {
	    !(__WEBPACK_AMD_DEFINE_RESULT__ = function() {
	      return Pace;
	    }.call(exports, __webpack_require__, exports, module), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
	  } else if (typeof exports === 'object') {
	    module.exports = Pace;
	  } else {
	    if (options.startOnPageLoad) {
	      Pace.start();
	    }
	  }

	}).call(this);


/***/ },

/***/ 166:
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function($) {//自定义js

	//公共配置


	$(document).ready(function () {

	    // MetsiMenu
	    $('#side-menu').metisMenu();

	    // 打开右侧边栏
	    $('.right-sidebar-toggle').click(function () {
	        $('#right-sidebar').toggleClass('sidebar-open');
	    });

	    // 右侧边栏使用slimscroll
	    $('.sidebar-container').slimScroll({
	        height: '100%',
	        railOpacity: 0.4,
	        wheelStep: 10
	    });

	    // 打开聊天窗口
	    $('.open-small-chat').click(function () {
	        $(this).children().toggleClass('fa-comments').toggleClass('fa-remove');
	        $('.small-chat-box').toggleClass('active');
	    });

	    // 聊天窗口使用slimscroll
	    $('.small-chat-box .content').slimScroll({
	        height: '234px',
	        railOpacity: 0.4
	    });

	    // Small todo handler
	    $('.check-link').click(function () {
	        var button = $(this).find('i');
	        var label = $(this).next('span');
	        button.toggleClass('fa-check-square').toggleClass('fa-square-o');
	        label.toggleClass('todo-completed');
	        return false;
	    });

	    //固定菜单栏
	    $(function () {
	        $('.sidebar-collapse').slimScroll({
	            height: '100%',
	            railOpacity: 0.9,
	            alwaysVisible: false
	        });
	    });


	    // 菜单切换
	    $('.navbar-minimalize').click(function () {
	        $("body").toggleClass("mini-navbar");
	        SmoothlyMenu();
	    });


	    // 侧边栏高度
	    function fix_height() {
	        var heightWithoutNavbar = $("body > #wrapper").height() - 61;
	        $(".sidebard-panel").css("min-height", heightWithoutNavbar + "px");
	    }
	    fix_height();

	    $(window).bind("load resize click scroll", function () {
	        if (!$("body").hasClass('body-small')) {
	            fix_height();
	        }
	    });

	    //侧边栏滚动
	    $(window).scroll(function () {
	        if ($(window).scrollTop() > 0 && !$('body').hasClass('fixed-nav')) {
	            $('#right-sidebar').addClass('sidebar-top');
	        } else {
	            $('#right-sidebar').removeClass('sidebar-top');
	        }
	    });

	    $('.full-height-scroll').slimScroll({
	        height: '100%'
	    });

	    $('#side-menu>li').click(function () {
	        if ($('body').hasClass('mini-navbar')) {
	            NavToggle();
	        }
	    });
	    $('#side-menu>li li a').click(function () {
	        if ($(window).width() < 769) {
	            NavToggle();
	        }
	    });

	    $('.nav-close').click(NavToggle);

	    //ios浏览器兼容性处理
	    if (/(iPhone|iPad|iPod|iOS)/i.test(navigator.userAgent)) {
	        $('#content-main').css('overflow-y', 'auto');
	    }

	});

	$(window).bind("load resize", function () {
	    if ($(this).width() < 769) {
	        $('body').addClass('mini-navbar');
	        $('.navbar-static-side').fadeIn();
	    }
	});

	function NavToggle() {
	    $('.navbar-minimalize').trigger('click');
	}

	function SmoothlyMenu() {
	    if (!$('body').hasClass('mini-navbar')) {
	        $('#side-menu').hide();
	        setTimeout(
	            function () {
	                $('#side-menu').fadeIn(500);
	            }, 100);
	    } else if ($('body').hasClass('fixed-sidebar')) {
	        $('#side-menu').hide();
	        setTimeout(
	            function () {
	                $('#side-menu').fadeIn(500);
	            }, 300);
	    } else {
	        $('#side-menu').removeAttr('style');
	    }
	}


	//主题设置
	$(function () {

	    // 顶部菜单固定
	    $('#fixednavbar').click(function () {
	        if ($('#fixednavbar').is(':checked')) {
	            $(".navbar-static-top").removeClass('navbar-static-top').addClass('navbar-fixed-top');
	            $("body").removeClass('boxed-layout');
	            $("body").addClass('fixed-nav');
	            $('#boxedlayout').prop('checked', false);

	            if (localStorageSupport) {
	                localStorage.setItem("boxedlayout", 'off');
	            }

	            if (localStorageSupport) {
	                localStorage.setItem("fixednavbar", 'on');
	            }
	        } else {
	            $(".navbar-fixed-top").removeClass('navbar-fixed-top').addClass('navbar-static-top');
	            $("body").removeClass('fixed-nav');

	            if (localStorageSupport) {
	                localStorage.setItem("fixednavbar", 'off');
	            }
	        }
	    });


	    // 收起左侧菜单
	    $('#collapsemenu').click(function () {
	        if ($('#collapsemenu').is(':checked')) {
	            $("body").addClass('mini-navbar');
	            SmoothlyMenu();

	            if (localStorageSupport) {
	                localStorage.setItem("collapse_menu", 'on');
	            }

	        } else {
	            $("body").removeClass('mini-navbar');
	            SmoothlyMenu();

	            if (localStorageSupport) {
	                localStorage.setItem("collapse_menu", 'off');
	            }
	        }
	    });

	    // 固定宽度
	    $('#boxedlayout').click(function () {
	        if ($('#boxedlayout').is(':checked')) {
	            $("body").addClass('boxed-layout');
	            $('#fixednavbar').prop('checked', false);
	            $(".navbar-fixed-top").removeClass('navbar-fixed-top').addClass('navbar-static-top');
	            $("body").removeClass('fixed-nav');
	            if (localStorageSupport) {
	                localStorage.setItem("fixednavbar", 'off');
	            }


	            if (localStorageSupport) {
	                localStorage.setItem("boxedlayout", 'on');
	            }
	        } else {
	            $("body").removeClass('boxed-layout');

	            if (localStorageSupport) {
	                localStorage.setItem("boxedlayout", 'off');
	            }
	        }
	    });

	    // 默认主题
	    $('.s-skin-0').click(function () {
	        $("body").removeClass("skin-1");
	        $("body").removeClass("skin-2");
	        $("body").removeClass("skin-3");
	        return false;
	    });

	    // 蓝色主题
	    $('.s-skin-1').click(function () {
	        $("body").removeClass("skin-2");
	        $("body").removeClass("skin-3");
	        $("body").addClass("skin-1");
	        return false;
	    });

	    // 黄色主题
	    $('.s-skin-3').click(function () {
	        $("body").removeClass("skin-1");
	        $("body").removeClass("skin-2");
	        $("body").addClass("skin-3");
	        return false;
	    });

	    if (localStorageSupport) {
	        var collapse = localStorage.getItem("collapse_menu");
	        var fixednavbar = localStorage.getItem("fixednavbar");
	        var boxedlayout = localStorage.getItem("boxedlayout");

	        if (collapse == 'on') {
	            $('#collapsemenu').prop('checked', 'checked')
	        }
	        if (fixednavbar == 'on') {
	            $('#fixednavbar').prop('checked', 'checked')
	        }
	        if (boxedlayout == 'on') {
	            $('#boxedlayout').prop('checked', 'checked')
	        }
	    }

	    if (localStorageSupport) {

	        var collapse = localStorage.getItem("collapse_menu");
	        var fixednavbar = localStorage.getItem("fixednavbar");
	        var boxedlayout = localStorage.getItem("boxedlayout");

	        var body = $('body');

	        if (collapse == 'on') {
	            if (!body.hasClass('body-small')) {
	                body.addClass('mini-navbar');
	            }
	        }

	        if (fixednavbar == 'on') {
	            $(".navbar-static-top").removeClass('navbar-static-top').addClass('navbar-fixed-top');
	            body.addClass('fixed-nav');
	        }

	        if (boxedlayout == 'on') {
	            body.addClass('boxed-layout');
	        }
	    }
	});

	//判断浏览器是否支持html5本地存储
	function localStorageSupport() {
	    return (('localStorage' in window) && window['localStorage'] !== null)
	}

	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(82)))

/***/ },

/***/ 167:
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function($) {
	$(function () {
	    //计算元素集合的总宽度
	    function calSumWidth(elements) {
	        var width = 0;
	        $(elements).each(function () {
	            width += $(this).outerWidth(true);
	        });
	        return width;
	    }
	    //滚动到指定选项卡
	    function scrollToTab(element) {
	        var marginLeftVal = calSumWidth($(element).prevAll()), marginRightVal = calSumWidth($(element).nextAll());
	        // 可视区域非tab宽度
	        var tabOuterWidth = calSumWidth($(".content-tabs").children().not(".J_menuTabs"));
	        //可视区域tab宽度
	        var visibleWidth = $(".content-tabs").outerWidth(true) - tabOuterWidth;
	        //实际滚动宽度
	        var scrollVal = 0;
	        if ($(".page-tabs-content").outerWidth() < visibleWidth) {
	            scrollVal = 0;
	        } else if (marginRightVal <= (visibleWidth - $(element).outerWidth(true) - $(element).next().outerWidth(true))) {
	            if ((visibleWidth - $(element).next().outerWidth(true)) > marginRightVal) {
	                scrollVal = marginLeftVal;
	                var tabElement = element;
	                while ((scrollVal - $(tabElement).outerWidth()) > ($(".page-tabs-content").outerWidth() - visibleWidth)) {
	                    scrollVal -= $(tabElement).prev().outerWidth();
	                    tabElement = $(tabElement).prev();
	                }
	            }
	        } else if (marginLeftVal > (visibleWidth - $(element).outerWidth(true) - $(element).prev().outerWidth(true))) {
	            scrollVal = marginLeftVal - $(element).prev().outerWidth(true);
	        }
	        $('.page-tabs-content').animate({
	            marginLeft: 0 - scrollVal + 'px'
	        }, "fast");
	    }
	    //查看左侧隐藏的选项卡
	    function scrollTabLeft() {
	        var marginLeftVal = Math.abs(parseInt($('.page-tabs-content').css('margin-left')));
	        // 可视区域非tab宽度
	        var tabOuterWidth = calSumWidth($(".content-tabs").children().not(".J_menuTabs"));
	        //可视区域tab宽度
	        var visibleWidth = $(".content-tabs").outerWidth(true) - tabOuterWidth;
	        //实际滚动宽度
	        var scrollVal = 0;
	        if ($(".page-tabs-content").width() < visibleWidth) {
	            return false;
	        } else {
	            var tabElement = $(".J_menuTab:first");
	            var offsetVal = 0;
	            while ((offsetVal + $(tabElement).outerWidth(true)) <= marginLeftVal) {//找到离当前tab最近的元素
	                offsetVal += $(tabElement).outerWidth(true);
	                tabElement = $(tabElement).next();
	            }
	            offsetVal = 0;
	            if (calSumWidth($(tabElement).prevAll()) > visibleWidth) {
	                while ((offsetVal + $(tabElement).outerWidth(true)) < (visibleWidth) && tabElement.length > 0) {
	                    offsetVal += $(tabElement).outerWidth(true);
	                    tabElement = $(tabElement).prev();
	                }
	                scrollVal = calSumWidth($(tabElement).prevAll());
	            }
	        }
	        $('.page-tabs-content').animate({
	            marginLeft: 0 - scrollVal + 'px'
	        }, "fast");
	    }
	    //查看右侧隐藏的选项卡
	    function scrollTabRight() {
	        var marginLeftVal = Math.abs(parseInt($('.page-tabs-content').css('margin-left')));
	        // 可视区域非tab宽度
	        var tabOuterWidth = calSumWidth($(".content-tabs").children().not(".J_menuTabs"));
	        //可视区域tab宽度
	        var visibleWidth = $(".content-tabs").outerWidth(true) - tabOuterWidth;
	        //实际滚动宽度
	        var scrollVal = 0;
	        if ($(".page-tabs-content").width() < visibleWidth) {
	            return false;
	        } else {
	            var tabElement = $(".J_menuTab:first");
	            var offsetVal = 0;
	            while ((offsetVal + $(tabElement).outerWidth(true)) <= marginLeftVal) {//找到离当前tab最近的元素
	                offsetVal += $(tabElement).outerWidth(true);
	                tabElement = $(tabElement).next();
	            }
	            offsetVal = 0;
	            while ((offsetVal + $(tabElement).outerWidth(true)) < (visibleWidth) && tabElement.length > 0) {
	                offsetVal += $(tabElement).outerWidth(true);
	                tabElement = $(tabElement).next();
	            }
	            scrollVal = calSumWidth($(tabElement).prevAll());
	            if (scrollVal > 0) {
	                $('.page-tabs-content').animate({
	                    marginLeft: 0 - scrollVal + 'px'
	                }, "fast");
	            }
	        }
	    }

	    //通过遍历给菜单项加上data-index属性
	    $(".J_menuItem").each(function (index) {
	        if (!$(this).attr('data-index')) {
	            $(this).attr('data-index', index);
	        }
	    });

	    function menuItem() {
	        // 获取标识数据
	        var dataUrl = $(this).attr('href'),
	            dataIndex = $(this).data('index'),
	            menuName = $.trim($(this).text()),
	            flag = true;
	        if (dataUrl == undefined || $.trim(dataUrl).length == 0)return false;

	        // 选项卡菜单已存在
	        $('.J_menuTab').each(function () {
	            if ($(this).data('id') == dataUrl) {
	                if (!$(this).hasClass('active')) {
	                    $(this).addClass('active').siblings('.J_menuTab').removeClass('active');
	                    scrollToTab(this);
	                    // 显示tab对应的内容区
	                    $('.J_mainContent .J_iframe').each(function () {
	                        if ($(this).data('id') == dataUrl) {
	                            $(this).show().siblings('.J_iframe').hide();
	                            return false;
	                        }
	                    });
	                }
	                flag = false;
	                return false;
	            }
	        });

	        // 选项卡菜单不存在
	        if (flag) {
	            var str = '<a href="javascript:;" class="active J_menuTab" data-id="' + dataUrl + '">' + menuName + ' <i class="fa fa-times-circle"></i></a>';
	            $('.J_menuTab').removeClass('active');

	            // 添加选项卡对应的iframe
	            var str1 = '<iframe class="J_iframe" name="iframe' + dataIndex + '" width="100%" height="100%" src="' + dataUrl + '" frameborder="0" data-id="' + dataUrl + '" seamless></iframe>';
	            $('.J_mainContent').find('iframe.J_iframe').hide().parents('.J_mainContent').append(str1);

	            //显示loading提示
	//            var loading = layer.load();
	//
	//            $('.J_mainContent iframe:visible').load(function () {
	//                //iframe加载完成后隐藏loading提示
	//                layer.close(loading);
	//            });
	            // 添加选项卡
	            $('.J_menuTabs .page-tabs-content').append(str);
	            scrollToTab($('.J_menuTab.active'));
	        }
	        return false;
	    }

	    $('.J_menuItem').on('click', menuItem);

	    // 关闭选项卡菜单
	    function closeTab() {
	        var closeTabId = $(this).parents('.J_menuTab').data('id');
	        var currentWidth = $(this).parents('.J_menuTab').width();

	        // 当前元素处于活动状态
	        if ($(this).parents('.J_menuTab').hasClass('active')) {

	            // 当前元素后面有同辈元素，使后面的一个元素处于活动状态
	            if ($(this).parents('.J_menuTab').next('.J_menuTab').size()) {

	                var activeId = $(this).parents('.J_menuTab').next('.J_menuTab:eq(0)').data('id');
	                $(this).parents('.J_menuTab').next('.J_menuTab:eq(0)').addClass('active');

	                $('.J_mainContent .J_iframe').each(function () {
	                    if ($(this).data('id') == activeId) {
	                        $(this).show().siblings('.J_iframe').hide();
	                        return false;
	                    }
	                });

	                var marginLeftVal = parseInt($('.page-tabs-content').css('margin-left'));
	                if (marginLeftVal < 0) {
	                    $('.page-tabs-content').animate({
	                        marginLeft: (marginLeftVal + currentWidth) + 'px'
	                    }, "fast");
	                }

	                //  移除当前选项卡
	                $(this).parents('.J_menuTab').remove();

	                // 移除tab对应的内容区
	                $('.J_mainContent .J_iframe').each(function () {
	                    if ($(this).data('id') == closeTabId) {
	                        $(this).remove();
	                        return false;
	                    }
	                });
	            }

	            // 当前元素后面没有同辈元素，使当前元素的上一个元素处于活动状态
	            if ($(this).parents('.J_menuTab').prev('.J_menuTab').size()) {
	                var activeId = $(this).parents('.J_menuTab').prev('.J_menuTab:last').data('id');
	                $(this).parents('.J_menuTab').prev('.J_menuTab:last').addClass('active');
	                $('.J_mainContent .J_iframe').each(function () {
	                    if ($(this).data('id') == activeId) {
	                        $(this).show().siblings('.J_iframe').hide();
	                        return false;
	                    }
	                });

	                //  移除当前选项卡
	                $(this).parents('.J_menuTab').remove();

	                // 移除tab对应的内容区
	                $('.J_mainContent .J_iframe').each(function () {
	                    if ($(this).data('id') == closeTabId) {
	                        $(this).remove();
	                        return false;
	                    }
	                });
	            }
	        }
	        // 当前元素不处于活动状态
	        else {
	            //  移除当前选项卡
	            $(this).parents('.J_menuTab').remove();

	            // 移除相应tab对应的内容区
	            $('.J_mainContent .J_iframe').each(function () {
	                if ($(this).data('id') == closeTabId) {
	                    $(this).remove();
	                    return false;
	                }
	            });
	            scrollToTab($('.J_menuTab.active'));
	        }
	        return false;
	    }

	    $('.J_menuTabs').on('click', '.J_menuTab i', closeTab);

	    //关闭其他选项卡
	    function closeOtherTabs(){
	        $('.page-tabs-content').children("[data-id]").not(":first").not(".active").each(function () {
	            $('.J_iframe[data-id="' + $(this).data('id') + '"]').remove();
	            $(this).remove();
	        });
	        $('.page-tabs-content').css("margin-left", "0");
	    }
	    $('.J_tabCloseOther').on('click', closeOtherTabs);

	    //滚动到已激活的选项卡
	    function showActiveTab(){
	        scrollToTab($('.J_menuTab.active'));
	    }
	    $('.J_tabShowActive').on('click', showActiveTab);


	    // 点击选项卡菜单
	    function activeTab() {
	        if (!$(this).hasClass('active')) {
	            var currentId = $(this).data('id');
	            // 显示tab对应的内容区
	            $('.J_mainContent .J_iframe').each(function () {
	                if ($(this).data('id') == currentId) {
	                    $(this).show().siblings('.J_iframe').hide();
	                    return false;
	                }
	            });
	            $(this).addClass('active').siblings('.J_menuTab').removeClass('active');
	            scrollToTab(this);
	        }
	    }

	    $('.J_menuTabs').on('click', '.J_menuTab', activeTab);

	    //刷新iframe
	    function refreshTab() {
	        var target = $('.J_iframe[data-id="' + $(this).data('id') + '"]');
	        var url = target.attr('src');
	//        //显示loading提示
	//        var loading = layer.load();
	//        target.attr('src', url).load(function () {
	//            //关闭loading提示
	//            layer.close(loading);
	//        });
	    }

	    $('.J_menuTabs').on('dblclick', '.J_menuTab', refreshTab);

	    // 左移按扭
	    $('.J_tabLeft').on('click', scrollTabLeft);

	    // 右移按扭
	    $('.J_tabRight').on('click', scrollTabRight);

	    // 关闭全部
	    $('.J_tabCloseAll').on('click', function () {
	        $('.page-tabs-content').children("[data-id]").not(":first").each(function () {
	            $('.J_iframe[data-id="' + $(this).data('id') + '"]').remove();
	            $(this).remove();
	        });
	        $('.page-tabs-content').children("[data-id]:first").each(function () {
	            $('.J_iframe[data-id="' + $(this).data('id') + '"]').show();
	            $(this).addClass("active");
	        });
	        $('.page-tabs-content').css("margin-left", "0");
	    });

	});

	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(82)))

/***/ },

/***/ 168:
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__.p + "img/e71b4bfe.logo.png";

/***/ }

});