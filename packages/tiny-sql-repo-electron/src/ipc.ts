import { using } from "@d10221/tiny-sql";
import { ipcMain } from "electron";
import { tinyRepo, RepoActionType } from "@d10221/tiny-sql-repo";
import { Action, CHANNEL } from "./types";
import { Connection } from "tedious";
/** */
export function ipc(connectToName: (name: string) => Promise<Connection>) {
    const handler = async (_event: any, action: Action) => {
        try {
            const { type, payload, meta } = action;
            const { use, from, pkey, pkeyAuto } = meta;
            if (!use) throw new Error("use: 'dbName', required")
            if (!from)
                throw new Error("from: 'tableName' required");
            const repo = tinyRepo<any, any>({
                pkey,
                tableName: from,
                pkeyAuto: Boolean(pkeyAuto),
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
            const connect = () => connectToName(use);
            return using(connect)(execAction(type));
        }
        catch (error) {
            // serializable
            return {
                error: true,
                message: error.message,
                stack: (error as Error).stack,
                name: error.name || "Error"
            };
        }
    };
    ipcMain.handle(CHANNEL, handler);
    return function unsubscribe() {
        ipcMain.removeHandler(CHANNEL);
    };
}
