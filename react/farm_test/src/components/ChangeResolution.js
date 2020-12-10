import React from 'react'

export default function ChangeResolution() {
    return (
        <div>
            <label style = {commandStyle}>
                Change image resolution:
                <select>
                    <option value ="5 minutes">5 minutes</option>
                    <option value ="10 minutes">10 minutes</option>
                    <option value ="15 minutes">15 minutes</option>
                    <option value ="30 minutes">30 minutes</option>
                    <option value ="60 minutes">60 minutes</option>
                </select>
                <button>Change resolution</button>
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
