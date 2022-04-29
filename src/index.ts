export function createBouncer<Actions extends object>(actions: Actions) {
  let handlers = actions;

  const cani = <ActionKey extends keyof Actions>(key: ActionKey) =>
    handlers[key];

  const combine = <
    ActionKey extends keyof Actions,
    Sources extends Actions[ActionKey] | Function
  >(
    ...args: Sources[]
  ) => {
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

  return {
    cani,
    combine,
  };
}
