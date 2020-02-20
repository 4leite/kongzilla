import React, { useState, useCallback } from "react";
import styled from 'styled-components';

const Suggestions = styled.ul`
	list-style: none;
	margin-top: 0;
	max-height: 143px;
	overflow-y: auto;
	padding-left: 0;
	position: absolute;
`
const highlighted = `
	background-color: #bbb;
  	color: #000;
  	cursor: pointer;
`
const ActiveSuggestion = styled.li`
	padding: 2px;
	${highlighted}
`
const Suggestion = styled.li`
	padding: 2px;
	background-color: #eee;
	:hover {${highlighted}}
`
interface Props {
	value: string
	setValue: (value: string) => void
	suggestions: string[]
}

export const Autocomplete: React.FC<Props> = (props) => {

	const { value, setValue, suggestions } = props

	const [activeSuggestion, setActiveSuggestion] = useState(0)
	const [filteredSuggestions, setFilteredSuggestions] = useState(suggestions)
	const [showSuggestions, setShowSuggestions] = useState(false)
	const [position, setPosition] = useState({})

	// Event fired when the user clicks on a suggestion
	const onFocus = (e: React.FocusEvent<HTMLElement>) => {
		setFilteredSuggestions(suggestions)
		setActiveSuggestion(0)
		setShowSuggestions(true)
	}
	// Hide the suggestions if the user moves away without selecting
	const onBlur = (e: React.FocusEvent<HTMLElement>) => {
		setShowSuggestions(false)
	}
	// Event fired when the input value is changed
	const onChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
		const userInput = e.currentTarget.value

		// Filter our suggestions that don't contain the user's input
		setFilteredSuggestions(suggestions.filter(suggestion =>
			suggestion.toLowerCase().indexOf(userInput.toLowerCase()) > -1
		))
		setValue(e.currentTarget.value)
		setActiveSuggestion(0)
		setShowSuggestions(true)
	}
	// Event fired when the user presses a key down
	const onKeyDown = (e: React.KeyboardEvent) => {
		// User pressed the enter key, update the input and close the
		// suggestions
		if (e.keyCode === 13) {
			setValue(filteredSuggestions[activeSuggestion])
			setActiveSuggestion(0)
			setShowSuggestions(false)
		}
		// User pressed the up arrow, decrement the index
		else if (e.keyCode === 38) {
			if (activeSuggestion > 0) {
				setActiveSuggestion(activeSuggestion - 1)
			}
		}
		// User pressed the down arrow, increment the index
		else if (e.keyCode === 40) {
			if (activeSuggestion < filteredSuggestions.length - 1) {
				setActiveSuggestion(activeSuggestion + 1)
			}
		}
	}
	// Event fired when the user clicks on a suggestion
	// NB: OnClick conflicts with Onblur above
	const onMouseDown = (e: React.MouseEvent<HTMLElement>) => {
		setFilteredSuggestions(suggestions)
		setValue(e.currentTarget.innerText)
		setActiveSuggestion(0)
		setShowSuggestions(true)
	}
	// Set position of suggestions
	const inputCallback = useCallback((node: HTMLInputElement) => {
		setPosition({
			left: node?.offsetLeft,
			top: node?.offsetTop + node?.offsetHeight
		})
	}, [setPosition])

	return <>
		<input
			type="text"
			ref={inputCallback}
			onFocus={onFocus}
			onBlur={onBlur}
			onChange={onChange}
			onKeyDown={onKeyDown}
			value={value}
		/>
		{showSuggestions && <Suggestions style={position}>
			{filteredSuggestions.map(
				(suggestion, index) => (index === activeSuggestion) ? 
					<ActiveSuggestion key={suggestion} onMouseDown={onMouseDown}>
						{suggestion}
					</ActiveSuggestion>
					:
					<Suggestion key={suggestion} onMouseDown={onMouseDown}>
						{suggestion}
					</Suggestion>
			)}
		</Suggestions>}
	</>
}