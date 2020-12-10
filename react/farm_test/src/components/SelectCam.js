import React from 'react'

export default function SelectCam() {
    return (
        <div>
            <label style = {commandStyle}>
                Select which camera to command:
                <select>
                <option value ="Camera 1">Camera 1</option>
                <option value ="Camera 2">Camera 2</option>
                <option value ="Camera 3">Camera 3</option>
                </select>
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
