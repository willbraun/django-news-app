import { useState } from 'react';

const CreateArticle = () => {
    const blank = {
        title: '',
        body: '',
        image: null,
        category: '',
    }

    const [state, setState] = useState(blank);
    const [preview, setPreview] = useState('');
    
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

    return (
        <form>
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
                <input type="file" name="image" onChange={handleImage} />
                {state.image && <img src={preview} alt='article' />}
            </div>
        </form>
    )
}

export default CreateArticle;