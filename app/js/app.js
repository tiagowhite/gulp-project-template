"use strict";
import baffle from 'baffle';
import * as THREE from 'three';
import EffectComposer, {
  RenderPass,
  ShaderPass,
  MaskPass,
  ClearMaskPass,
  CopyShader
} from 'three-effectcomposer-es6'

const texture_file = '../img/venus.jpg';

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

  // postprocessing
  const composer = new EffectComposer(renderer);
  composer.addPass(new RenderPass(scene, camera));

  const dotScreenEffect = new ShaderPass(DotScreenShader);
  dotScreenEffect.uniforms['scale'].value = 4;
  composer.addPass(dotScreenEffect);
  dotScreenEffect.renderToScreen = true;

  const rgbEffect = new ShaderPass(RGBShiftShader);
  rgbEffect.uniforms['amount'].value = 1;
  composer.addPass(rgbEffect);
  rgbEffect.renderToScreen = true;

  const glitchPass = new GlitchPass(DigitalGlitch);
  composer.addPass(glitchPass);



  scene.add(plane);
  camera.position.z = 2;

  const animate = () => {
    requestAnimationFrame(animate);
    renderer.render(scene, camera);
  };

  (() => {
    requestAnimationFrame(animate);
    renderer.render(scene, camera);
  })()

};

app();

