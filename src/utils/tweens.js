import { tweened } from 'svelte/motion';
import { cubicOut } from 'svelte/easing';

export const tweenFrom = (from) =>
  tweened(from, {
    duration: 400,
    easing: cubicOut,
  });
