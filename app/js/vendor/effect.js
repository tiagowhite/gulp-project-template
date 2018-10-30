var texture_file = '../img/venus.jpg';
/*
var effect = function () {
  //logoEffect();
};*/
/*
var logoEffect = function () {
  var scene, camera, renderer, geometry, texture, material, plane;

  renderer = new THREE.WebGLRenderer({canvas: document.getElementById('canvas'), antialias: true});
  renderer.setPixelRatio(window.devicePixelRatio);
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.setClearColor(0x200c23);

  scene = new THREE.Scene();
 camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 1, 1000);

  geometry = new THREE.PlaneGeometry(1, 1, 1);
  texture = new THREE.TextureLoader().load(texture_file);
  material = new THREE.MeshBasicMaterial({map: texture, transparent: true});
  plane = new THREE.Mesh(geometry, material);



  // postprocessing
  var composer = new THREE.EffectComposer(renderer);

  var renderPass = new THREE.RenderPass(scene, camera);
  composer.addPass(renderPass);

  var sepiaPass = new THREE.ShaderPass(THREE.SepiaShader);
  composer.addPass(sepiaPass);

  var glitchPass = new THREE.GlitchPass(0);
  composer.addPass(glitchPass);

  scene.add(plane);
  camera.position.z = 2;

  var animate = function () {
    requestAnimationFrame(animate);
    renderer.render(scene, camera);
  };

  (function() {
    requestAnimationFrame(animate);
    renderer.render(scene, camera);
  })()

};
*/


var renderer,
  scene,
  camera,
  myCanvas = document.getElementById('canvas');

//RENDERER
renderer = new THREE.WebGLRenderer({
  canvas: myCanvas,
  antialias: true
});
renderer.setClearColor(0xffffff);
renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);

//CAMERA
camera = new THREE.PerspectiveCamera(35, window.innerWidth / window.innerHeight, 300, 10000 );

//SCENE
scene = new THREE.Scene();

//LIGHTS
var light = new THREE.AmbientLight(0xffffff, 0.5);
scene.add(light);

var light2 = new THREE.PointLight(0xffffff, 0.5);
scene.add(light2);

var material = new THREE.MeshLambertMaterial();

var geometry = new THREE.BoxBufferGeometry(100, 100, 100, 10, 10, 10);
var mesh = new THREE.Mesh(geometry, material);
mesh.position.z = -1000;
mesh.position.x = -100;
scene.add(mesh);


var geometry2 = new THREE.SphereGeometry(50, 20, 20);
var mesh2 = new THREE.Mesh(geometry2, material);
mesh2.position.z = -1000;
mesh2.position.x = 100;
scene.add(mesh2);


var geometry3 = new THREE.PlaneGeometry(10000, 10000, 100, 100);
var mesh3 = new THREE.Mesh(geometry3, material);
mesh3.rotation.x = -90 * Math.PI / 180;
mesh3.position.y = -100;
scene.add(mesh3);


//COMPOSER

/*var composer = new THREE.EffectComposer(renderer);

var renderPass = new THREE.RenderPass(scene, camera);
composer.addPass(renderPass);

var sepiaPass = new THREE.ShaderPass(THREE.SepiaShader);
composer.addPass(sepiaPass);

var glitchPass = new THREE.GlitchPass(0);
composer.addPass(glitchPass);*/

//RENDER LOOP
render();


function render() {

  // renderer.render(scene, camera);
  composer.render();

  requestAnimationFrame(render);
}




