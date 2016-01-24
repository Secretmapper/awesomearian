/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	var sneakpeek = __webpack_require__(1)
	sneakpeek(document.getElementById('header'))


/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	(function() {
	  var root = this;
	  var absolute = Math.abs;
	  var THROTTLE_MS = 100;

	  var throttle = function(func) {
	    var timeout = null
	    var previous = 0
	    var later = function() {
	      previous = +new Date
	      timeout = null
	      func()
	    }
	    return function() {
	      var now = +new Date
	      if (!previous) previous = now
	      var remaining = THROTTLE_MS - (now - previous)
	      if (remaining <= 0 || remaining > THROTTLE_MS) {
	        clearTimeout(timeout)
	        timeout = null
	        previous = now
	        func()
	      } else if (!timeout) {
	        timeout = setTimeout(later, remaining)
	      }
	    }
	  }

	  var getScrollPos = function() {
	    var scrollTop = (pageYOffset !== undefined) ? pageYOffset : (document.documentElement || document.body.parentNode || document.body).scrollTop
	    return (scrollTop < 0 ? 0 : scrollTop)
	  }
	  var inBrowser = typeof window !== "undefined"

	  var scrollDelta = function(previousState, y) {
	    var diff = y - previousState.y
	    var newDelta = absolute(previousState.d) < absolute(previousState.d + diff) ? previousState.d + diff : diff
	    var newState = {
	      d: newDelta,
	      y: y
	    }
	    return newState
	  }

	  var emitter = (function() {
	    var noop = function(){}
	    if (!inBrowser) { return {on: noop, off: noop}}
	    var listeners = []
	    var emit = function(eventType) {
	      listeners
	        .filter(function(listener){ return listener.t == eventType })
	        .forEach(function(listener){ listener.f() })
	    }
	    var scrollState;
	    var firstScroll = true;
	    var headerIsVisible = true;
	    addEventListener('scroll', throttle(function() {
	      if (firstScroll) {
	        firstScroll = false;
	        scrollState = {
	          y: getScrollPos(),
	          d: 0
	        }
	        return
	      }
	      scrollState = scrollDelta(scrollState, getScrollPos())
	      if (scrollState.d > 120 && headerIsVisible) {
	        emit('hide')
	        headerIsVisible = false;
	      }
	      if (scrollState.d < -120 && !headerIsVisible) {
	        emit('show')
	        headerIsVisible = true;
	      }
	    }), false)
	    return {
	      on: function(eventType, listener) {
	        listeners = listeners.concat([{ t: eventType, f: listener }])
	      },
	      off: function(eventType, listener) {
	        listeners = listeners.filter(function(existingListener) {
	          return existingListener.f !== listener || existingListener.t !== eventType
	        })
	      }
	    }
	  })()

	  var sneakpeek = function(elem, options) {
	    if (!inBrowser) { return elem }
	    options = options || {}
	    var hiddenClass = options.hiddenClass || 'sneakpeek--hidden'
	    emitter.on('hide', function() {
	      elem.classList.add(hiddenClass)
	    })
	    emitter.on('show', function() {
	      elem.classList.remove(hiddenClass)
	    })
	    return elem
	  }

	  sneakpeek.emitter = emitter

	  if (true) {
	    if (typeof module !== 'undefined' && module.exports) {
	      exports = module.exports = sneakpeek;
	    }
	    exports.sneakpeek = sneakpeek;
	  } else {
	    root.sneakpeek = sneakpeek;
	  }
	}).call(this)

/***/ }
/******/ ]);