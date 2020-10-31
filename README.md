# 📋 LOCKA Project

## 🚀 What is LOCKA Project?

### [휴대폰 비대면반납 + 군인 월급계산 프로젝트](https://github.com/osamhack2020/APP_LOCKA_DreamY/wiki/Overview)
<details>

<summary>
내용 보기
</summary>


<div markdown="1">
 현재 다시금 코로나 확산속도가 빨라지고 있는 추세이다. 그렇기에 사회에서는 어떤 때보다도 비대면작업을 중요시하고 있다. 하지만 군대라는 단체조직 특성상 어쩔 수 없이 휴가복귀자 등의 경우에는 2주간 격리가 되는데 격리생활관의 경우에는 반드시 필요한 경우를 제외하고는 타인원들과의 접촉이 철저하게 금지되고 있기 때문에 대부분은 지휘관의 통제가 제대로 이루어지지 않고 있다. 대표적으로 휴대폰 사용에 대한 문제가 있는데 현재 복무하고 있는 부대의 경우에도 격리생활관 인원들은 기존 규정에 정해진것처럼 사용하게끔 통제하는 데에 있어 어려움을 겪고 있어 이른바 '2주동안 꿀빨고 온다' 라는 말이 용사들 사이에 만연할 만큼 형평성의 문제가 생기고 있다. 
 <br> 
 <br>
     
실제로 현 프로젝트에 참여하는 팀원 중 한명이 소속된 부대에서는 격리자들의 휴대폰 반납문제로 부대 내에서 크게 문제가 된 적이 있었지만 마땅한 대처방법이 없어 대면반납을 유지하고 있다. 그렇기에 기존에도 휴대폰 비대면 반납에 대한 필요성을 느끼고 있었는 찰나에 국방부에서도 코로나 19로 인해서 생기는 여러가지 문제들로 해결하기 위한 방안으로 생활관 병사 스마트폰 비대면 반납 앱을 App분야 개발 지정과제로 선정하기도 하였다. 그래서 우리는 스마트폰을 비대면으로 반납할 수 있는 앱 LOCKArmy(LOCKA)를 기획하게 되었다.
</div>
</details>

---
### 🔀 개발 방향

기본적인 아이디어는 현재 국방부에서 사용하고 있는 국방모바일보안 앱에서 따왔다. 중앙서버를 통해서 사용을 제어하는 방법은 사이버지식정보방이라는 개발환경상의 문제가 있고, 혹은 자발적으로 앱을 turn/off 할 수 있는 환경은 현실적인 제어방안이 되기 어렵다고 생각하였기에 스마트폰 자체에서 접근권한을 부여받아서 앱이 켜져있을 시에는 다른 어플리케이션의 접근을 차단하고 해제를 하고자 할때는 국방모바일보안앱과 동일하게 NFC나 잠금해제코드를 통해서 해제를 하는 방식으로 기획을 하였다.

개인정비시간에는 모든 어플리케이션의 접근을 허용하지만 그 외의 시간에는 휴대폰의 모든 기능을 차단하여 휴대폰을 반납한 상황과 동일한 효과를 볼 수 있을것이라고 생각하였다. 또한 휴가나 전역시에는 지휘관의 통제하에 지정된 잠금해제코드를 나 NFC를 통해 어플리케이션을 해제할 수 있도록 개발할 계획이다.

또한 기획과정에서 단순히 비대면 반납을 해결하는 것만으로는 다른 팀에서 나올 수 있는 결과물과 차별성이 없다고 생각하였다. 그래서 우리는 기존의 국방부에서 병사들에게 배포하던 앱들의 문제점을 개선해서 병사들에게도 친화적인 앱을 만들 방법이 없나 생각했고, 그렇게 해서 앱에 병사들이 많이 이용하는 기능은 전역 D-day 기능과 군대에서 받을 수 있는 월급의 총액을 계산해 볼 수 있는 시뮬레이션 계산기를 추가하였다.

## ▶ 프로젝트 소개영상
[![init](https://user-images.githubusercontent.com/18081105/97539019-a841ad80-1a04-11eb-8b3b-00b7c6895ae1.png)](https://www.youtube.com/watch?v=MQsTNyxUAfY)

## 💡 핵심 기능

자동 반납 | 자동 불출
:---: | :---: 
![자동반납](https://user-images.githubusercontent.com/18081105/97774111-95f87880-1b98-11eb-8a84-1aa2eb95cb47.gif) | ![자동불출](https://user-images.githubusercontent.com/18081105/97774123-bb858200-1b98-11eb-830e-5290532a0528.gif)

LOCKA앱의 가장 핵심기능인 **비대면 휴대폰 반납기능**이다. 일단 기본적으로 휴대폰을 받는 시간은 국방부에서 지정한대로 평일 오후 6시부터 9시, 주말 오전 8시 30분부터 오후9시까지로 설정하였다. 지정된 시간에는 자동으로 잠금이 해제되고 지정된 시간이 지나면 자동으로 LOCKA를 제외한 모든 앱의 사용이 잠긴다. 이러한 방식으로 사용을 제한하는 방식으로 **비대면 휴대폰 반납기능**을 구현하였다.

 - **[모든 기능 보기](https://github.com/osamhack2020/APP_LOCKA_DreamY/wiki/Project-Design)**
  
 
## ✅ 컴퓨터 구성 / 필수 조건 안내 (Prerequisites)
 - Android 9(sdk level 28) 이상
  
  
## ⚡️ 설치 안내 (Installation Process)
[![down-arrow](https://user-images.githubusercontent.com/18081105/97773851-97c13c80-1b96-11eb-954d-9ce303bb9701.png)](https://github.com/osamhack2020/APP_LOCKA_DreamY/raw/master/android/app/build/outputs/apk/debug/app-debug.apk)
- **위 버튼을 눌러 안드로이드 휴대폰에 APK 파일을 설치하시고 설치하실 수 있습니다.**


## ⚙ 기술 스택 (Technique Used)

- ### Front-end
JavaScript | npm | react native
:---: | :---: | :---: 
![js icon](https://user-images.githubusercontent.com/18081105/97551731-b0a2e400-1a16-11eb-9b4b-667c67881868.png) | ![npm icon](https://user-images.githubusercontent.com/18081105/97551747-b39dd480-1a16-11eb-943d-16ba8ad6dafe.png) | ![react](https://user-images.githubusercontent.com/18081105/97551758-b6002e80-1a16-11eb-8f96-6e0d9cbc3991.jpg)

- ### Back-end
Java | XML 
:---: | :---: 
![java icon](https://user-images.githubusercontent.com/18081105/97552275-6837f600-1a17-11eb-8208-a4399c03c2b6.png) | ![xml icon](https://user-images.githubusercontent.com/18081105/97552268-65d59c00-1a17-11eb-9761-db7c8e3d9461.png)
 
## 🔧 프로젝트 관리 (Project design)
 - [개발 일정(Develop Schedule)](https://trello.com/b/6z3kwNlv/locka)
 - [Class Diagram](https://github.com/osamhack2020/APP_LOCKA_DreamY/wiki/Class-Diagram)
 - [Mockup Screens](https://github.com/osamhack2020/APP_LOCKA_DreamY/wiki/Mockup-Screens)  
 - [프로젝트 수정시 react-native 환경설정](https://github.com/osamhack2020/APP_LOCKA_DreamY/wiki/how-to-setting-environment-and-build-files)

## 👨🏿‍🤝‍👨🏼팀 정보 (Team Information)
![teamIcon](https://user-images.githubusercontent.com/18081105/96840798-e6c7ed00-1485-11eb-8d42-62cf4a29b24a.jpg)

> * [정강희](https://github.com/vesselofgod)
> * [유영서](https://github.com/7dudtj)

## 저작권 및 사용권 정보 (Copyleft / End User License)

<img align="right" src="http://opensource.org/trademarks/opensource/OSI-Approved-License-100x137.png">

The class is licensed under the [MIT License](http://opensource.org/licenses/MIT):

Copyright &copy; 2020 [vesselofgod](http://www.github.com/vesselofgod) and [7dudtj](https://github.com/7dudtj).

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
