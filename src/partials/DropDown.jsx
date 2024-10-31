import React from 'react'
import '../index.css'
function DropDown({ title, option, func  }) {
    return (
        <div >
            <select defaultValue="0" onChange={func} name="format" id="format">
                <option disabled value={0} >{title}</option>
                {option.map((o, i) =>
                    <option key={i} value={o} >{o.toUpperCase()}</option>
                )}

            </select>
        </div>
    )
}

export default DropDown