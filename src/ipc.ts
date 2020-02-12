import { config, connect as Connect, using } from "@d10221/tiny-sql";
import { ipcMain } from "electron";
import Repo, { RepoActionType } from "./repo";
import { Action, CHANNEL } from "./ipc-types";
/** */
export default function subscribe() {

  const handler = async (_event: any, action: Action) => {
    try {
      const { type, payload, meta } = action;

      const { use, from, pkey, pkeyAuto } = meta;
      if (!from) throw new Error("from: 'tableName' required");

      const repo = Repo<any, any>({
        pkey, tableName: from, pkeyAuto: Boolean(pkeyAuto),
      });

      const execAction = (actionType: RepoActionType) => {
        //
        switch (actionType) {
          case "count": {
            return repo.count(payload);
          }
          case "exists": {
            const { filter } = payload;
            return repo.exists(filter);
          }
          case "find": {
            return repo.find(payload);
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
            throw new Error(`action "${actionType}" Not Implemented`);
          }
        }
      };

      const connect = () => Connect(config.from(use || "DB"));
      return using(connect)(execAction(type));
    } catch (error) {
      return { error: true, message: error.message, stack: (error as Error).stack };
    }
  }
  ipcMain.handle(CHANNEL, handler);
  
  return function unsubscribe() {
    ipcMain.removeHandler(CHANNEL);
  }
}
