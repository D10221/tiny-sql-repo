import { RepoActionType, ExecFindOptions } from "@d10221/tiny-sql-repo";

export { RepoActionType };

export const CHANNEL = "@tiny-sql-repo-action";

export type Action = {
  type: RepoActionType;
  payload: any;
  meta: {
    from?: string;
    use?: string;
    pkey: string;
    pkeyAuto?: boolean;
  };
};

export type Invoker<T, K extends keyof T & string> = {
  get: (id: T[K], keys?: (keyof T)[]) => Promise<T>;
  set: (data: T) => Promise<any>;
  find: (payload: ExecFindOptions<T>) => Promise<T[]>;
  update: (data: Partial<T> & { [key in K]: T[K] }) => Promise<any>;
  insert: (data: T) => Promise<any>;
  remove: (id: T[K]) => Promise<any>;
  count: (filter?: string | undefined) => Promise<number>;
  exists: (filter?: string | undefined) => Promise<boolean>;
};
