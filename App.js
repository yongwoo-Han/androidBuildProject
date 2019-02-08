import React, { Component } from 'react';
import { Platform, SectionList, ActivityIndicator, AppRegistry, FlatList, StyleSheet, Text, View, ScrollView } from 'react-native';
import SearchDetailItemInfo from './component/SearchDetailItemInfo';
import AreaPerformanceList from './component/AreaPerformanceList'; // 지역별 
import PeriodPerformanceList from './component/PeriodPerformanceList'; // 기간별 
import PublicPerformanceList from './component/PublicPerformanceList'; // 분야별 
import { Thumbnail, Separator, Container, Header, Tab, List, Tabs, TabHeading, ListItem, Left, Right, Body, Button } from 'native-base';
// import { ScrollView } from 'react-native-gesture-handler';

export default class App extends Component {
  render() {
    return(
      <Container>
        <Header/>
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