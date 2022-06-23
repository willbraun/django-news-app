import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { handleError } from '../helpers';

const ArticleDetail = () => {
    const [state, setState] = useState(null);

    const { id } = useParams();

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

    return (
        <main>
            <h2>{state.title}</h2>
            <p>By: {state.author_username}</p>
            <img src={state.image} alt={state.title} />
            <p>{state.body}</p>
        </main>
    )
}

export default ArticleDetail;