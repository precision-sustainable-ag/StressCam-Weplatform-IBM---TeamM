import React from 'react'

export default function GetStatus() {
    return (
        <div>
            <label style = {commandStyle}>
                <button>Get camera status</button>
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
