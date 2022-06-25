import { Link } from "react-router-dom";
import './../styles/article.css'

const Article = ({id, title, author_username, phase, image}) => {
    
    return (
        <Link to={`/article/${id}`}>
            <article className="article">
                <img src={image} alt={title} />
                <div className="article-content">
                    <p className="title">{title}</p>
                    <p className="author">By: {author_username}</p>
                    <p>Phase: {phase}</p> 
                </div>
            </article>
        </Link>
    )
}

export default Article;