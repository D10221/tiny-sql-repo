import { app, BrowserWindow } from "electron";
import { join } from "path";
import { ipc } from "../../tiny-sql-repo-electron";
import { connect } from "@d10221/tiny-sql";
import { Connection } from "tedious";
import * as table from "./table";
const {
  SQL_SERVER_DATA_SOURCE,
  SQL_SERVER_PASSWORD,
  SQL_SERVER_DATABASE,
  SQL_SERVER_USER,
} = process.env;

const getConnection = (ignoredName: string) => {
  console.log("ignored: ", ignoredName);
  return connect(
    new Connection({
      server: SQL_SERVER_DATA_SOURCE,
      options: {
        database: SQL_SERVER_DATABASE,
      },
      authentication: {
        type: "default",
        options: {
          userName: SQL_SERVER_USER,
          password: SQL_SERVER_PASSWORD,
        },
      },
    }),
  );
};
const unsubscribe: Function[] = [];

function dispose() {
  unsubscribe.forEach(f => f());
}
const tablename = "tiny-sql-repo-electron-table-one";

async function onReady() {
  const connection = await getConnection("ignoreme");
  await table.create(tablename)(connection);
  await table.fill(tablename)(connection);

  unsubscribe.push(ipc(getConnection));

  const win = new BrowserWindow({
    webPreferences: {
      nodeIntegration: true,
    },
  });
  function onReadyToShow() {
    win.show();
  }
  function onWindowClosed() {}
  win.on("close", onWindowClosed);
  win.on("ready-to-show", onReadyToShow);
  win.loadFile(join(__dirname, "..", "index.html"));
  win.webContents.openDevTools();
}

app.on("ready", onReady);

app.on("window-all-closed", () => {
  dispose();
  app.quit();
});
