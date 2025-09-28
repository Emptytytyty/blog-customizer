import { ArrowButton } from 'src/ui/arrow-button';
import { Button } from 'src/ui/button';
import { Select } from 'src/ui/select';
import {
	ArticleStateType,
	backgroundColors,
	contentWidthArr,
	defaultArticleState,
	fontColors,
	fontFamilyOptions,
	fontSizeOptions,
	OptionType,
} from 'src/constants/articleProps';

import styles from './ArticleParamsForm.module.scss';
import { FormEvent, useEffect, useRef, useState } from 'react';
import clsx from 'clsx';
import { RadioGroup } from 'src/ui/radio-group';
import { Separator } from 'src/ui/separator';
import { Text } from 'src/ui/text';

type ArticleParamsFormProps = {
	onSubmit: (state: ArticleStateType) => void;
	onClear: () => void;
	defaultState: ArticleStateType;
	isOpen?: boolean;
	fontFamily?: OptionType;
	textSize?: OptionType;
	textColor?: OptionType;
	backgroundColor?: OptionType;
	contentWidth?: OptionType;
};

export const ArticleParamsForm = ({
	onSubmit,
	onClear,
	isOpen = false,
	defaultState,
}: ArticleParamsFormProps) => {
	const [isOpenState, setIsOpenState] = useState(isOpen);
	const container = useRef<HTMLElement>(null);
	const arrow = useRef<HTMLDivElement>(null);
	const [selectedState, setSelectedState] = useState(defaultState);
	const {
		fontFamilyOption,
		fontSizeOption,
		fontColor,
		backgroundColor,
		contentWidth,
	} = selectedState;

	const submitHandler = (event: FormEvent) => {
		event.preventDefault();
		onSubmit(selectedState);
	};

	const clear = () => {
		onClear();
		setSelectedState(defaultArticleState);
	};

	useEffect(() => {
		const close = (event: MouseEvent) => {
			!arrow.current?.contains(event.target as Node) &&
				!container.current?.contains(event.target as Node) &&
				!(event.target as HTMLElement).className.startsWith(
					'Select-module__option'
				) &&
				setIsOpenState(false);
		};
		document.addEventListener('click', close);
		return () => document.removeEventListener('click', close);
	}, []);

	return (
		<>
			<ArrowButton
				arrowRef={arrow}
				isOpen={isOpenState}
				onClick={() => setIsOpenState(!isOpenState)}
			/>
			<aside
				className={clsx(styles.container, isOpenState && styles.container_open)}
				ref={container}>
				<form className={styles.form} onSubmit={submitHandler}>
					<Text as={'h2'} size={31} uppercase weight={800}>
						Задайте параметры
					</Text>
					<Select
						title='Шрифт'
						options={fontFamilyOptions}
						selected={fontFamilyOption}
						onChange={(option) =>
							setSelectedState((prev) => ({
								...prev,
								fontFamilyOption: option,
							}))
						}
					/>
					<RadioGroup
						title='Размер шрифта'
						options={fontSizeOptions}
						name='size'
						selected={fontSizeOption}
						onChange={(option) =>
							setSelectedState((prev) => ({ ...prev, fontSizeOption: option }))
						}
					/>
					<Select
						title='Цвет текста'
						options={fontColors}
						selected={fontColor}
						onChange={(option) =>
							setSelectedState((prev) => ({ ...prev, fontColor: option }))
						}
					/>
					<Separator />
					<Select
						title='Цвет фона'
						options={backgroundColors}
						selected={backgroundColor}
						onChange={(option) =>
							setSelectedState((prev) => ({ ...prev, backgroundColor: option }))
						}
					/>
					<Select
						title='Ширина контента'
						options={contentWidthArr}
						selected={contentWidth}
						onChange={(option) =>
							setSelectedState((prev) => ({ ...prev, contentWidth: option }))
						}
					/>
					<div className={styles.bottomContainer}>
						<Button
							title='Сбросить'
							htmlType='reset'
							type='clear'
							onClick={clear}
						/>
						<Button title='Применить' htmlType='submit' type='apply' />
					</div>
				</form>
			</aside>
		</>
	);
};
