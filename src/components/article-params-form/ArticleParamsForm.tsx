import { useState, FormEvent, useRef, useEffect } from 'react';
import clsx from 'clsx';

import { Text } from '../text';
import { ArrowButton } from 'components/arrow-button';
import { Button } from 'components/button';
import { RadioGroup } from '../radio-group';
import { Select } from '../select';
import { Separator } from '../separator';
import {
	OptionType,
	fontFamilyOptions,
	fontColors,
	backgroundColors,
	contentWidthArr,
	fontSizeOptions,
} from 'src/constants/articleProps';

import styles from './ArticleParamsForm.module.scss';

type FormState = {
	fontFamilyOption: OptionType;
	fontSizeOption: OptionType;
	fontColor: OptionType;
	backgroundColor: OptionType;
	contentWidth: OptionType;
};

export type ArticleParamsForm = {
	formState: FormState;
	setFormState: React.Dispatch<React.SetStateAction<FormState>>;

	//<ArticleParamsForm['formState']>>;
	submitFormState: (e: FormEvent<HTMLFormElement>) => void;
	resetFormState: () => void;
};

export const ArticleParamsForm = (props: ArticleParamsForm) => {
	const [state, setState] = useState(false);
	const changeState = () => setState(!state);
	// const formRef = useRef<HTMLFormElement>(null);
	const formRef = useRef<HTMLFormElement | null>(null);

	useEffect(() => {
		if (!state) return;

		function clickOut(event: MouseEvent) {
			const { target } = event;
			const isClickOut =
				target instanceof HTMLElement &&
				formRef &&
				formRef.current &&
				!formRef.current.contains(target);

			if (isClickOut) {
				changeState();
			}
		}

		function escOut(event: KeyboardEvent) {
			if (event.key === 'Escape') {
				changeState();
			}
		}

		document.addEventListener('mousedown', clickOut);
		document.addEventListener('keydown', escOut);
		return () => {
			document.removeEventListener('mousedown', clickOut);
			document.removeEventListener('keydown', escOut);
		};
	}, [state]);

	return (
		<>
			<ArrowButton state={state} changeState={changeState} />
			<aside
				className={clsx(styles.container, { [styles.container_open]: state })}>
				<form
					className={styles.form}
					onSubmit={props.submitFormState}
					ref={formRef}>
					<Text as='h2' uppercase weight={800} size={31}>
						задайте параметры
					</Text>

					<Select
						selected={props.formState.fontFamilyOption}
						onChange={(option) =>
							props.setFormState({
								...props.formState,
								fontFamilyOption: option,
							})
						}
						options={fontFamilyOptions}
						title='шрифт'
						placeholder='Open Sans'
					/>

					<RadioGroup
						selected={props.formState.fontSizeOption}
						onChange={(option) =>
							props.setFormState({
								...props.formState,
								fontSizeOption: option,
							})
						}
						options={fontSizeOptions}
						title='размер шрифта'
						name='размер шрифта'
					/>

					<Select
						selected={props.formState.fontColor}
						onChange={(option) =>
							props.setFormState({
								...props.formState,
								fontColor: option,
							})
						}
						options={fontColors}
						title='цвет шрифта'
						placeholder='Черный'
					/>

					<Separator />

					<Select
						selected={props.formState.backgroundColor}
						onChange={(option) =>
							props.setFormState({
								...props.formState,
								backgroundColor: option,
							})
						}
						options={backgroundColors}
						title='цвет фона'
						placeholder='Белый'
					/>

					<Select
						selected={props.formState.contentWidth}
						onChange={(option) =>
							props.setFormState({
								...props.formState,
								contentWidth: option,
							})
						}
						options={contentWidthArr}
						title='ширина контента'
						placeholder='широкий'
					/>

					<div className={styles.bottomContainer}>
						<Button
							title='Сбросить'
							type='reset'
							onClick={props.resetFormState}
						/>
						<Button title='Применить' type='submit' />
					</div>
				</form>
			</aside>
		</>
	);
};
