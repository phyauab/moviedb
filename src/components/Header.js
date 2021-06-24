import React from 'react'

export const Header = ({title}) => {
    return (
        <div className="flex mb-10 h-10">
            <div className="h-full w-2 bg-green-400 mr-2"></div>
            <h1 className="text-4xl font-semibold">{title}</h1>
        </div>
    )
}

export default Header;