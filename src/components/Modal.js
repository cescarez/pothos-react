import React from 'react';
import './Gallery.css';

const Modal = ({ selectedImg, setSelectedImg }) => {

    const handleClick = (e) => {
        if(e.target.classList.contains('backdrop')){
            setSelectedImg(null);
        } 
    }

    return(
        <div className='backdrop' onClick={handleClick}>
            <img src={selectedImg} alt='enlarged plant pic' />
        </div>
    )
}

export default Modal;