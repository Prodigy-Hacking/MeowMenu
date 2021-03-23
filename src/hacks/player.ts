import { Category } from "../hack/category";
import { Hack, HackGroup } from "../hack/decorators";

@HackGroup
export class PlayerHacks {
	@Hack(Category.PLAYER, "Set Gold")
	public setGold(gold: number): void {
		
	}
}