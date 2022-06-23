import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import { handleError } from '../helpers';

const CreateArticle = ({appState}) => {
    const blank = {
        title: '',
        body: '',
        image: null,
        category: '',
    }

    const [state, setState] = useState(blank);
    const [preview, setPreview] = useState('');

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

    const postArticle = async (phase) => {
        const formData = new FormData();
        Object.entries(state).forEach(entry => formData.append(entry[0], entry[1]));
        formData.append('phase', phase);
        
        const options = {
            method: 'POST',
            headers: {
                'X-CSRFToken': Cookies.get('csrftoken'),
            },
            body: formData,
        }

        const response = await fetch('/api_v1/articles/mine/', options).catch(handleError);

        if (!response.ok) {
            throw new Error('Network request not ok!');
        }
    }

    const handleFormSubmit = async (e) => {
        e.preventDefault();
        console.log(e.nativeEvent.submitter.value);
        const phase = e.nativeEvent.submitter.value;
        await postArticle(phase);
        navigate('/my-articles');
    }

    return (
        <main>
            <h2>Create Article</h2>
            <form onSubmit={handleFormSubmit}>
                <div>
                    <label htmlFor="title">Title</label>
                    <input 
                        name="title" 
                        value={state.title} 
                        type="text" 
                        id="title" 
                        required 
                        onChange={handleInput}/>
                </div>
                <div>
                    <label htmlFor="body">Body</label>
                    <textarea
                        name="body" 
                        value={state.body} 
                        type="text" 
                        id="body" 
                        required 
                        onChange={handleInput}
                    ></textarea> 
                </div>
                <div>
                    <label htmlFor="image">Image</label>
                    <input 
                        type="file" 
                        name="image" 
                        required
                        onChange={handleImage} />
                    {state.image && <img src={preview} alt='article' />}
                </div>
                <div>
                    <label htmlFor="category">Category</label>
                    <select 
                        name="category" 
                        id="category" 
                        required
                        onChange={handleInput}> 
                            <option value="">Select a category</option>
                            <option value="RC">Recipe</option>
                            <option value="RS">Restaurants</option>
                            <option value="FS">Food Science</option>
                            <option value="DB">Debate</option>
                            <option value="ST">Stories</option>
                    </select>
                </div>


                <button type="button" onClick={() => navigate('/my-articles')}>Discard Draft</button>
                <button type="submit" value="DR">Save Draft</button>
                {appState.superUser ? 
                    <button type="submit" value="PU">Save and Publish</button> : 
                    <button type="submit" value="SU">Save and Submit</button>
                }
            </form>

        </main>
        
        
    )
}

export default CreateArticle;