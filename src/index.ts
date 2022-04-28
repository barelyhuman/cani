export type GuardAction = (...args: any[]) => Promise<boolean>;

function createCanI() {
  const handlers = {} as Record<string, GuardAction>;
  return {
    define(name: string, action: GuardAction) {
      handlers[name] = action;
      return this;
    },
    can: handlers as Record<string, GuardAction>,
  };
}

const cani = createCanI();

export default cani;
