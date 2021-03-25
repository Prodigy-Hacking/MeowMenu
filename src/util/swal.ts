import type { SweetAlertOptions } from "sweetalert2";
import type { ReactSweetAlert } from "sweetalert2-react-content";
import _Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

export * from "sweetalert2";
export const SwalMixin = (mixin: SweetAlertOptions): ReactSweetAlert & typeof _Swal => withReactContent(_Swal.mixin(mixin));
export const Swal = SwalMixin({
	inputValidator: r => r ? null : `Invalid input provided.`,
	showCancelButton: true
});
export const Toast = SwalMixin({ toast: true, position: "bottom", timer: 2000, timerProgressBar: true });
export const success = (str: string) => void Toast.fire({ title: "Success!", text: str, icon: "success" });
export const invalidState = (str: string) => void Toast.fire({ title: "Invalid state.", text: str, icon: "error" });
export const successSet = (str: string) => void success(`Your ${str} has been set.`);