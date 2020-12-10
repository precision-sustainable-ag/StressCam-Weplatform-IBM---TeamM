import React from 'react'

export default function SetSchedule() {
    return (
        <div>
            <label style = {commandStyle}>
                Enter as (HH:MM AM/PM) Start Time: 
                <input type = 'time' />

                End Time: 
                <input type = 'time' />
                <button>Change Schedule</button>
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
