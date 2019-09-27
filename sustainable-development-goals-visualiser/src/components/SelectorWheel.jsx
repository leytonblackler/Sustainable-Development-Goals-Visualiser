import React, { Component } from "react";
import ReactModal from 'react-modal';
import { Doughnut } from 'react-chartjs-2';

const data = {
  datasets: [{
    data: [1, 1, 1, 1, 1, 1, 1],
    backgroundColor: [
      '#8e00f3',
      '#cc10b7',
      '#e73b8e',
      '#f65e6e',
      '#fe7d53',
      '#ff9c35',
      '#ffb800',
    ],

  }]
};

const doughnutOptions = {
  animation: {
    animateRotate: false,
    animateScale: true,
    duration: 300
  },
  tooltips: {
    enabled: false
  },
  maintainAspectRatio: false,
  // hover: event => { console.log(event) }
};

export default class SelectorWheel extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showModal: false
    };
    this.handleOpenModal = this.handleOpenModal.bind(this);
    this.handleCloseModal = this.handleCloseModal.bind(this);
  }

  componentDidMount() {
    this.props.openModalHandler(this.handleOpenModal);
    this.props.closeModalHandler(this.handleCloseModal);
  }

  handleOpenModal() {
    this.setState({ showModal: true });
  }

  handleCloseModal() {
    this.setState({ showModal: false });
  }

  render() {
    return (
      <div>
        <button onClick={this.handleOpenModal}>Trigger Modal</button>
        <ReactModal
          isOpen={this.state.showModal}
          contentLabel="Selector Wheel"
          // this doesn't work. leyton help
          style={{ backgroundColor: "transparent" }}
        >
          <Doughnut
            data={data}
            options={doughnutOptions}
            legend={{ display: false }}
            style={{ width: '100%', height: '100%' }}
          />
        </ReactModal>
      </div>
    );
  }
};