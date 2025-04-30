export const debounce = <T extends (...args: unknown[]) => void>(
  fn: T,
  delay: number
) => {
  let timer: NodeJS.Timeout;
  return (...args: Parameters<T>) => {
    clearTimeout(timer);
    timer = setTimeout(() => fn(...args), delay);
  };
};
