import { Repo, RepoActionType } from "./repo";
import { RequestHandler, Request } from "express";
import { Connection } from "tedious";

const execAction = <T, K extends keyof T & string>(
  repo: Repo<T, K>,
  action: RepoActionType,
  payload: any,
): ((connection: Connection) => Promise<any>) => {
  //
  switch (action) {
    case "count": {
      const { filter } = payload;
      return repo.count(filter);
    }
    case "exists": {
      const { filter } = payload;
      return repo.exists(filter);
    }
    case "find": {
      const { filter, params, columns, take, skip, desc } = payload;
      return repo.find(filter, params, columns, take, skip, desc);
    }
    case "get": {
      const { id, columns } = payload;
      return repo.get(id, columns);
    }
    case "insert": {
      return repo.insert(payload);
    }
    case "update": {
      return repo.update(payload);
    }
    case "set": {
      return repo.set(payload);
    }
    case "remove": {
      const { id } = payload;
      return repo.remove(id);
    }
    default: {
      throw new Error(`action "${action}" Not Implemented`);
    }
  }
};

export type ActionRequest = {
  type: RepoActionType;
  payload: any;
  meta: Object;
};

export type Connect = (
  req: Request,
  meta: {},
) => Connection | Promise<Connection>;

const actionHandler = <T, K extends keyof T & string>(
  repo: Repo<T, K>,
  connect: Connect,
): RequestHandler => {
  return async (req, res, next) => {
    try {
      const { type: action, payload, meta } = req.body as ActionRequest;
      if (typeof action !== "string") throw new Error("action required");

      res.json(
        await execAction(repo, action, payload)(await connect(req, meta)),
      );
    } catch (error) {
      next(error);
    }
  };
};
export default actionHandler;
