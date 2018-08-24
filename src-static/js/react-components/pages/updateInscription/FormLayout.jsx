import React from 'react';


const FormLayout = (props) => {
    return (
        <div>
            <form>
                {props.children}
            </form>
        </div>
    );
};
export default FormLayout;