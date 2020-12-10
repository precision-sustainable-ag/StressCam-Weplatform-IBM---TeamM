import React from 'react'

export default function SelectScript() {
    return (
        <div>
            <label style = {commandStyle}>
                Select script to run:
                <select>
                    <option value ="Take image">Take image</option>
                    <option value ="IRT sensor">IRT sensor</option>
                    <option value ="LUX sensor">LUX sensor</option>
                    <option value ="Sync time">Sync time</option>
                    <option value ="Reboot">Reboot</option>
                </select>
                <button>Run script</button>
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
