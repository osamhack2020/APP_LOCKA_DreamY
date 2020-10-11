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
              title = 'Lock'
              onPress = {()=>this.props.navigation.navigate('Locked')}
              onPress = {()=>this.props.navigation.navigate('Locked')}
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
            // 추후 권한 요청 후 화면 넘어가야함
            onPress = {()=>this.props.navigation.navigate('Main')}>
              <Text style={styles.accessWord}>권한 요청하기</Text>
            </TouchableOpacity>
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
  fontSize: 15,
  margin: 10,
  alignItems: 'flex-start',
},
h2Text:{
  color: 'white',
  fontWeight: 'bold',
  fontSize: 10,
  margin: 5,
  alignItems: 'flex-start',
},
h3Text:{
  color: 'white',
  fontSize: 10,
  alignItems: 'flex-start',
},
});

/*


export default class App extends React.Component {
  
  constructor(props){
    super(props);
    this.state = { clicked : true };
  }

  _checkedAnswer = () => this.setState({clicked: false});
 
  render() {
    return (
  
      <View style={styles.container}>
        <View style={styles.settingView}>
          <TouchableOpacity>
            <Image source={require('./images/setting.png')}/>
          </TouchableOpacity>
        </View>
        <View style={styles.markArea}>
          <Image source={require('./images/ROKAmark.png')}/>
        </View>
        <View style={styles.appNameArea}>
          <Text style={styles.appNameText}>
            LOCKA
          </Text>
        </View>
        <View style={styles.buttonArea}>
          {
            this.state.clicked
              ? <Button title="LOCK" onPress={this._checkedAnswer}/>
              : <Text style={styles.appNameText}>LOCKED</Text>
          }
        </View>
      </View>
    );
  }
}
*/



/*
import React from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
} from 'react-native';

import {
  Header,
  LearnMoreLinks,
  Colors,
  DebugInstructions,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';

const App: () => React$Node = () => {
  return (
    <>
      <StatusBar barStyle="dark-content" />
      <SafeAreaView>
        <ScrollView
          contentInsetAdjustmentBehavior="automatic"
          style={styles.scrollView}>
          <Header />
          {global.HermesInternal == null ? null : (
            <View style={styles.engine}>
              <Text style={styles.footer}>Engine: Hermes</Text>
            </View>
          )}
          <View style={styles.body}>
            <View style={styles.sectionContainer}>
              <Text style={styles.sectionTitle}>Step One</Text>
              <Text style={styles.sectionDescription}>
                Edit <Text style={styles.highlight}>App.js</Text> to change this
                screen and then come back to see your edits.
              </Text>
            </View>
            <View style={styles.sectionContainer}>
              <Text style={styles.sectionTitle}>See Your Changes</Text>
              <Text style={styles.sectionDescription}>
                <ReloadInstructions />
              </Text>
            </View>
            <View style={styles.sectionContainer}>
              <Text style={styles.sectionTitle}>Debug</Text>
              <Text style={styles.sectionDescription}>
                <DebugInstructions />
              </Text>
            </View>
            <View style={styles.sectionContainer}>
              <Text style={styles.sectionTitle}>Learn More</Text>
              <Text style={styles.sectionDescription}>
                Read the docs to discover what to do next:
              </Text>
            </View>
            <LearnMoreLinks />
          </View>
        </ScrollView>
      </SafeAreaView>
    </>
  );
};

const styles = StyleSheet.create({
  scrollView: {
    backgroundColor: Colors.lighter,
  },
  engine: {
    position: 'absolute',
    right: 0,
  },
  body: {
    backgroundColor: Colors.white,
  },
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
    color: Colors.black,
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
    color: Colors.dark,
  },
  highlight: {
    fontWeight: '700',
  },
  footer: {
    color: Colors.dark,
    fontSize: 12,
    fontWeight: '600',
    padding: 4,
    paddingRight: 12,
    textAlign: 'right',
  },
});

export default App;

*/