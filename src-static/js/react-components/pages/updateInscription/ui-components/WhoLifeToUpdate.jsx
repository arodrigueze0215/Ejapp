import React from 'react';

const WhoLifeToUpdate = (props) => {
    return(
        <section className="Main__personal__whoLife">
            <div>
                <fieldset className="fieldset">
                    <legend>¿Con quién vives?</legend>
                    <div className="Main__personal__whoLife__check">
                        <div className="Main__personal__whoLife__check__lifeWithGran">
                            <label>
                                <input 
                                    defaultChecked={props.dataInscription.bodyObject.life_with_gran? true: false}
                                    name="life_with_gran"
                                    type="checkbox"/>
                                    Abuelos
                            </label>
                        </div>
                        <div className="Main__personal__whoLife__check__lifeWithParent">
                            <label>
                                <input
                                    defaultChecked={props.dataInscription.bodyObject.life_with_parent? true: false}
                                    name="life_with_parent"
                                    type="checkbox"/>
                                    Ambos padres
                            </label>
                        </div>
                        
                        <div className="Main__personal__whoLife__check__lifeWithOnlyMother">
                            <label>
                                <input 
                                    defaultChecked={props.dataInscription.bodyObject.life_with_only_mother? true: false}
                                    name="life_with_only_mother"
                                    type="checkbox"/>
                                    Solo madre                                    
                            </label>
                        </div>
                        <div className="Main__personal__whoLife__check__lifeWithOnlyFather">
                            <label>
                                <input 
                                    defaultChecked={props.dataInscription.bodyObject.life_with_only_father? true: false}
                                    name="life_with_only_father"
                                    type="checkbox"/>
                                    Solo padre
                            </label>
                        </div>
                        
                        <div className="Main__personal__whoLife__check__lifeWithUncles">
                            <label>
                                <input
                                    defaultChecked={props.dataInscription.bodyObject.life_with_uncles? true: false}
                                    name="life_with_uncles"
                                    type="checkbox"/>
                                    Tíos(as)
                            </label>
                        </div>
                        
                        <div className="Main__personal__whoLife__check__lifeWithFriends">
                            <label>
                                <input
                                    defaultChecked={props.dataInscription.bodyObject.life_with_friends? true: false}
                                    name="life_with_friends"
                                    type="checkbox"/>
                                    Amigos(as)
                            </label>
                        </div>
                        
                        <div className="Main__personal__whoLife__check__lifeWithCousins">
                            <label>
                                <input 
                                    defaultChecked={props.dataInscription.bodyObject.life_with_cousins? true: false}
                                    name="life_with_cousins"
                                    type="checkbox"/>
                                    Primos(as)
                            </label>
                        </div>
                        
                        <div className="Main__personal__whoLife__check__lifeWithBrothers">
                            <label>
                                <input
                                    defaultChecked={props.dataInscription.bodyObject.life_with_brothers? true: false}
                                    name="life_with_brothers"
                                    type="checkbox"/>
                                    Hermanos(as)
                            </label>
                        </div>
                        
                        <div className="Main__personal__whoLife__check__lifeWithAlone">
                            <label>
                                <input 
                                    defaultChecked={props.dataInscription.bodyObject.life_with_alone? true: false}
                                    name="life_with_alone"
                                    type="checkbox"/>
                                    Solo(a)
                            </label>
                        </div>
                    </div>                
                </fieldset>
            </div>              
        </section>

    );
}
export default WhoLifeToUpdate;