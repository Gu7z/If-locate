import React, { Component } from 'react';
import {
      PermissionsAndroid,
      Text,
      View,
      Alert,
      ToastAndroid,
      Button,
      FlatList
    } from 'react-native';

import Inf from './Inf';

class Nomes extends Component {

  constructor(props){
    super(props)
    this.state = {
      lista: [
        {'nome': 'Sala 4', 'mac': 'B8:27:EB:80:AB:8D'},
        {'nome': 'Lab B', 'mac': 'B8:27:EB:DF:6E:D7'},
      ],
      nome: [],
      aguardando: true, // inverter (do else tb) e retirar sala da flatlist e por lista
      desativa: true,
      resultado: [],
      final: []
    }
    inf = new Inf()
  }

  componentWillReceiveProps(nextprops){
    let nomes_pros = nextprops
    if(nomes_pros.nomes.length > 0){
      this.truorfal(true, nomes_pros)
    }else {
      this.truorfal(false, nomes_pros)
    }
  }

  truorfal = (bool, nomes_pros) => {
    let nomes = []
    if (nomes_pros.tempo == 10){
      if(bool){
        nomes_pros.nomes.map(id => {
          this.state.lista.map(mac => {
            if (id == mac.mac){
              nomes = [...nomes.filter(nome => nome != mac.nome), mac.nome]
            }
            // else{
            //   nomes = [...nomes.filter(nome => nome != id), id]
            // }
          })
        })
        this.setState({nome: nomes, aguardando: false})
        this.teste()
      }else{
        this.setState({nome: [], aguardando: true})
      }
    }
  }

  teste(){
    inf.teste().then(
      data => this.setState({final: inf.procurasala(data, this.state.nome)})
    )
  }

  // desativa = (id, final) => {
  //   this.setState({desativa: false, final: [...this.state.final.filter(data => data != final), final]})
  // }

  // result=(resultado)=>{
  //   this.setState({resultado: resultado})
  // }

  alerta(data){
    this.state.final.map(aula => {
      if(aula.sala == data.item && this.state.final.length > 0){
          Alert.alert(
            aula.sala,
            'Turma: ' + aula.turma + '\n\n'  +
            'Matéria: ' + aula.materia + '\n\n'  +
            'Professor(a): ' + aula.prof + '\n\n'+
            'Inicia as: ' + aula.inicio + '\n\n'+
            'Termina as: ' + aula.fim,
            [
              {text: 'Ok'}
            ]
          )
      }
    })
  }

  render(){
    const {nome, final, lista, theme, aguardando, desativa} = this.state
    return(
      <View>
      {
        aguardando ? (
            <Text style={{ alignSelf:'center', paddingTop:'5%' }}>Aguardando</Text>
        ) : (
          <View>
            <FlatList
              keyExtractor={(item, index) => index.toString()}
              data={nome}
              extraData={this.state}
              renderItem={({item, index}) =>
                <View>
                  <Text onPress={()=> this.alerta({item})} style={{
                      alignSelf:'center',
                      paddingTop:'5%',
                      marginBottom: '5%'
                    }}>
                    {item}
                  </Text>
                </View>
              }
            />
          </View>
        )
      }

      </View>
    )
  }
}

export default Nomes;
