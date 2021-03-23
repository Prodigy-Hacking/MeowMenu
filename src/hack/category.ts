import { Memoize } from "typescript-memoize";

export class Category {
	public static readonly PLAYER = new Category("Player");

	@Memoize()
	public static get values(): Category[] {
		return Object.values(this).filter(x => x instanceof this);
	}

	private constructor(public name: string) {}
}