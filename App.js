/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 * 
 */

import React from 'react';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import { StyleSheet, NativeModules, SafeAreaView, Text, View, Image, 
  TouchableOpacity, PermissionsAndroid, Platform, Button, TextInput, 
  ImageBackground, Alert} from 'react-native';

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
              title = '계산기'
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
              <Text style={{color: 'white'}}>삭제</Text>
            </TouchableOpacity>
          </View>  
          <View style={{flex: 2.4}}/>
          <View style={styles.codeSec}>
            <TextInput style={styles.chatInput} 
            defaultValue='인증번호를 입력해주세요'/>
          </View>
          <View style={{flex: 0.6}}/>
          <View style={styles.codeSec}>
            <TouchableOpacity style={styles.accessBtn} 
            // 추후 인증번호 확인하고 넘어가야함
            onPress = {()=>this.props.navigation.navigate('Permission')}>
              <Text style={{alignItems: 'center', justifyContent: 'center',}}>인증하기</Text>
            </TouchableOpacity>
          </View> 
          <View style={{flex: 0.4}}/>
        </ImageBackground>
      </View>  
    );
  }
}

// 인증번호 입력시 등장. 권한 설명 및 요청 화면
class PermissionScreen extends React.Component{
  render(){
    return(
      <View style={styles.newContainer}>
        <ImageBackground
          style={{width: '100%', height: '100%'}}
          source={require('./images/CommonB.png')}>
          <View style={styles.delLoc}>
            <Button
              title = '삭제'
              // 추후 삭제 기능으로 연결해야함
              onPress = {()=>this.props.navigation.navigate('Main')}  
            />
          </View>    
          <View style={{flex: 1.5}}/>
          <View style={styles.textArea}>
            <Text>
              LOCKA 어플리케이션은 핸드폰 비대면 반납을 지원합니다.
            </Text>
          </View>
          <View style={{flex: 0.3}}/>
          <View style={styles.textArea}>
            <Text>
              * 내 동작 확인
                앱을 제어하는 중에 알림을 받습니다.
              * 컨텐츠 가져오기
                사용 중인 화면에서 원하는 컨텐츠를 가져올 수 있습니다.
            </Text>
          </View>
          <View>
            <Button
              title = '권한 부여하기'
              // 추후 비밀번호 인증 후 권한설명 페이지로 넘어가게 해야함
              onPress = {()=>this.props.navigation.navigate('Main')}  
            />
          </View> 
          <View style={{flex: 0.5}}/>
        </ImageBackground>
      </View>
    );
  }
}

// TBD
class LockedScreen extends React.Component {
  render() {
  return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Text style={styles.appNameText}>
          LOCKA
        </Text>
        <Button
          title = 'Unlock'
          onPress = {()=>this.props.navigation.navigate('Main')}
        />
        <Text style={styles.appNameText}>
          LOCKA
        </Text>

      </View>
    );
  }
}

class CalcScreen extends React.Component {

  constructor(props) {
    super(props);
    this.state = {clicked: ture};
    this.salarySum = 0;
  }

  _checkedAnswer = () => this.setState({clicked:false});

  render() {
  return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Text style={styles.appNameText}>
          LOCKA
        </Text>
        <Text style={styles.appNameText}>군대에서 모을 수 있는 돈?</Text>
        {
          this.state.clicked
          ? <Button title = "확인" onPress = {this.salarySum = NativeModules.calcModule.calcSalary(0,400000)} />
          :<Text style={styles.appNameText}>this.salarySum</Text>
        }
      </View>
    );
  }
}


const AppNavigator = createStackNavigator(
  {
    Main: HomeScreen,
    Locked: LockedScreen,
    Login: LoginScreen,
    Permission: PermissionScreen,
    Calc: CalcScreen,
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
  height: 40,
  padding: 10,
  margin: 10,
  borderWidth: 3,
  borderColor: 'black',
  borderRadius: 20,
},
delLoc: {
  flex: 0.2,
  justifyContent: 'center',
  alignItems: 'flex-end',
  margin: 10,
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
},
textArea:{
  backgroundColor: 'rgba(255,255,255,0.5)',
  height: 80,
  width: '60%',
  padding: 10,
  justifyContent: 'center',
  alignItems: 'center',
  borderWidth: 1,
  borderColor: 'white',
  borderRadius: 10,
},
});
