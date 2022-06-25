import { useState } from 'react';
import ReactRouter from './components/ReactRouter';
import { Outlet } from 'react-router-dom';
import './App.css';
import './styles/display.css'

function App() {
	const defaultState = {
		auth: false,
		superUser: false,
		authorId: 0,
	}

	const [state, setState] = useState(defaultState);
	
	return (
		<ReactRouter appState={state} setAppState={setState}/>
	);
}

export default App;
