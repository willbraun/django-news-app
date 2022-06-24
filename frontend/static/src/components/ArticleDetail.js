import { Routes, Route } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { useParams, useLocation, useNavigate, Link } from 'react-router-dom';
import { handleError, phases, categories } from '../helpers';
import Cookies from 'js-cookie';
import EditArticle from './EditArticle';


const ArticleDetail = ({auth, superUser, authorId}) => {
    const [state, setState] = useState(null);
    const [errorMessage, setErrorMessage] = useState('');

    const { id } = useParams();
    const location = useLocation();
    const navigate = useNavigate();

    useEffect(() => {
        const getDetails = async (id) => {
            const response = await fetch(`/api_v1/articles/${id}`).catch(handleError);
            if (!response.ok) {
                setErrorMessage(`${response.status} ${response.statusText}`)
                throw new Error('Network response was not ok!');
            }

            const data = await response.json();
            setState(data);
        }

        getDetails(id);
    }, [])

    const deleteArticle = async (id) => {
        const options = {
            method: 'DELETE',
            headers: {
                'X-CSRFToken': Cookies.get('csrftoken'),
            }
        }

        const response = await fetch(`/api_v1/articles/${id}`, options).catch(handleError);

        if (!response.ok) {
            throw new Error('Network response was not ok!');
        }

        navigate('/my-articles');
    }

    const submitArticle = async () => {
        const options = {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
                'X-CSRFToken': Cookies.get('csrftoken'),
            },
            body: JSON.stringify({phase: 'SU'}),
        }

        const response = await fetch(`/api_v1/articles/${id}/`, options).catch(handleError);

        if (!response.ok) {
            throw new Error('Network request not ok!');
        }
        
        const data = await response.json();
        setState(data);
    }

    if (errorMessage) {
        return <div>{errorMessage}</div>
    }

    if (!state) {
        return <div>Fetching data...</div>
    }

    const editButton = <Link key={0} to={'edit'}>Edit</Link>;
    const deleteButton = <button key={1} type="button" onClick={() => deleteArticle(id)}>Delete</button>;
    const submitButton = <button key={2} type="button" onClick={() => submitArticle(id)}>Submit</button>;
    const rejectButton = <button key={3} type="button">Reject</button>;
    const publishButton = <button key={4} type="button">Publish</button>;
    const archiveButton = <button key={5} type="button">Archive</button>;

    const setButtons = () => {
        if (auth && authorId === state.author && ['DR','RE'].includes(state.phase)) {
            if (superUser){
                return [deleteButton, editButton, publishButton];
            }
            else {
                return [deleteButton, editButton, submitButton];
            }   
        }
        else if (auth && superUser){
            if (state.phase === 'SU') {
                return [rejectButton, publishButton]; 
            }
            else if (state.phase === 'PU') {
                return archiveButton;
            }
        }
        else {
            return null;
        }     
    }

    const buttonList = setButtons();

    const articleDetailHTML = (
        <main>
            <div>
                <h2>{state.title}</h2>
                {buttonList}
            </div>
            <p>{phases[state.phase]}</p>
            <p>{categories[state.category]}</p>
            <p>By: {state.author_username}</p>
            <img src={state.image} alt={state.title} />
            <p>{state.body}</p>
        </main>
    )

    return (
        <>
        <Routes>
            <Route path='edit' element={<EditArticle superUser={superUser} detailState={state} setDetailState={setState}/>}/>
        </Routes>

        {location.pathname.endsWith(`/article/${state.id}/edit`) ? undefined : articleDetailHTML}
        </>
    )
}

export default ArticleDetail;