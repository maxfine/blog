webpackJsonp([7],{

/***/ 0:
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function($) {'use strict';

	__webpack_require__(85);
	__webpack_require__(94);
	__webpack_require__(102);
	__webpack_require__(104);
	__webpack_require__(178);

	__webpack_require__(82);
	__webpack_require__(133);
	__webpack_require__(137);
	__webpack_require__(183);
	__webpack_require__(184);
	$(document).ready(function(){
	    $(".i-checks").iCheck({
	        checkboxClass:"icheckbox_square-green",
	        radioClass: 'icheckbox_square-green'
	    })
	});
	// 以下为修改jQuery Validation插件兼容Bootstrap的方法，没有直接写在插件中是为了便于插件升级
	$.validator.setDefaults({
	    highlight: function (element) {
	        $(element).closest('.form-group').removeClass('has-success').addClass('has-error');
	    },
	    success: function (element) {
	        element.closest('.form-group').removeClass('has-error').addClass('has-success');
	    },
	    errorElement: "span",
	    errorPlacement: function (error, element) {
	        if (element.is(":radio") || element.is(":checkbox")) {
	            error.appendTo(element.parent().parent().parent());
	        } else {
	            error.appendTo(element.parent());
	        }
	    },
	    errorClass: "help-block m-b-none",
	    validClass: "help-block m-b-none"
	});

	// 以下为官方示例
	$().ready(function () {
	    // validate the comment form when it is submitted
	    $("#loginForm").validate();
	});

	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(82)))

/***/ },

/***/ 102:
/***/ function(module, exports) {

	// removed by extract-text-webpack-plugin

/***/ },

/***/ 104:
/***/ function(module, exports) {

	// removed by extract-text-webpack-plugin

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

/***/ 178:
/***/ function(module, exports) {

	// removed by extract-text-webpack-plugin

/***/ },

/***/ 183:
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;/*!
	 * jQuery Validation Plugin v1.14.0
	 *
	 * http://jqueryvalidation.org/
	 *
	 * Copyright (c) 2015 Jörn Zaefferer
	 * Released under the MIT license
	 */
	(function( factory ) {
		if ( true ) {
			!(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(82)], __WEBPACK_AMD_DEFINE_FACTORY__ = (factory), __WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ? (__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
		} else {
			factory( jQuery );
		}
	}(function( $ ) {

	$.extend($.fn, {
		// http://jqueryvalidation.org/validate/
		validate: function( options ) {

			// if nothing is selected, return nothing; can't chain anyway
			if ( !this.length ) {
				if ( options && options.debug && window.console ) {
					console.warn( "Nothing selected, can't validate, returning nothing." );
				}
				return;
			}

			// check if a validator for this form was already created
			var validator = $.data( this[ 0 ], "validator" );
			if ( validator ) {
				return validator;
			}

			// Add novalidate tag if HTML5.
			this.attr( "novalidate", "novalidate" );

			validator = new $.validator( options, this[ 0 ] );
			$.data( this[ 0 ], "validator", validator );

			if ( validator.settings.onsubmit ) {

				this.on( "click.validate", ":submit", function( event ) {
					if ( validator.settings.submitHandler ) {
						validator.submitButton = event.target;
					}

					// allow suppressing validation by adding a cancel class to the submit button
					if ( $( this ).hasClass( "cancel" ) ) {
						validator.cancelSubmit = true;
					}

					// allow suppressing validation by adding the html5 formnovalidate attribute to the submit button
					if ( $( this ).attr( "formnovalidate" ) !== undefined ) {
						validator.cancelSubmit = true;
					}
				});

				// validate the form on submit
				this.on( "submit.validate", function( event ) {
					if ( validator.settings.debug ) {
						// prevent form submit to be able to see console output
						event.preventDefault();
					}
					function handle() {
						var hidden, result;
						if ( validator.settings.submitHandler ) {
							if ( validator.submitButton ) {
								// insert a hidden input as a replacement for the missing submit button
								hidden = $( "<input type='hidden'/>" )
									.attr( "name", validator.submitButton.name )
									.val( $( validator.submitButton ).val() )
									.appendTo( validator.currentForm );
							}
							result = validator.settings.submitHandler.call( validator, validator.currentForm, event );
							if ( validator.submitButton ) {
								// and clean up afterwards; thanks to no-block-scope, hidden can be referenced
								hidden.remove();
							}
							if ( result !== undefined ) {
								return result;
							}
							return false;
						}
						return true;
					}

					// prevent submit for invalid forms or custom submit handlers
					if ( validator.cancelSubmit ) {
						validator.cancelSubmit = false;
						return handle();
					}
					if ( validator.form() ) {
						if ( validator.pendingRequest ) {
							validator.formSubmitted = true;
							return false;
						}
						return handle();
					} else {
						validator.focusInvalid();
						return false;
					}
				});
			}

			return validator;
		},
		// http://jqueryvalidation.org/valid/
		valid: function() {
			var valid, validator, errorList;

			if ( $( this[ 0 ] ).is( "form" ) ) {
				valid = this.validate().form();
			} else {
				errorList = [];
				valid = true;
				validator = $( this[ 0 ].form ).validate();
				this.each( function() {
					valid = validator.element( this ) && valid;
					errorList = errorList.concat( validator.errorList );
				});
				validator.errorList = errorList;
			}
			return valid;
		},

		// http://jqueryvalidation.org/rules/
		rules: function( command, argument ) {
			var element = this[ 0 ],
				settings, staticRules, existingRules, data, param, filtered;

			if ( command ) {
				settings = $.data( element.form, "validator" ).settings;
				staticRules = settings.rules;
				existingRules = $.validator.staticRules( element );
				switch ( command ) {
				case "add":
					$.extend( existingRules, $.validator.normalizeRule( argument ) );
					// remove messages from rules, but allow them to be set separately
					delete existingRules.messages;
					staticRules[ element.name ] = existingRules;
					if ( argument.messages ) {
						settings.messages[ element.name ] = $.extend( settings.messages[ element.name ], argument.messages );
					}
					break;
				case "remove":
					if ( !argument ) {
						delete staticRules[ element.name ];
						return existingRules;
					}
					filtered = {};
					$.each( argument.split( /\s/ ), function( index, method ) {
						filtered[ method ] = existingRules[ method ];
						delete existingRules[ method ];
						if ( method === "required" ) {
							$( element ).removeAttr( "aria-required" );
						}
					});
					return filtered;
				}
			}

			data = $.validator.normalizeRules(
			$.extend(
				{},
				$.validator.classRules( element ),
				$.validator.attributeRules( element ),
				$.validator.dataRules( element ),
				$.validator.staticRules( element )
			), element );

			// make sure required is at front
			if ( data.required ) {
				param = data.required;
				delete data.required;
				data = $.extend( { required: param }, data );
				$( element ).attr( "aria-required", "true" );
			}

			// make sure remote is at back
			if ( data.remote ) {
				param = data.remote;
				delete data.remote;
				data = $.extend( data, { remote: param });
			}

			return data;
		}
	});

	// Custom selectors
	$.extend( $.expr[ ":" ], {
		// http://jqueryvalidation.org/blank-selector/
		blank: function( a ) {
			return !$.trim( "" + $( a ).val() );
		},
		// http://jqueryvalidation.org/filled-selector/
		filled: function( a ) {
			return !!$.trim( "" + $( a ).val() );
		},
		// http://jqueryvalidation.org/unchecked-selector/
		unchecked: function( a ) {
			return !$( a ).prop( "checked" );
		}
	});

	// constructor for validator
	$.validator = function( options, form ) {
		this.settings = $.extend( true, {}, $.validator.defaults, options );
		this.currentForm = form;
		this.init();
	};

	// http://jqueryvalidation.org/jQuery.validator.format/
	$.validator.format = function( source, params ) {
		if ( arguments.length === 1 ) {
			return function() {
				var args = $.makeArray( arguments );
				args.unshift( source );
				return $.validator.format.apply( this, args );
			};
		}
		if ( arguments.length > 2 && params.constructor !== Array  ) {
			params = $.makeArray( arguments ).slice( 1 );
		}
		if ( params.constructor !== Array ) {
			params = [ params ];
		}
		$.each( params, function( i, n ) {
			source = source.replace( new RegExp( "\\{" + i + "\\}", "g" ), function() {
				return n;
			});
		});
		return source;
	};

	$.extend( $.validator, {

		defaults: {
			messages: {},
			groups: {},
			rules: {},
			errorClass: "error",
			validClass: "valid",
			errorElement: "label",
			focusCleanup: false,
			focusInvalid: true,
			errorContainer: $( [] ),
			errorLabelContainer: $( [] ),
			onsubmit: true,
			ignore: ":hidden",
			ignoreTitle: false,
			onfocusin: function( element ) {
				this.lastActive = element;

				// Hide error label and remove error class on focus if enabled
				if ( this.settings.focusCleanup ) {
					if ( this.settings.unhighlight ) {
						this.settings.unhighlight.call( this, element, this.settings.errorClass, this.settings.validClass );
					}
					this.hideThese( this.errorsFor( element ) );
				}
			},
			onfocusout: function( element ) {
				if ( !this.checkable( element ) && ( element.name in this.submitted || !this.optional( element ) ) ) {
					this.element( element );
				}
			},
			onkeyup: function( element, event ) {
				// Avoid revalidate the field when pressing one of the following keys
				// Shift       => 16
				// Ctrl        => 17
				// Alt         => 18
				// Caps lock   => 20
				// End         => 35
				// Home        => 36
				// Left arrow  => 37
				// Up arrow    => 38
				// Right arrow => 39
				// Down arrow  => 40
				// Insert      => 45
				// Num lock    => 144
				// AltGr key   => 225
				var excludedKeys = [
					16, 17, 18, 20, 35, 36, 37,
					38, 39, 40, 45, 144, 225
				];

				if ( event.which === 9 && this.elementValue( element ) === "" || $.inArray( event.keyCode, excludedKeys ) !== -1 ) {
					return;
				} else if ( element.name in this.submitted || element === this.lastElement ) {
					this.element( element );
				}
			},
			onclick: function( element ) {
				// click on selects, radiobuttons and checkboxes
				if ( element.name in this.submitted ) {
					this.element( element );

				// or option elements, check parent select in that case
				} else if ( element.parentNode.name in this.submitted ) {
					this.element( element.parentNode );
				}
			},
			highlight: function( element, errorClass, validClass ) {
				if ( element.type === "radio" ) {
					this.findByName( element.name ).addClass( errorClass ).removeClass( validClass );
				} else {
					$( element ).addClass( errorClass ).removeClass( validClass );
				}
			},
			unhighlight: function( element, errorClass, validClass ) {
				if ( element.type === "radio" ) {
					this.findByName( element.name ).removeClass( errorClass ).addClass( validClass );
				} else {
					$( element ).removeClass( errorClass ).addClass( validClass );
				}
			}
		},

		// http://jqueryvalidation.org/jQuery.validator.setDefaults/
		setDefaults: function( settings ) {
			$.extend( $.validator.defaults, settings );
		},

		messages: {
			required: "This field is required.",
			remote: "Please fix this field.",
			email: "Please enter a valid email address.",
			url: "Please enter a valid URL.",
			date: "Please enter a valid date.",
			dateISO: "Please enter a valid date ( ISO ).",
			number: "Please enter a valid number.",
			digits: "Please enter only digits.",
			creditcard: "Please enter a valid credit card number.",
			equalTo: "Please enter the same value again.",
			maxlength: $.validator.format( "Please enter no more than {0} characters." ),
			minlength: $.validator.format( "Please enter at least {0} characters." ),
			rangelength: $.validator.format( "Please enter a value between {0} and {1} characters long." ),
			range: $.validator.format( "Please enter a value between {0} and {1}." ),
			max: $.validator.format( "Please enter a value less than or equal to {0}." ),
			min: $.validator.format( "Please enter a value greater than or equal to {0}." )
		},

		autoCreateRanges: false,

		prototype: {

			init: function() {
				this.labelContainer = $( this.settings.errorLabelContainer );
				this.errorContext = this.labelContainer.length && this.labelContainer || $( this.currentForm );
				this.containers = $( this.settings.errorContainer ).add( this.settings.errorLabelContainer );
				this.submitted = {};
				this.valueCache = {};
				this.pendingRequest = 0;
				this.pending = {};
				this.invalid = {};
				this.reset();

				var groups = ( this.groups = {} ),
					rules;
				$.each( this.settings.groups, function( key, value ) {
					if ( typeof value === "string" ) {
						value = value.split( /\s/ );
					}
					$.each( value, function( index, name ) {
						groups[ name ] = key;
					});
				});
				rules = this.settings.rules;
				$.each( rules, function( key, value ) {
					rules[ key ] = $.validator.normalizeRule( value );
				});

				function delegate( event ) {
					var validator = $.data( this.form, "validator" ),
						eventType = "on" + event.type.replace( /^validate/, "" ),
						settings = validator.settings;
					if ( settings[ eventType ] && !$( this ).is( settings.ignore ) ) {
						settings[ eventType ].call( validator, this, event );
					}
				}

				$( this.currentForm )
					.on( "focusin.validate focusout.validate keyup.validate",
						":text, [type='password'], [type='file'], select, textarea, [type='number'], [type='search'], " +
						"[type='tel'], [type='url'], [type='email'], [type='datetime'], [type='date'], [type='month'], " +
						"[type='week'], [type='time'], [type='datetime-local'], [type='range'], [type='color'], " +
						"[type='radio'], [type='checkbox']", delegate)
					// Support: Chrome, oldIE
					// "select" is provided as event.target when clicking a option
					.on("click.validate", "select, option, [type='radio'], [type='checkbox']", delegate);

				if ( this.settings.invalidHandler ) {
					$( this.currentForm ).on( "invalid-form.validate", this.settings.invalidHandler );
				}

				// Add aria-required to any Static/Data/Class required fields before first validation
				// Screen readers require this attribute to be present before the initial submission http://www.w3.org/TR/WCAG-TECHS/ARIA2.html
				$( this.currentForm ).find( "[required], [data-rule-required], .required" ).attr( "aria-required", "true" );
			},

			// http://jqueryvalidation.org/Validator.form/
			form: function() {
				this.checkForm();
				$.extend( this.submitted, this.errorMap );
				this.invalid = $.extend({}, this.errorMap );
				if ( !this.valid() ) {
					$( this.currentForm ).triggerHandler( "invalid-form", [ this ]);
				}
				this.showErrors();
				return this.valid();
			},

			checkForm: function() {
				this.prepareForm();
				for ( var i = 0, elements = ( this.currentElements = this.elements() ); elements[ i ]; i++ ) {
					this.check( elements[ i ] );
				}
				return this.valid();
			},

			// http://jqueryvalidation.org/Validator.element/
			element: function( element ) {
				var cleanElement = this.clean( element ),
					checkElement = this.validationTargetFor( cleanElement ),
					result = true;

				this.lastElement = checkElement;

				if ( checkElement === undefined ) {
					delete this.invalid[ cleanElement.name ];
				} else {
					this.prepareElement( checkElement );
					this.currentElements = $( checkElement );

					result = this.check( checkElement ) !== false;
					if ( result ) {
						delete this.invalid[ checkElement.name ];
					} else {
						this.invalid[ checkElement.name ] = true;
					}
				}
				// Add aria-invalid status for screen readers
				$( element ).attr( "aria-invalid", !result );

				if ( !this.numberOfInvalids() ) {
					// Hide error containers on last error
					this.toHide = this.toHide.add( this.containers );
				}
				this.showErrors();
				return result;
			},

			// http://jqueryvalidation.org/Validator.showErrors/
			showErrors: function( errors ) {
				if ( errors ) {
					// add items to error list and map
					$.extend( this.errorMap, errors );
					this.errorList = [];
					for ( var name in errors ) {
						this.errorList.push({
							message: errors[ name ],
							element: this.findByName( name )[ 0 ]
						});
					}
					// remove items from success list
					this.successList = $.grep( this.successList, function( element ) {
						return !( element.name in errors );
					});
				}
				if ( this.settings.showErrors ) {
					this.settings.showErrors.call( this, this.errorMap, this.errorList );
				} else {
					this.defaultShowErrors();
				}
			},

			// http://jqueryvalidation.org/Validator.resetForm/
			resetForm: function() {
				if ( $.fn.resetForm ) {
					$( this.currentForm ).resetForm();
				}
				this.submitted = {};
				this.lastElement = null;
				this.prepareForm();
				this.hideErrors();
				var i, elements = this.elements()
					.removeData( "previousValue" )
					.removeAttr( "aria-invalid" );

				if ( this.settings.unhighlight ) {
					for ( i = 0; elements[ i ]; i++ ) {
						this.settings.unhighlight.call( this, elements[ i ],
							this.settings.errorClass, "" );
					}
				} else {
					elements.removeClass( this.settings.errorClass );
				}
			},

			numberOfInvalids: function() {
				return this.objectLength( this.invalid );
			},

			objectLength: function( obj ) {
				/* jshint unused: false */
				var count = 0,
					i;
				for ( i in obj ) {
					count++;
				}
				return count;
			},

			hideErrors: function() {
				this.hideThese( this.toHide );
			},

			hideThese: function( errors ) {
				errors.not( this.containers ).text( "" );
				this.addWrapper( errors ).hide();
			},

			valid: function() {
				return this.size() === 0;
			},

			size: function() {
				return this.errorList.length;
			},

			focusInvalid: function() {
				if ( this.settings.focusInvalid ) {
					try {
						$( this.findLastActive() || this.errorList.length && this.errorList[ 0 ].element || [])
						.filter( ":visible" )
						.focus()
						// manually trigger focusin event; without it, focusin handler isn't called, findLastActive won't have anything to find
						.trigger( "focusin" );
					} catch ( e ) {
						// ignore IE throwing errors when focusing hidden elements
					}
				}
			},

			findLastActive: function() {
				var lastActive = this.lastActive;
				return lastActive && $.grep( this.errorList, function( n ) {
					return n.element.name === lastActive.name;
				}).length === 1 && lastActive;
			},

			elements: function() {
				var validator = this,
					rulesCache = {};

				// select all valid inputs inside the form (no submit or reset buttons)
				return $( this.currentForm )
				.find( "input, select, textarea" )
				.not( ":submit, :reset, :image, :disabled" )
				.not( this.settings.ignore )
				.filter( function() {
					if ( !this.name && validator.settings.debug && window.console ) {
						console.error( "%o has no name assigned", this );
					}

					// select only the first element for each name, and only those with rules specified
					if ( this.name in rulesCache || !validator.objectLength( $( this ).rules() ) ) {
						return false;
					}

					rulesCache[ this.name ] = true;
					return true;
				});
			},

			clean: function( selector ) {
				return $( selector )[ 0 ];
			},

			errors: function() {
				var errorClass = this.settings.errorClass.split( " " ).join( "." );
				return $( this.settings.errorElement + "." + errorClass, this.errorContext );
			},

			reset: function() {
				this.successList = [];
				this.errorList = [];
				this.errorMap = {};
				this.toShow = $( [] );
				this.toHide = $( [] );
				this.currentElements = $( [] );
			},

			prepareForm: function() {
				this.reset();
				this.toHide = this.errors().add( this.containers );
			},

			prepareElement: function( element ) {
				this.reset();
				this.toHide = this.errorsFor( element );
			},

			elementValue: function( element ) {
				var val,
					$element = $( element ),
					type = element.type;

				if ( type === "radio" || type === "checkbox" ) {
					return this.findByName( element.name ).filter(":checked").val();
				} else if ( type === "number" && typeof element.validity !== "undefined" ) {
					return element.validity.badInput ? false : $element.val();
				}

				val = $element.val();
				if ( typeof val === "string" ) {
					return val.replace(/\r/g, "" );
				}
				return val;
			},

			check: function( element ) {
				element = this.validationTargetFor( this.clean( element ) );

				var rules = $( element ).rules(),
					rulesCount = $.map( rules, function( n, i ) {
						return i;
					}).length,
					dependencyMismatch = false,
					val = this.elementValue( element ),
					result, method, rule;

				for ( method in rules ) {
					rule = { method: method, parameters: rules[ method ] };
					try {

						result = $.validator.methods[ method ].call( this, val, element, rule.parameters );

						// if a method indicates that the field is optional and therefore valid,
						// don't mark it as valid when there are no other rules
						if ( result === "dependency-mismatch" && rulesCount === 1 ) {
							dependencyMismatch = true;
							continue;
						}
						dependencyMismatch = false;

						if ( result === "pending" ) {
							this.toHide = this.toHide.not( this.errorsFor( element ) );
							return;
						}

						if ( !result ) {
							this.formatAndAdd( element, rule );
							return false;
						}
					} catch ( e ) {
						if ( this.settings.debug && window.console ) {
							console.log( "Exception occurred when checking element " + element.id + ", check the '" + rule.method + "' method.", e );
						}
						if ( e instanceof TypeError ) {
							e.message += ".  Exception occurred when checking element " + element.id + ", check the '" + rule.method + "' method.";
						}

						throw e;
					}
				}
				if ( dependencyMismatch ) {
					return;
				}
				if ( this.objectLength( rules ) ) {
					this.successList.push( element );
				}
				return true;
			},

			// return the custom message for the given element and validation method
			// specified in the element's HTML5 data attribute
			// return the generic message if present and no method specific message is present
			customDataMessage: function( element, method ) {
				return $( element ).data( "msg" + method.charAt( 0 ).toUpperCase() +
					method.substring( 1 ).toLowerCase() ) || $( element ).data( "msg" );
			},

			// return the custom message for the given element name and validation method
			customMessage: function( name, method ) {
				var m = this.settings.messages[ name ];
				return m && ( m.constructor === String ? m : m[ method ]);
			},

			// return the first defined argument, allowing empty strings
			findDefined: function() {
				for ( var i = 0; i < arguments.length; i++) {
					if ( arguments[ i ] !== undefined ) {
						return arguments[ i ];
					}
				}
				return undefined;
			},

			defaultMessage: function( element, method ) {
				return this.findDefined(
					this.customMessage( element.name, method ),
					this.customDataMessage( element, method ),
					// title is never undefined, so handle empty string as undefined
					!this.settings.ignoreTitle && element.title || undefined,
					$.validator.messages[ method ],
					"<strong>Warning: No message defined for " + element.name + "</strong>"
				);
			},

			formatAndAdd: function( element, rule ) {
				var message = this.defaultMessage( element, rule.method ),
					theregex = /\$?\{(\d+)\}/g;
				if ( typeof message === "function" ) {
					message = message.call( this, rule.parameters, element );
				} else if ( theregex.test( message ) ) {
					message = $.validator.format( message.replace( theregex, "{$1}" ), rule.parameters );
				}
				this.errorList.push({
					message: message,
					element: element,
					method: rule.method
				});

				this.errorMap[ element.name ] = message;
				this.submitted[ element.name ] = message;
			},

			addWrapper: function( toToggle ) {
				if ( this.settings.wrapper ) {
					toToggle = toToggle.add( toToggle.parent( this.settings.wrapper ) );
				}
				return toToggle;
			},

			defaultShowErrors: function() {
				var i, elements, error;
				for ( i = 0; this.errorList[ i ]; i++ ) {
					error = this.errorList[ i ];
					if ( this.settings.highlight ) {
						this.settings.highlight.call( this, error.element, this.settings.errorClass, this.settings.validClass );
					}
					this.showLabel( error.element, error.message );
				}
				if ( this.errorList.length ) {
					this.toShow = this.toShow.add( this.containers );
				}
				if ( this.settings.success ) {
					for ( i = 0; this.successList[ i ]; i++ ) {
						this.showLabel( this.successList[ i ] );
					}
				}
				if ( this.settings.unhighlight ) {
					for ( i = 0, elements = this.validElements(); elements[ i ]; i++ ) {
						this.settings.unhighlight.call( this, elements[ i ], this.settings.errorClass, this.settings.validClass );
					}
				}
				this.toHide = this.toHide.not( this.toShow );
				this.hideErrors();
				this.addWrapper( this.toShow ).show();
			},

			validElements: function() {
				return this.currentElements.not( this.invalidElements() );
			},

			invalidElements: function() {
				return $( this.errorList ).map(function() {
					return this.element;
				});
			},

			showLabel: function( element, message ) {
				var place, group, errorID,
					error = this.errorsFor( element ),
					elementID = this.idOrName( element ),
					describedBy = $( element ).attr( "aria-describedby" );
				if ( error.length ) {
					// refresh error/success class
					error.removeClass( this.settings.validClass ).addClass( this.settings.errorClass );
					// replace message on existing label
					error.html( message );
				} else {
					// create error element
					error = $( "<" + this.settings.errorElement + ">" )
						.attr( "id", elementID + "-error" )
						.addClass( this.settings.errorClass )
						.html( message || "" );

					// Maintain reference to the element to be placed into the DOM
					place = error;
					if ( this.settings.wrapper ) {
						// make sure the element is visible, even in IE
						// actually showing the wrapped element is handled elsewhere
						place = error.hide().show().wrap( "<" + this.settings.wrapper + "/>" ).parent();
					}
					if ( this.labelContainer.length ) {
						this.labelContainer.append( place );
					} else if ( this.settings.errorPlacement ) {
						this.settings.errorPlacement( place, $( element ) );
					} else {
						place.insertAfter( element );
					}

					// Link error back to the element
					if ( error.is( "label" ) ) {
						// If the error is a label, then associate using 'for'
						error.attr( "for", elementID );
					} else if ( error.parents( "label[for='" + elementID + "']" ).length === 0 ) {
						// If the element is not a child of an associated label, then it's necessary
						// to explicitly apply aria-describedby

						errorID = error.attr( "id" ).replace( /(:|\.|\[|\]|\$)/g, "\\$1");
						// Respect existing non-error aria-describedby
						if ( !describedBy ) {
							describedBy = errorID;
						} else if ( !describedBy.match( new RegExp( "\\b" + errorID + "\\b" ) ) ) {
							// Add to end of list if not already present
							describedBy += " " + errorID;
						}
						$( element ).attr( "aria-describedby", describedBy );

						// If this element is grouped, then assign to all elements in the same group
						group = this.groups[ element.name ];
						if ( group ) {
							$.each( this.groups, function( name, testgroup ) {
								if ( testgroup === group ) {
									$( "[name='" + name + "']", this.currentForm )
										.attr( "aria-describedby", error.attr( "id" ) );
								}
							});
						}
					}
				}
				if ( !message && this.settings.success ) {
					error.text( "" );
					if ( typeof this.settings.success === "string" ) {
						error.addClass( this.settings.success );
					} else {
						this.settings.success( error, element );
					}
				}
				this.toShow = this.toShow.add( error );
			},

			errorsFor: function( element ) {
				var name = this.idOrName( element ),
					describer = $( element ).attr( "aria-describedby" ),
					selector = "label[for='" + name + "'], label[for='" + name + "'] *";

				// aria-describedby should directly reference the error element
				if ( describer ) {
					selector = selector + ", #" + describer.replace( /\s+/g, ", #" );
				}
				return this
					.errors()
					.filter( selector );
			},

			idOrName: function( element ) {
				return this.groups[ element.name ] || ( this.checkable( element ) ? element.name : element.id || element.name );
			},

			validationTargetFor: function( element ) {

				// If radio/checkbox, validate first element in group instead
				if ( this.checkable( element ) ) {
					element = this.findByName( element.name );
				}

				// Always apply ignore filter
				return $( element ).not( this.settings.ignore )[ 0 ];
			},

			checkable: function( element ) {
				return ( /radio|checkbox/i ).test( element.type );
			},

			findByName: function( name ) {
				return $( this.currentForm ).find( "[name='" + name + "']" );
			},

			getLength: function( value, element ) {
				switch ( element.nodeName.toLowerCase() ) {
				case "select":
					return $( "option:selected", element ).length;
				case "input":
					if ( this.checkable( element ) ) {
						return this.findByName( element.name ).filter( ":checked" ).length;
					}
				}
				return value.length;
			},

			depend: function( param, element ) {
				return this.dependTypes[typeof param] ? this.dependTypes[typeof param]( param, element ) : true;
			},

			dependTypes: {
				"boolean": function( param ) {
					return param;
				},
				"string": function( param, element ) {
					return !!$( param, element.form ).length;
				},
				"function": function( param, element ) {
					return param( element );
				}
			},

			optional: function( element ) {
				var val = this.elementValue( element );
				return !$.validator.methods.required.call( this, val, element ) && "dependency-mismatch";
			},

			startRequest: function( element ) {
				if ( !this.pending[ element.name ] ) {
					this.pendingRequest++;
					this.pending[ element.name ] = true;
				}
			},

			stopRequest: function( element, valid ) {
				this.pendingRequest--;
				// sometimes synchronization fails, make sure pendingRequest is never < 0
				if ( this.pendingRequest < 0 ) {
					this.pendingRequest = 0;
				}
				delete this.pending[ element.name ];
				if ( valid && this.pendingRequest === 0 && this.formSubmitted && this.form() ) {
					$( this.currentForm ).submit();
					this.formSubmitted = false;
				} else if (!valid && this.pendingRequest === 0 && this.formSubmitted ) {
					$( this.currentForm ).triggerHandler( "invalid-form", [ this ]);
					this.formSubmitted = false;
				}
			},

			previousValue: function( element ) {
				return $.data( element, "previousValue" ) || $.data( element, "previousValue", {
					old: null,
					valid: true,
					message: this.defaultMessage( element, "remote" )
				});
			},

			// cleans up all forms and elements, removes validator-specific events
			destroy: function() {
				this.resetForm();

				$( this.currentForm )
					.off( ".validate" )
					.removeData( "validator" );
			}

		},

		classRuleSettings: {
			required: { required: true },
			email: { email: true },
			url: { url: true },
			date: { date: true },
			dateISO: { dateISO: true },
			number: { number: true },
			digits: { digits: true },
			creditcard: { creditcard: true }
		},

		addClassRules: function( className, rules ) {
			if ( className.constructor === String ) {
				this.classRuleSettings[ className ] = rules;
			} else {
				$.extend( this.classRuleSettings, className );
			}
		},

		classRules: function( element ) {
			var rules = {},
				classes = $( element ).attr( "class" );

			if ( classes ) {
				$.each( classes.split( " " ), function() {
					if ( this in $.validator.classRuleSettings ) {
						$.extend( rules, $.validator.classRuleSettings[ this ]);
					}
				});
			}
			return rules;
		},

		normalizeAttributeRule: function( rules, type, method, value ) {

			// convert the value to a number for number inputs, and for text for backwards compability
			// allows type="date" and others to be compared as strings
			if ( /min|max/.test( method ) && ( type === null || /number|range|text/.test( type ) ) ) {
				value = Number( value );

				// Support Opera Mini, which returns NaN for undefined minlength
				if ( isNaN( value ) ) {
					value = undefined;
				}
			}

			if ( value || value === 0 ) {
				rules[ method ] = value;
			} else if ( type === method && type !== "range" ) {

				// exception: the jquery validate 'range' method
				// does not test for the html5 'range' type
				rules[ method ] = true;
			}
		},

		attributeRules: function( element ) {
			var rules = {},
				$element = $( element ),
				type = element.getAttribute( "type" ),
				method, value;

			for ( method in $.validator.methods ) {

				// support for <input required> in both html5 and older browsers
				if ( method === "required" ) {
					value = element.getAttribute( method );

					// Some browsers return an empty string for the required attribute
					// and non-HTML5 browsers might have required="" markup
					if ( value === "" ) {
						value = true;
					}

					// force non-HTML5 browsers to return bool
					value = !!value;
				} else {
					value = $element.attr( method );
				}

				this.normalizeAttributeRule( rules, type, method, value );
			}

			// maxlength may be returned as -1, 2147483647 ( IE ) and 524288 ( safari ) for text inputs
			if ( rules.maxlength && /-1|2147483647|524288/.test( rules.maxlength ) ) {
				delete rules.maxlength;
			}

			return rules;
		},

		dataRules: function( element ) {
			var rules = {},
				$element = $( element ),
				type = element.getAttribute( "type" ),
				method, value;

			for ( method in $.validator.methods ) {
				value = $element.data( "rule" + method.charAt( 0 ).toUpperCase() + method.substring( 1 ).toLowerCase() );
				this.normalizeAttributeRule( rules, type, method, value );
			}
			return rules;
		},

		staticRules: function( element ) {
			var rules = {},
				validator = $.data( element.form, "validator" );

			if ( validator.settings.rules ) {
				rules = $.validator.normalizeRule( validator.settings.rules[ element.name ] ) || {};
			}
			return rules;
		},

		normalizeRules: function( rules, element ) {
			// handle dependency check
			$.each( rules, function( prop, val ) {
				// ignore rule when param is explicitly false, eg. required:false
				if ( val === false ) {
					delete rules[ prop ];
					return;
				}
				if ( val.param || val.depends ) {
					var keepRule = true;
					switch ( typeof val.depends ) {
					case "string":
						keepRule = !!$( val.depends, element.form ).length;
						break;
					case "function":
						keepRule = val.depends.call( element, element );
						break;
					}
					if ( keepRule ) {
						rules[ prop ] = val.param !== undefined ? val.param : true;
					} else {
						delete rules[ prop ];
					}
				}
			});

			// evaluate parameters
			$.each( rules, function( rule, parameter ) {
				rules[ rule ] = $.isFunction( parameter ) ? parameter( element ) : parameter;
			});

			// clean number parameters
			$.each([ "minlength", "maxlength" ], function() {
				if ( rules[ this ] ) {
					rules[ this ] = Number( rules[ this ] );
				}
			});
			$.each([ "rangelength", "range" ], function() {
				var parts;
				if ( rules[ this ] ) {
					if ( $.isArray( rules[ this ] ) ) {
						rules[ this ] = [ Number( rules[ this ][ 0 ]), Number( rules[ this ][ 1 ] ) ];
					} else if ( typeof rules[ this ] === "string" ) {
						parts = rules[ this ].replace(/[\[\]]/g, "" ).split( /[\s,]+/ );
						rules[ this ] = [ Number( parts[ 0 ]), Number( parts[ 1 ] ) ];
					}
				}
			});

			if ( $.validator.autoCreateRanges ) {
				// auto-create ranges
				if ( rules.min != null && rules.max != null ) {
					rules.range = [ rules.min, rules.max ];
					delete rules.min;
					delete rules.max;
				}
				if ( rules.minlength != null && rules.maxlength != null ) {
					rules.rangelength = [ rules.minlength, rules.maxlength ];
					delete rules.minlength;
					delete rules.maxlength;
				}
			}

			return rules;
		},

		// Converts a simple string to a {string: true} rule, e.g., "required" to {required:true}
		normalizeRule: function( data ) {
			if ( typeof data === "string" ) {
				var transformed = {};
				$.each( data.split( /\s/ ), function() {
					transformed[ this ] = true;
				});
				data = transformed;
			}
			return data;
		},

		// http://jqueryvalidation.org/jQuery.validator.addMethod/
		addMethod: function( name, method, message ) {
			$.validator.methods[ name ] = method;
			$.validator.messages[ name ] = message !== undefined ? message : $.validator.messages[ name ];
			if ( method.length < 3 ) {
				$.validator.addClassRules( name, $.validator.normalizeRule( name ) );
			}
		},

		methods: {

			// http://jqueryvalidation.org/required-method/
			required: function( value, element, param ) {
				// check if dependency is met
				if ( !this.depend( param, element ) ) {
					return "dependency-mismatch";
				}
				if ( element.nodeName.toLowerCase() === "select" ) {
					// could be an array for select-multiple or a string, both are fine this way
					var val = $( element ).val();
					return val && val.length > 0;
				}
				if ( this.checkable( element ) ) {
					return this.getLength( value, element ) > 0;
				}
				return value.length > 0;
			},

			// http://jqueryvalidation.org/email-method/
			email: function( value, element ) {
				// From https://html.spec.whatwg.org/multipage/forms.html#valid-e-mail-address
				// Retrieved 2014-01-14
				// If you have a problem with this implementation, report a bug against the above spec
				// Or use custom methods to implement your own email validation
				return this.optional( element ) || /^[a-zA-Z0-9.!#$%&'*+\/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/.test( value );
			},

			// http://jqueryvalidation.org/url-method/
			url: function( value, element ) {

				// Copyright (c) 2010-2013 Diego Perini, MIT licensed
				// https://gist.github.com/dperini/729294
				// see also https://mathiasbynens.be/demo/url-regex
				// modified to allow protocol-relative URLs
				return this.optional( element ) || /^(?:(?:(?:https?|ftp):)?\/\/)(?:\S+(?::\S*)?@)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)(?:\.(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)*(?:\.(?:[a-z\u00a1-\uffff]{2,})).?)(?::\d{2,5})?(?:[/?#]\S*)?$/i.test( value );
			},

			// http://jqueryvalidation.org/date-method/
			date: function( value, element ) {
				return this.optional( element ) || !/Invalid|NaN/.test( new Date( value ).toString() );
			},

			// http://jqueryvalidation.org/dateISO-method/
			dateISO: function( value, element ) {
				return this.optional( element ) || /^\d{4}[\/\-](0?[1-9]|1[012])[\/\-](0?[1-9]|[12][0-9]|3[01])$/.test( value );
			},

			// http://jqueryvalidation.org/number-method/
			number: function( value, element ) {
				return this.optional( element ) || /^(?:-?\d+|-?\d{1,3}(?:,\d{3})+)?(?:\.\d+)?$/.test( value );
			},

			// http://jqueryvalidation.org/digits-method/
			digits: function( value, element ) {
				return this.optional( element ) || /^\d+$/.test( value );
			},

			// http://jqueryvalidation.org/creditcard-method/
			// based on http://en.wikipedia.org/wiki/Luhn_algorithm
			creditcard: function( value, element ) {
				if ( this.optional( element ) ) {
					return "dependency-mismatch";
				}
				// accept only spaces, digits and dashes
				if ( /[^0-9 \-]+/.test( value ) ) {
					return false;
				}
				var nCheck = 0,
					nDigit = 0,
					bEven = false,
					n, cDigit;

				value = value.replace( /\D/g, "" );

				// Basing min and max length on
				// http://developer.ean.com/general_info/Valid_Credit_Card_Types
				if ( value.length < 13 || value.length > 19 ) {
					return false;
				}

				for ( n = value.length - 1; n >= 0; n--) {
					cDigit = value.charAt( n );
					nDigit = parseInt( cDigit, 10 );
					if ( bEven ) {
						if ( ( nDigit *= 2 ) > 9 ) {
							nDigit -= 9;
						}
					}
					nCheck += nDigit;
					bEven = !bEven;
				}

				return ( nCheck % 10 ) === 0;
			},

			// http://jqueryvalidation.org/minlength-method/
			minlength: function( value, element, param ) {
				var length = $.isArray( value ) ? value.length : this.getLength( value, element );
				return this.optional( element ) || length >= param;
			},

			// http://jqueryvalidation.org/maxlength-method/
			maxlength: function( value, element, param ) {
				var length = $.isArray( value ) ? value.length : this.getLength( value, element );
				return this.optional( element ) || length <= param;
			},

			// http://jqueryvalidation.org/rangelength-method/
			rangelength: function( value, element, param ) {
				var length = $.isArray( value ) ? value.length : this.getLength( value, element );
				return this.optional( element ) || ( length >= param[ 0 ] && length <= param[ 1 ] );
			},

			// http://jqueryvalidation.org/min-method/
			min: function( value, element, param ) {
				return this.optional( element ) || value >= param;
			},

			// http://jqueryvalidation.org/max-method/
			max: function( value, element, param ) {
				return this.optional( element ) || value <= param;
			},

			// http://jqueryvalidation.org/range-method/
			range: function( value, element, param ) {
				return this.optional( element ) || ( value >= param[ 0 ] && value <= param[ 1 ] );
			},

			// http://jqueryvalidation.org/equalTo-method/
			equalTo: function( value, element, param ) {
				// bind to the blur event of the target in order to revalidate whenever the target field is updated
				// TODO find a way to bind the event just once, avoiding the unbind-rebind overhead
				var target = $( param );
				if ( this.settings.onfocusout ) {
					target.off( ".validate-equalTo" ).on( "blur.validate-equalTo", function() {
						$( element ).valid();
					});
				}
				return value === target.val();
			},

			// http://jqueryvalidation.org/remote-method/
			remote: function( value, element, param ) {
				if ( this.optional( element ) ) {
					return "dependency-mismatch";
				}

				var previous = this.previousValue( element ),
					validator, data;

				if (!this.settings.messages[ element.name ] ) {
					this.settings.messages[ element.name ] = {};
				}
				previous.originalMessage = this.settings.messages[ element.name ].remote;
				this.settings.messages[ element.name ].remote = previous.message;

				param = typeof param === "string" && { url: param } || param;

				if ( previous.old === value ) {
					return previous.valid;
				}

				previous.old = value;
				validator = this;
				this.startRequest( element );
				data = {};
				data[ element.name ] = value;
				$.ajax( $.extend( true, {
					mode: "abort",
					port: "validate" + element.name,
					dataType: "json",
					data: data,
					context: validator.currentForm,
					success: function( response ) {
						var valid = response === true || response === "true",
							errors, message, submitted;

						validator.settings.messages[ element.name ].remote = previous.originalMessage;
						if ( valid ) {
							submitted = validator.formSubmitted;
							validator.prepareElement( element );
							validator.formSubmitted = submitted;
							validator.successList.push( element );
							delete validator.invalid[ element.name ];
							validator.showErrors();
						} else {
							errors = {};
							message = response || validator.defaultMessage( element, "remote" );
							errors[ element.name ] = previous.message = $.isFunction( message ) ? message( value ) : message;
							validator.invalid[ element.name ] = true;
							validator.showErrors( errors );
						}
						previous.valid = valid;
						validator.stopRequest( element, valid );
					}
				}, param ) );
				return "pending";
			}
		}

	});

	// ajax mode: abort
	// usage: $.ajax({ mode: "abort"[, port: "uniqueport"]});
	// if mode:"abort" is used, the previous request on that port (port can be undefined) is aborted via XMLHttpRequest.abort()

	var pendingRequests = {},
		ajax;
	// Use a prefilter if available (1.5+)
	if ( $.ajaxPrefilter ) {
		$.ajaxPrefilter(function( settings, _, xhr ) {
			var port = settings.port;
			if ( settings.mode === "abort" ) {
				if ( pendingRequests[port] ) {
					pendingRequests[port].abort();
				}
				pendingRequests[port] = xhr;
			}
		});
	} else {
		// Proxy ajax
		ajax = $.ajax;
		$.ajax = function( settings ) {
			var mode = ( "mode" in settings ? settings : $.ajaxSettings ).mode,
				port = ( "port" in settings ? settings : $.ajaxSettings ).port;
			if ( mode === "abort" ) {
				if ( pendingRequests[port] ) {
					pendingRequests[port].abort();
				}
				pendingRequests[port] = ajax.apply(this, arguments);
				return pendingRequests[port];
			}
			return ajax.apply(this, arguments);
		};
	}

	}));

/***/ },

/***/ 184:
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function($) {/*
	 * Translated default messages for the jQuery validation plugin.
	 * Locale: ZH (Chinese, 中文 (Zhōngwén), 汉语, 漢語)
	 */
	$.extend($.validator.messages, {
		required: "这是必填字段",
		remote: "请修正此字段",
		email: "请输入有效的电子邮件地址",
		url: "请输入有效的网址",
		date: "请输入有效的日期",
		dateISO: "请输入有效的日期 (YYYY-MM-DD)",
		number: "请输入有效的数字",
		digits: "只能输入数字",
		creditcard: "请输入有效的信用卡号码",
		equalTo: "你的输入不相同",
		extension: "请输入有效的后缀",
		maxlength: $.validator.format("最多可以输入 {0} 个字符"),
		minlength: $.validator.format("最少要输入 {0} 个字符"),
		rangelength: $.validator.format("请输入长度在 {0} 到 {1} 之间的字符串"),
		range: $.validator.format("请输入范围在 {0} 到 {1} 之间的数值"),
		max: $.validator.format("请输入不大于 {0} 的数值"),
		min: $.validator.format("请输入不小于 {0} 的数值")
	});

	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(82)))

/***/ }

});