import React, { Component } from 'react';
import { ActivityIndicator, AppRegistry, FlatList, StyleSheet, Text, View } from 'react-native';
import { List, ListItem } from "react-native-elements";
import searchDetailItemInfo from './component/searchDetailItemInfo';
import { withNavigation, createStackNavigator, createAppContainer } from 'react-navigation';

class FlatListBasics extends Component {

  static navigationOptions = {
    title: '지역별',
  };

  constructor(props){
    super(props);
    this.state = {isLoading : true, dataSource : {}}
  }

  componentDidMount=()=>{
    return fetch('http://localhost:8080/api/searchPerformanceList')
    .then((response)=>response.json())
    .then((responseJson)=>{
      this.setState({
        isLoading: false,
        dataSource: responseJson.body.msgData
      });
    }).catch((error)=>{
        throw error;
    });
  }

  render() {
    const {perforList} = this.state.dataSource;
    const onPressFunc = (item) => {
      this.props.navigation.navigate('searchDetailItemInfo', {item: item});
    }

    if(this.state.isLoading){
        return (<ActivityIndicator style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}/>)
    }

    return (
      <View style={{flex: 1, paddingTop:20, flexDirection: 'row'}}>
        <FlatList
          data={perforList}
          renderItem={({item}) => (
            <ListItem
              roundAvatar
              title={item.title}
              subtitle={item.place}
              avatar={{uri: item.thumbnail}}
              containerStyle={{borderBottomWidth: 0}}
              button onPress={()=>{onPressFunc({item})}}
            />
          )}
          keyExtractor={(item,index) => index.toString()}
        />
      </View>
    );
  }
}

// export default withNavigation(FlatListBasics);

const styles = StyleSheet.create({
  container: {
   flex: 1,
   paddingTop: 22
  },
  item: {
    padding: 10,
    fontSize: 18,
    height: 44,
  },
})

const RootStack = createStackNavigator({
  geoScreen: FlatListBasics,
  searchDetailItemInfo: searchDetailItemInfo
});

const AppContainer = createAppContainer(RootStack);

export default class App extends Component {
  render() {
    return <AppContainer/>
  }
}

// skip this line if using Create React Native App
AppRegistry.registerComponent('simplePerformanceProject', () => withNavigation(FlatListBasics));