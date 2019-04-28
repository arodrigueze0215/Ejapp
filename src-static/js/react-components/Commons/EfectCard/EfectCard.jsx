import React from 'react';

const Card = (props) =>{
  return(
    <section className="efect__card">
      {
        props.children
      }
    </section>
  );
};

export default Card;
