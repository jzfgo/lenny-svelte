import { readable } from "svelte/store";
import currenciesCfg from "../config/currencies";

export default readable(currenciesCfg);
