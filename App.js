import React, {useState, useEffect} from 'react';
import {View, StyleSheet, Text, Alert, BackHandler} from 'react-native';
import CadastroCompras from './components/CadastroCompras';
import ListaCompras from './components/ListaCompras';
import { Audio } from 'expo-av';

const App = () => {
  const [sound, setSound] = React.useState();

  async function playSound() {
    const { sound } = await Audio.Sound.createAsync(
       require('./assets/soundEffect.mp3')
    );
    setSound(sound);

    await sound.playAsync(); }

  React.useEffect(() => {
    return sound
      ? () => {
          sound.unloadAsync(); }
      : undefined;
  }, [sound]);

  // itens: {id: Number, texto: string, checked: boolean }
  const [itens, setItens] = useState([]);

  const addItem = text => {
    setItens([
      ...itens,
      {id: Math.random().toString(), texto: text, checked: false},
    ]);
  };
  
  const onRemove = id => e => {
    return Alert.alert(
      "Tem certeza?",
      "Tem certeza que deseja excluir esse item?",
      [
        {
          text: "Sim",
          onPress: () => {
            playSound();
            setItens(itens.filter(item => item.id !== id));
          },
        },
        {
          text: "Não",
        },
      ]
    );
  };

  const onToggle = id => e => {
    setItens(
      itens.map(item =>
        item.id === id ? {...item, checked: !item.checked} : item,
      ),
    );
  };

  let checkedItens = itens.filter(item => item.checked).length;

  useEffect(() => {
    const backAction = () => {
      Alert.alert("Alerta!", "Deseja mesmo sair do app?", [
        {
          text: "Não",
          onPress: () => null,
          style: "cancel"
        },
        { text: "Sim", onPress: () => {
          BackHandler.exitApp()
          } 
        } 
      ]);
      return true;
    };

    const backHandler = BackHandler.addEventListener(
      "hardwareBackPress",
      backAction
    );

    return () => backHandler.remove();
  }, []);
  return (
    <View style={styles.container}>
      {/* Header*/}
      <View style={styles.header}> 
        <View style={styles.headerContainer}>

          <Text style={styles.textoHeader}>Lista de compras</Text>

          {/* Condição: Se existe itens, o contador é mostrado*/}
          {itens.length > 0 ? (
            <Text style={styles.textoHeader}>{checkedItens}/{itens.length}</Text>
          ): (
            <View />
          )} 
          
        </View>
      </View>

      {/* View caso não tenha nenhum item na lista */}
      <View>
        {itens.length == 0 ? (
          <View >
            <Text style={styles.semItens}>
              Nenhum item na lista
            </Text>
          </View>
        ) : (
          <View />
        )}  
      </View>

      {/* Componente: lista de itens */}
      <ListaCompras itens={itens} onRemove={onRemove} onToggle={onToggle} />
      
      {/* Componente: cadastro novos itens */}
      <CadastroCompras onAddItem={addItem}/>
    </View>

  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    fontFamily: 'Roboto'
  },
  headerContainer: {
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  header: {
    marginTop: 30,
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    backgroundColor: '#2980B9'
  },
  textoHeader: {
    fontFamily: 'Roboto',
    fontSize:20,
    color: '#fff',
    padding: 15
  },
  semItens: {
    alignSelf: 'center',
    color: '#6E6E6E',
    paddingVertical:20 
  }
});

export default App;