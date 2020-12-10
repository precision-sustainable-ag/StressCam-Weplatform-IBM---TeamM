import React from 'react'

export default function TakeImage() {
    return (
        <div>
            <label style = {commandStyle}>
                <button>Take image</button>
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
