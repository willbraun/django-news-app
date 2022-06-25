import { Link } from "react-router-dom";
import { phases } from './../helpers';
import './../styles/article.css'

const Article = ({auth, id, title, author_username, phase, image}) => {
    
    return (
        <article className="article">
            <img src={image} alt={title} />
            <div className="article-content">
                <div className="article-top">
                    <p className="title">{title}</p>
                    {auth ? <p>{phases[phase]}</p> : undefined}
                </div>
                <div className="article-bottom">
                    <p className="author">By {author_username}</p>
                    <Link className="open-details looks-like-button" to={`/article/${id}`}>{auth ? "Open Details" : "Read"}</Link>
                </div>
            </div>
        </article>
    )
}

export default Article;