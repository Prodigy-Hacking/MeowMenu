import { Category } from "./category";
import { registerHack } from "./store";

const hackMetadataKey = Symbol("hack:metadata");

export interface HackMetadata {
	category: Category;
	name: string;
	params: string[];
}

export const HackGroup: ClassDecorator = clazz => {
	for (const k of Object.getOwnPropertyNames(clazz.prototype)) {
		const meta: HackMetadata | undefined = Reflect.getMetadata(hackMetadataKey, clazz.prototype, k);
		if (!meta) continue;
		registerHack(clazz.prototype, k, meta);
	}
};
interface HackDecorator {
	(opts: { category: Category; name: string; params?: string[] }): MethodDecorator;
	(category: Category, name: string, params?: string[]): MethodDecorator;
}

export const Hack: HackDecorator = (opts: {
    category: Category;
    name: string;
    params?: string[] | undefined;
} | Category, name?: string, params: string[] = []): MethodDecorator => (target, key, desc) => {
	Reflect.defineMetadata(
		hackMetadataKey,
		opts instanceof Category ? { category: opts, name, params } : { params, ...opts },
		target,
		key
	);
	return target;
};
