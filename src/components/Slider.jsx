import Form from "react-bootstrap/Form";
import React from "react";

class Range extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: 25,
      workTime: props.workTime || 25,
      funTime: props.funTime || 5,
    };
  }

  handleChange = (event) => {
    this.setState({
      value: event.target.value,
      workTime: event.target.value,
      funTime: 30 - event.target.value
    });
    this.props.onTimeChange(this.state.workTime, this.state.funTime);
  };

  render() {
    return (
      <>
        <Form.Label>Time Split</Form.Label>
        <Form.Range
          min={0}
          max={30}
          defaultValue={this.state.value}
          onChange={this.handleChange}
        />
        <h2>Focus Time: {this.state.value} | Fun Time: {this.state.funTime}</h2>
      </>
    );
  }
}

export default Range;
