import arrow from 'src/images/arrow.svg';

import styles from './ArrowButton.module.scss';

import clsx from 'clsx';

export type OnClick = () => void;

type ArrowBtnProps = {
	state: boolean;
	changeState: OnClick;
};

export const ArrowButton = ({ state, changeState }: ArrowBtnProps) => {
	const isOpen = state;

	return (
		<div
			onClick={changeState}
			role='button'
			aria-label='Открыть/Закрыть форму параметров статьи'
			tabIndex={0}
			className={clsx(styles.container, isOpen && styles.container_open)}>
			<img
				src={arrow}
				alt='иконка стрелочки'
				className={clsx(styles.arrow, { [styles.arrow_open]: state })}
			/>
		</div>
	);
};
