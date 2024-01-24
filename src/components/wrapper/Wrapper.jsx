import React from 'react'
import "./wrapper.scss";
const Wrapper = ({ children }) => {
    return <div className="contentWrapper">{children}</div>;
};

export default Wrapper
