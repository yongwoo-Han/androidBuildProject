import React, { Component } from 'react';
import { Platform, SectionList, ActivityIndicator, AppRegistry, FlatList, StyleSheet, Text, View, ScrollView } from 'react-native';
import AreaPerformanceList from './component/AreaPerformanceList'; // 지역별 
import PeriodPerformanceList from './component/PeriodPerformanceList'; // 기간별 
import PublicPerformanceList from './component/PublicPerformanceList'; // 분야별 
import { Item, Icon, Input, Thumbnail, Separator, Container, Header, Tab, List, Tabs, TabHeading, ListItem, Left, Right, Body, Button } from 'native-base';
import Drawer from 'react-native-drawer'

export default class App extends Component {
  closeControlPanel = () => {
    this._drawer.close()
  };
  openControlPanel = () => {
    this._drawer.open()
  };

  render() {
    return(
      // <Drawer
      //   ref={(ref) => this._drawer = ref}
      //   content={<ControlPanel />}
      //   >
      //   <MainView />
      // </Drawer>
      <Container>
        <Header searchBar rounded>
          <Item>
            <Icon name="ios-search" />
            <Input placeholder="Search" />
            <Icon name="ios-people" />
          </Item>
          <Button transparent>
            <Text>Search</Text>
          </Button>
        </Header>
        <Tabs>
          <Tab heading={ <TabHeading><Text>지역별</Text></TabHeading>}>
            <AreaPerformanceList/>
          </Tab>
          <Tab heading={ <TabHeading><Text>기간별</Text></TabHeading>}>
            <PeriodPerformanceList />
          </Tab>
          <Tab heading={ <TabHeading><Text>분야별</Text></TabHeading>}>
            <PublicPerformanceList />
          </Tab>
        </Tabs>
      </Container>
    );
  }
}

// skip this line if using Create React Native App
// AppRegistry.registerComponent('simplePerformanceProject', () => withNavigation(App));