import React, { Component } from "react";
import Snap from 'snapsvg-cjs'

export default class PickerWheel extends Component {

    componentDidMount() {
        var s = Snap("#svg" + this.props.keyId.toString());

        s.line(30, 30, this.props.width-30, 30).attr({stroke: '#000'});

        var myCircle2 = s.circle(30, 30, 20);

        myCircle2.attr({
            stroke: '#123456',
            strokeWidth: 3,
            fill: this.props.fill,
            opacity: 0.2,
        });

        myCircle2.limitDrag({
            x: 0,
            y: 0,
            minx: 0,
            miny: 0,
            maxx: this.props.width-20,
            maxy: 0,
        });
    }

    render() {
        const idKey = "svg" + this.props.keyId.toString();
        return (
              <svg style={this.props.style} width={this.props.width} height={60} id={idKey}/>
        );
    }
}
