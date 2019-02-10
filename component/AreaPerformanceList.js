/**
 * 지역별공연/전시목록조회 
 */
import React, { Component } from 'react';
import { TouchableOpacity, Platform, SectionList, ActivityIndicator, AppRegistry, FlatList, StyleSheet, Text, View, ScrollView } from 'react-native';
import SearchDetailItemInfo from './SearchDetailItemInfo';

import { withNavigation, createStackNavigator, createAppContainer } from 'react-navigation';
import {Collapse,CollapseHeader, CollapseBody, AccordionList} from 'accordion-collapse-react-native';
import { Thumbnail, Separator, Tab, List, Tabs, TabHeading, ListItem, Left, Right, Body, Button } from 'native-base';
import Icon from 'react-native-vector-icons/FontAwesome';

var bodyList = [];

class AreaPerformanceList extends Component {

    static navigationOptions = {
      title: '지역별',
    };
    
    constructor(props){
      super(props);
      this.state = {isLoading : true, dataSource : {}, _body : []}
    }
  
    componentDidMount=()=>{
      return fetch('http://172.30.1.30:8080/api/searchPerformanceList')
      .then((response)=>response.json())
      .then((responseJson)=>{
        this.setState({
          isLoading: false,
          dataSource: responseJson.body.msgData,
        })
       
        var resultData = responseJson.body.msgData.perforList.sort((a, b) => {
          return a.area > b.area ? -1 : b.area > a.area ? 1 : 0;
        });
  
        this.setState({...this.state, _body: this._responseBodyDataSet(resultData)});
      }).catch((error)=>{
          throw error;
      });
    }
  
    _responseBodyDataSet = (resultData) => {
  
      var obj = {};
      var body = [];
  
      for(var i = 0 ; i < resultData.length; i++) {
        let data = resultData[i];
        
        if(resultData[i+1] != null) {
          if(resultData[i].area === resultData[i+1].area) {
            body.push(data);
          } else {
            body.push(data);
            obj[resultData[i].area] = body;
            bodyList.push(obj);
  
            obj = {};
            body = [];
          }
          continue;
        } else if(resultData[i].area !== null && resultData[i].area !== "") {
            body.push(data);
            obj[resultData[i].area] = body;
            bodyList.push(obj);
        }
      }
      return bodyList;
    }
  
    _bodyFunc = (data) => {
      var dataList = Object.values(data);
      let returnValue = [];
  
      for(let i = 0 ; i < dataList[0].length ; i++) {
        let _data = Object.values(dataList[0])[i];
        returnValue.push(
            <ListItem thumbnail key={_data.seq}>
                <Left>
                    <Thumbnail square source={{ uri: _data.thumbnail }} />
                </Left>
                <Body>
                    <TouchableOpacity onPress={()=>{this._onPressFunc({_data})}}>
                        <Text>{_data.title}</Text>
                        <Text note numberOfLines={1}>{_data.place}</Text>
                    </TouchableOpacity>
                </Body>
                <Right>
                    <Button transparent 
                    onPress={()=>{this._onPressFunc({_data})}}>
                    <Icon name="arrow-right" size={20}/>
                    </Button>
                </Right>
            </ListItem>
         );
      }
      return returnValue;
    }
  
    _onPressFunc = (item) => {
      console.log(item._data);
      this.props.navigation.navigate('SearchDetailItemInfo', {item: item._data});
    }
  
    render() {
      const {_body} = this.state;
  
      if(this.state.isLoading){
          return (<ActivityIndicator style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}/>)
      }
  
      return (
        <View>
         <ScrollView contentContainerStyle={styles.contentContainer}>
          {
            _body.map((data, i) => {
              return (
              <Collapse key={i}>
                <CollapseHeader >
                  <Separator bordered>
                    <Text>{Object.keys(data)}</Text>
                  </Separator>
                </CollapseHeader>
                <CollapseBody>
                  {this._bodyFunc(data)}
                </CollapseBody>
              </Collapse>
              );
            })
          }
          </ScrollView>
        </View>
      );
    }
  }

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
    contentContainer: {
      paddingVertical: 20
    }
  })

  const RootStack = createStackNavigator({
    geoScreen: AreaPerformanceList,
    SearchDetailItemInfo: SearchDetailItemInfo
  });
  
  const AppContainer = createAppContainer(RootStack);

  export default class AreaMain extends Component{
    render() {
        return(
            <AppContainer/>
        );
    }
  }

  
  AppRegistry.registerComponent('simplePerformanceProject', () => withNavigation(AreaMain));
