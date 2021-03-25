import { render } from "preact";
import { MeowMenu } from "./components/meowMenu";

let initiated = false;
const onInit: CallableFunction[] = [];

export const addOnInit = (func: CallableFunction): unknown => initiated ? func() : onInit.push(func);
export const init = (wrapper: HTMLElement): void => {
	document.getElementById("mm-container")?.remove();

	const menuContainer = document.createElement("div");
	menuContainer.id = "mm-container";
	wrapper.append(menuContainer);

	initiated = true;

	onInit.map(Reflect.apply);

	render(<MeowMenu />, menuContainer);


};
