import { Action, CHANNEL } from "./types.js";
/** */
export const invoke = (action: Action) =>
  require("electron").ipcRenderer.invoke(CHANNEL, action);
