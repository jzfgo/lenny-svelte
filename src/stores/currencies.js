import { writable } from "svelte/store";
import currenciesCfg from "../config/currencies";

export default writable(currenciesCfg);
