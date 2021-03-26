import { getItem } from "../util/gameData";
import { Category } from "../hack/category";
import { Hack, HackGroup, Init } from "../hack/decorators";
import { invalidState, success, successSet } from "../util/swal";
import { LARGE_NUMBER } from "../util/constants";

@HackGroup
export class PlayerHacks {
	public hasMember = true;
	public clientSideName: string | null = null;
	@Init()
	public init(): void {
		_.player.getLevel = () => _.player.data.level;
		_.player.getMaxHearts = () => _.player.pvpHP;
		const oldGetName = _.player.getName.bind(_.player);
		_.player.getName = () => this.clientSideName ?? oldGetName();
		const oldGetMaxHearts = _.player.getMaxHearts.bind(_.player);
		_.player.getMaxHearts = () => Math.max(oldGetMaxHearts() as number, _.player.data.hp, _.player.pvpHP);
	}

	@Hack(Category.PLAYER, "Set Gold", ["Gold"])
	public setGold(gold: number): void {
		_.player.data.gold = gold;
		successSet("gold");
	}

	@Hack(Category.PLAYER, "Set Level", ["Level"])
	public setLevel(level: number): void {
		_.player.data.level = level;
		successSet("level");
	}

	@Hack(Category.PLAYER, "Set Bounty Points", ["Bounty Points"])
	public setBountyPoints(points: number): void {
		_.player.data.bountyScore = points;
		successSet("bounty points");
	}

	@Hack(Category.PLAYER, "Obtain Conjure Cubes", ["Conjure Cubes"])
	public obtainConjureCubes(cubes: number): void {
		for (let i = 0; i < Math.min(99, cubes); i++)
			_.instance.prodigy.giftBoxController.receiveGiftBox(null, getItem("giftBox", 1));
		success("You have obtained the requested amount of conjure cubes.");
	}

	@Hack(Category.PLAYER, "Set Wins", ["Wins"])
	public setWins(wins: number): void {
		_.player.data.win = wins;
		successSet("wins");
	}

	@Hack(Category.PLAYER, "Set Losses", ["Losses"])
	public setLosses(losses: number): void {
		_.player.data.loss = losses;
		successSet("losses");
	}

	@Hack(Category.PLAYER, "Set PVP Health", ["Health"])
	public setPVPHealth(health: number): void {
		_.player.pvpHP = health;
		_.player.data.hp = health;
		successSet("health");
	}

	@Hack(Category.PLAYER, "Set Name (Client-Side)", ["Name"])
	public setClientSideName(name: string): void {
		this.clientSideName = name;
		successSet("name (client sided)");
	}
	
	@Hack(Category.PLAYER, "Disable Morph")
	public async disableMorph(): Promise<unknown> {
		if (typeof _.player.data.playerTransformation === "undefined") return invalidState("You are not currently morphed.");
		delete (_.player.data as Partial<typeof _["player"]["data"]>).playerTransformation;
		success("Successfully disabled your morph.");
	}

	public damageModifier: number | null = null;
	@Hack(Category.PLAYER, "Instant Kill", [], [], "toggle")
	public instantKill(toggle: boolean): void {
		if (toggle) this.damageModifier = _.player.modifiers.damage;
		_.player.modifiers.damage = toggle ? LARGE_NUMBER : this.damageModifier ?? 1;
	}

	
}
