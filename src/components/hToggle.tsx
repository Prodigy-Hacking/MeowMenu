import styled from "styled-components";
import { HButton, StyledButton } from "./hButton";

const StyledToggle = styled(StyledButton)<{ toggled: boolean }>`
	span {
		color: ${x => (x.toggled ? "#5ba85b" : "#be3b3b")};
	}
`;
export class HToggle extends HButton<
	unknown,
	{
		toggled: boolean;
	}
> {
	public state = {
		toggled: false,
	};
	public async execute(...prepend: unknown[]): Promise<void> {
		this.setState(state => ({ ...state, toggled: !state.toggled }));
		return super.execute(!this.state.toggled);
	}
	public render(): JSX.Element {
		return (
			<StyledToggle onClick={async () => this.execute()} toggled={this.state.toggled}>
				<span>◼</span> {this.props.hack.metadata.name}
			</StyledToggle>
		);
	}
}
