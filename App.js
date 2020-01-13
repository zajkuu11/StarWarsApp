import React, {Component} from 'react';
import {StyleSheet, Text, FlatList, TouchableHighlight} from 'react-native';
import {createStackNavigator} from 'react-navigation-stack';
import {createAppContainer} from 'react-navigation';
import Container from './Container';
import People from './People';
import Films from './Films';

const links = [
  {title: 'People'},
  {title: 'Films'},
  {title: 'StarShips'},
  {title: 'Vehicles'},
  {title: 'Species'},
  {title: 'Planets'},
];

class StarWars extends Component {
  static navigationOptions = {
    headerTitle: () => (
      <Text style={{fontSize: 32, color: 'rgb(255, 232, 31)'}}>Star Wars</Text>
    ),
    headerStyle: {backgroundColor: 'black', height: 110},
  };
  navigate = link => {
    const {navigate} = this.props.navigation;
    navigate(link);
  };
  renderItem = ({item, index}) => {
    return (
      <TouchableHighlight
        onPress={() => this.navigate(item.title)}
        style={[styles.item, {borderTopWidth: index === 0 ? 1 : null}]}>
        <Text style={styles.text}>{item.title}</Text>
      </TouchableHighlight>
    );
  };

  render() {
    return (
      <Container>
        <FlatList
          data={links}npx
          renderItem={this.renderItem}
          keyExtractor={item => item.title}
        />
      </Container>
    );
  }
}

const AppStack = createStackNavigator({
  StarWars: {
    screen: StarWars,
  },
  People: {
    screen: People,
  },
  Films: {
    screen: Films,
  },
});
const AppContainer = createAppContainer(AppStack);

const styles = StyleSheet.create({
  item: {
    padding: 20,
    justifyContent: 'center',
    borderColor: 'rgba(255,232,31, .2)',
    borderBottomWidth: 1,
  },
  text: {
    color: '#ffe81f',
    fontSize: 18,
  },
});

export default AppContainer;
