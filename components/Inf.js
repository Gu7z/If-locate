import React, {Component} from 'react';
import {
      Alert,
      Text,
      View,
      Button,
    } from 'react-native';

import moment from "moment";
import 'moment/locale/pt-br';

export default class Inf extends Component {
  constructor(props){
    super(props)
    state = {
      data: '',
      resultado: '',
      id: '',
      contador: 0
    }
    teste = "funciona"
    resultado = []
  }

  teste = async () => {
    await this.pegadados()
    return resultado
  }

  async pegadados(){
    await fetch('http://shaolinbackend.herokuapp.com/api/aulas')
      .then((res) => res.json().then(data => this.mostradados(data)))
  }

  mostradados = (res) => {
    resultado = []
    horaAt = moment().subtract(1, 'hour')
    hora = horaAt.format("HH:mm")
    dia = horaAt.format("dddd").slice(0, -6)
    for(i=0; i<= res.length-1; i++){
      horaInicio = moment(res[i].horaInicio, "HH:mm")
      horaFim = moment(res[i].horaFim, "HH:mm")
      entre = horaAt.isBetween(horaInicio , horaFim)
      if(entre && res[i].dia == dia){
        resultado = [...resultado, {
            sala: res[i].sala,
            turma: res[i].turma,
            materia: res[i].materia,
            prof: res[i].professor,
            inicio: res[i].horaInicio,
            fim: res[i].horaFim,
          }
        ]
      }
    }
  }

  procurasala = (res, sala) => {
    resultadoProcurasala = []
    ultimo=[]
    for(i=0; i<=sala.length-1; i++){
      for(j=0; j<=resultado.length-1; j++){
        if(sala[i] == resultado[j].sala){
          resultadoProcurasala = [...resultadoProcurasala, resultado[j]]
        }
      }
    }

    for(i=resultadoProcurasala.length-1; i>0; i--){
      if(resultadoProcurasala[i].materia == resultadoProcurasala[i-1].materia){
        resultadoProcurasala.splice(i-1, 1)
      }
    }

    console.log(resultadoProcurasala)

    return resultadoProcurasala
  }

  render(){
    return(null)
  }
}
