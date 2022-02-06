import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/AntDesign';

const ListaItensCompras = ({texto, id, checked, onRemove, onToggle}) => {
  const [sound, setSound] = React.useState();

  async function playSound() {
    const { sound } = await Audio.Sound.createAsync(
       require('../assets/soundEffect.mp3')
    );
    setSound(sound);

    await sound.playAsync(); }

  React.useEffect(() => {
    return sound
      ? () => {
          sound.unloadAsync(); }
      : undefined;
  }, [sound]);

  return (
    <View style={styles.container}>

      {/* Checkbox */}
      <TouchableOpacity onPressOut={onToggle(id)}>
        {checked ? (
          <View style={styles.quadradoCompleto} >
            <Icon name="checksquare" size={26} color="#3FAF47" />
          </View>
        ) : (
          <View style={styles.quadrado}/>
        )}  
      </TouchableOpacity>

      {/* Titulo do item */}
      <Text
        style={[
          styles.texto,
          checked ? styles.textoRiscado : styles.textoNormal,
        ]}>
        {texto}
      </Text>
      
      {/* Botão para deletar item */}
      <View style={styles.deletar} >	
				<TouchableOpacity style={styles.botaoDeletar} onPress={onRemove(id)}>
					<Text style={styles.textoBotaoDeletar}>X</Text>
				</TouchableOpacity>
			</View>
      

    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    fontFamily: 'Roboto',
    borderColor: '#e9e9e9',
    borderWidth: 0.5,
    width: '100%',
    height: 80,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 5
  },
  texto: {
    flex: 5,
    fontSize: 15,
    marginVertical: 20,
    width: 100,
    color: '#6E6E6E'
  },
  quadrado: {
    marginRight: 20,
    marginLeft: 20,
    width: 24,
    height: 24,
    backgroundColor:'#fff',
    borderColor: '#6E6E6E',
    borderWidth: 2,
    marginRight:15
  },

  quadradoCompleto: {
    marginRight: 20,
    marginLeft: 20,
  },
  textoRiscado: {
    color: '#3FAF47',  
    textDecorationLine: 'line-through',
  },
  textoNormal: {
    color: '#29323c',
  },
  deletar: {
		padding: 10
	},
	botaoDeletar: {
		width:20,
		height:20,
		backgroundColor: '#FF8888',
		borderRadius:10,
		justifyContent: 'center',
		alignItems: 'center'
	},

	textoBotaoDeletar: {
		fontSize: 5,
		color: '#fff'
	}

});

export default ListaItensCompras;