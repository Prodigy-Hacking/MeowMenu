import { Component } from "preact/compat";
import { Category } from "../hack/category";
import { hackStore } from "../hack/store";
import styled from "styled-components";
import { HButton } from "./hButton";
import { HToggle } from "./hToggle";

const MENU_WIDTH = "45%";

const StyledMenuContainer = styled.aside<{ visible: boolean }>`
	width: ${MENU_WIDTH};
	height: 100%;
	position: fixed;
	top: 0;
	left: ${p => (p.visible ? `0` : `-${MENU_WIDTH}`)};
	z-index: 5;
	background-color: #100d2add;
	transition: left 0.25s;
	box-shadow: 0px 2px 3px 1px black;
	padding: 4px;
	display: flex;
	flex-direction: column;
	resize: horizontal;
	overflow-y: scroll;
	&::-webkit-scrollbar {
		width: 8px;
		height: 8px;
	}
	&::-webkit-scrollbar-thumb {
		background-color: #112;
		border-radius: 10px;
		&:hover {
			background-color: #010106;
		}
	}
	&::-webkit-scrollbar-track {
		background-color: #2e2a46;
	}
`;
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
	user-select: text;
	font-family: "Asap", Arial, Helvetica, sans-serif;
	text-shadow: 1px 1px 2px black;
	text-align: center;
	font-size: 2.7em;
	margin: 15px;
	color: #d6d6ed;
`;
const StyledHackCategory = styled.h2`
	user-select: text;
	padding: 5px 5px 4px;
	font-size: 1.5em;
	margin: 0;
	text-shadow: 1px 1px 2px black;
	font-family: "Montserrat", Arial, Helvetica, sans-serif;
	color: #d6d6ed;
`;
const StyledHackCategoryBox = styled.section`
	background-color: #05031888;
	padding: 2px 4px 8px;
	margin: 3px;
`;
const StyledFooter = styled.footer`
	font-family: "Roboto";
	font-weight: 300;
	color: #aaa;
    font-size: 0.66em;
    border-top: 1px solid #778;
    margin: 5px;
    padding: 5px;
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
				<MenuToggle visible={this.state.visible} toggle={this.toggleVisible} />
				<StyledMenuTitle>Prodigy Cat Menu</StyledMenuTitle>
				{Category.values.map(x => (
					<StyledHackCategoryBox key={x.name}>
						<StyledHackCategory>{x.name}</StyledHackCategory>
						{hackStore.get(x)?.map(y => {
							const Element = y.metadata.type === "button" ? HButton : HToggle;
							return <Element key={y.metadata.name} hack={y} />;
						})}
					</StyledHackCategoryBox>
				))}
				<StyledFooter>
					{`\x54\x68\x69\x73\x20\x6d\x65\x6e\x75\x20\x69\x73\x20\x63\x72\x65\x61\x74\x65\x64\x20\x62\x79\x20\x74\x68\x65\x20`}
					<a
						href={`\x68\x74\x74\x70\x73\x3a\x2f\x2f\x67\x69\x74\x68\x75\x62\x2e\x63\x6f\x6d\x2f\x50\x72\x6f\x64\x69\x67\x79\x2d\x48\x61\
						\x63\x6b\x69\x6e\x67\x2f\x50\x72\x6f\x64\x69\x67\x79\x4d\x61\x74\x68\x47\x61\x6d\x65\
						\x48\x61\x63\x6b\x69\x6e\x67\x2f\x62\x6c\x6f\x62\x2f\x6d\x61\x73\x74\x65\x72\x2f\x52\x45\x41\x44\x4d\x45\x2e\x6d\x64`}
						target="_blank"
						rel="noreferrer"
					>{`\x50\x4d\x47\x48`}</a>
					{`\x20\x6f\x72\x67\x61\x6e\x69\x7a\x61\x74\x69\x6f\x6e\x2e `}
					This menu is open source software licensed under the{" "}
					<a href="https://www.mozilla.org/en-US/MPL/2.0/" target="_blank" rel="noreferrer">
						MPL-2.0{" "}
					</a>
					copyleft license, and the 
					<a href="https://commonsclause.com/" target="_blank" rel="noreferrer">
						{" "}Commons Clause
					</a>
					. Unauthorized commercial usage or distribution is strictly illicit, and will result in legal{" "}
					action.
				</StyledFooter>
			</StyledMenuContainer>
		);
	}
}
