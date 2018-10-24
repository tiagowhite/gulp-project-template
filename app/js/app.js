"use strict";
import 'core-js';
import * as THREE from 'three';
import baffle from 'baffle';
import texture_file from '../img/logo0b.png';

const app = () => {
  logoEffect();
  textEffect();
};

const textEffect = () => {
  baffle('.hello', {
    speed: 75
  }).reveal(1000);
};

const logoEffect = () => {
  let scene, camera, renderer, geometry, texture, material, plane;

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

  scene.add(plane);
  camera.position.z = 2;

  (() => {
    requestAnimationFrame(animate);
    renderer.render(scene, camera);
  })()

};

app();

/*function runThree() {
  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 1, 1000);

  const renderer = new THREE.WebGLRenderer({canvas: document.getElementById('canvas'), antialias: true});
  renderer.setPixelRatio(window.devicePixelRatio);
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.setClearColor(0x200c23);

  const geometry = new THREE.PlaneGeometry(1, 1, 1);
  const texture = new THREE.TextureLoader().load(texture_file);
  const material = new THREE.MeshBasicMaterial({map: texture, transparent: true});
  const plane = new THREE.Mesh(geometry, material);

  /!*!/
  postprocessing
   *!/
  const composer = new EffectComposer(renderer);
  composer.addPass(new RenderPass(scene, camera));

  const dotScreenEffect = new ShaderPass(DotScreenShader);
  dotScreenEffect.uniforms['scale'].value = 4;
  composer.addPass(dotScreenEffect);

  const rgbEffect = new ShaderPass(RGBShiftShader);
  rgbEffect.uniforms['amount'].value = 0.0015;
  rgbEffect.renderToScreen = true;
  composer.addPass(rgbEffect);

  scene.add(plane);

  camera.position.z = 2;

  const animate = function () {
    requestAnimationFrame(animate);

    /!*cube.rotation.x += 0.1;
    cube.rotation.y += 0.1;*!/

    renderer.render(scene, camera);
  };

  animate();
}

app();*/
