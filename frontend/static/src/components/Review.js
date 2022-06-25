import { useState, useEffect } from 'react';
import { handleError } from './../helpers';
import Article from './Article';

const Review = ({auth}) => {
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

    const articleList = state.articles.map(article => <Article key={article.id} auth={auth} {...article}/>)
    
    return (
        <main>
            <div className="subheader-row">
                <div className="subheader-row-content review">
                    <h2>Review</h2>
                </div>
            </div>
            <section className="display-articles">
                {articleList}
            </section>
        </main>
    )
}

export default Review;