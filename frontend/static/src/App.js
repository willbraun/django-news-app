import { useState } from 'react';
import ReactRouter from './components/ReactRouter';
import './App.css';
import './styles/displayarticles.css'

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
