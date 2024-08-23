import React, { useState } from 'react';
import Star from '../Star/Star';


const StarRating = ({ maxRating = 5, color='yellow', size='28px', rating , setRating  }) => {
    const textStyle = {
        margin: '0 3px',
        color,
        padding: '0',
        fontSize: `${size/1.2}`
    }

   // const [rating, setRating] = useState(0);
    const [tempRating, setTempRating] = useState(0);

    return (
        <div>
            {Array.from({ length: maxRating }, (_, i) => (
                <Star
                    key={i}
                    onRate={() => setRating(i + 1)}
                    fill={tempRating ? tempRating >= i + 1 : rating >= i + 1}
                    onHover={() => setTempRating(i + 1)}
                    onHoverOut={() => setTempRating(0)}
                    color={color}
                    size={size}
                />
            ))}

            <span style={textStyle}>{tempRating || rating || ""}</span>
        </div>
    );
};

export default StarRating;
