import React from "react";

const Layout = ({
    title = "BlockSurvey",
    className,
    children
}) => (
        <div>
            <div className="jumbotron">
                <h2 style={{color: 'white', paddingLeft:'1.5rem'}}>{title}</h2>
            </div>
            <div className={className}>{children}</div>
        </div>
    );

export default Layout;