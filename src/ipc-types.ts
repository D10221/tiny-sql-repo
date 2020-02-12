import { RepoActionType } from "./repo";

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
