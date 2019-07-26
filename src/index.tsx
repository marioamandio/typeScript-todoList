import React, { useState } from 'react'
import ReactDOM from 'react-dom'

type FormElement = React.FormEvent<HTMLFormElement>

interface ITodo {
	text: String
	complete: Boolean
}

export default function App(): JSX.Element {
	const [value, setValue] = useState<string>('')
	const [todos, setTodos] = useState<ITodo[]>([])

	const handleSubmit = (ev: FormElement): void => {
		ev.preventDefault()
		addTodo(value)
		setValue('')
	}

	const addTodo = (text: String): void => {
		const newTodos: ITodo[] = [...todos, { text, complete: false }]
		setTodos(newTodos)
	}

	const completeTodo = (i: number): void => {
		const newTodos: ITodo[] = [...todos]
		newTodos[i].complete = !newTodos[i].complete
		setTodos(newTodos)
	}

	const removeTodo = (i: Number): void => {
		const updatedTodos = todos.filter(
			(todo: ITodo, index: Number) => index !== i
		)
		setTodos(updatedTodos)
	}

	return (
		<div>
			<h1>Todo List</h1>
			<form action='' onSubmit={handleSubmit}>
				<input
					type='text'
					value={value}
					onChange={e => setValue(e.target.value)}
					required
				/>
				<button type='submit'>Add Todo</button>
			</form>
			<section>
				{todos.map((todo: ITodo, i: number) => (
					<div key={i}>
						<div
							style={{ textDecoration: todo.complete ? 'line-through' : '' }}
						>
							{' '}
							{todo.text}
						</div>
						<button type='button' onClick={() => completeTodo(i)}>
							{todo.complete ? 'incomplete' : 'complete'}
						</button>
						<button type='button' onClick={() => removeTodo(i)}>
							remove
						</button>
					</div>
				))}
			</section>
		</div>
	)
}

const root = document.getElementById('app-root')

ReactDOM.render(<App />, root)
