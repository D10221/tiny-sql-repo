import { json, Router } from "express";
import { actionHandler, Connect } from "./action-handler";
import { tinyRepo } from "@d10221/tiny-sql-repo";
/** */
export const router = (
  tables: { tableName: string; pkey: string; pkeyAuto?: boolean }[],
  connect: Connect,
) => {
  const router = Router();
  for (const table of tables) {
    const { tableName } = table;
    const repo = tinyRepo<any, any>(table);
    router.post(
      `/${tableName}`,
      json(),
      actionHandler<any, any>(repo as any, connect),
    );
  }
  return router;
};

