"use strict";
import baffle from 'baffle';

const textEffect = () => {
  baffle('.hello', {
    speed: 75
  }).reveal(1000);
};

textEffect();

