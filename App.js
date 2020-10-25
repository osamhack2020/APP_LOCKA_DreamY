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
import ProgressCircle from 'react-native-progress-circle';
import { StyleSheet, NativeModules, SafeAreaView, Text, View, Image, 
  TouchableOpacity, PermissionsAndroid, Platform, Button, TextInput, 
  ImageBackground} from 'react-native';
  import RadioForm, {RadioButton, RadioButtonInput, RadioButtonLabel} from 'react-native-simple-radio-button';
import DatePicker from 'react-native-datepicker';
import ToastExample from './ToastExample';
import DialogAndroid from 'react-native-dialogs';


//import Block from './Block';

//initName : 첫 시작화면
//lockedCondition : 잠금상태 확인변수
//permissionCheck : 권한 허용여부

var initName;
var lockedCondition = NativeModules.Block.checkBlockState();
var permissionCheck = NativeModules.Block.checkPermissionState();

renderBlockState = () => {
  //상시 실행. 근데 이걸 계속 받아올 수 있는지 잘 모르겠음.
  lockedCondition = NativeModules.Block.checkBlockState();
  var renderingText =" ";
  if(lockedCondition == true){
    renderingText = <Text style={styles.lockStateText}>LOCKED</Text>
  }
  else{
    renderingText = <Text style={styles.unlockStateText}>UNLOCKED</Text>
  }
  return renderingText;
}

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

renderDayofweek = (Dayofweek) => {
  //Dayofweek : 요일
  var renderingText;
  if(Dayofweek == 0){
    renderingText =           
    <View style={styles.daysGroup}>
      <Text style={styles.weekdays}>월</Text>
      <Text style={styles.weekdays}>화</Text>
      <Text style={styles.weekdays}>수</Text>
      <Text style={styles.weekdays}>목</Text>
      <Text style={styles.weekdays}>금</Text>
      <Text style={styles.satday}>토</Text>
      <Text style={{marginRight: 6, marginLeft: 6, color: '#e15858', fontSize: 20,  textDecorationLine: 'underline'}}>일</Text>
    </View>
  }
  else if(Dayofweek == 1){
    //월요일
    renderingText =           
    <View style={styles.daysGroup}>
      <Text style={styles.todayText}>월</Text>
      <Text style={styles.weekdays}>화</Text>
      <Text style={styles.weekdays}>수</Text>
      <Text style={styles.weekdays}>목</Text>
      <Text style={styles.weekdays}>금</Text>
      <Text style={styles.satday}>토</Text>
      <Text style={styles.sunday}>일</Text>
    </View>
  }
  else if(Dayofweek == 2){
    renderingText =     
    <View style={styles.daysGroup}>
      <Text style={styles.weekdays}>월</Text>
      <Text style={styles.todayText}>화</Text>
      <Text style={styles.weekdays}>수</Text>
      <Text style={styles.weekdays}>목</Text>
      <Text style={styles.weekdays}>금</Text>
      <Text style={styles.satday}>토</Text>
      <Text style={styles.sunday}>일</Text>
  </View>
  }
  else if(Dayofweek == 3){
    <View style={styles.daysGroup}>
      <Text style={styles.weekdays}>월</Text>
      <Text style={styles.weekdays}>화</Text>
      <Text style={styles.todayText}>수</Text>
      <Text style={styles.weekdays}>목</Text>
      <Text style={styles.weekdays}>금</Text>
      <Text style={styles.satday}>토</Text>
      <Text style={styles.sunday}>일</Text>
    </View>
  }
  else if(Dayofweek == 4){
    renderingText = 
    <View style={styles.daysGroup}>
      <Text style={styles.weekdays}>월</Text>
      <Text style={styles.weekdays}>화</Text>
      <Text style={styles.weekdays}>수</Text>
      <Text style={styles.todayText}>목</Text>
      <Text style={styles.weekdays}>금</Text>
      <Text style={styles.satday}>토</Text>
      <Text style={styles.sunday}>일</Text>
    </View>
  }
  else if(Dayofweek == 5){
    renderingText = 
    <View style={styles.daysGroup}>
      <Text style={styles.weekdays}>월</Text>
      <Text style={styles.weekdays}>화</Text>
      <Text style={styles.weekdays}>수</Text>
      <Text style={styles.weekdays}>목</Text>
      <Text style={styles.todayText}>금</Text>
      <Text style={styles.satday}>토</Text>
      <Text style={styles.sunday}>일</Text>
    </View>
  }
  else{
    renderingText = 
    <View style={styles.daysGroup}>
      <Text style={styles.weekdays}>월</Text>
      <Text style={styles.weekdays}>화</Text>
      <Text style={styles.weekdays}>수</Text>
      <Text style={styles.weekdays}>목</Text>
      <Text style={styles.weekdays}>금</Text>
      <Text style={{marginRight: 6, marginLeft: 6, color: '#52a6f2', fontSize: 20, textDecorationLine: 'underline'}}>토</Text>
      <Text style={styles.sunday}>일</Text>
    </View>
  }
  return renderingText;
}

class HomeScreen extends React.Component {
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
              title = 'Permission'
              onPress = {()=>this.props.navigation.navigate('Permission')}
              onPress = {()=>this.props.navigation.navigate('Permission')}  
            />
          </View>
        </View>  
    );
  }
}

// 잠금 해제시 인증번호 입력 화면
class LoginScreen extends React.Component{

  static navigationOptions = {
    header: null ,
  };

  constructor(props) {
    super(props);
    this.state = { 
      password: "00000000",
    };
    this.inputPassword = " ";
  }

  changePassword= (value) =>{
    //Textbox에 입력하는 문자열을 가져와서 inputPassword에 저장한다.
    this.inputPassword=value;
  }

  checkPassword = () =>{
    //비밀번호가 맞는지 확인하는 함수
    //맞다면 다음화면으로, 틀렸다면 토스트메시지를 띄워준다.
    if (this.inputPassword==this.state.password){
      this.props.navigation.navigate('Lobby');
      NativeModules.Block.stopService();
    }
    else{
      ToastExample.show('비밀번호가 틀렸습니다.', ToastExample.SHORT);
    }
  }

  render(){
    return(
      <View style={styles.newContainer}>
        <ImageBackground
          style={{width: '100%', height: '100%'}}
          source={require('./images/CommonB.png')}>
          <View style={styles.delLoc}>
            <TouchableOpacity style={styles.delBtn} 
            onPress = {() => NativeModules.Block.deleteLOCKA()}>
              <Text style={styles.delWord}>삭제</Text>
            </TouchableOpacity>
          </View>
          <View style={{flex: 2.4, alignItems: 'center',justifyContent: 'flex-end'}}>
            <Text style={{color: 'white', fontWeight: 'bold',fontSize: 20, marginBottom: 10}}>
              잠금해제 코드를 입력해주세요
            </Text>
          </View>
          <View style={styles.codeSec}>
            <TextInput 
              style={styles.chatInput}
              onChangeText={this.changePassword}
              //onSubmitEditing={this.submitEdit.bind(this)}
            />
          </View>
          <View style={{flex: 0.4}}/>
          <View style={styles.codeSec}>
            <TouchableOpacity style={styles.accessBtn} 
            // 추후 인증번호 확인하고 넘어가야함
              onPress = {() => this.checkPassword()}>
              <Text style={styles.accessWord}>인증하기</Text>
            </TouchableOpacity>
          </View> 
          <View style={{flex: 0.6}}/>
        </ImageBackground>
      </View>
    );
  }
}

//휴일, 전투휴무와 같이 일시적으로 해제할 때
class holidayScreen extends React.Component{

  static navigationOptions = {
    header: null ,
  };

  constructor(props) {
    super(props);
    this.state = { 
      password: "12345678",
    };
    this.inputPassword = " ";
  }

  changePassword= (value) =>{
    //Textbox에 입력하는 문자열을 가져와서 inputPassword에 저장한다.
    this.inputPassword=value;
  }

  checkPassword = () =>{
    //비밀번호가 맞는지 확인하는 함수
    //맞다면 다음화면으로, 틀렸다면 토스트메시지를 띄워준다.
    if (this.inputPassword==this.state.password){
      ToastExample.show('당일 21:00까지 잠금이 해제됩니다.', ToastExample.SHORT);
      NativeModules.Block.applyHoliday();
      this.props.navigation.navigate('Lobby');
    }
    else{
      ToastExample.show('비밀번호가 틀렸습니다.', ToastExample.SHORT);
    }
  }

  render(){
    return(
      <View style={styles.newContainer}>
        <ImageBackground
          style={{width: '100%', height: '100%'}}
          source={require('./images/CommonB.png')}>
          <View style={styles.delLoc}>
            <TouchableOpacity style={styles.delBtn} 
            onPress = {() => NativeModules.Block.deleteLOCKA()}>
              <Text style={styles.delWord}>삭제</Text>
            </TouchableOpacity>
          </View>
          <View style={{flex: 2.4, alignItems: 'center',justifyContent: 'flex-end'}}>
            <Text style={{color: 'white', fontWeight: 'bold',fontSize: 20, marginBottom: 10}}>
              일시해제코드(전투휴무/공휴일 등)를 입력해주세요
            </Text>
          </View>
          <View style={styles.codeSec}>
            <TextInput 
              style={styles.chatInput}
              onChangeText={this.changePassword}
              //onSubmitEditing={this.submitEdit.bind(this)}
            />
          </View>
          <View style={{flex: 0.4}}/>
          <View style={styles.codeSec}>
            <TouchableOpacity style={styles.accessBtn} 
            // 추후 인증번호 확인하고 넘어가야함
              onPress = {() => this.checkPassword()}>
              <Text style={styles.accessWord}>인증하기</Text>
            </TouchableOpacity>
          </View> 
          <View style={{flex: 0.6}}/>
        </ImageBackground>
      </View>
    );
  }
}

//권한 설명 및 요청 화면
class PermissionScreen extends React.Component{

  constructor(props){
    super(props)
  }
  
  // 상단의 toolbar 가리기
  static navigationOptions = {
    header: null ,
  };

  setAccessibility = () =>{
    //권한을 요청하는 화면으로 이동시키는 함수.
    NativeModules.Block.setAccessibilityPermissions();
    this.props.navigation.navigate('Lobby');
  }

  render(){
    return(
      <View style={styles.newContainer}>
        <ImageBackground
          style={{width: '100%', height: '100%'}}
          source={require('./images/CommonB.png')}>
          <View style={styles.delLoc}>
            <TouchableOpacity style={styles.delBtn} 
            onPress = {() => NativeModules.Block.deleteLOCKA()}>
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
            //권한 요청 후 LobbyScreen으로 넘어감.
            onPress = {()=>this.setAccessibility()}>
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

  constructor(props){
    super(props)
    this.loadPermissionState();
    this.state = {
      d: new Date()
    }
    //요일
  }

  componentDidMount() { // Clockcmp 컴포넌트가 불러올때마다 1초씩 this.Change()를 부른다 
    this.timeID = setInterval(
        () => this.Change(),
        1000
    )
  }

  componentWillUnmount(){ //종료되면 반복하는것도 클리어시키기
    clearInterval(this.timeID)
  }

  Change = () => {  //시계 구현
    this.setState({
        d : new Date(),
    })
  }
  
  loadPermissionState = () => {
    permissionCheck = NativeModules.Block.checkPermissionState();
    if (permissionCheck == false){
      this.props.navigation.navigate('Permission');
    }
  }

  clockrender = (dayofweek) => {
    //{String(this.state.d.getHours()).padStart(2, "0")}:{String(this.state.d.getMinutes()).padStart(2, "0")}:{String(this.state.d.getSeconds()).padStart(2, "0")}
    var clockTexts = " ";
    let lockedCondition = NativeModules.Block.checkBlockState();
    let pauseLockState = NativeModules.Block.getpauseLock();
    var result = "";
    if(pauseLockState){
      clockTexts = "완전해제 상태입니다."
      result =
      <View style={{flex: 1.1, justifyContent: 'center', alignItems: 'center'}}>
        <Text 
          // 시계넣는공간
          style={styles.clockText}>
          {clockTexts}
        </Text>
     </View>

    }
    else if(( (dayofweek==5 && this.state.d.getHours()<=21) || dayofweek==6 || (dayofweek==0 && this.state.d.getHours()<9) )  && lockedCondition==true){
      if(12<this.state.d.getHours()<=24){
        //저녁시간
        var end = new Date(this.state.d.getFullYear(),this.state.d.getMonth(),this.state.d.getDate()+1,8, 30)
        var betweenTime = end - this.state.d;
        var Hours = String(Math.floor((betweenTime % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))).padStart(2, "0");
        var Minutes = String(Math.floor((betweenTime % (1000 * 60 * 60)) / (1000 * 60))).padStart(2, "0");
        var Seconds = String(Math.floor((betweenTime % (1000 * 60)) / 1000)).padStart(2, "0");
        clockTexts = "해제까지 "+Hours+":"+Minutes+":"+Seconds;
      }
      else{
        //오전시간
        var end = new Date(this.state.d.getFullYear(),this.state.d.getMonth(),this.state.d.getDate(),8, 30)
        var betweenTime = end - this.state.d;
        var Hours = String(Math.floor((betweenTime % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))).padStart(2, "0");
        var Minutes = String(Math.floor((betweenTime % (1000 * 60 * 60)) / (1000 * 60))).padStart(2, "0");
        var Seconds = String(Math.floor((betweenTime % (1000 * 60)) / 1000)).padStart(2, "0");
        clockTexts = "해제까지 "+Hours+":"+Minutes+":"+Seconds;
      }

      result = 
      <View style={{flex: 1.1, justifyContent: 'center', alignItems: 'center'}}>
        <Text style= {{color: 'white', fontSize: 23, alignSelf: 'flex-start', marginLeft: '15%', fontWeight: 'bold'}} > 해제까지 </Text>
        <Text 
          // 시계넣는공간
          style={styles.clockText}>
          {clockTexts}
        </Text>
     </View>

    }
    else if( !( (dayofweek==5 && this.state.d.getHours()<=21) || dayofweek==6 || (dayofweek==0 && this.state.d.getHours()<9) ) && lockedCondition==true){
      //평일 잠금해제까지 남은시간.
      if(21<=this.state.d.getHours()<=24){
        //저녁시간
        var end = new Date(this.state.d.getFullYear(),this.state.d.getMonth(),this.state.d.getDate()+1, 18, 0)
        var betweenTime = end - this.state.d;
        var Hours = String(Math.floor((betweenTime % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))).padStart(2, "0");
        var Minutes = String(Math.floor((betweenTime % (1000 * 60 * 60)) / (1000 * 60))).padStart(2, "0");
        var Seconds = String(Math.floor((betweenTime % (1000 * 60)) / 1000)).padStart(2, "0");
        clockTexts = "해제까지 "+Hours+":"+Minutes+":"+Seconds;
      }
      else{
        //오전시간
        var end = new Date(this.state.d.getFullYear(),this.state.d.getMonth(),this.state.d.getDate(),18, 0)
        var betweenTime = end - this.state.d;
        var Hours = String(Math.floor((betweenTime % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))).padStart(2, "0");
        var Minutes = String(Math.floor((betweenTime % (1000 * 60 * 60)) / (1000 * 60))).padStart(2, "0");
        var Seconds = String(Math.floor((betweenTime % (1000 * 60)) / 1000)).padStart(2, "0");
        clockTexts = "해제까지 "+Hours+":"+Minutes+":"+Seconds;
      }

      result = 
      <View style={{flex: 1.1, justifyContent: 'center', alignItems: 'center'}}>
        <Text style= {{color: 'white', fontSize: 23, alignSelf: 'flex-start', marginLeft: '15%', fontWeight: 'bold'}} > 해제까지 </Text>
        <Text 
          // 시계넣는공간
          style={styles.clockText}>
          {clockTexts}
        </Text>
     </View>

    }
    else if(lockedCondition==false){
      //clockTexts = String(this.state.d.getHours()).padStart(2, "0")+":"+String(this.state.d.getMinutes()).padStart(2, "0")+":"+String(this.state.d.getSeconds()).padStart(2, "0")
      var end = new Date(this.state.d.getFullYear(),this.state.d.getMonth(),this.state.d.getDate(), 21, 0)
      var betweenTime = end - this.state.d;
      var Hours = String(Math.floor((betweenTime % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))).padStart(2, "0");
      var Minutes = String(Math.floor((betweenTime % (1000 * 60 * 60)) / (1000 * 60))).padStart(2, "0");
      var Seconds = String(Math.floor((betweenTime % (1000 * 60)) / 1000)).padStart(2, "0");
      clockTexts = Hours+":"+Minutes+":"+Seconds;

      result = 
      <View style={{flex: 1.1, justifyContent: 'center', alignItems: 'center'}}>
        <Text style= {{color: 'white', fontSize: 23, alignSelf: 'flex-start', marginLeft: '15%', fontWeight: 'bold'}} > 잠금까지 </Text>
        <Text 
          // 시계넣는공간
          style={styles.clockText}>
          {clockTexts}
        </Text>
     </View>

    }
    else{
      clockText = String(this.state.d.getHours()).padStart(2, "0")+":"+String(this.state.d.getMinutes()).padStart(2, "0")+":"+String(this.state.d.getSeconds()).padStart(2, "0")
    }

    return result;
  }

  render(){
    return(
      <View style={styles.newContainer}>
        <ImageBackground
          style={{width: '100%', height: '100%'}}
          source={require('./images/simple_background.jpg')}>
          <View style={styles.delLoc}>
            <TouchableOpacity style={styles.delBtn} 
            onPress = {() => NativeModules.Block.deleteLOCKA()}>
              <Text style={styles.delWord}>삭제</Text>
            </TouchableOpacity>
          </View>
          <View style={{flex: 0.7}}/>
          
          {this.clockrender(this.state.d.getDay())}

          <View style={{flex: 0.1}}/>
            {renderDayofweek(this.state.d.getDay())}
          <View style={{flex: 0.3}}/>
          <View style={styles.codeSec}>
            {renderBlockState()}
          </View>
          <View style={{flex: 1}}/>
          <View style={{flex: 1}}>
            <View style={styles.buttonGroup}>
              <View style={styles.buttonSet}>
                <TouchableOpacity
                  onPress = {()=>this.props.navigation.navigate('Calc')}>
                  <Image 
                  // 1번 아이콘 >> 전역일/월급 계산기
                  resizeMode="contain"
                  style={styles.iconStyle}
                  source = {require('./images/calcbutton.png')} />
                </TouchableOpacity>
                <Text style={styles.iconText}>
                  계산기
                </Text>
              </View>
              <View style={styles.buttonSet}>
                <TouchableOpacity
                  // 추후 버튼 별 기능 실행해야함
                  onPress={() => NativeModules.Block.startService()}>
                  <Image 
                  // 2번 아이콘 >> 핸드폰 잠금
                  resizeMode="contain"
                  style={styles.iconStyle}
                  source = {require('./images/lockbutton.png')} />
                </TouchableOpacity>
                <Text style={styles.iconText}>
                  잠금
                </Text>
              </View>
              <View style={styles.buttonSet}>
                <TouchableOpacity
                  onPress = {()=>this.props.navigation.navigate('UnlockCheck')}>
                  <Image 
                  // 3번 아이콘 >> 핸드폰 잠금 해체
                  resizeMode="contain"
                  style={styles.iconStyle}
                  source = {require('./images/unlockbutton.png')} />
                </TouchableOpacity>
                <Text style={styles.iconText}>
                  해제
                </Text>
              </View>
              <View style={styles.buttonSet}>
                <TouchableOpacity
                  onPress = {()=>this.props.navigation.navigate('Holiday')}>
                  <Image 
                  // 4번 아이콘 >> 잠금 일시해제
                  resizeMode="contain"
                  style={styles.iconStyle}
                  source = {require('./images/holidayunlockbutton.png')} />
                </TouchableOpacity>
                <Text style={styles.iconText}>
                  일시해제
                </Text>
              </View>
            </View>
          </View>
        </ImageBackground>
      </View>
    );
  }
}

//계산용 화면
var radio_props = [
  {label: '육군', value: 0 },
  {label: '해군', value: 1 },
  {label: '공군', value: 2 },
  {label: '해병대', value: 3 }
];

class CalcScreen extends React.Component {
  constructor(props) {
    super(props);
    //특별한 맴버 변수(화면 자동갱신) 설명
    /*
      clicked : 월급 확인버튼 눌렀는지 확인함.
      saving : 1달에 넣는 적금
      selectArmy : 육해공군 등 군종선택
      date : 현재 날짜, 초기값은 임의로 넣어둠.
    */
    this.state = { 
      clicked: true,
      saving: 0,
      selectArmy: 0,
      date: "2020-10-22",
      startDay: " ",
      endDay: " ",
      corporalPromotion: "C",
      sgtPromotion: 0
    };

    //일반 맴버변수(사용자 입력값을 저장하는 변수.) 설명
    /*
      inputText : 월 적금을 받아주는 변수
      dDays : 남은 군생활 일수, 초기값은 임의로 18달*30일로 설정
      allDays : 전체 군생활 일수
    */ 
    this.inputText=0;
    this.dDays=540; //그냥 30*18
    this.allDays=540;
    //this.Ddaymessage="입대일과 전역일을 입력해주세요";
  }

  static navigationOptions = {
    header: null ,
  };

  submitEdit= function(){
    this.setState({saving: this.inputText});
  }

  calcPercentInt=()=>{
    //군생활 퍼센트를 숫자로 리턴
    var percent = 100 - Math.round((this.dDays/this.allDays)*100);
    return percent
  }
  calcPercent=()=>{
    //군생활 퍼센트를 문자열로 리턴
    var percent = String(100 - Math.round((this.dDays/this.allDays)*100));
    var result = percent.concat("%");
    return result
  }

  clickBtn=()=>{
    //월급 계산 버튼 눌렀을 때 실행되는 함수.
    this.setState({saving: this.inputText, clicked:false})
  }

  changeSaving= (value) =>{
    //월급이 얼마인지 바뀔때마다 inputText의 값을 바꿔주는 함수.
    this.inputText=value;
  }

  ddayCalculator = (StartDate,EndDate) => {
    //Dday계산하는 함수
    //StartDate : 입대일
    //EndDate : 전역일
    if((StartDate != " ") && (EndDate != " ")){
      let today = new Date();
    
      var startdateArray = StartDate.split("-");
      var enddateArray = EndDate.split("-");
      
      var startDateObj = new Date(Number(startdateArray[0]), Number(startdateArray[1])-1, Number(startdateArray[2]));  
      var endDateObj = new Date(Number(enddateArray[0]), Number(enddateArray[1])-1, Number(enddateArray[2]));
      //현재 시간 가져와서 D-day 계산, 올림을 해줘서 일수로 딱 떨어지게끔 함.
      var betweenDay = Math.ceil(( endDateObj.getTime() - today.getTime() )/1000/60/60/24);
      var allDay = Math.abs((startDateObj.getTime() - endDateObj.getTime())/1000/60/60/24);
      this.dDays= betweenDay;
      this.allDays=allDay;
      
      var text1 = 'D-';
      var result = text1.concat(betweenDay);
      //this.Ddaymessage=result
      return result
    }
    else{
      var result = " "
      //this.Ddaymessage=result
      return result
    }

  }

  showDialogAndroid = async () => {
    const { selectedItem } = await DialogAndroid.showPicker('진급여부를 선택해주세요.', null, {
      // positiveText: null, // if positiveText is null, then on select of item, it dismisses dialog
      negativeText: 'Cancel',
      type: DialogAndroid.listRadio,
      selectedId: "C",
      items: [
          { label:'2달 진급누락', id:"A" },
          { label:'1달 진급누락', id:"B" },
          { label:'정상진급', id:"C" },
          { label:'1달 정상진급', id:"D" },
          { label:'2달 정상진급', id:"E" },
      ]
    });
    if (selectedItem) {
      ToastExample.show(idKey, ToastExample.SHORT);
      (selectedId) => {this.setState({corporalPromotion:selectedId})}
      // when negative button is clicked, selectedItem is not present, so it doesn't get here
      //console.log('You picked:', selectedItem);
    }
  }


  render() {
    return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' , color: '#1e3269' }}>
          <ImageBackground
            style={{width: '100%', height: '100%'}}
            source={require('./images/simple_background.jpg')}>
            <View style={styles.ddayCalc}>
              <Text style={styles.contentsText}>전역일 계산기</Text>
              <View 
              // progressBar가 담기는 뷰
              style={{flexDirection: 'row', alignSelf: 'center', margin: 5}}>
                <ProgressCircle
                  radius={100}
                  percent={this.calcPercentInt()}
                  borderWidth={8}
                  bgColor="#000038"
                  color="#8b00ff"
                  shadowColor="#b19cd9"
                  style={{flexDirection: 'row', alignSelf: 'center'}}
                >
                  <Text style={{fontSize: 20, color: 'white'}}>
                    {this.calcPercent()}
                  </Text>
                  <Text style={styles.contentsText}>{this.ddayCalculator(this.state.startDay, this.state.endDay)}</Text>
                </ProgressCircle>
              </View>
              <View style={styles.calenderGroup}>
                <View style={styles.calenderSet}>
                  <View style={{flexDirection: 'row', alignSelf: 'center'}}>
                    <Text style={styles.dayofarmy}>
                      입대일
                    </Text>
                  </View>
                  <View style={{flexDirection: 'row', alignSelf: 'center'}}>
                  <DatePicker
                    style={{width: 200}}
                    date={this.state.startDay}
                    mode="date"
                    placeholder="2020-04-06"
                    format="YYYY-MM-DD"
                    minDate="2019-01-01"
                    maxDate="2099-12-31"
                    confirmBtnText="Confirm"
                    cancelBtnText="Cancel"
                    customStyles={{
                      dateIcon: {
                        position: 'absolute',
                        left: 28,
                        top: 4,
                        marginLeft: 0
                      },
                      dateInput: {
                        marginLeft: 0,
                        borderWidth: 0
                      },
                      placeholderText: {
                        color: 'white'
                      },
                      dateText: {
                        color: "white",
                      }
                    }}
                    onDateChange={(date) => {this.setState({startDay: date})}}
                  />
                  </View>
                </View>
                <View style={styles.calenderSet}>
                  <View style={{flexDirection: 'row', alignSelf: 'center'}}>
                    <Text style={styles.dayofarmy}>
                      전역일
                    </Text>
                  </View>
                  <View style={{flexDirection: 'row', alignSelf: 'center'}}>
                  <DatePicker
                    style={{width: 200}}
                    date={this.state.endDay}
                    mode="date"
                    placeholder="pick a day"
                    format="YYYY-MM-DD"
                    minDate="2020-01-01"
                    maxDate="2099-12-31"
                    confirmBtnText="Confirm"
                    cancelBtnText="Cancel"
                    customStyles={{
                      dateIcon: {
                        position: 'absolute',
                        left: 28,
                        top: 4,
                        marginLeft: 0
                      },
                      dateInput: {
                        marginLeft: 0,
                        borderWidth: 0
                      },
                      placeholderText: {
                        color: 'white'
                      },
                      dateText: {
                        color: "white",
                      }
                    }}
                    onDateChange={
                      (date) => {this.setState({endDay: date})}
                    }
                  />
                  </View>
                </View>
              </View>
            </View>
            <View style={styles.salaryCalc}>
              <Text style={styles.contentsText}>월급 계산기</Text>
              <View style={{justifyContent: 'center', alignItems: 'center',  flexDirection: 'row'/*flexDirection: 'row', margin: 20, backgroundColor: 'rgba(0,0,255,0.1)'*/}}>
                <RadioForm
                  //checked된 radio의 값을 뽑아내야 함.
                  radio_props={radio_props}
                  initial={0}
                  onPress={(value) => {this.setState({selectArmy:value})}}
                  selectedButtonColor={'white'}
                  selectedLabelColor={'white'}
                  labelStyle={{fontSize:12}}
                  formHorizontal={true}
                  //이거 setState 잘 봐야 할 거 같음.
                />
              </View>
              <View style={{flexDirection: 'row', alignSelf: 'center'}}>
                <Text style={styles.contentsText}>적금/월  </Text>
                <TextInput style={styles.chatInput} 
                  onChangeText={this.changeSaving}
                  onSubmitEditing={this.submitEdit.bind(this)}
                />
              </View>
              <View style={{alignSelf: 'center'}}>
                <Button title="상병 진급여부" onPress={this.showDialogAndroid} />
              </View>
              <View style={{alignItems: 'center', justifyContent: 'center', backgroundColor: 'rgba(0,0,255,0.1)' }}>
              {
                this.state.clicked
                ? <Button title = "확인" onPress = {this.clickBtn} />
                : <Text style={styles.contentsText}> {String(this.corporalPromotion)},{calcSalary(this.state.selectArmy, Number(this.state.saving))} </Text>
              }
              </View>
            </View>
          </ImageBackground>
        </View>
      );
  }
}

const AppNavigator = createStackNavigator(
  {
    Main: { screen: HomeScreen },
    UnlockCheck: { screen: LoginScreen },
    Permission: { screen: PermissionScreen },
    Calc: { screen: CalcScreen },
    Lobby: { screen: LobbyScreen },
    Holiday: {screen: holidayScreen}
  },
  {
    initialRouteName: "Lobby"
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
  color: 'white'
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
codeSect: {
  flex: 0.4,
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
  width: '60%',
  borderWidth: 1,
  borderColor: 'white',
  borderRadius: 5,
  alignItems: 'center',
  fontWeight: 'bold',
  fontSize: 13,
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
clockText:{
  //시계 띄우는 텍스트
  color: 'white',
  fontSize: 65,
  fontWeight: 'bold',
  textAlign: 'center',
},
buttonGroup:{
  flexDirection: 'row',
  alignSelf: 'center',
  width: '88%',
  height: '100%',
},  
iconStyle:{
  width: 80, 
  height: 80,
},  
unlockStateText:{
  fontWeight: 'bold',
  fontSize: 45,
  color: '#007fff',
  textAlign: 'center',
},
lockStateText:{
  fontWeight: 'bold',
  fontSize: 45,
  color: '#9b111e',
  textAlign: 'center',
},
buttonSet:{
  flexDirection: 'column',
  margin: 5,
},  
iconText:{
  flexDirection: 'row',
  alignSelf: 'center',
  color: 'white',
  fontWeight: 'bold',
},  
daysGroup:{
  flex: 0.3,
  flexDirection: 'row',
  alignSelf: 'center',
},   
weekdays:{
  marginRight: 6,
  marginLeft: 6,
  color: 'white',
  fontSize: 20,
  //textDecorationLine: 'underline', // test
},
todayText:{
  marginRight: 6,
  marginLeft: 6,
  color: 'white',
  fontSize: 20,
  textDecorationLine: 'underline',
},
satday:{
  marginRight: 6,
  marginLeft: 6,
  color: '#52a6f2',
  fontSize: 20,
  //textDecorationLine: 'underline', // test
},  
sunday:{
  marginRight: 6,
  marginLeft: 6,
  color: '#e15858',
  fontSize: 20,
  //textDecorationLine: 'underline', // test
}, 
ddayCalc:{
  flex: 1,
},  
salaryCalc:{
  flex: 1,
},  
calenderGroup:{
  flexDirection: 'row',
  alignSelf: 'center',
  margin: 5,
},  
calenderSet:{
  flexDirection: 'column',
  alignSelf: 'center',
  margin: 3,
},   
dayofarmy:{
  color: 'white',
  fontWeight: 'bold',
  fontSize: 15,
},  
});
