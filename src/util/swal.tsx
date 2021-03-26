import type { SweetAlertOptions } from "sweetalert2";
import type { ReactSweetAlert } from "sweetalert2-react-content";
import _Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

export * from "sweetalert2";
export const SwalMixin = (mixin: SweetAlertOptions): ReactSweetAlert & typeof _Swal =>
	withReactContent(_Swal.mixin(mixin));
export const Swal = SwalMixin({
	inputValidator: r => (r ? null : `Invalid input provided.`),
	showCancelButton: true,
});
export const Toast = SwalMixin({ toast: true, position: "bottom", timer: 2000, timerProgressBar: true });
export const success = (str: string) => void Toast.fire({ title: "Success!", text: str, icon: "success" });
export const invalidState = (str: string) => void Toast.fire({ title: "Invalid state.", text: str, icon: "error" });
export const successSet = (str: string) => void success(`Your ${str} has been set.`);
export const multiChoose = async(
	title: string,
	text: string,
	selections: readonly (readonly string[])[],
	initials: (number | undefined)[] = [],
	labels: (string | undefined)[] = []
): Promise<number[] | null> => {
	const ids = selections.map((x, i) => `select-${i}` as const);
	const result = await Swal.fire<number[]>({
		title,
		html: (
			<>
				{text}
				<br />
				{selections.map((x, i) => (
					<>
						{labels[i] && <p>{labels[i]}</p>}
						<select key={i} id={ids[i]}>
							{x.map((y, j) => (
								<option value={j} key={j} selected={initials[i] === j}>
									{y}
								</option>
							))}
						</select>
					</>
				))}
			</>
		),
		focusConfirm: false,
		preConfirm: () => {
			const popup = Swal.getPopup();
			const elems = ids.map(x => popup?.querySelector(`#${x}`) as HTMLSelectElement | null);
			if (!popup || !elems.every(x => x?.value)) Swal.showValidationMessage("Invalid selection(s) provided.");
			return elems.map((x, i) => x?.selectedIndex ?? initials[i] ?? 0) as unknown as number[];
		}
	});
	if ("dismiss" in result) return null;
	return result.value ?? null;
};
