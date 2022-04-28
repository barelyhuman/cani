const _combine = async <
  Actions extends {},
  DataSources extends {},
  Keys extends keyof Actions,
  ActionExec extends Actions[Keys]
>(
  ...args: ActionExec[] | DataSources[]
) => {
  let source;
  let result = true;

  for (let i = 0; i < args.length; i++) {
    const elm = args[i];

    if (typeof elm === "object") {
      source = elm;
    }

    if (typeof elm === "function") {
      // @ts-ignore
      result = result && (await elm(source));
    }
  }

  return result;
};

export function createBouncer<Actions extends object>(actions: Actions) {
  let handlers = actions;

  const cani = <T extends keyof Actions>(key: T) => handlers[key];

  const combine = <Actions>_combine;

  return {
    cani,
    combine,
  };
}
