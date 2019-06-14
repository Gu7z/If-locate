import React, { Component } from 'react';
import {
      PermissionsAndroid,
      Text,
      View,
      ToastAndroid,
      Button
    } from 'react-native';

import { BleManager } from 'react-native-ble-plx';

class Ble extends Component {

  constructor(props){
    super(props)
    this.state = {
      dispositivos: [],
      tick: 0,
      escanenando: false,
      ultimoContador:0,
      contador: 0,
    }

    this.timeID = null;
    this.manager = new BleManager();
  }

  componentDidMount(){
    this.timerID = setInterval(
      () => this.pesquisar(),
      4000
    );
  }

  retornaId(arr){
    let id = []
    for(let i = 0; i<arr.length; i++){
      id[i] = arr[i].id
    }
    return id
  }

  pegaMenor = () => {
    let disp = this.state.dispositivos
    let tamanho = disp.length-1
    let tmp

    if (tamanho >= 0){
      for(let i = 0; i<=tamanho; i++){
        for(let j = 0; j<=tamanho; j++){
          if(disp[j].rssi < disp[i].rssi){
            tmp = disp[i]
            disp[i] = disp[j]
            disp[j] = tmp
          }
        }
      }
      this.props.pegaNomes(this.retornaId(disp))
    }else{
      this.props.pegaNomes([])
    }

    this.setState({dispositivos: []})
  }

  async teste(){
    let dispositivos = []
    let tick = 0
    let promise = new Promise((resolve, reject) => {
        this.manager.startDeviceScan(null, null, (error, device) => {
          if(error){
            this.manager.stopDeviceScan()
          }
          if(!device){
            this.manager.stopDeviceScan()
          }
          if (device && this.state.tick < 5) {
            dispositivos = [...dispositivos.filter(item => item.id !== device.id), device],
            tick = tick + 1
          }
          resolve(this.setState({dispositivos: dispositivos, escanenando: false}))
        })
    });
    let result = await promise
    return result
  }

  pesquisar = () => {
    this.teste()
    .finally(this.teste2())
  }

  teste2(){
    this.pegaMenor()
  }

  render() {
    return(null);
  }
}

export default Ble;
