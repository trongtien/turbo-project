import { injectable, singleton, container } from 'tsyringe';

export function Service(options?: { singleton?: boolean }): ClassDecorator {
  return (target: Function) => {
    const name = target.name;
    if (options?.singleton) {
      console.debug(`[DI] Registering singleton service: ${name}`);
      singleton()(target as new (...args: any[]) => unknown);
    } else {
      console.debug(`[DI] Registering transient service: ${name}`);
      injectable()(target as new (...args: any[]) => unknown);
    }

    container.register(target as any, { useClass: target as any });
  };
}