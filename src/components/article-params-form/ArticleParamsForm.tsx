import { useState, FormEvent, useRef } from 'react';
import clsx from 'clsx';

import { Text } from '../text';
import { ArrowButton } from 'components/arrow-button';
import { Button } from 'components/button';
import { RadioGroup } from '../radio-group';
import { Select } from '../select';
import { Separator } from '../separator';
import {
	ArticleStateType,
	OptionType,
	fontFamilyOptions,
	fontColors,
	backgroundColors,
	contentWidthArr,
	fontSizeOptions,
	defaultArticleState,
} from 'src/constants/articleProps';

import styles from './ArticleParamsForm.module.scss';
import { useClickOut } from 'src/hooks/useClickOut';

/* export type ArticleParamsForm = {
	formState: ArticleStateType;
	setFormState: React.Dispatch<React.SetStateAction<ArticleStateType>>;	
	submitFormState: (e: FormEvent<HTMLFormElement>) => void;
	resetFormState: () => void;
	setRenderState: (value:ArticleStateType) => void;
};*/

export type ArticleParamsForm = {
	setRenderState: (value: ArticleStateType) => void;
};

export const ArticleParamsForm = (props: ArticleParamsForm) => {
	const { setRenderState } = props;
	const [formState, setFormState] =
		useState<ArticleStateType>(defaultArticleState);
	const [isOpen, setIsOpen] = useState<boolean>(false);

	const formRef = useRef<HTMLFormElement | null>(null);

	useClickOut({ isOpen, setIsOpen, formRef });

	const handleSelectChange = (
		key: keyof ArticleStateType,
		option: OptionType
	) => {
		setFormState({
			...formState,
			[key]: option,
		});
	};

	const submitFormState = (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		setRenderState(formState);
	};

	const resetFormState = (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		setFormState(defaultArticleState);
		setRenderState(defaultArticleState);
	};

	return (
		<>
			<ArrowButton
				state={isOpen}
				changeState={() => setIsOpen((prevState) => !prevState)}
			/>
			<aside
				className={clsx(styles.container, { [styles.container_open]: isOpen })}>
				<form
					className={styles.form}
					onSubmit={submitFormState}
					onReset={resetFormState}
					ref={formRef}>
					<Text as='h2' uppercase weight={800} size={31}>
						задайте параметры
					</Text>

					<Select
						selected={formState.fontFamilyOption}
						onChange={(option) =>
							handleSelectChange('fontFamilyOption', option)
						}
						options={fontFamilyOptions}
						title='шрифт'
						placeholder='Open Sans'
					/>

					<RadioGroup
						selected={formState.fontSizeOption}
						onChange={(option) => handleSelectChange('fontSizeOption', option)}
						options={fontSizeOptions}
						title='размер шрифта'
						name='размер шрифта'
					/>

					<Select
						selected={formState.fontColor}
						onChange={(option) => handleSelectChange('fontColor', option)}
						options={fontColors}
						title='цвет шрифта'
						placeholder='Черный'
					/>

					<Separator />

					<Select
						selected={formState.backgroundColor}
						onChange={(option) => handleSelectChange('backgroundColor', option)}
						options={backgroundColors}
						title='цвет фона'
						placeholder='Белый'
					/>

					<Select
						selected={formState.contentWidth}
						onChange={(option) => handleSelectChange('contentWidth', option)}
						options={contentWidthArr}
						title='ширина контента'
						placeholder='широкий'
					/>

					<div className={styles.bottomContainer}>
						<Button
							title='Сбросить'
							type='reset'
							//onClick={props.resetFormState}
						/>
						<Button title='Применить' type='submit' />
					</div>
				</form>
			</aside>
		</>
	);
};
