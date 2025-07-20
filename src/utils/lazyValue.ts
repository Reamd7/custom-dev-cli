export function lazyVal<T>(fn: () => T) {
  let val: T;
  return () => {
    if (val === undefined) {
      val = fn();
    }
    return val;
  };
}
