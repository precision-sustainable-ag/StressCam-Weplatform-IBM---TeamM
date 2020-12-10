import React from 'react'

export default function SelectImageType() {
    return (
        <div>
            <label style = {commandStyle}>
                Select image type:
                <select>
                    <option value =".jpg">.jpg</option>
                    <option value =".png">.png</option>
                    <option value =".bmp">.bmp</option>
                </select>
                <button>Set image format</button>
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
