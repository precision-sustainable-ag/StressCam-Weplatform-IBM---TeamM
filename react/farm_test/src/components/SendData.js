import React from 'react'

export default function SendData() {
    return (
        <div>
            <label style = {commandStyle}>
                <button>Send data</button>
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
