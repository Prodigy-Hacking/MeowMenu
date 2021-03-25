import type { Category } from "./category";
import type { HackMetadata } from "./decorators";
import { Memoize } from "typescript-memoize";

export type DecoratorTarget = Record<string | symbol, (...args: unknown[]) => unknown>;

export class StoredHack {
	public constructor(public metadata: HackMetadata, public target: DecoratorTarget, public key: string | symbol) {}

	@Memoize()
	public get params(): { name: string; type: string[] | ((v: string) => unknown) }[] {
		const types = Reflect.getMetadata("design:paramtypes", this.target, this.key);
		return this.metadata.params.map((name, i) => ({ name: name ?? "null", type: this.metadata.paramTypes[i] ?? types[i] }));
	}
}
const internalStore = new Map<Category, StoredHack[]>();
export const hackStore: ReadonlyMap<Category, StoredHack[]> = internalStore;
export const registerHack = (target: unknown, key: string | symbol, metadata: HackMetadata): void => {
	if (!internalStore.has(metadata.category)) internalStore.set(metadata.category, []);
	internalStore.get(metadata.category)?.push(new StoredHack(metadata, target as DecoratorTarget, key));
};