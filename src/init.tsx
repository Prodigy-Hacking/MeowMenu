import { render } from "preact";
import { MeowMenu } from "./components/meowMenu";

export const init = (wrapper: HTMLElement): void => {
	document.getElementById("mm-container")?.remove();

	const menuContainer = document.createElement("div");
	menuContainer.id = "mm-container";
	wrapper.append(menuContainer);

	render(<MeowMenu />, menuContainer);


};
