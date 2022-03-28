import React from 'react';
import { StyleSheet, 
    Text, 
    View, 
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
  buttonLogup: {
    alignItems: "center",
    padding: 10,
    width: '100%',
    borderColor: '#E42256',
    borderWidth: 5,
    borderRadius: 30,
    marginTop: 20,
  },
  textButtonLogup: {
    color: '#E42256',
    fontSize: 24,
  },
});