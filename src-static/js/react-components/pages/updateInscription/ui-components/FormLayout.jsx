import React from 'react';


const FormLayout = (props) => {
    return (
        <div>
            <form onSubmit={props.handleSubmit}>
                {props.children}
            </form>
        </div>
    );
};
export default FormLayout;