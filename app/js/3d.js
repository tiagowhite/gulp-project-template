//=require build/three.min.js
//=require examples/js/postprocessing/EffectComposer.js
//=require examples/js/postprocessing/ShaderPass.js
//=require examples/js/postprocessing/RenderPass.js
//=require examples/js/shaders/CopyShader.js
//=require examples/js/shaders/DigitalGlitch.js
//=require examples/js/postprocessing/GlitchPass.js


"use strict";
function World() {
  this.constructor = function () {
    this.container = document.querySelector('#canvas');
    this.viewWidth = this.container.clientWidth;
    this.viewHeight = this.container.clientHeight;
    this.texture = new THREE.TextureLoader().load( "../img/logo0a.png");

    this.scene = new THREE.Scene();
    this.renderer = new THREE.WebGLRenderer({alpha: true});
    this.renderer.setSize(this.viewWidth, this.viewHeight);
    this.renderer.setPixelRatio(window.devicePixelRatio);
    this.renderer.setClearColor(0x000000, 0);
    document.querySelector('#canvas').appendChild(this.renderer.domElement);

    this.resize();

    this.addObject();
    requestAnimationFrame(this.render.bind(this));
    window.addEventListener('resize', this.resize.bind(this));
  };

  this.addObject = function() {
    this.material = new THREE.MeshBasicMaterial({map: this.texture });
    this.geometry = new THREE.PlaneBufferGeometry(window.innerWidth, window.innerHeight, 50);
    this.plane = new THREE.Mesh(this.geometry, this.material);
    this.scene.add(this.plane);
  };

  this.render = function() {
    requestAnimationFrame(this.render.bind(this));
    this.renderer.render(this.scene, this.camera);
  };

  this.resize = function() {
    this.camera = new THREE.PerspectiveCamera(60, this.viewWidth / this.viewHeight, 1, 10000);
    this.camera.position.set(2, 0, 10);
    this.camera.lookAt(this.scene.position);
    this.renderer.setSize(window.innerWidth, window.innerHeight);
  };

}
var _w = new World();
_w.constructor();
