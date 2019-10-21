import React, { Component } from "react";
import ReactModal from "react-modal";
import { Chart, Doughnut } from "react-chartjs-2";
import "./SelectorWheel.css";

const categories = [
  "no_poverty",
  "zero_hunger",
  "quality_education",
  "clean_water",
  "internet_access",
  "sustainable_cities",
  "biodiversity"
];
// build array of icon svg elements
const unselectedOpacity = 0.5;
const iconElements = [];
for (let i = 0; i < categories.length; i++) {
  let icon = document.createElement("img");
  icon.className = "wheel-icon";
  icon.src = require("../icons/goals/" + parseInt(i + 1) + "_" + categories[i] + ".svg");
  document.body.appendChild(icon);
  icon.classList.remove("above", "below", "no-transform");
  icon.classList.add("no-transform");
  icon.style.opacity = unselectedOpacity;
  icon.style.position = "absolute";
  icon.style.pointerEvents = "none";
  icon.style.zIndex = 1000;
  iconElements.push(icon);
}
const iconScale = 0.12; // wheel width * iconScale = iconWidth
const data = {
  datasets: [
    {
      data: new Array(categories.length).fill(1),
      backgroundColor: [
        // this could be made dynamic with chromajs
        "#8e00f3",
        "#cc10b7",
        "#e73b8e",
        "#f65e6e",
        "#fe7d53",
        "#ff9c35",
        "#ffb800"
      ]
    }
  ]
};

/** 
 * This overrides the doughnut chart draw function.
 * The doughnut chart draws the segments of the selector wheel. ChartJS calculates the
 * centerpoint of these segments to draw a tooltip at the segment which the user is
 * hovering over. This overridden draw function creates a hidden tooltip for each segment
 * and uses their positions to place the generated icons. 
 */
let originalDoughnutDraw = Chart.controllers.doughnut.prototype.draw;
Chart.helpers.extend(Chart.controllers.doughnut.prototype, {
  draw: function (ease) {
    // Call super method first
    originalDoughnutDraw.apply(this, arguments);
    let chart = this.chart;
    // if the tooltips haven't been created, create them
    if (!chart.icons) {
      chart.icons = [];
      chart.config.data.datasets.forEach(function (dataset, i) {
        chart.getDatasetMeta(i).data.forEach(function (sector, j) {
          chart.icons.push(
            new Chart.Tooltip({
              _chart: chart.chart,
              _chartInstance: chart,
              _data: chart.data,
              _options: chart.options.tooltips,
              _active: [sector]
            }, chart)
          );
        });
      });
    }
    Chart.helpers.each(chart.icons, tooltip => {
      if (!tooltip._active[0].hidden) {
        tooltip.initialize();
        tooltip.update();
      }
    });
    // icon positions are retrieved from an array of tooltips
    let icons = document.getElementsByClassName("wheel-icon");
    let rect = chart.canvas.getBoundingClientRect();
    // scale icons with the window
    let iconSize = parseInt(Math.min(rect.width, rect.height) * iconScale);
    let xOffset = rect.left + window.pageXOffset;
    let yOffset = rect.top + window.pageYOffset;
    for (let i = 0; i < icons.length; i++) {
      icons[i].style.width = iconSize + "px";
      icons[i].style.height = iconSize + "px";
      icons[i].style.left =
        xOffset + chart.icons[i]._model.caretX - iconSize / 2 + "px";
      icons[i].style.top =
        yOffset + chart.icons[i]._model.caretY - iconSize / 2 + "px";
    }
  }
});

/**
 * This component displays a selector wheel with a icon representing a UN goal
 * displayed in each segment. The selector wheel is drawn using a modified ChartJS 
 * doughnut chart. It is contained in a React Modal so that it gets drawn over the top of
 * other components and can be easily shown/hidden. 
 */
export default class SelectorWheel extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showModal: false
    };
    this.handleOpenModal = this.handleOpenModal.bind(this);
    this.handleCloseModal = this.handleCloseModal.bind(this);
    this.highlightSegment = this.highlightSegment.bind(this);
  }

  componentDidMount() {
    this.props.openModalHandler(this.handleOpenModal);
    this.props.closeModalHandler(this.handleCloseModal);
    this.props.highlightSegment(this.highlightSegment);
  }

  /**
   * Opens the modal. Called by parent component.
   */
  handleOpenModal() {
    if (this.state.showModal === false) {
      for (let i = 0; i < iconElements.length; i++) {
        iconElements[i].style.display = "block";
      }
      this.setState({ showModal: true });
    }
  }

  /**
   * Closes the modal. Called by parent component.
   */
  handleCloseModal() {
    if (this.state.showModal === true) {
      for (let i = 0; i < iconElements.length; i++) {
        iconElements[i].style.display = "none";
      }
      this.setState({ showModal: false });
    }
  }

  /**
   * Highlights the segment at a given index (to show it has been hovered over).
   * @param {num} index 
   */
  highlightSegment(index) {
    for (let i = 0; i < iconElements.length; i++) {
      let newOpacity;
      i == index ? newOpacity = 1 : newOpacity = unselectedOpacity;
      iconElements[i].style.opacity = newOpacity;
    }
  }

  render() {
    return (
      <ReactModal
        isOpen={this.state.showModal}
        contentLabel="Selector Wheel"
        onRequestClose={this.handleCloseModal}
        shouldCloseOnOverlayClick={true}
        className="wheel-modal"
        overlayClassName="wheel-overlay"
        shouldFocusAfterRender={false}
      >
        <Doughnut
          data={data}
          legend={{ display: false }}
          style={{ width: "100%", height: "100%" }}
          options={{
            animation: {
              animateRotate: false,
              animateScale: true,
              duration: 300
            },
            tooltips: {
              enabled: false
            },
            maintainAspectRatio: false
          }}
        />
      </ReactModal>
    );
  }
}
