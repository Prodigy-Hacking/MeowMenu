import type { StoredHack } from "../hack/store";
import type { SweetAlertInput } from "../util/swal";
import type { Newable } from "ts-essentials";
import { SwalMixin, Swal } from "../util/swal";
import styled from "styled-components";

import { Component } from "preact";

const constructed: Map<CallableFunction, unknown> = new Map();

export const StyledButton = styled.button`
	background-color: #bcbeff;
	margin: 4px;
	padding: 3px 7px;
	box-shadow: 0px 0px 2px white;
	text-shadow: 0px 0px 0px black;
	&:hover {
		background-color: #a8abf7;
	}
	&:active {
		background-color: #9396e9;
		box-shadow: none;
	}
`;
export const StyledErrorBox = styled.pre`
	background-color: #ccc;
    display: block;
    padding: 5px;
    margin: 10px 5px 0px;
    color: #833131;
`;

export class HButton<P, S> extends Component<
	P & {
		hack: StoredHack;
	},
	S
> {
	private static readonly inputTypes: Map<CallableFunction, SweetAlertInput> = new Map([
		[Number, "number"],
		[String, "text"],
	] as [CallableFunction, SweetAlertInput][]);
	public async execute(...prepend: unknown[]): Promise<void> {
		const { hack } = this.props;
		const params = hack.params.slice(prepend.length);
		const obj = (() => {
			if (constructed.has(hack.target.constructor)) return constructed.get(hack.target.constructor);
			const constr = new (hack.target.constructor as Newable<unknown>)();
			constructed.set(hack.target.constructor, constr);
			return constr;
		})() as Record<typeof hack.key, (...args: unknown[]) => unknown>;
		const opts = await SwalMixin({
			progressSteps: params.map((x, i) => String(i + 1)),
		}).queue<{ dismiss: string } | { value: string[] }>(
			params.map(x => ({
				input: x.type instanceof Array ? "select" : HButton.inputTypes.get(x.type) ?? "text",
				inputOptions: x.type instanceof Array ? x.type : [],
				title: `Input ${x.name}`,
				html: (
					<>
						Please provide the parameter <pre>{x.name}</pre>.
					</>
				),
				inputValidator: r => (r ? null : `Invalid input provided.`),
				showCancelButton: true,
			}))
		);
		if ("dismiss" in opts) return;
		try {
			await obj[String(hack.key)](
				...prepend,
				...opts.value.map((x, i) => {
					const { type } = params[i];
					if (typeof type === "function") return type(x);
					if (type instanceof Array) return type[+x];
					return x;
				})
			);
		} catch (e: unknown) {
			await Swal.fire({
				icon: "error",
				title: "An error occurred.",
				html: (
					<>
						An unexpected error has occurred while executing the hack <b>{hack.metadata.name}</b>.
						<StyledErrorBox>
							{e instanceof Error ? e.message : String(e)}
						</StyledErrorBox>
					</>
				),
				showCancelButton: false
			});
		}
	}
	public render(): JSX.Element {
		return <StyledButton onClick={async () => this.execute()}>{this.props.hack.metadata.name}</StyledButton>;
	}
}
