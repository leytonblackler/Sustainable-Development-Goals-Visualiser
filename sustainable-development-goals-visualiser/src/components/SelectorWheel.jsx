import React, { Component } from "react";
import ReactModal from 'react-modal';
import { Chart, Doughnut } from 'react-chartjs-2';
import './SelectorWheel.css'

import no_poverty from '../icons/goals/1_no_poverty.svg'

const iconPath = '../icons/goals/';
const iconNames = [
  '1_no_poverty',
  '2_zero_hunger',
  '3_quality_education',
  '4_clean_water',
  '5_internet_access',
  '6_sustainable_cities',
  '7_biodiversity'
];
const iconSuffix = '.svg';

iconNames.forEach((iconName) => {
  var tooltipEl = document.createElement('img');
  tooltipEl.className = 'wheel-icon';
  tooltipEl.src = no_poverty;
  document.body.appendChild(tooltipEl);
  // }
  // Set caret Position
  tooltipEl.classList.remove('above', 'below', 'no-transform');
  tooltipEl.classList.add('no-transform');
  // Display, position, and set styles for font
  tooltipEl.style.opacity = 1;
  tooltipEl.style.position = 'absolute';
  // tooltipEl.style.left = position.left + window.pageXOffset + tooltipModel.caretX - 8 + 'px';
  // tooltipEl.style.top = position.top + window.pageYOffset + tooltipModel.caretY - 8 + 'px';
  tooltipEl.style.pointerEvents = 'none';
  tooltipEl.style.width = '16px';
  tooltipEl.style.height = '16px';
  tooltipEl.style.zIndex = 1000;
})

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
  maintainAspectRatio: false,
  // hover: event => { console.log(event) }
};

var originalDoughnutDraw = Chart.controllers.doughnut.prototype.draw;
Chart.helpers.extend(Chart.controllers.doughnut.prototype, {
  draw: function (ease) {
    // Call super method first
    originalDoughnutDraw.apply(this, arguments);
    var chart = this.chart;
    // console.log(chart);
    // create an array of tooltips
    // we can't use the chart tooltip because there is only one tooltip per chart
    chart.pluginTooltips = [];
    chart.config.data.datasets.forEach(function (dataset, i) {
      chart.getDatasetMeta(i).data.forEach(function (sector, j) {
        chart.pluginTooltips.push(new Chart.Tooltip({
          _chart: chart.chart,
          _chartInstance: chart,
          _data: chart.data,
          _options: chart.options.tooltips,
          _active: [sector]
        }, chart));
      });
    });
    Chart.helpers.each(chart.pluginTooltips, (tooltip) => {
      // This line checks if the item is visible to display the tooltip
      if (!tooltip._active[0].hidden) {
        tooltip.initialize();
        tooltip.update();
        // we don't actually need this since we are not animating tooltips
        tooltip.pivot();
        //tooltip.transition(ease).draw();
      }
    });
    chart.options.tooltips.enabled = false;
    let icons = document.getElementsByClassName('wheel-icon');
    let xOffset = this.chart.canvas.getBoundingClientRect().left + window.pageXOffset;
    let yOffset = this.chart.canvas.getBoundingClientRect().top + window.pageYOffset;
    for (let i = 0; i < icons.length; i++) {
      icons[i].style.left = xOffset + this.chart.pluginTooltips[i]._model.caretX - 8 + 'px';
      icons[i].style.top = yOffset + this.chart.pluginTooltips[i]._model.caretY - 8 + 'px';
    }
  }
});


export default class SelectorWheel extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showModal: false,
      icons: []
    };
    this.handleOpenModal = this.handleOpenModal.bind(this);
    this.handleCloseModal = this.handleCloseModal.bind(this);
    this.print = this.print.bind(this);
  }

  componentDidMount() {
    this.props.openModalHandler(this.handleOpenModal);
    this.props.closeModalHandler(this.handleCloseModal);
  }

  print(chart) {
    // console.log(chart.options);
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
          onRequestClose={this.handleCloseModal}
          shouldCloseOnOverlayClick={true}
          className="Modal"
          overlayClassName="Overlay"
          shouldFocusAfterRender={false}
        >
          <Doughnut
            data={data}
            options={doughnutOptions}
            legend={{ display: false }}
            style={{
              width: '100%',
              height: '100%'
            }}
          />
        </ReactModal>
      </div>
    );
  }
};