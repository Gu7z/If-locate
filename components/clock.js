import React, { Component } from 'react';
import {
      PermissionsAndroid, // for checking if certain android permissions are enabled
      Text,
      View,
      ToastAndroid, // for showing notification if there's a new attendee
      Button
    } from 'react-native';

import moment from "moment";

class Clock extends Component {
  constructor(props){
    super(props)
    this.state = {
      duration: moment.duration(10000, 'milliseconds'),
      interval: 1000
    }
  }


  componentDidMount(){
    this.timerID = setInterval(
      () => {
        this.setState({
          duration: moment.duration(this.state.duration - this.state.interval, 'milliseconds')
        }, () => {
          if(this.state.duration._milliseconds == 0) {
            this.setState({
              duration: moment.duration(10000, 'milliseconds')
            })
          }
        })
        this.props.pegaTempo(this.state.duration._milliseconds/1000)
      },
      this.state.interval
    );

  }

  render(){
    return (null)
  }

}

export default Clock;
