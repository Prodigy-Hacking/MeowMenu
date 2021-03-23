import { Component } from "preact/compat";
import { Category } from "../hack/category";
import { hackStore } from "../hack/store";
import styled from "styled-components";

const MENU_WIDTH = "45%";

const StyledMenuContainer = styled.div<{ visible: boolean }>`
	width: ${MENU_WIDTH};
	height: 100%;
	position: fixed;
	top: 0;
	left: ${p => (p.visible ? `0` : `-${MENU_WIDTH}`)};
	z-index: 5;
	background-color: #100d2add;
	transition: left 0.25s;
`;
// rgb(16 14 42 / 88%)
const StyledMenuToggle = styled.button`
	position: fixed;
	top: 5px;
	left: 5px;
	font-family: Arial, Helvetica, sans-serif;
    box-shadow: 1px 1px 3px 0px black;
	background-color: #eee;
	&:hover {
		background-color: #ddd;
	}
	&:active {
		background-color: #cdcdcd;
		box-shadow: 1px 1px 1px 0px #0004;
	}
`;
const StyledMenuTitle = styled.h1`
	font-family: Arial, Helvetica, sans-serif;
`;

export class MenuToggle extends Component<{ visible: boolean; toggle: () => void }> {
	public render(): JSX.Element {
		return <StyledMenuToggle onClick={this.props.toggle}>{this.props.visible ? "◀" : "▶"}</StyledMenuToggle>;
	}
}
export class MeowMenu extends Component<unknown, { visible: boolean }> {
	public state = {
		visible: false,
	};

	protected toggleVisible = (): void => this.setState({ ...this.state, visible: !this.state.visible });

	public render(): JSX.Element {
		return (
			<StyledMenuContainer visible={this.state.visible}>
				<MenuToggle visible={this.state.visible} toggle={this.toggleVisible}/>
				<StyledMenuTitle>Prodigy Cat Menu</StyledMenuTitle>
				{
					Category.values.map(x => (
						<div key={x.name}>
							<h2>{x.name}</h2>
							{
								hackStore
									.get(x)
									?.map(y => (
										<button key={y.metadata.name}>
											{y.metadata.name}
										</button>
									))
							}
						</div>
					))
				}
			</StyledMenuContainer>
		);
	}
}
