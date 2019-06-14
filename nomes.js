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
    console.log(this.state.final)
    id = data.index
    if(this.state.final[id] && this.state.final.length > 0){
      Alert.alert(
        this.state.final[id].sala,
        'Turma: ' + this.state.final[id].turma + '\n\n'  +
        'Matéria: ' + this.state.final[id].materia + '\n\n'  +
        'Professor(a): ' + this.state.final[id].prof + '\n\n'+
        'Inicia as: ' + this.state.final[id].inicio + '\n\n'+
        'Termina as: ' + this.state.final[id].fim,
        [
          {text: 'Ok'}
        ]
      )
    }else{
      Alert.alert(
        '','Não está tendo aula nesta sala no momento',
        [
          {text: 'ok'}
        ]
      )
    }
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
                  <Text onPress={()=> this.alerta({index})} style={{
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
