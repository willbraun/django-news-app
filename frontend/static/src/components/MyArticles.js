import { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import { handleError } from './../helpers';
import Article from './Article';
import './../styles/myarticles.css'

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
            <div className="subheader-row">
                <div className="my-articles-row-content">
                    <h2>My Articles</h2>
                    <button type="button" onClick={() => navigate('../create')}>+ New Article</button>
                    
                </div>
            </div>
            <section className="section-my-articles">
                {articleList}
            </section>
        </main>
    )
}

export default MyArticles;