import { createRoot } from 'react-dom/client';
import { StrictMode, CSSProperties, useState, FormEvent } from 'react';
import clsx from 'clsx';

import { Article } from './components/article/Article';
import { ArticleParamsForm } from './components/article-params-form/ArticleParamsForm';
import { defaultArticleState } from './constants/articleProps';

import './styles/index.scss';
import styles from './styles/index.module.scss';

const domNode = document.getElementById('root') as HTMLDivElement;
const root = createRoot(domNode);

const App = () => {
	const [formState, setFormState] = useState(defaultArticleState);
	const [renderState, setRenderState] = useState(defaultArticleState);
	const submitFormState = (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		setRenderState({ ...formState });
	};

	const resetFormState = () => {
		setFormState(defaultArticleState);
		setRenderState(defaultArticleState);
	};

	return (
		<div
			className={clsx(styles.main)}
			style={
				{
					'--font-family': renderState.fontFamilyOption.value,
					'--font-size': renderState.fontSizeOption.value,
					'--font-color': renderState.fontColor.value,
					'--container-width': renderState.contentWidth.value,
					'--bg-color': renderState.backgroundColor.value,
				} as CSSProperties
			}>
			<ArticleParamsForm
				formState={formState}
				setFormState={setFormState}
				resetFormState={resetFormState}
				submitFormState={submitFormState}
			/>
			<Article />
		</div>
	);
};

root.render(
	<StrictMode>
		<App />
	</StrictMode>
);
