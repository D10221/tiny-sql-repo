import { json, Router } from "express";
import ActionHandler, { Connect } from "./action-handler";
import { repo as Repo } from "@d10221/tiny-sql-repo";
/** */
const router = (
  tables: { tableName: string; pkey: string; pkeyAuto?: boolean }[],
  connect: Connect,
) => {
  const router = Router();
  for (const table of tables) {
    const { tableName, pkey, pkeyAuto } = table;
    const repo = Repo<any, any>({
      tableName,
      pkey,
      pkeyAuto,
    });
    router.post(
      `/${tableName}`,
      json(),
      ActionHandler<any, any>(repo, connect),
    );
  }
  return router;
};
export default router;
