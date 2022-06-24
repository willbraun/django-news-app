import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { useParams, useLocation, Link, Outlet } from 'react-router-dom';
import { handleError, phases, categories } from '../helpers';
import EditArticle from './EditArticle';


const ArticleDetail = ({auth, superUser, authorId}) => {
    const [state, setState] = useState(null);

    const { id } = useParams();
    const location = useLocation();

    useEffect(() => {
        const getDetails = async (id) => {
            const response = await fetch(`/api_v1/articles/${id}`).catch(handleError);

            if (!response.ok) {
                throw new Error('Network response was not ok!');
            }

            const data = await response.json();
            setState(data);
        }

        getDetails(id);
    }, [])

    if (!state) {
        return <div>Fetching data...</div>
    }

    const editButton = <Link key={0} to={'edit'}>Edit</Link>;
    const deleteButton = <button key={1} type="button">Delete</button>;
    const rejectButton = <button key={2} type="button">Reject</button>;
    const publishButton = <button key={3} type="button">Publish</button>;
    const archiveButton = <button key={4} type="button">Archive</button>;

    const setButtons = () => {
        if (auth && 
            authorId === state.author && 
            ['DR','RE'].includes(state.phase)) {
            return [editButton, deleteButton];
        }
        else if (auth && superUser && state.phase === 'SU') {
            return [rejectButton, publishButton];
        }
        else if (auth && superUser && state.phase === 'PU') {
            return archiveButton;
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
            <Route path='edit' element={<EditArticle {...state}/>}/>
        </Routes>

        {location.pathname.endsWith(`/article/${state.id}/edit`) ? undefined : articleDetailHTML}
        </>
    )
}

export default ArticleDetail;