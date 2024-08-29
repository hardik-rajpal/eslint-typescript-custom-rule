export function localMain(args: string[]) {
  let lastArg;
  if (args.length === 0) {
    return;
  }
  for (let arg in args) {
    lastArg = arg;
  }
  return lastArg;
}

localMain([]);
