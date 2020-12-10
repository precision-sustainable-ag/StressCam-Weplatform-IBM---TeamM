import React from 'react'

export default function SetFPS() {
    return (
        <div>
            <label style = {commandStyle}>
                Select frames per second:
                <select>
                    <option value ="10">10</option>
                    <option value ="15">15</option>
                    <option value ="30">30</option>
                </select>
                <button>Set frames</button>
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
