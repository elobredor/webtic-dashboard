import {
	forwardRef,
	useEffect,
	type ReactNode,
	type ForwardedRef,
} from "react";
import { X } from "lucide-react";

interface ModalProps {
	isOpen: boolean;
	onClose: () => void;
	title: string;
	children: ReactNode;
}

const Modal = forwardRef(
	(
		{ isOpen, onClose, title, children }: ModalProps,
		ref: ForwardedRef<HTMLDivElement>
	) => {
		useEffect(() => {
			const handleEscape = (e: KeyboardEvent) => {
				if (e.key === "Escape") {
					onClose();
				}
			};

			if (isOpen) {
				document.addEventListener("keydown", handleEscape);
				document.body.style.overflow = "hidden";
			}

			return () => {
				document.removeEventListener("keydown", handleEscape);
				document.body.style.overflow = "unset";
			};
		}, [isOpen, onClose]);

		if (!isOpen) return null;

		return (
			<div className="fixed inset-0 z-50 flex items-center justify-center">
				{/* Backdrop */}
				<div
					className="fixed inset-0 bg-black bg-opacity-50 transition-opacity duration-300"
					onClick={onClose}
				/>

				{/* Modal */}
				<div
					ref={ref}
					className="relative w-full max-w-lg transform rounded-lg bg-white p-6 shadow-xl transition-all duration-300 sm:my-8"
				>
					{/* Close button */}
					<button
						onClick={onClose}
						className="absolute right-4 top-4 rounded-full p-1 text-gray-400 hover:bg-gray-100 hover:text-gray-500"
					>
						<span className="sr-only">Close</span>
						<X className="h-5 w-5" />
					</button>

					{/* Title */}
					<h3 className="text-lg font-semibold text-gray-900">{title}</h3>

					{/* Content */}
					<div className="mt-4">{children}</div>
				</div>
			</div>
		);
	}
);

Modal.displayName = "Modal";

export default Modal;
