import React from 'react';
import {StyleSheet, ScrollView} from 'react-native';
import ListaItensCompras from './ListaItensCompras.js';

const ListaCompras = ({ itens, onRemove, onToggle }) => {
  return (

  	<ScrollView contentContainerStyle={styles.listContainer}>
      {itens.map(item => (
        <ListaItensCompras 
          key={item.id} 
          {...item}
          onRemove={onRemove} 
          onToggle={onToggle}
        />
      ))}
    </ScrollView>

  );
};

const styles = StyleSheet.create({
  listContainer: {
    fontFamily: 'Roboto',
    alignItems: 'center',
  },
});

export default ListaCompras;