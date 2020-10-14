/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import { StyleSheet, NativeModules, SafeAreaView, Text, View, Image, 
  TouchableOpacity, PermissionsAndroid, Platform, Button, TextInput, 
  ImageBackground} from 'react-native';
//import Block from './Block';


calcSalary = (selectMilitary, Savings) => {
  //월급계산하는 함수
  //selectMilitary: 0:육군 1:해군 2:공군 3:해병대
  //Savings: 한달에 넣는 적금

  let sumOfMoney = 0;
  let savingMoney = 0;
  let privateSalary = 408100;
  let firstprivateSalary = 441700;
  let corporalSalary = 488200;
  let sergeantSalary = 540900;
  let text1 = '총';
  if (selectMilitary==0 || selectMilitary==3){
    sumOfMoney=(privateSalary*2) + (firstprivateSalary*6) + (corporalSalary*6) + (sergeantSalary*4);
    savingMoney = (Savings*18) * ((0.05*19)/24);
    sumOfMoney+=savingMoney;
  }
  else if(selectMilitary == 1){
    sumOfMoney=(privateSalary*2) + (firstprivateSalary*6) + (corporalSalary*6) + (sergeantSalary*6);
    savingMoney = (Savings*20) * ((0.05*21)/24);
    sumOfMoney+=savingMoney;
  }
  else{
    sumOfMoney=(privateSalary*2) + (firstprivateSalary*6) + (corporalSalary*6) + (sergeantSalary*7);
    savingMoney = (Savings*21) * ((0.05*22)/24);
    sumOfMoney+=savingMoney;
  }
  sumOfMoney=String(sumOfMoney);
  var result = text1.concat(" ", sumOfMoney," 을 받습니다.");


  return result
}

// 개발용 화면
class HomeScreen extends React.Component {
  /*
  여기에 함수를 추가해서 버튼을 누르면 권한 허용에 대해서 permission을 받아와 다음 화면으로 넘어가도록 설정해야 함.
  */
    render() {
      return (
        <View style={styles.container}>
          <View style={styles.markArea}>
            <Image source={require('./images/ROKAmark.png')}/>
          </View>
          <View style={styles.appNameArea}>
            <Text style={styles.appNameText}>
              LOCKA
            </Text>
          </View>
          <View style={styles.view}>
            <TouchableOpacity style={styles.button} onPress={() => NativeModules.Block.startService()}>
              <Text>Start</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button} onPress={() => NativeModules.Block.stopService()}>
              <Text>Stop</Text>
            </TouchableOpacity>
          </View>
          <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <Text>Lock Army</Text>
            <Button
              title = '전역/월급계산'
              onPress = {()=>this.props.navigation.navigate('Calc')}
              onPress = {()=>this.props.navigation.navigate('Calc')}
            />
            <Button
              title = 'Login'
              onPress = {()=>this.props.navigation.navigate('Login')}
              onPress = {()=>this.props.navigation.navigate('Login')}  
            />
          </View>
        </View>  
    );
  }
}

// 어플 처음 실행시 등장. 인증번호 입력 화면
class LoginScreen extends React.Component{

  // 상단의 toolbar 가리기
  static navigationOptions = {
    header: null ,
  };

  render(){
    return(
      <View style={styles.newContainer}>
        <ImageBackground
          style={{width: '100%', height: '100%'}}
          source={require('./images/CommonB.png')}>
          <View style={styles.delLoc}>
            <TouchableOpacity style={styles.delBtn} 
            // 추후 삭제기능으로 연결해야함
            onPress = {()=>this.props.navigation.navigate('Main')}>
              <Text style={styles.delWord}>삭제</Text>
            </TouchableOpacity>
          </View>  
          <View style={{flex: 2.4}}/>
          <View style={styles.codeSec}>
            <TextInput style={styles.chatInput} 
            defaultValue='인증번호를 입력해주세요'/>
          </View>
          <View style={{flex: 0.4}}/>
          <View style={styles.codeSec}>
            <TouchableOpacity style={styles.accessBtn} 
            // 추후 인증번호 확인하고 넘어가야함
            onPress = {()=>this.props.navigation.navigate('Permission')}>
              <Text style={styles.accessWord}>인증하기</Text>
            </TouchableOpacity>
          </View> 
          <View style={{flex: 0.6}}/>
        </ImageBackground>
      </View>  
    );
  }
}

// 인증번호 입력시 등장. 권한 설명 및 요청 화면
class PermissionScreen extends React.Component{

  // 상단의 toolbar 가리기
  static navigationOptions = {
    header: null ,
  };

  render(){
    return(
      <View style={styles.newContainer}>
        <ImageBackground
          style={{width: '100%', height: '100%'}}
          source={require('./images/CommonB.png')}>
          <View style={styles.delLoc}>
            <TouchableOpacity style={styles.delBtn} 
            // 추후 삭제기능으로 연결해야함
            onPress = {()=>this.props.navigation.navigate('Main')}>
              <Text style={styles.delWord}>삭제</Text>
            </TouchableOpacity>
          </View>     
          <View style={{flex: 1.7}}/>
          <View style={styles.textArea}>
            <View style={styles.textArea2}>
              <Text style={styles.h1Text}>
                어플기능
              </Text>
              <Text style={styles.h3Text}>
                LOCKA 어플리케이션은 핸드폰 비대면 반납을 지원합니다.
              </Text>
            </View>
          </View>
          <View style={styles.textArea}>
            <View style={styles.textArea2}>
              <Text style={styles.h1Text}>
                요구권한
              </Text>
              <Text style={styles.h2Text}>
              * 내 동작 확인
              </Text>
              <Text style={styles.h3Text}>
              앱을 제어하는 중에 알림을 받습니다.
              </Text>
              <Text style={styles.h2Text}>
              * 컨텐츠 가져오기
              </Text>
              <Text style={styles.h3Text}>
              사용 중인 화면에서 원하는 컨텐츠를 가져올 수 있습니다.
              </Text>
            </View>
          </View>
          <View style={{flex: 0.5}}/>
          <View style={styles.codeSec}>
            <TouchableOpacity style={styles.accessBtn} 
            // 추후 권한 요청 후 LobbyScreen으로 넘어가야함
            onPress = {()=>this.props.navigation.navigate('Lobby')}>
              <Text style={styles.accessWord}>권한 요청하기</Text>
            </TouchableOpacity>
          </View>
          <View style={{flex: 0.5}}/>
        </ImageBackground>
      </View>
    );
  }
}

// 권한 받은 후, 어플의 메인 화면
class LobbyScreen extends React.Component {

  // 상단의 toolbar 가리기
  static navigationOptions = {
    header: null ,
  };

  render(){
    return(
      <View style={styles.newContainer}>
        <ImageBackground
          style={{width: '100%', height: '100%'}}
          source={require('./images/MainB.png')}>
          <View style={styles.delLoc}>
            <TouchableOpacity style={styles.delBtn} 
            // 추후 삭제기능으로 연결해야함
            onPress = {()=>this.props.navigation.navigate('Main')}>
              <Text style={styles.delWord}>삭제</Text>
            </TouchableOpacity>
          </View>
          <View style={{flex: 0.7}}/>
          <View 
          // 이 View에 시계 넣어주시면 됩니다.-----------------------------------
          style={{flex: 1.1}}
          //-------------------------------------------------------------------
          />
          <View style={{flex: 0.7}}/>
          <View style={styles.codeSec}>
            <View style={styles.curstatus}>
              <Text style={{fontWeight: 'bold', fontSize: 15}}>
                현재 상태가 게시됩니다.
              </Text>
            </View>
          </View>
          <View style={{flex: 0.3}}/>
          <View style={{flex: 1.4}}>
            <View style={styles.buttonGroup}>
              <View style={styles.buttonBlock8}>
                <TouchableOpacity
                // 추후 버튼 별 기능 실행해야함
                onPress = {()=>this.props.navigation.navigate('Main')}>
                  <Image 
                  // 상단 좌측 아이콘
                  resizeMode="contain"
                  style={styles.iconStyle}
                  source = {require('./images/TempImage.png')} />
                </TouchableOpacity>
                <TouchableOpacity
                // 추후 버튼 별 기능 실행해야함
                onPress = {()=>this.props.navigation.navigate('Main')}>
                  <Image 
                  // 상단 좌측 아이콘
                  resizeMode="contain"
                  style={styles.iconStyle}
                  source = {require('./images/TempImage.png')} />
                </TouchableOpacity>
              </View>
              <View style={styles.buttonBlock8}>
              <TouchableOpacity
                // 추후 버튼 별 기능 실행해야함
                onPress = {()=>this.props.navigation.navigate('Main')}>
                  <Image 
                  // 상단 좌측 아이콘
                  resizeMode="contain"
                  style={styles.iconStyle}
                  source = {require('./images/TempImage.png')} />
                </TouchableOpacity>
                <TouchableOpacity
                // 추후 버튼 별 기능 실행해야함
                onPress = {()=>this.props.navigation.navigate('Main')}>
                  <Image 
                  // 상단 좌측 아이콘
                  resizeMode="contain"
                  style={styles.iconStyle}
                  source = {require('./images/TempImage.png')} />
                </TouchableOpacity>
              </View>
              <View style={styles.buttonBlock8}>
              <TouchableOpacity
                // 추후 버튼 별 기능 실행해야함
                onPress = {()=>this.props.navigation.navigate('Main')}>
                  <Image 
                  // 상단 좌측 아이콘
                  resizeMode="contain"
                  style={styles.iconStyle}
                  source = {require('./images/TempImage.png')} />
                </TouchableOpacity>
                <TouchableOpacity
                // 추후 버튼 별 기능 실행해야함
                onPress = {()=>this.props.navigation.navigate('Main')}>
                  <Image 
                  // 상단 좌측 아이콘
                  resizeMode="contain"
                  style={styles.iconStyle}
                  source = {require('./images/TempImage.png')} />
                </TouchableOpacity>
              </View>
            </View>
          </View>
          <View style={{fliex: 0.3}}/>
        </ImageBackground>
      </View>
    );
  }
}


class CalcScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = { clicked: true };
  }

  _checkedAnswer = () => this.setState({clicked:false});

  render() {
    return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
          <Text style={styles.contentsText}>군대에서 모을 수 있는 돈?</Text>
          {
            this.state.clicked
            ? <Button title = "확인" onPress = {this._checkedAnswer} />
            : <Text style={styles.contentsText}>{calcSalary(0,400000)}</Text>
          }
        </View>
      );
  }
}




const AppNavigator = createStackNavigator(
  {
    Main: HomeScreen,
    Login: LoginScreen,
    Permission: PermissionScreen,
    Calc: CalcScreen,
    Lobby: LobbyScreen,
  },
  {
    initialRouteName: 'Main',
  }
);
  
export default createAppContainer(AppNavigator);

const styles = StyleSheet.create({
container: {
  flex:1,
  backgroundColor: 'white',
  justifyContent: 'center',
},
newContainer: {
  flex:1,
  justifyContent: 'center',
},
settingView: {
  flex: 0.5,
  backgroundColor: 'black',
},
markArea: {
  flex: 1,
  justifyContent: 'center',
  alignItems: 'center',
  backgroundColor: 'white',
},
contentsText: {
  fontSize: 20,
  color: 'navy'
},
appNameText: {
  fontSize: 45,
  fontWeight: 'bold',
  color: 'navy'
},
appNameArea: {
  flex: 2,
  justifyContent: 'flex-start',
  alignItems: 'center',
  backgroundColor: 'white',
},
buttonArea: {
  flex: 7,
  backgroundColor: 'navy',
  justifyContent: 'center',
},
buttonStyle: {
  alignItems: 'center',
  backgroundColor: '#f4511e',
  padding: 10,
  height: 40,
  width: 50,
  borderRadius: 10,
},
textStyle: {
  fontSize: 18,
  color: 'white',
},
view: {
  flex: 0.3,
  justifyContent: 'center',
  alignItems: 'center',
},
codeSec: {
  flex: 0.5,
  justifyContent: 'center',
  alignItems: 'center',
  flexDirection: 'row',
},
button: {
  backgroundColor: 'gray',
  padding: 10,
  margin: 10,
},
delBtn: {
  backgroundColor: 'black',
  padding: 5,
  margin: 10,
  borderWidth: 1,
  borderColor: 'white',
  borderRadius: 5,
},
accessBtn: {
  backgroundColor: 'white',
  width: '50%',
  height: 60,
  borderRadius: 30,
  alignItems: 'center', 
  justifyContent: 'center',
},
accessWord:{
  fontWeight: 'bold',
  fontSize: 20,
},
delLoc: {
  flex: 0.2,
  justifyContent: 'center',
  alignItems: 'flex-end',
  margin: 10,
},
delWord:{
  color: 'white',
  fontWeight: 'bold',
},
access: {
  flex: 0.4,
  justifyContent: 'center',
  alignItems: 'center',
  margin: 10,
  width: '50%',
  height: 30,
},
chatInput: {
  backgroundColor: 'rgba(255,255,255,0.5)',
  width: '70%',
  borderWidth: 2,
  borderColor: 'white',
  borderRadius: 5,
  alignItems: 'center',
  fontWeight: 'bold',
  fontSize: 15,
},
textArea:{
  flex: 1,
  justifyContent: 'center',
  alignItems: 'center',
  flexDirection: 'row',
},
textArea2:{
  justifyContent: 'center',
  alignItems: 'center',
  flexDirection: 'column',
},
h1Text:{
  color: 'white',
  fontWeight: 'bold',
  fontSize: 20,
  marginBottom: 10,
  alignSelf: 'flex-start',
},
h2Text:{
  color: 'white',
  fontWeight: 'bold',
  fontSize: 14,
  marginBottom: 2,
  alignSelf: 'flex-start',
},
h3Text:{
  color: 'white',
  fontSize: 12,
  marginBottom: 5,
  alignSelf: 'flex-start',
},
curstatus:{
  //flexDirection: 'row',
  width: '70%',
  height: 40,
  backgroundColor: 'white',
  borderColor: 'red',
  borderWidth: 2,
  alignItems: 'center', 
  justifyContent: 'center',
},
buttonGroup:{
  flexDirection: 'row',
  alignSelf: 'center',
  //borderColor: 'white',
  //borderWidth: 1,
  width: '66%',
  height: '81%',
},
buttonBlock8:{
  flexDirection: 'column',
},
iconStyle:{
  width: 80, 
  height: 80,
  borderColor: 'white',
  borderWidth: 1,
  margin: 5,
},
});

