import React, { Component } from 'react';
import styled from 'styled-components';
import Map from './Map'

export default class Main extends Component {

    render() {
        return <RootContainer><Map /></RootContainer>
    }

}

const RootContainer = styled.div`
    height: 100%;
`