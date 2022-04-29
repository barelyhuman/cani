type ActionChecker = (params: any) => Promise<boolean>;

export const combineAnd = (...args: ActionChecker[]) => {
  let result = true;

  return async (source: unknown) => {
    for (let i = 0; i < args.length; i++) {
      const elm = args[i];
      if (typeof elm === "function") {
        result = result && (await elm(source));
      }
    }

    return result;
  };
};

export const combineOr = (...args: ActionChecker[]) => {
  let result = true;

  return async (source: unknown) => {
    for (let i = 0; i < args.length; i++) {
      const elm = args[i];
      if (typeof elm === "function") {
        result = result || (await elm(source));
      }
    }

    return result;
  };
};

export function createBouncer<Actions extends object>(actions: Actions) {
  let handlers = actions;

  const cani = <ActionKey extends keyof Actions>(key: ActionKey) =>
    handlers[key];

  return cani;
}
