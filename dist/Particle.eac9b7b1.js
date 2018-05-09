// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles

// eslint-disable-next-line no-global-assign
parcelRequire = (function (modules, cache, entry, globalName) {
  // Save the require from previous bundle to this closure if any
  var previousRequire = typeof parcelRequire === 'function' && parcelRequire;
  var nodeRequire = typeof require === 'function' && require;

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire = typeof parcelRequire === 'function' && parcelRequire;
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error('Cannot find module \'' + name + '\'');
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;

      var module = cache[name] = new newRequire.Module(name);

      modules[name][0].call(module.exports, localRequire, module, module.exports, this);
    }

    return cache[name].exports;

    function localRequire(x){
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x){
      return modules[name][1][x] || x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;

  for (var i = 0; i < entry.length; i++) {
    newRequire(entry[i]);
  }

  if (entry.length) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(entry[entry.length - 1]);

    // CommonJS
    if (typeof exports === "object" && typeof module !== "undefined") {
      module.exports = mainExports;

    // RequireJS
    } else if (typeof define === "function" && define.amd) {
     define(function () {
       return mainExports;
     });

    // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }

  // Override the current require with this new one
  return newRequire;
})({11:[function(require,module,exports) {
var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Particle = function () {
  function Particle(_ref) {
    var sketch = _ref.sketch,
        position = _ref.position;

    _classCallCheck(this, Particle);

    var createVector = sketch.createVector;

    this.sketch = sketch || null;
    this.radius = 10;
    this.position = position || createVector(0, 0);
    this.velocity = createVector(0, 0);
    this.acceleration = createVector(0, 0);
    this.maxVelocity = 100;
    this.color = "white";

    // for verlet integration we need to keep track of the old position
    // We calculate where the particle would have been in the past
    this.previousPosition = createVector(this.position.x - this.velocity.x, this.position.y - this.velocity.y);
  }

  /*
  * returns a vector from this particle's position
  * to another particle's position
  */


  _createClass(Particle, [{
    key: "getVectorTo",
    value: function getVectorTo(anotherParticle) {
      return anotherParticle.position.copy().sub(this.position);
    }

    /**
     * returns the distance^2 (magnitude) between
     * this particle and another particle
     *
     * this function may be more useful in particle systems
     * since we avoid finding the distance (which involves
     * a sqrt) and then squaring it again.
     */

  }, {
    key: "getDistSqTo",
    value: function getDistSqTo(anotherParticle) {
      var dx = this.position.x - anotherParticle.position.x;
      var dy = this.position.y - anotherParticle.position.y;
      return dx * dx + dy * dy;
    }
  }, {
    key: "getDistTo",
    value: function getDistTo(anotherParticle) {
      if (!(anotherParticle instanceof Particle)) {
        throw Error("getDistanceTo(): cannot get distance between " + this + " and other particle '" + anotherParticle + "'");
      }

      return this.position.dist(anotherParticle.position);
    }
  }, {
    key: "correctForEdgeWrap",
    value: function correctForEdgeWrap() {
      // off right edge, wrap around to left
      if (this.position.x > this.sketch.width) {
        this.position.x = 0;
        this.previousPosition.x = this.position.x - this.velocity.x;
      }

      // off left edge
      if (this.position.x < 0) {
        this.position.x = this.sketch.width;
        this.previousPosition.x = this.position.x - this.velocity.x;
      }

      // off top edge
      if (this.position.y < 0) {
        this.position.y = this.sketch.height;
        this.previousPosition.y = this.position.y - this.velocity.y;
      }

      // off bottom edge
      if (this.position.y > this.sketch.height) {
        this.position.y = 0;
        this.previousPosition.y = this.position.y - this.velocity.y;
      }
    }

    /**
     * update position using Verlet Integration
     */

  }, {
    key: "update",
    value: function update() {
      // calulate new velocity
      // note we use previousPosition and position to calc current velocity
      this.velocity.set(this.position.x - this.previousPosition.x + this.acceleration.x, this.position.y - this.previousPosition.y + this.acceleration.y);

      // keep the velocity within the bounds of maxVelocity
      this.velocity.limit(this.maxVelocity);

      // update previousPosition
      this.previousPosition.set(this.position.copy());

      // update current position, taking the above calculated velocity into account
      this.position.add(this.velocity);

      // handle edge cases
      this.correctForEdgeWrap();

      return this;
    }
  }, {
    key: "render",
    value: function render() {
      var s = this.sketch;
      if (!s) throw Error("Cannot render. No sketch is set for this particle.");

      s.push();
      s.push();
      s.noStroke();
      s.fill(this.color);
      s.ellipse(this.position.x, this.position.y, this.radius, this.radius);
      s.pop();

      return this;
    }
  }]);

  return Particle;
}();
},{}],25:[function(require,module,exports) {
var global = arguments[3];
var OVERLAY_ID = '__parcel__error__overlay__';

var OldModule = module.bundle.Module;

function Module(moduleName) {
  OldModule.call(this, moduleName);
  this.hot = {
    data: module.bundle.hotData,
    _acceptCallbacks: [],
    _disposeCallbacks: [],
    accept: function (fn) {
      this._acceptCallbacks.push(fn || function () {});
    },
    dispose: function (fn) {
      this._disposeCallbacks.push(fn);
    }
  };

  module.bundle.hotData = null;
}

module.bundle.Module = Module;

var parent = module.bundle.parent;
if ((!parent || !parent.isParcelRequire) && typeof WebSocket !== 'undefined') {
  var hostname = '' || location.hostname;
  var protocol = location.protocol === 'https:' ? 'wss' : 'ws';
  var ws = new WebSocket(protocol + '://' + hostname + ':' + '59764' + '/');
  ws.onmessage = function (event) {
    var data = JSON.parse(event.data);

    if (data.type === 'update') {
      data.assets.forEach(function (asset) {
        hmrApply(global.parcelRequire, asset);
      });

      data.assets.forEach(function (asset) {
        if (!asset.isNew) {
          hmrAccept(global.parcelRequire, asset.id);
        }
      });
      // Clear the console after HMR
      console.clear();
    }

    if (data.type === 'reload') {
      ws.close();
      ws.onclose = function () {
        location.reload();
      };
    }

    if (data.type === 'error-resolved') {
      console.log('[parcel] ✨ Error resolved');

      removeErrorOverlay();
    }

    if (data.type === 'error') {
      console.error('[parcel] 🚨  ' + data.error.message + '\n' + data.error.stack);

      removeErrorOverlay();

      var overlay = createErrorOverlay(data);
      document.body.appendChild(overlay);
    }
  };
}

function removeErrorOverlay() {
  var overlay = document.getElementById(OVERLAY_ID);
  if (overlay) {
    overlay.remove();
  }
}

function createErrorOverlay(data) {
  var overlay = document.createElement('div');
  overlay.id = OVERLAY_ID;

  // html encode message and stack trace
  var message = document.createElement('div');
  var stackTrace = document.createElement('pre');
  message.innerText = data.error.message;
  stackTrace.innerText = data.error.stack;

  overlay.innerHTML = '<div style="background: black; font-size: 16px; color: white; position: fixed; height: 100%; width: 100%; top: 0px; left: 0px; padding: 30px; opacity: 0.85; font-family: Menlo, Consolas, monospace; z-index: 9999;">' + '<span style="background: red; padding: 2px 4px; border-radius: 2px;">ERROR</span>' + '<span style="top: 2px; margin-left: 5px; position: relative;">🚨</span>' + '<div style="font-size: 18px; font-weight: bold; margin-top: 20px;">' + message.innerHTML + '</div>' + '<pre>' + stackTrace.innerHTML + '</pre>' + '</div>';

  return overlay;
}

function getParents(bundle, id) {
  var modules = bundle.modules;
  if (!modules) {
    return [];
  }

  var parents = [];
  var k, d, dep;

  for (k in modules) {
    for (d in modules[k][1]) {
      dep = modules[k][1][d];
      if (dep === id || Array.isArray(dep) && dep[dep.length - 1] === id) {
        parents.push(+k);
      }
    }
  }

  if (bundle.parent) {
    parents = parents.concat(getParents(bundle.parent, id));
  }

  return parents;
}

function hmrApply(bundle, asset) {
  var modules = bundle.modules;
  if (!modules) {
    return;
  }

  if (modules[asset.id] || !bundle.parent) {
    var fn = new Function('require', 'module', 'exports', asset.generated.js);
    asset.isNew = !modules[asset.id];
    modules[asset.id] = [fn, asset.deps];
  } else if (bundle.parent) {
    hmrApply(bundle.parent, asset);
  }
}

function hmrAccept(bundle, id) {
  var modules = bundle.modules;
  if (!modules) {
    return;
  }

  if (!modules[id] && bundle.parent) {
    return hmrAccept(bundle.parent, id);
  }

  var cached = bundle.cache[id];
  bundle.hotData = {};
  if (cached) {
    cached.hot.data = bundle.hotData;
  }

  if (cached && cached.hot && cached.hot._disposeCallbacks.length) {
    cached.hot._disposeCallbacks.forEach(function (cb) {
      cb(bundle.hotData);
    });
  }

  delete bundle.cache[id];
  bundle(id);

  cached = bundle.cache[id];
  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    cached.hot._acceptCallbacks.forEach(function (cb) {
      cb();
    });
    return true;
  }

  return getParents(global.parcelRequire, id).some(function (id) {
    return hmrAccept(global.parcelRequire, id);
  });
}
},{}]},{},[25,11], null)
//# sourceMappingURL=/Particle.eac9b7b1.map