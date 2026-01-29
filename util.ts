export const dbg = <T>(x: T, options?: any) => {
  console.dir(x, options);

  return x;
};
