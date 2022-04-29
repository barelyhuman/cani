export function createBouncer<Actions extends object>(actions: Actions) {
  let handlers = actions;

  const cani = <T extends keyof Actions>(key: T) => handlers[key];

  const combine = <
    T extends keyof Actions,
    Sources extends Actions[T] | Function
  >(
    ...args: Sources[]
  ) => {
    let result = true;

    return async <T extends {}>(source: T) => {
      for (let i = 0; i < args.length; i++) {
        const elm = args[i];
        if (typeof elm === "function") {
          result = result && (await elm(source));
        }
      }

      return result;
    };
  };

  return {
    cani,
    combine,
  };
}
