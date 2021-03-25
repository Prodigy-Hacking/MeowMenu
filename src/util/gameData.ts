import type { Item } from "prodigy-types/types/manual/item";

export const getItem = <T extends keyof typeof _["gameData"]>(type: T, id: number): Item => {
	const data: { ID: number }[] = _.gameData[type];
	return data.find(x => x.ID === id) as Item;
};
