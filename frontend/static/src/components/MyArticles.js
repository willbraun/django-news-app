import { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import { handleError } from './../helpers';
import Article from './Article';

const MyArticles = () => {
    const [state, setState] = useState({
        articles: [],
    })

    const navigate = useNavigate();

    useEffect(() => {
        const getMyArticles = async () => {
            const response = await fetch(`/api_v1/articles/mine/`).catch(handleError);
            
            if (!response.ok) {
                throw new Error('Network response was not ok!');
            }
    
            const data = await response.json();
            setState({...state, articles: data})
        }

        getMyArticles();
    }, [])

    const articleList = state.articles.map(article => <Article key={article.id} {...article}/>)
    
    return (
        <main>
            <div className="my-articles-header">
                <h2>My Articles</h2>
                <button type="button" onClick={() => navigate('../create')}>+ New Article</button>
            </div>
            {articleList}
        </main>
    )
}

export default MyArticles;