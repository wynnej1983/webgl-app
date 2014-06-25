(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);throw new Error("Cannot find module '"+o+"'")}var f=n[o]={exports:{}};t[o][0].call(f.exports,function(e){var n=t[o][1][e];return s(n?n:e)},f,f.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

var inherits = require('inherits');

Function.prototype.inherits = function (superclass) {
  inherits(this, superclass);
  return this;
};

function log(data) {
  console.log(data);
}

module.exports.log = log;

},{"inherits":3}],2:[function(require,module,exports){
(function (global){
'use strict';

var THREE = (typeof window !== "undefined" ? window.THREE : typeof global !== "undefined" ? global.THREE : null);
var common = require('./common');

var AppBase = function () {
    common.log('in AppBase ctor');
};

//Main app class
var App = function () {
    common.log('in App ctor');
    if (!(this instanceof App)) { return new App(); }

    AppBase.call(this);

    this.camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 1, 10000);
    this.camera.position.z = 1000;
    this.scene = new THREE.Scene();

    //create 9 images and add to scene
    for(var row = -1; row < 2; row++) {
      for(var col = -1; col < 2; col++) {
        var img = this._createImage();
        img.position.x = col * 500;
        img.position.y = row * 500;

        this.scene.add(img);
      }
    }

    //set camera to look at central of scene
    this.camera.lookAt(this.scene.position);

    this.renderer = new THREE.WebGLRenderer();
    this.renderer.setSize(window.innerWidth, window.innerHeight);

    document.querySelector('#test-container').appendChild(this.renderer.domElement);
    //add slider to body
    this.slider = this._createSlider();
    document.body.appendChild(this.slider);

    //rerender scene on window resize
    window.addEventListener('resize', function() {
      this.renderer.setSize(window.innerWidth, window.innerHeight);
      this.camera.updateProjectionMatrix();
      this.camera.aspect = window.innerWidth / window.innerHeight;
      this.slider.style.left = (window.innerWidth/2) - (100) + 'px';
      this.slider.style.bottom = '10px';
      this.renderer.render(this.scene, this.camera);
    }.bind(this));

    //render scene
    this.renderer.render(this.scene, this.camera);
}.inherits(AppBase);

App.prototype._createImage = function() {
    var geometry = new THREE.BoxGeometry(400, 400, 1);
    var map = THREE.ImageUtils.loadTexture('/img/cat.jpg', {}, function() {
      this.renderer.render(this.scene, this.camera);
    }.bind(this));
    var material = new THREE.MeshBasicMaterial({
        map: map
    });
    var mesh = new THREE.Mesh(geometry, material);

    return mesh;
};

App.prototype._createSlider = function() {
    var slider = document.createElement('input');
    slider.style.width = '200px';
    slider.style.height = '25px';
    slider.style.position = 'absolute';
    slider.style.left = (window.innerWidth/2) - (100) + 'px';
    slider.style.bottom = '10px';
    slider.id = 'zoom';
    slider.type = 'range';
    slider.min = 20;
    slider.max = 150;
    slider.value = 75;
    slider.step = 5;
    slider.onchange = function() {
      this.camera.fov = slider.value;
      this.camera.updateProjectionMatrix();
      this.renderer.render(this.scene, this.camera);
    }.bind(this);

    return slider;
};

//export app
module.exports = new App();

}).call(this,typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{"./common":1}],3:[function(require,module,exports){
if (typeof Object.create === 'function') {
  // implementation from standard node.js 'util' module
  module.exports = function inherits(ctor, superCtor) {
    ctor.super_ = superCtor
    ctor.prototype = Object.create(superCtor.prototype, {
      constructor: {
        value: ctor,
        enumerable: false,
        writable: true,
        configurable: true
      }
    });
  };
} else {
  // old school shim for old browsers
  module.exports = function inherits(ctor, superCtor) {
    ctor.super_ = superCtor
    var TempCtor = function () {}
    TempCtor.prototype = superCtor.prototype
    ctor.prototype = new TempCtor()
    ctor.prototype.constructor = ctor
  }
}

},{}]},{},[2])