import React, {useState} from 'react';
import {StyleSheet, TextInput, Text, View, TouchableOpacity} from 'react-native';
import { Audio } from 'expo-av';

const CadastroCompras = ({ onAddItem }) => {
  const [newItemCompra, setNewItemCompra] = useState('');

  const itemInputHandler = newItem => {
    setNewItemCompra(newItem);
  };

  const addItemHandler = () => {
    onAddItem(newItemCompra);
    setNewItemCompra('');
  };

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
      
      <View style={styles.adicionarItemWrapper}>

        {/* Text Input para itens da compra */}
        <TextInput 
          style={styles.input} 
          placeholder={'Novo item da lista'} 
          autoCorrect={false}
          onChangeText={itemInputHandler}
          value={newItemCompra}
          autoCorrect={false}
        />

        {/* Botão para adicionar item */}
        <TouchableOpacity onPressIn={playSound} onPress={addItemHandler} >
          <View style={styles.botaoAdicionarItem}>
            <Text style={styles.TextoBotaoAdicionarItem}>+</Text>
          </View>
        </TouchableOpacity>
        
      </View>
  );
};

const styles = StyleSheet.create({
  adicionarItemWrapper: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    padding: 10,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: '#2980B9'
  },
  input: {
    paddingHorizontal: 10,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
    borderTopRightRadius:5,
    borderTopLeftRadius:5,
    width: 250,
    height: 40
  },
  botaoAdicionarItem: {
    width:70,
    height: 40,
    backgroundColor: '#fff',
    borderRadius:5,
    justifyContent: 'center',
    alignItems: 'center',
    color:'#000'
  },
  TextoBotaoAdicionarItem: {
    color:'#2980B9'
  }
});

export default CadastroCompras;