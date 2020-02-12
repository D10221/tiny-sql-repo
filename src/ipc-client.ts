import { Action, CHANNEL } from "./ipc-types";
export default (action: Action) =>
  require("electron").ipcRenderer.invoke(CHANNEL, action);
