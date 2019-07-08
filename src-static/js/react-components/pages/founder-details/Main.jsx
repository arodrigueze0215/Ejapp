import React, { Component } from 'react';
import EfectCard from '../../Commons/EfectCard/EfectCard.jsx';


export default class Main extends Component {

    render() {
        return(
            <section>
                <EfectCard>
                    <div> Card 1</div>
                </EfectCard>
                <EfectCard>
                    <div> Card 2</div>
                </EfectCard>
                <EfectCard>
                    <div> Card 3</div>
                </EfectCard>
            </section>
        )
    }
}
