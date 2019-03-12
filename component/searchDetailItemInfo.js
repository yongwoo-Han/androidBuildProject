import React, { Component } from 'react';
import { PixelRatio, StyleSheet, Image, WebView ,ActivityIndicator, View, ScrollView, Dimensions, Text} from 'react-native';
import HTML from 'react-native-render-html';
import ExpanableList from 'react-native-expandable-section-list';

var DomParser = require('react-native-html-parser').DOMParser;

const dimensions = Dimensions.get('window');
const imageHeight = dimensions.width;
const imageWidth = dimensions.width;


/**
 * 기간/지역별 등 리스트에서 클릭 시 들어온 데이터 상세
 */
export default class searchDetailItemInfo extends Component {

    static navigationOptions = {
        title: '상세정보',
    };
    
    constructor(props) {
        super(props);
        this.state = {isLoading : true, item : this.props.navigation.state.params.item, perforInfo:{}} //리스트 클릭시 상세 정보
        console.log(this.state.item.seq);
    }

    componentDidMount = () =>{
        const data = new FormData();
        data.append('seq',this.state.item.seq);

        // 공연/전시 상세 정보 호출
        return fetch('http://192.168.43.23:8080/api/searchPerformanceInfo',{
            method: 'POST',
            body:data
        })
        .then((response)=>response.json())
        .then((responseJson)=>{
            console.log("contents 1: ------" + responseJson);
            let htmlImage = new DomParser().parseFromString(responseJson.body.msgData.perforInfo.contents1,'text/html');
            let attributes = htmlImage.querySelect('img')[0].attributes;
           
            // HTML 이미지 소스 추출
            for(var i=0 ; i < attributes.length; i++){
                if(attributes[i].nodeName == 'src') {
                    responseJson.body.msgData.perforInfo.contents1 = attributes[i].nodeValue
                }
            }

            console.log(responseJson.body.msgData.perforInfo.contents1);
            console.log(responseJson.body.msgData.perforInfo.imgUrl);

            // console.log("width : ---------------- " + Dimensions.get(window).width);

            this.setState({
                isLoading: false,
                perforInfo: responseJson.body.msgData.perforInfo,
                ...this.state.item
            });

        }).catch((error)=>{
            console.log(error.message);
            throw error;
        });
      }

    render(){
        
        if(this.state.isLoading){
            return (<ActivityIndicator style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}/>)
        }
        const {perforInfo} = this.state;
        const width = Dimensions.get('window').width;
        const height = Dimensions.get('window').height;

        // const imageHeight = Math.round(height * 9 / 16);
        // const imageWidth = width;
        
        return(
            <ScrollView>
            <View style={{borderBottomColor: 'gray', borderBottomWidth: 0.2, margin:10, padding:10}}>
                <Text style={{fontSize: 18, fontWeight: 'bold'}}>{perforInfo.title}</Text>
            </View>
            <View style={{alignItems: 'center'}}>
              <Image 
                style={{
                  resizeMode:'contain',
                  width: 200,
                  height: 200,
                }}
                source={{uri: perforInfo.imgUrl}}
                />
            </View>
            <View style={{flex:1, flexDirection:'row', justifyContent: 'center'}}>
              <View style={{padding: 10,  border: 1, borderLeftColor: 'black'}}>
                <Text style={{fontWeight: 'bold', fontSize: 10 }}>공연기간</Text>
                <Text style={{fontWeight: 'bold', fontSize: 10 }}>시간</Text>
                {/* <Text style={{fontWeight: 'bold', fontSize: 15 }}>장소</Text>
                <Text style={{fontWeight: 'bold', fontSize: 15 }}>러닝타임</Text>
                <Text style={{fontWeight: 'bold', fontSize: 15 }}>연령</Text>
                <Text style={{fontWeight: 'bold', fontSize: 15 }}>주최</Text>
                <Text style={{fontWeight: 'bold', fontSize: 15 }}>관람료</Text>
                <Text style={{fontWeight: 'bold', fontSize: 15 }}>문의</Text> */}
              </View>
              <View style={{padding: 10}}>
                <Text>{perforInfo.startDate} ~ {perforInfo.endDate}</Text>
                <Text></Text>
              </View>
            </View>
            <View style={{alignItems: 'center'}}>
              <Image 
                style={{resizeMode: 'cover', flex: 1, width:imageWidth, height:1500}}
                source={{uri: perforInfo.contents1, isStatic: true}}
                resizeMode='cover'
                />
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

