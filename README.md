# 📋 LOCKA Project

### 🚀 What is LOCKA Project?
스마트폰 비대면 반납 + 국방부 어플리케이션 통합 프로젝트
(프로젝트 설명단계 필요함.)

![teamIcon](https://user-images.githubusercontent.com/18081105/96840798-e6c7ed00-1485-11eb-8d42-62cf4a29b24a.jpg)

> * [정강희](https://github.com/vesselofgod)
> * [유영서](https://github.com/7dudtj)


### ⚡️ How to install and test
1. download LOCKA/android/app/build/outputs/apk/debug/app-debug.apk in your phone
2. install app using apk file
3. run downloaded app

### 컴퓨터 구성 / 필수 조건 안내 (Prerequisites)

### 기술 스택 (Technique Used) (예시)
### Server(back-end)
 - java
 - XML
 
![Untitled Diagram (1)](https://user-images.githubusercontent.com/18081105/96946704-14f80c00-151c-11eb-9d30-f5ddf3af9041.png)
 
### front-end
 -  react.js
 -  kavascript
 -  UI framework
 -  react-native components

### 🗓Develop Schedule
Due date : 10/31(Saturday)

![image](https://user-images.githubusercontent.com/18081105/94388617-8eecdd80-0188-11eb-9f93-b1c2469cd182.png)
![day](https://user-images.githubusercontent.com/67851701/95667787-b50d7700-0ba5-11eb-93ea-83a19fa00a8e.PNG)
### 💡 Project design

-   **앱 실행차단기능**
-   **앱 디자인**
-   **잠금해제코드나 NFC 인식기능**
-   **개인정비시간 설정**
-   **App 삭제방지기능**
-   **전역일, 월급 계산기능**

### ⚙ react-native environment setting using linux teminal

1. 터미널 열기

2. React Native 프로젝트 생성
- npm install -g react-native-cli
- cd ..
- react-native init workspace

3. Android SDK 설치
- cd ~
- wget https://dl.google.com/android/repository/commandlinetools-linux-6609375_latest.zip
- unzip commandlinetools-linux-6609375_latest.zip
- rm commandlinetools-linux-6609375_latest.zip
- mkdir android-sdk
- mv tools android-sdk/tools

4. PATH 설정 (.bachrc에 추가)
- export ANDROID_HOME=$HOME/android-sdk
- export PATH=$PATH:$ANDROID_HOME/tools/bin
- export PATH=$PATH:$ANDROID_HOME/platform-tools

5. PATH 설정 후
- source .bashrc

6. SDK 설치
- project_root/android/build.gradle 을 통해 Android 버전 확인
- 확인 후 아래 명령어를 통해 Android 28버전 설치
- sdkmanager --sdk_root=${ANDROID_HOME} "platform-tools" "platforms;android-28"

7. apk 빌드 및 생성
- mkdir android/app/src/main/assets
- package.json 수정 ( “scripts” 부분에 추가)
"scripts": { "bundle": "react-native bundle --platform android --dev false --entry-file index.js --bundle-output android/app/src/main/assets/index.android.bundle --assets-dest android/app/src/main/res" }
![image](https://user-images.githubusercontent.com/18081105/94502797-e9954080-023f-11eb-9ff6-1f58473dee0c.png)

- npm run bundle
- 빌드(cd workspace/android로 와서 실행)
./gradlew assembleDebug
- 생성 위치 : workspace/android/app/build/outputs/apk/debug/

8. Git 저장소에 업로드
- APK 파일을 저장소에 업로드(프로젝트가 GitHub에 업로드 되어 있을 경우)
git add workspace/android/app/build/outputs/apk/debug/apk_name.apk
- Commit & Push

## License

<img align="right" src="http://opensource.org/trademarks/opensource/OSI-Approved-License-100x137.png">

The class is licensed under the [MIT License](http://opensource.org/licenses/MIT):

Copyright &copy; 2020 [vesselofgod](http://www.github.com/vesselofgod) and [7dudtj](https://github.com/7dudtj).

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
