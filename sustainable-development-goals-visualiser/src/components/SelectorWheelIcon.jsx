

export default class SelectorWheelIcon extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    <img src={require(props.iconPath)} />
  }
}