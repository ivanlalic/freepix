import React from 'react';
import Image from './image';

const List = ({images}) => {
    return ( 
        <div className="col-12 p5 row">
            {images.map(image => (
                <Image 
                    key={image.id}
                    image={image}
                />
            ) )}
        </div>
     );
}
 
export default List;