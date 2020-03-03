import { Action, CHANNEL } from "./types";
/** */
export const invoke = (action: Action) => require("electron").ipcRenderer.invoke(CHANNEL, action);
