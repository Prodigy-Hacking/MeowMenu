import { Category } from "../hack/category";
import { Hack, HackGroup } from "../hack/decorators";
import { success, invalidState } from "../util/swal";

@HackGroup
export class BattleHacks {
	@Hack(Category.BATTLE, "Escape Battle")
	public escapeBattle(): void {
		switch (_.instance.game.state.current) {
			case "PVP":
				return (_.instance.game.state.states.get("PVP") as unknown as
					| Record<"endPvP", CallableFunction>
					| undefined)?.endPvP();
			case "CoOp":
				return _.instance.prodigy.world._(_.player.data.zone, undefined, undefined, undefined, undefined);
			case "Battle":
			case "EscapeBattle":
				return (_.instance.game.state.getCurrentState() as Record<"runAwayCallback", CallableFunction>).runAwayCallback();
			default:
				return invalidState("You are not currently in a battle.");
		}
	}
	@Hack(Category.BATTLE, "Win Battle")
	public winBattle(): void {
		switch (_.instance.game.state.current) {
			case "PVP":
			case "CoOp":
				return invalidState("This hack does not support PvP.");
			case "Battle": {
				((_.instance.game.state.states.get("Battle") as unknown) as
					| Record<"startVictory", CallableFunction>
					| undefined)?.startVictory();
				return success("The battle has been won.");
			}
			case "SecureBattle": {
				((_.instance.game.state.states.get("SecureBattle") as unknown) as
					| Record<"battleVictory", CallableFunction>
					| undefined)?.battleVictory();
				return success("The battle has been won.");
			}
			default:
				return invalidState("You are not in a battle.");
		}
	}
	@Hack(Category.BATTLE, "Fill Energy")
	public fillEnergy(): void {
		const state = _.instance.game.state.getCurrentState() as Record<"teams", Record<"setEnergy", CallableFunction>[]>;
		if (!("teams" in state)) return invalidState("You are currently not in a battle.");
		state.teams[0].setEnergy(99);
		return success("Your energy has been filled.");
	}
}
