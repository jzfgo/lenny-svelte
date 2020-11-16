import { writable } from "svelte/store";
import appCfg from "../config/app";

export default writable(appCfg);
