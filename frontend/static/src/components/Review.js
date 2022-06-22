import { useState, useEffect } from 'react';
import { handleError } from './../helpers';
import Article from './Article';

const Review = () => {
    const [state, setState] = useState({
        articles: [],
    })

    useEffect(() => {
        const getReview = async () => {
            const response = await fetch(`/api_v1/articles/review/`).catch(handleError);
            
            if (!response.ok) {
                throw new Error('Network response was not ok!');
            }
    
            const data = await response.json();
            setState({...state, articles: data})
        }

        getReview();
    }, [])

    const articleList = state.articles.map(article => <Article key={article.id} {...article}/>)
    
    return (
        <main>
            <div>Review</div>
            {articleList}
        </main>
    )
}

export default Review;