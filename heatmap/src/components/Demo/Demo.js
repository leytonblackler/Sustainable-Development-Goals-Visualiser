import React from 'react'
import Wheel from '../Wheel/Wheel'
import BasicMap from '../BasicMap/BasicMap'

export default class Demo extends React.Component {
    

    state = {
        metric: 'pop',
        count: 1
    }

    handleClick = (m) => {
        this.setState({
            metric: m,
            count: this.state.count + 1,
        })
    }

    render(){
        return (
            <div>
                <h1>Hello world!</h1>
                <h2>{this.state.count}</h2>
                <h2>{this.state.metric}</h2>
                <button onClick={() => this.handleClick("gdp")}>Show GDP</button>
                <button onClick={() => this.handleClick("pop")}>Show Population</button>
                <BasicMap metric={this.state.metric}/>
            </div>
        )
    }
}