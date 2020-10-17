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

  
  constructor(props) {
    super(props);
    //특별한 맴버 변수(화면 자동갱신)
    this.state = { 
      password: "00000000",
    };
    this.inputPassword = " ";
  }

  changePassword= (value) =>{
    this.inputPassword=value;
  }

  checkPassword = () =>{
    if (this.inputPassword==this.state.password){
      ToastExample.show('인증이 완료되었습니다.', ToastExample.SHORT);
      this.props.navigation.navigate('Permission');
    }
    else{
      ToastExample.show( this.inputPassword, ToastExample.SHORT);
    }
  }
/*
  submitEdit= function(){
    this.setState({saving: this.inputText});
  }
*/
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
          <View style={{flex: 2.4, alignItems: 'center',justifyContent: 'flex-end'}}>
            <Text style={{color: 'white', fontWeight: 'bold',fontSize: 20, marginBottom: 10}}>
            인증번호를 입력해주세요
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
              <Text 
              // 각 기능 시행여부에 따라 상태 메세지가 달라져야함
              style={{fontWeight: 'bold', fontSize: 15}}>
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
                  // 상단 좌측 아이콘 >> 전역일/월급 계산기 아이콘 임시배치중
                  resizeMode="contain"
                  style={styles.iconStyle}
                  source = {require('./images/dday_salary.png')} />
                </TouchableOpacity>
                <TouchableOpacity
                // 추후 버튼 별 기능 실행해야함
                onPress = {()=>this.props.navigation.navigate('Main')}>
                  <Image 
                  // 하단 좌측 아이콘 >> 핸드폰 잠금 아이콘 임시배치중
                  resizeMode="contain"
                  style={styles.iconStyle}
                  source = {require('./images/phone_lock.png')} />
                </TouchableOpacity>
              </View>
              <View style={styles.buttonBlock8}>
              <TouchableOpacity
                // 추후 버튼 별 기능 실행해야함
                onPress = {()=>this.props.navigation.navigate('Main')}>
                  <Image 
                  // 상단 중앙 아이콘 >> 핸드폰 잠금 해체 아이콘 임시배치중
                  resizeMode="contain"
                  style={styles.iconStyle}
                  source = {require('./images/phone_unlock.png')} />
                </TouchableOpacity>
                <TouchableOpacity
                // 추후 버튼 별 기능 실행해야함
                onPress = {()=>this.props.navigation.navigate('Main')}>
                  <Image 
                  // 하단 중앙 아이콘 >> 잠금 임시해제 아이콘 임시배치중
                  resizeMode="contain"
                  style={styles.iconStyle}
                  source = {require('./images/temp_unlock.png')} />
                </TouchableOpacity>
              </View>
              <View style={styles.buttonBlock8}>
              <TouchableOpacity
                // 추후 버튼 별 기능 실행해야함
                onPress = {()=>this.props.navigation.navigate('Main')}>
                  <Image 
                  // 상단 우측 아이콘
                  resizeMode="contain"
                  style={styles.iconStyle}
                  source = {require('./images/TempImage.png')} />
                </TouchableOpacity>
                <TouchableOpacity
                // 추후 버튼 별 기능 실행해야함
                onPress = {()=>this.props.navigation.navigate('Main')}>
                  <Image 
                  // 하단 우측 아이콘
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


//계산용 화면
var radio_props = [
  {label: '육군', value: 0 },
  {label: '해군', value: 1 },
  {label: '공군', value: 2 },
  {label: '해병대', value: 3 }
];

class CalcScreen extends React.Component {

  static navigationOptions = {
    header: null ,
  };

  constructor(props) {
    super(props);
    //특별한 맴버 변수(화면 자동갱신)
    this.state = { 
      clicked: true,
      saving: 0,
      selectArmy: 0,
      date: "2020-10-16",
      startDay: " ",
      endDay: " ",
    };
    //일반 맴버변수(사용자 입력값을 저장하는 변수.)
    this.inputText=0;
    this.dDays=540; //그냥 30*18
    this.allDays=540;
    this.Ddaymessage="입대일과 전역일을 입력해주세요";
  }

  submitEdit= function(){
    this.setState({saving: this.inputText});
  }

  calcPercentInt=()=>{
    var percent = 100 - Math.round((this.dDays/this.allDays)*100);
    return percent
  }
  calcPercent=()=>{
    var percent = String(100 - Math.round((this.dDays/this.allDays)*100));
    var result = percent.concat("%");
    return result
  }

  clickBtn=()=>{
    this.setState({saving: this.inputText, clicked:false})
  }

  changeSaving= (value) =>{
    this.inputText=value;
  }

  _checkedAnswer = () => this.setState({clicked:false});

  ddayCalculator = (StartDate,EndDate) => {
    //Dday계산하는 함수
    //현재 터짐. 아마도 date가 입력되면 자동으로 호출되어야 할 듯함.
    if((StartDate != " ") && (EndDate != " ")){
      let today = new Date();
    
      var startdateArray = StartDate.split("-");
      var enddateArray = EndDate.split("-");
      
      var startDateObj = new Date(Number(startdateArray[0]), Number(startdateArray[1])-1, Number(startdateArray[2]));  
      var endDateObj = new Date(Number(enddateArray[0]), Number(enddateArray[1])-1, Number(enddateArray[2]));
      //현재 시간 가져와서 D-day 계산
      var betweenDay = Math.ceil(( endDateObj.getTime() - today.getTime() )/1000/60/60/24);
      var allDay = Math.abs((startDateObj.getTime() - endDateObj.getTime())/1000/60/60/24);
      this.dDays= betweenDay;
      this.allDays=allDay;
      
      var text1 = 'D-';
      var result = text1.concat(betweenDay);
      this.Ddaymessage=result
      return result
    }
    else if(StartDate == " " && EndDate != " "){
      var result = "입대일을 입력하세요"
      this.Ddaymessage=result
      return result
    }
    else if(StartDate != " " && EndDate == " "){
      var result = "전역일을 입력하세요"
      this.Ddaymessage=result
      return result
    }
    else{
      var result = "입대일과 전역일을 입력하세요"
      this.Ddaymessage=result
      return result
    }

  }

  render() {
    return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
          <View style={{ flex: 1.5, alignItems: 'center', justifyContent: 'center' }}>
            <DatePicker
              style={{width: 200}}
              date={this.state.startDay}
              mode="date"
              placeholder="pick a day"
              format="YYYY-MM-DD"
              minDate="2019-01-01"
              maxDate="2099-12-31"
              confirmBtnText="Confirm"
              cancelBtnText="Cancel"
              customStyles={{
                dateIcon: {
                  position: 'absolute',
                  left: 0,
                  top: 4,
                  marginLeft: 0
                },
                dateInput: {
                  marginLeft: 36
                }
              }}
              onDateChange={(date) => {this.setState({startDay: date})}}
            />
            <DatePicker
              style={{width: 200}}
              date={this.state.endDay}
              mode="date"
              placeholder="pick a day"
              format="YYYY-MM-DD"
              minDate="2019-01-01"
              maxDate="2099-12-31"
              confirmBtnText="Confirm"
              cancelBtnText="Cancel"
              customStyles={{
                dateIcon: {
                  position: 'absolute',
                  left: 0,
                  top: 4,
                  marginLeft: 0
                },
                dateInput: {
                  marginLeft: 36
                }
              }}
              onDateChange={
                (date) => {this.setState({endDay: date})}
              }
            />
            <Text style={styles.accessWord}>{this.ddayCalculator(this.state.startDay, this.state.endDay)}</Text>
            <ProgressCircle
              radius={50}
              percent={this.calcPercentInt()}
              borderWidth={5}
              color="navy"
              shadowColor="#50bcdf"
              bgColor="#fff">
              <Text style={styles.accessWord}>{this.calcPercent()}</Text>
            </ProgressCircle>
          </View>
          <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <Text style={styles.accessWord}>월급 시뮬레이션</Text>
            <View style={styles.codeSec}>
              <RadioForm
                //checked된 radio의 값을 뽑아내야 함.
                radio_props={radio_props}
                initial={0}
                onPress={(value) => {this.setState({selectArmy:value})}}
                selectedButtonColor={'navy'}
                selectedLabelColor={'navy'}
                labelStyle={{fontSize:15}}
                formHorizontal={true}
                //이거 setState 잘 봐야 할 거 같음.
              />
            </View>
            <View style={styles.codeSect}>
              <TextInput style={styles.chatInput} 
                onChangeText={this.changeSaving}
                onSubmitEditing={this.submitEdit.bind(this)}
              />
            </View>
          </View>
          <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <Text style={styles.contentsText}>군대에서 모을 수 있는 돈?</Text>
            {
              this.state.clicked
              ? <Button title = "확인" onPress = {this.clickBtn} />
              : <Text style={styles.contentsText}> {calcSalary(this.state.selectArmy, Number(this.state.saving))} </Text>
            }
          </View>
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
codeSect: {
  flex: 0.25,
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

