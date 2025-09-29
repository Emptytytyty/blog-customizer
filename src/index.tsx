import { createRoot } from 'react-dom/client';
import { StrictMode, CSSProperties, useState } from 'react';
import clsx from 'clsx';

import { Article } from './components/article/Article';
import { ArticleParamsForm } from './components/article-params-form/ArticleParamsForm';
import {
	ArticleStateType,
	defaultArticleState,
} from './constants/articleProps';

import './styles/index.scss';
import styles from './styles/index.module.scss';

const domNode = document.getElementById('root') as HTMLDivElement;
const root = createRoot(domNode);

const App = () => {
	const [articleState, setArticleState] = useState(defaultArticleState);
	const {
		fontFamilyOption,
		fontSizeOption,
		fontColor,
		contentWidth,
		backgroundColor,
	} = articleState;

	const changeState = (state: ArticleStateType) => {
		setArticleState(state);
	};

	return (
		<main
			className={clsx(styles.main)}
			style={
				{
					'--font-family': fontFamilyOption.value,
					'--font-size': fontSizeOption.value,
					'--font-color': fontColor.value,
					'--container-width': contentWidth.value,
					'--bg-color': backgroundColor.value,
				} as CSSProperties
			}>
			<ArticleParamsForm
				onSubmit={changeState}
				onClear={() => changeState(defaultArticleState)}
				defaultState={defaultArticleState}
			/>
			<Article />
		</main>
	);
};

root.render(
	<StrictMode>
		<App />
	</StrictMode>
);
