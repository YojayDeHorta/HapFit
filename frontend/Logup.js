import React from 'react';
import { StyleSheet, 
    Text, 
    View,
    TextInput, 
    Image, 
    ImageBackground, 
    TouchableOpacity } from 'react-native';
import urlImage from './assets/backgroundFit.jpg';
import { LinearGradient } from 'expo-linear-gradient';

export default function Logup({navigation}) {
    return ( 
        <View style={styles.container}>
      
      <ImageBackground style={ styles.imgBackground } 
                        source={ urlImage } 
                        resizeMode='contain'>
        <LinearGradient
          colors={['rgb(255,255,255)', 'transparent']}
          locations={[0.17, 1.0]}
          style={ styles.degradeUp }
        />

        <View style={styles.containerLogup}>
          <Text style={styles.tittle}>Registrate</Text>
          <Text style={styles.subTittle}>Ingresa tus datos para crear una cuenta</Text>
          <TextInput style={styles.input} placeholder='Nombre completo' />
          <TextInput style={styles.input} placeholder='Correo' />
          <TextInput style={styles.input} placeholder='Contraseña' />
          <TouchableOpacity style={styles.buttonLogup}>
            <Text style={styles.textButtonLogup}>ACEPTAR</Text>
          </TouchableOpacity>
        </View>

        

        <LinearGradient
          colors={['transparent', 'rgb(255,255,255)']}
          locations={[0.0, 0.92]}
          style={ styles.degradeDown }
        />
      </ImageBackground>
      
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    position: 'relative',
  },
  logo: {
    height: 70,
    width: 300,
  },
  imgBackground: {
    width: '100%',
    height: '100%',
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
  },
  degradeUp: {
    position: 'absolute',
    height: '30%',
    width: '100%',
    zIndex: 10,
    top: 0,
  },
  degradeDown: {
    position: 'absolute',
    height: '30%',
    width: '100%',
    zIndex: 2,
    bottom: 0,
  },
  containerLogup: {
    flex: 0,
    alignItems: 'center',
    justifyContent: 'center',
    width: '90%',
    paddingTop: 50,
    paddingBottom: 50,
    backgroundColor: 'white',
    shadowColor: 'black',
    shadowOpacity: 0.2,
    shadowRadius: 10,
    elevation: 3,
    shadowOffset: {
      width: 0,
      height: 4,
    },
    zIndex: 4,
  },
  tittle: {
    fontSize: 44,
    fontFamily: 'sans-serif-medium',
    fontWeight: 'bold',
    color: '#444444',
  },
  subTittle: {
    fontFamily: 'sans-serif-medium',
    color: '#696969',
    marginBottom: 30,
  },
  input: {
    width: '80%',
    padding: 6,
    margin: 10,
    fontSize: 17,
    borderBottomWidth: 1,
    borderBottomColor: 'black',
    backgroundColor: '#F9F9F9',
    paddingStart: 14,
  },  
  buttonLogup: {
    alignItems: "center",
    padding: 10,
    width: '80%',
    borderColor: '#E42256',
    borderWidth: 5,
    borderRadius: 30,
    marginTop: 50,
  },
  textButtonLogup: {
    color: '#E42256',
    fontSize: 22,
    fontWeight: 'bold',
  },
});