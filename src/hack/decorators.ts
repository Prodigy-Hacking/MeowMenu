import { addOnInit } from "../init";
import { Category } from "./category";
import { registerHack } from "./store";

const hackMetadataKey = Symbol("hack:metadata");

export interface HackMetadata {
	category: Category;
	name: string;
	params: (string | undefined)[];
	paramTypes: unknown[];
	type: "button" | "toggle";
}

export const HackGroup: ClassDecorator = clazz => {
	for (const k of Object.getOwnPropertyNames(clazz.prototype)) {
		const meta: HackMetadata | undefined = Reflect.getMetadata(hackMetadataKey, clazz.prototype, k);
		if (!meta) continue;
		registerHack(clazz.prototype, k, meta);
	}
};
interface HackDecorator {
	(opts: Partial<HackMetadata>): MethodDecorator;
	(
		category: Category,
		name: string,
		params?: (string | undefined)[],
		paramTypes?: unknown[],
		type?: HackMetadata["type"]
	): MethodDecorator;
}

export const Hack: HackDecorator = (
	opts: Partial<HackMetadata> | Category,
	name?: string,
	params: (string | undefined)[] = [],
	paramTypes: unknown[] = [],
	type: HackMetadata["type"] = "button"
): MethodDecorator => (target, key, desc) => {
	Reflect.defineMetadata(
		hackMetadataKey,
		opts instanceof Category ? { category: opts, name, params, paramTypes, type } : { params, paramTypes, type, ...opts },
		target,
		key
	);
	return target;
};

export const Init = (): MethodDecorator => (target, key, desc) => {
	addOnInit(target[key as keyof typeof target] as CallableFunction);
};
