export function move(node, { duration = 1000, delay = 0 }) {
  // get the actual path length
  const pathLength = +node.getTotalLength();

  // assign a dasharray, which includes the path length
  // needs to be in JS as it should be persistent across transitions
  node.style.strokeDasharray = `${pathLength} ${pathLength}`;

  // return the transition object
  return {
    duration,
    delay,
    css: (_, u) => `stroke-dashoffset: ${u * pathLength}`,
  };
}
