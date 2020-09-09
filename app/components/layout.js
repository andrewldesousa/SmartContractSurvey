import React from "react";

const Layout = ({
    title = "",
    className,
    children
}) => (
        <div>
            
            <div className={className}>{children}</div>
        </div>
    );

export default Layout;

//<div className="jumbotron">
//                <h2 style={{color: 'white', paddingLeft:'1.5rem'}}></h2>
//            </div>