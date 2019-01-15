import React, { Component } from 'react';
import { StyleSheet, Image, WebView ,ActivityIndicator, View, ScrollView, Dimensions, Text} from 'react-native';
import HTML from 'react-native-render-html';

/**
 * 기간/지역별 등 리스트에서 클릭 시 들어온 데이터 상세
 */
export default class searchDetailItemInfo extends Component {

    static navigationOptions = {
        title: '상세정보',
    };

    constructor(props) {
        super(props);
        this.state = {isLoading : false, item : this.props.navigation.state.params.item, datasource:{}} //리스트 클릭시 상세 정보
        console.log('next : ------------------------ ' + this.state.item.seq);
    }

    componentDidMount = ()=>{

        const data = new FormData();
        const {item} = this.state.item;
        data.append('seq',item.seq);

        // 공연/전시 상세 정보 호출
        return fetch('http://172.30.1.30:8080/api/searchPerformanceInfo',{
            method: 'POST',
            body:data
        })
        .then((response)=>response.json())
        .then((responseJson)=>{
            console.log("contents 1: ------" + responseJson);
            this.setState({
                isLoading: true,
                datasource: responseJson.body.msgData.perforInfo,
                // contents : responseJson.body.msgData.perforInfo.contents1.replace(/\n/g, ""),
                ...this.state.item
            });
        }).catch((error)=>{
            console.log(error.message);
            throw error;
        });
      }

    render(){
        
        if(!this.state.isLoading){
            <View style={{flex: 1, padding: 20}}>
              <ActivityIndicator/>
            </View>
        }

        const items = this.state.datasource;
        const {contents1} = this.state.datasource;
        let inputStartDate = new Date(items.startDate).parse();
        let startDate = inputStartDate.format('yyyy-MM-dd');
        // let endDate = new Date(items.endDate).format('yyyy-MM-dd');

        renderers: {
            contents1: () => <View style={{ width: '100%', height: 1, justifyContent: 'center', alignItems: 'center'}} />
        }

        return(
            <ScrollView
                contentContainerStyle={{
                flex: 1,
                justifyContent: 'space-between',
                flexDirection: 'column',
                }}>
            <View style={{borderBottomColor: 'gray', borderBottomWidth: 0.2, margin:10, padding:10}}>
                <Text style={{fontSize: 18, fontWeight: 'bold'}}>{items.title}</Text>
            </View>
            <View style={{alignItems: 'center'}}>
              <Image 
                style={{
                  resizeMode:'contain',
                  width: 200,
                  height: 200,
                }}
                source={{uri: items.imgUrl}}
                />
            </View>
            <View style={{flex:1, flexDirection:'row', justifyContent: 'center'}}>
              <View style={{padding: 10,  border: 1, borderLeftColor: 'black'}}>
                <Text style={{fontWeight: 'bold', fontSize: 15 }}>공연기간</Text>
                <Text style={{fontWeight: 'bold', fontSize: 15 }}>시간</Text>
                <Text style={{fontWeight: 'bold', fontSize: 15 }}>장소</Text>
                <Text style={{fontWeight: 'bold', fontSize: 15 }}>러닝타임</Text>
                <Text style={{fontWeight: 'bold', fontSize: 15 }}>연령</Text>
                <Text style={{fontWeight: 'bold', fontSize: 15 }}>주최</Text>
                <Text style={{fontWeight: 'bold', fontSize: 15 }}>관람료</Text>
                <Text style={{fontWeight: 'bold', fontSize: 15 }}>문의</Text>
              </View>
              <View style={{padding: 10}}>
                <Text>{startDate}</Text>
                <Text>2019년 01월 11일</Text>
              </View>
            </View>
            <View style={{width: 50, height: 50, backgroundColor: 'steelblue'}}>
            
            </View>
          </ScrollView>
        );
    }
}

/**
 * 스타일 정의
 */
const styles = StyleSheet.create({
    
    container :{
        // flex: 1,
        alignItems: 'center',
        flexDirection: 'column',
        // marginVertical: 5,
        margin: 20,
    }
    ,avatar:{
        flex: 1,
        height: 50,
        width: 50,
        margin: 20,
        padding: 20,
        resizeMode:'contain'
    }
    ,detailImage: {
        // flex: 1
        // ,width: '100%'
        // ,alignItems: 'center'
    }
    
});

