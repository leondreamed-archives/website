export type ComponentType<C> = C extends new () => infer T ? T : never;
