import { useState, useEffect } from 'react';
import Cookies from 'js-cookie';
import { handleError } from '../helpers';

const Header = ({appState, setAppState}) => {

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

    const myArticlesButton = <button type="button" onClick={() => setAppState({...appState, page: 'myArticles'})}>My Articles</button>;
    const reviewsButton = <button type="button" onClick={() => setAppState({...appState, page: 'reviews'})}>Reviews</button>;
    const logInButton = <button type="button" onClick={() => setAppState({...appState, page: 'login'})}>Log In</button>;
    const logOutButton = <button type="button" onClick={logOut}>Log Out</button>;

    const setHeaderOptions = () => {
        const results = [];
        
        if (appState.superUser) {
            results.push(myArticlesButton, reviewsButton, logOutButton);
        }
        else if (appState.auth) {
            results.push(myArticlesButton, logOutButton);
        }
        else {
            results.push(logInButton);
        }

        return results;
    }

    const headers = setHeaderOptions();

    return (
        <>
            <h1>Food News</h1>
            {headers}
        </>
    )
}

export default Header;