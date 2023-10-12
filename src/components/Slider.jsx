import React, { Component, useRef } from 'react'
import Slider from 'react-rangeslider'


const workTime = { current: 25 };
const funTime = { current: 5 };

class Horizontal extends Component {
  constructor (props, context) {
    super(props, context)
    this.state = {
      value: 25
    }
  }

  handleChangeStart = () => {
    console.log('Change event started')
  };

  handleChange = value => {
    this.setState({
      value: value
    })
    workTime.current = value;
    funTime.current = 30 - workTime.current;
  
  };

  handleChangeComplete = () => {
    console.log('Change event completed')
  };

  render () {
    const { value } = this.state
    return (
      <div className='slider'>
        <Slider
          min={0}
          max={30}
          value={value}
          onChangeStart={this.handleChangeStart}
          onChange={this.handleChange}
          onChangeComplete={this.handleChangeComplete}
        />
        <div className='value'>Work Video: {workTime.current} minutes / Fun Video: {funTime.current} minutes</div>
      </div>
    )
  }
}

export default Horizontal

