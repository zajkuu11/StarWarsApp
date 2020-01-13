/* eslint-disable no-unused-vars */
import React, {Component} from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableHighlight,
  ActivityIndicator,
  FlatList,
  Modal,
  Picker,
} from 'react-native';
import _ from 'lodash';
import Container from './Container';
import HomeWorld from './HomeWorld';
import People from './People';

export default class Films extends Component {
  state = {
    data: [],
    loading: true,
    modalVisible: false,
    gender: 'all',
    pickerVisible: false,
  };

  componentDidMount() {
    fetch('https://swapi.co/api/films/')
      .then(res => res.json())
      .then(json => this.setState({data: json.results, loading: false}))
      .catch(err => console.log('err', err));
  }

  renderItem = ({item}) => {
    return (
      <View style={styles.itemContainer}>
        <Text style={styles.title}>{item.title}</Text>
        <Text style={styles.info}>Director: {item.director}</Text>
        <Text style={styles.info}>Producer: {item.producer}</Text>
        <Text style={styles.info}>Release Date: {item.release_date}</Text>
        <TouchableHighlight
          style={styles.button}
          onPress={() => this.openPeople(item.people)}>
          <Text style={styles.info}>View Characters</Text>
        </TouchableHighlight>
      </View>
    );
  };

  openPeople = url => {
    this.setState({
      url,
      modalVisible: true,
    });
  };

  closeModal = () => {
    this.setState({modalVisible: false});
  };

  togglePicker = () => {
    this.setState({pickerVisible: !this.state.pickerVisible});
  };

  filter = gender => {
    this.setState({gender});
  };

  static navigationOptions = {
    headerTitle: 'Films',
    headerStyle: {
      borderBottomWidth: 1,
      borderBottomColor: '#ffe81f',
      backgroundColor: 'black',
    },
    headerTintColor: '#ffe81f',
    pressColor: 'white',
  };

  render() {
    let {data} = this.state;
    if (this.state.gender !== 'all') {
      data = data.filter(f => f.gender === this.state.gender);
    }
    return (
      <Container>
        {this.state.loading ? (
          <ActivityIndicator color="#ffe81f" />
        ) : (
          <FlatList
            data={data}
            keyExtractor={item => item.title}
            renderItem={this.renderItem}
          />
        )}
      </Container>
    );
  }
}

const styles = StyleSheet.create({
  pickerToggleContainer: {
    padding: 25,
    justifyContent: 'center',
    alignItems: 'center',
  },
  pickerToggle: {
    color: '#ffe81f',
  },
  pickerContainer: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    left: 0,
  },
  itemContainer: {
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#ffe81f',
  },
  title: {
    color: '#ffe81f',
    fontSize: 20,
  },
  info: {
    color: '#ffe81f',
    fontSize: 14,
    marginTop: 5,
  },
});
