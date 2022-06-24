import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import { handleError, phases } from '../helpers';

const EditArticle = ({superUser, detailState, setDetailState}) => {
    const [preview, setPreview] = useState(detailState.image);
    const [state, setState] = useState({
        title: detailState.title,
        body: detailState.body,
        category: detailState.category,
        image: detailState.image,
    });

    const navigate = useNavigate();

    const handleInput = (e) => {
        const {name, value} = e.target;
        setState((prevState) => ({
            ...prevState,
            [name]: value,
        }))
    }

    const handleImage = (e) => {
        const file = e.target.files[0];
        setState({...state, image: file});

        const reader = new FileReader();
        reader.onloadend = () => {
            setPreview(reader.result);
        }

        reader.readAsDataURL(file);
    }

    const patchArticle = async (phase) => {
        const formData = new FormData();
        Object.entries(state).forEach(entry => {
            if (entry[1] !== detailState[entry[0]] ) {
                formData.append(entry[0], entry[1]);
            }
        });
        formData.append('phase', phase);

        const options = {
            method: 'PATCH',
            headers: {
                'X-CSRFToken': Cookies.get('csrftoken'),
            },
            body: formData,
        }

        const response = await fetch(`/api_v1/articles/${detailState.id}/`, options).catch(handleError);

        if (!response.ok) {
            throw new Error('Network request not ok!');
        }

        const data = await response.json();
        setDetailState(data);
    }

    const handleFormSubmit = async (e) => {
        e.preventDefault();
        const phase = e.nativeEvent.submitter.value;
        await patchArticle(phase);
        navigate(`/article/${detailState.id}`);
    }
    
    return (
        <main>
            <p>{phases[detailState.phase]}</p>
            <form onSubmit={handleFormSubmit}>
                <div>
                    <label htmlFor="title">Title: </label>
                    <input 
                        name="title" 
                        value={state.title} 
                        type="text" 
                        id="title" 
                        placeholder="Title..."
                        required 
                        onChange={handleInput}/>
                </div>
                <div>
                    <label htmlFor="body">Body: </label>
                    <textarea
                        name="body" 
                        value={state.body} 
                        type="text" 
                        id="body" 
                        placeholder="Body..."
                        required 
                        onChange={handleInput}
                    ></textarea>
                </div>
                <div>
                    <label htmlFor="image">Image</label>
                    <input 
                        type="file" 
                        name="image" 
                        onChange={handleImage} />
                    <img src={preview} alt='article' />
                </div>
                <div>
                    <label htmlFor="category">Category: </label>
                    <select 
                        name="category" 
                        id="category" 
                        value={state.category}
                        required
                        onChange={handleInput}> 
                            <option value="RC">Recipe</option>
                            <option value="RS">Restaurants</option>
                            <option value="FS">Food Science</option>
                            <option value="DB">Debate</option>
                            <option value="ST">Stories</option>
                    </select>
                </div>
                <button type="button" onClick={() => navigate(`/article/${detailState.id}`)}>Discard Edits</button>
                <button type="submit" value="DR">Save Draft</button>
                {superUser ? 
                    <button type="submit" value="PU">Save and Publish</button> : 
                    <button type="submit" value="SU">Save and Submit</button>
                }
            </form>
        </main>
    )
}

export default EditArticle;