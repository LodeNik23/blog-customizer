import { useEffect } from 'react';

type RefObject<T> = {
	current: T | null;
};

type UseClickOutProps = {
	isOpen: boolean;
	setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
	formRef: RefObject<HTMLElement>;
};

export const useClickOut = ({
	isOpen,
	setIsOpen,
	formRef,
}: UseClickOutProps) => {
	useEffect(() => {
		if (!isOpen) return;

		function clickOut(event: MouseEvent) {
			const { target } = event;
			const isClickOut =
				target instanceof HTMLElement &&
				formRef &&
				formRef.current &&
				!formRef.current.contains(target);

			if (isClickOut) {
				setIsOpen((prevState: boolean) => !prevState);
			}
		}

		function escOut(event: KeyboardEvent) {
			if (event.key === 'Escape') {
				setIsOpen((prevState: boolean) => !prevState);
			}
		}

		document.addEventListener('mousedown', clickOut);
		document.addEventListener('keydown', escOut);
		return () => {
			document.removeEventListener('mousedown', clickOut);
			document.removeEventListener('keydown', escOut);
		};
	}, [isOpen, setIsOpen, formRef]);
};
