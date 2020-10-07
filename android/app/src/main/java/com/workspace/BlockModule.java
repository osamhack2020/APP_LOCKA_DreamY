package com.workspace;

import android.content.Intent;
import android.content.Context;

import com.facebook.react.bridge.NativeModule;
import com.facebook.react.bridge.ReactApplicationContext;
//import com.facebook.react.bridge.ReactContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import android.widget.Toast;

import android.os.Bundle;
import android.provider.Settings;

import androidx.appcompat.app.AppCompatActivity;
import com.facebook.react.ReactActivity;


import android.app.AlertDialog;
import android.accessibilityservice.AccessibilityServiceInfo;
import android.view.accessibility.AccessibilityEvent;
import android.view.accessibility.AccessibilityManager;
import android.content.DialogInterface;
import android.os.PersistableBundle;
import android.util.Log;
import java.util.List;

import javax.annotation.Nonnull;


public class BlockModule extends ReactContextBaseJavaModule {
    public static final String REACT_CLASS = "Block";
    private static ReactApplicationContext reactContext;//만약 안되면 주석처리.
    

    public class MainActivity extends ReactActivity {
      private static final String TAG = "MainActivity";
      /*
      @Override
      protected void onCreate(Bundle savedInstanceState) {
          super.onCreate(savedInstanceState);
          //setContentView(R.layout.activity_main);
  
          // 접근성 권한이 없으면 접근성 권한 설정하는 다이얼로그 띄워주는 부분
          if(!checkAccessibilityPermissions()) {
              setAccessibilityPermissions();
          }
      }
      */
      // 접근성 권한이 있는지 없는지 확인하는 부분
      // 있으면 true, 없으면 false
      public boolean checkAccessibilityPermissions() {
          AccessibilityManager accessibilityManager = (AccessibilityManager) getSystemService(Context.ACCESSIBILITY_SERVICE);
  
          // getEnabledAccessibilityServiceList는 현재 접근성 권한을 가진 리스트를 가져오게 된다
          List<AccessibilityServiceInfo> list = accessibilityManager.getEnabledAccessibilityServiceList(AccessibilityServiceInfo.DEFAULT);
  
          for (int i = 0; i < list.size(); i++) {
              AccessibilityServiceInfo info = list.get(i);
  
              // 접근성 권한을 가진 앱의 패키지 네임과 패키지 네임이 같으면 현재앱이 접근성 권한을 가지고 있다고 판단함
              if (info.getResolveInfo().serviceInfo.packageName.equals(getApplication().getPackageName())) {
                  return true;
              }
          }
          return false;
      }
  
      // 접근성 설정화면으로 넘겨주는 부분
      public void setAccessibilityPermissions() {
          AlertDialog.Builder gsDialog = new AlertDialog.Builder(this);
          gsDialog.setTitle("접근성 권한 설정");
          gsDialog.setMessage("접근성 권한을 필요로 합니다");
          gsDialog.setPositiveButton("확인", new DialogInterface.OnClickListener() {
              public void onClick(DialogInterface dialog, int which) {
                  // 설정화면으로 보내는 부분
                  startActivity(new Intent(Settings.ACTION_ACCESSIBILITY_SETTINGS));
                  return;
              }
          }).create().show();
      }
  }

    public BlockModule(@Nonnull ReactApplicationContext reactContext) {
      super(reactContext);
      this.reactContext = reactContext;
    }
    
    @Nonnull
    @Override
    public String getName() {
      return REACT_CLASS;
    }
    
    //이 부분을 그냥 생함수로 짜야할 수도 있음. 근데 사실 큰 구조는 다르지 않음.
    //근데 만약에 이렇게 짰는데 안돌아가면 그냥 service짠거를 여기에 넣어야 할 수도 있음.
    @ReactMethod
     public void startService(String message, int duration) {
     // Starting the heartbeat service
      Toast.makeText(getReactApplicationContext(), message, duration).show();
      this.reactContext.startService(new Intent(this.reactContext, MyAccessibilityService.class));
     }

     @ReactMethod
     public void stopService() {
         this.reactContext.stopService(new Intent(this.reactContext, MyAccessibilityService.class));
     }


     @ReactMethod
     public boolean RNcheckAccessibilityPermissions(){
        MainActivity mainAcc = new MainActivity();
        boolean result = mainAcc.checkAccessibilityPermissions();
        return result;
      }
  }
