import { useState, useEffect } from 'react';
import Cookies from 'js-cookie';
import { handleError } from './../helpers';
import Article from './Article';

const Home = ({appState, setAppState}) => {
    const [state, setState] = useState({
        articles: [],
    })

    const logOut = async () => {
        const options = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'X-CSRFToken': Cookies.get('csrftoken'),
            },
        }

        const response = await fetch("/dj-rest-auth/logout/", options).catch(handleError);

        if (!response.ok) {
            throw new Error('Network response not ok!');
        }

        Cookies.remove("Authorization");
        setAppState({...appState, auth: false, superUser: false, page: 'home'});
    }

    useEffect(() => {
        const getPubArticles = async () => {
            const response = await fetch(`/api_v1/articles/`).catch(handleError);
            
            if (!response.ok) {
                throw new Error('Network response was not ok!');
            }
    
            const data = await response.json();
            setState({...state, articles: data})
        }

        getPubArticles();
    }, [])
    
    const logInButton = <button type="button" onClick={() => setAppState({...appState, page: 'login'})}>Log In</button>;
    const logOutButton = <button type="button" onClick={logOut}>Log Out</button>;

    const articleList = state.articles.map(article => <Article key={article.id} {...article}/>)

    return (
        <>
            <div>Home</div>
            {appState.auth ? logOutButton : logInButton}
            {articleList}
        </>
    )
}

export default Home;