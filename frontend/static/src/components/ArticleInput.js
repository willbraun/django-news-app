import { useState } from 'react';
import { useLocation } from 'react-router-dom';
import './../styles/articleinput.css';

const ArticleInput = ({parentState, setParentState}) => {
    const [preview, setPreview] = useState(parentState.image);

    const location = useLocation();
    
    const handleInput = (e) => {
        const {name, value} = e.target;
        setParentState((prevState) => ({
            ...prevState,
            [name]: value,
        }))
    }

    const handleImage = (e) => {
        const file = e.target.files[0];
        setParentState({...parentState, image: file});

        const reader = new FileReader();
        reader.onloadend = () => {
            setPreview(reader.result);
        }

        reader.readAsDataURL(file);
    }
    
    const editing = location.pathname.endsWith(`/edit`);
    
    return (
        <section className="create-article-input">
            <div className="left-side">
                <div>
                    <label htmlFor="title">Title</label>
                    <input 
                        name="title" 
                        value={parentState.title} 
                        type="text" 
                        id="title" 
                        required={!editing}
                        onChange={handleInput}/>
                </div>
                <div>
                    <label htmlFor="category">Category</label>
                    <select 
                        name="category" 
                        id="category"
                        value={parentState.category}  
                        required={!editing}
                        onChange={handleInput}> 
                            <option value="">Select a category</option>
                            <option value="RC">Recipe</option>
                            <option value="RS">Restaurants</option>
                            <option value="FS">Food Science</option>
                            <option value="DB">Debate</option>
                            <option value="ST">Stories</option>
                    </select>
                </div>
                <div>
                    <label htmlFor="body">Body</label>
                    <textarea
                        name="body" 
                        value={parentState.body} 
                        type="text" 
                        id="body" 
                        required={!editing} 
                        onChange={handleInput}
                    ></textarea> 
                </div>
            </div>
            <div className="right-side">
                <div>
                    <label htmlFor="image">Image</label>
                    <input 
                        type="file" 
                        name="image" 
                        id="image"
                        required={!editing}
                        onChange={handleImage} />
                    {parentState.image && <img className="image-preview" src={preview} alt='article' />}
                </div>
            </div>
        </section>
    )
}

export default ArticleInput;