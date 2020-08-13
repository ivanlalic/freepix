import React, {useState} from 'react';
import Error from './error';


const Form = ({setSearch}) => {

    //States
    const [tag, setTag] = useState('');
    const [error, setError] = useState(false);

    const searchImage = e => {
        e.preventDefault();

        //Validate
        if(tag.trim() === '') {
            setError(true);
            return;
        }
        setError(false);
        //Send tag to main component
        setSearch(tag);


    };

    return ( 
        <form
            onSubmit={searchImage}
        >
            <div className="row">
                <div className="form-group col-md-8">
                    <input 
                        type="text"
                        className="form-control form-control-lg"
                        placeholder="Search an image"
                        onChange={e => setTag(e.target.value)}
                    />
                </div>
                <div className="form-group col-md-4">
                    <input 
                        type="submit"
                        className="btn btn-lg btn-danger btn-block"
                        value="Search"
                    />
                </div>
            </div>

            { error ? <Error message="Add a search tag"/> : null}

        </form>

     );
}
 
export default Form;