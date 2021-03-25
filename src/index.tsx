import "reflect-metadata";
import "./styles/styles.scss";
import { init } from "./init";
import "./types/_";

document.querySelectorAll("style[data-styled-version]").forEach(x => x.remove());

let loadingTicker = 0;

const loadingChecker = setInterval(() => {
	loadingTicker += 0.5;
	const gameWrapper = document.getElementById("game-wrapper");
	if (!gameWrapper || typeof _ === "undefined" || typeof _.instance !== "object") {
		if (loadingTicker === 15) console.warn("15 seconds has passed, and prodigy still has not initialized.");
		return;
	}
	clearInterval(loadingChecker);
	init(gameWrapper);
}, 500);
