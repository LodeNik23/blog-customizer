import { CSSProperties, useState } from 'react';
import clsx from 'clsx';

import { Article } from 'components/article/Article';
import { ArticleParamsForm } from 'components/article-params-form/ArticleParamsForm';
import {
	ArticleStateType,
	defaultArticleState,
} from '../../constants/articleProps';

import '../../styles/index.scss';
import styles from '../../styles/index.module.scss';

export const App = () => {
	const [renderState, setRenderState] =
		useState<ArticleStateType>(defaultArticleState);

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
			<ArticleParamsForm setRenderState={setRenderState} />
			<Article />
		</div>
	);
};
