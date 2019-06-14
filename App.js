import React, {Component} from 'react';
import {
      PermissionsAndroid,
      StyleSheet,
      Text,
      View,
      Alert,
      NativeModules,
      NativeEventEmitter,
      NativeAppEventEmitter,
      Button,
      Platform
    } from 'react-native';

import Permissions from 'react-native-permissions'
import AndroidOpenSettings from 'react-native-android-open-settings'

import Ble from './components/ble';
import Clock from './components/clock';
import Nomes from './components/nomes';
import Inf from './components/Inf';

export default class App extends Component {

  constructor(){
    super()
    this.state = {
      nomes: "",
      tempo: 10,
      sala: ''
    }
  }

  componentDidMount = () => {
    //Checking for the permission just after component loaded
     async function requestCameraPermission() {
       try {
         const permissao = await PermissionsAndroid.check( PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION );
         if(!permissao){
           const granted = await PermissionsAndroid.request(
             PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,{
               'title': 'Precisamos da sua localização',
               'message': ' Para funcinamento correto do app aceite a permissão '
             }
           )
           if (granted === PermissionsAndroid.RESULTS.GRANTED) {
             //To Check, If Permission is granted
             Alert.alert('', "Você pode usar o app");
           } else {
             Alert.alert(
              'O app não será funcional sem as permissões',
              'Deseja aceitar as permissões nas configurações?',
              [
                {
                  text: 'Cancel',
                  onPress: () => console.log('Cancel Pressed'),
                  style: 'cancel',
                },
                {
                  text: 'OK',
                  onPress: () => AndroidOpenSettings.appDetailsSettings()
                },
              ]);
           }
         }
       } catch (err) {
         alert("err",err);
         console.warn(err)
       }
     }
     if (Platform.OS === 'android') {
         requestCameraPermission();
     }else{
         alert('IOS device found');
     }
  }

  pegaPermissao = () => {
    Alert.alert(
      '',
      'Na proxima tela entre em permissões, ative a localização e volte ao app',
      [{
        text: 'Ok',
        onPress: () => AndroidOpenSettings.appDetailsSettings()
      }]
    )

  }


  pegaNomes = (obj) => {
    this.setState({nomes: obj})
  }

  pegaTempo = (tempo) => {
    this.setState({tempo: tempo})
  }


  render() {
    const {tempo, sala} = this.state
    return (

      <View style={{height:'100%'}}>
      <Clock pegaTempo={this.pegaTempo}/>
      <Ble pegaNomes={this.pegaNomes}/>
      <Nomes tempo={this.state.tempo} nomes={this.state.nomes}/>

        <View style={{
          width: '100%',
          height: 100,
          backgroundColor: '#EE5407',
          justifyContent: 'center',
          alignItems: 'center',
          position: 'absolute', //Here is the trick
          bottom: 0, //Here is the trick
        }}>
          <Text style={{fontSize: 30,fontWeight: 'bold'}}>
            Atualiza em: {tempo} segundos
          </Text>
        </View>
      </View>
    );
  }
}

// const styles = StyleSheet.create({
//
// });
