import React from 'react'

export default function ResizeImage() {
    return (
        <div>
            <label style = {commandStyle}>
                Width: 
                <input type = 'text' />

                Height: 
                <input type = 'text' />
                <button>Resize image</button>
            </label>
            
        </div>
    )
}

const commandStyle = {
    display: 'flex',
    backgroundColor: '#f4f4f4',
    padding: '10px',
    borderBottom: '1px #ccc dotted'
}
