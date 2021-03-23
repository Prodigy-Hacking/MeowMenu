import type { Category } from "./category";
import type { HackMetadata } from "./decorators";

interface MetaMethod {
	metadata: HackMetadata;
	target: unknown;
	key: string | symbol;
}

const internalStore = new Map<Category, MetaMethod[]>();
export const hackStore: ReadonlyMap<Category, MetaMethod[]> = internalStore;
export const registerHack = (target: unknown, key: string | symbol, metadata: HackMetadata): void => {
	if (!internalStore.has(metadata.category)) internalStore.set(metadata.category, []);
	internalStore.get(metadata.category)?.push({ target, key, metadata });
};
console.log(hackStore);