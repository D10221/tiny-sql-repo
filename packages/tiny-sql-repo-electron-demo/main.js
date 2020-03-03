const { app, BrowserWindow } = require("electron");
const { join } = require("path");
const { ipc } = require("../tiny-sql-repo-electron");
const { connect } = require("@d10221/tiny-sql");
const { Connection } = require("tedious");
const table = require("./table");
const {
    SQL_SERVER_DATA_SOURCE,
    SQL_SERVER_PASSWORD,
    SQL_SERVER_DATABASE,
    SQL_SERVER_USER,
} = process.env;

const getConnection = (ignoredName) => {
    console.log("ignored: ", ignoredName);
    return connect(new Connection({
        server: SQL_SERVER_DATA_SOURCE,
        options: {
            database: SQL_SERVER_DATABASE
        },
        authentication: {
            type: "default",
            options: {
                userName: SQL_SERVER_USER,
                password: SQL_SERVER_PASSWORD
            }
        }
    }))
};
const unsubscribe = [];
function dispose() {
    unsubscribe.forEach(f => f());
}
const tablename = "tiny-sql-repo-electron-table-one";

async function onReady() {

    const connection = await getConnection();
    await table.create(tablename)(connection);
    await table.fill(tablename)(connection);

    unsubscribe.push(ipc(getConnection));

    const win = new BrowserWindow({
        webPreferences: {
            nodeIntegration: true
        }
    })
    function onReadyToShow() {
        win.webContents.openDevTools();
        win.show();
    }
    function onWindowClosed() {

    }
    win.on("close", onWindowClosed)
    win.on("ready-to-show", onReadyToShow);
    win.loadFile(join(__dirname, "index.html"));
}

app.on("ready", onReady);

app.on("window-all-closed", () => {
    dispose();
    app.quit();
})