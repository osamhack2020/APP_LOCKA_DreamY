package com.workspace;

import android.content.Intent;
import android.content.Context;

import com.facebook.react.bridge.NativeModule;
import com.facebook.react.bridge.ReactApplicationContext;
//import com.facebook.react.bridge.ReactContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import android.widget.Toast;
import com.facebook.react.bridge.Promise;
import com.facebook.react.bridge.Callback;

import android.os.Bundle;
import android.provider.Settings;

import androidx.appcompat.app.AppCompatActivity;
import com.facebook.react.ReactActivity;
import android.app.Activity;

import android.app.AlertDialog;
import android.accessibilityservice.AccessibilityServiceInfo;
import android.view.accessibility.AccessibilityEvent;
import android.view.accessibility.AccessibilityManager;
import android.content.DialogInterface;
import android.os.PersistableBundle;
import android.util.Log;
import java.util.List;

import javax.annotation.Nonnull;
import com.workspace.MyAccessibilityService;
import com.workspace.MainActivity;

public class BlockModule extends ReactContextBaseJavaModule {
    public static final String REACT_CLASS = "Block";
    private static ReactApplicationContext reactContext;

    public BlockModule(@Nonnull ReactApplicationContext reactContext) {
      super(reactContext);
      this.reactContext = reactContext;
    }
    
    @Nonnull
    @Override
    public String getName() {
      return REACT_CLASS;
    }

    @ReactMethod
    public void checkPermissionOn(Callback booleanCallback) {
      // 현재 LOCKA의 접근성서비스가 켜져있는지 확인할 수 있는 함수
      //if(MainActivity.AccessPermission){Toast.makeText(getReactApplicationContext(), "True: "+MainActivity.AccessApps , Toast.LENGTH_SHORT).show();}
      //else{Toast.makeText(getReactApplicationContext(), "False : "+MainActivity.AccessApps, Toast.LENGTH_SHORT).show();}
      boolean accessibilityPermission = MainActivity.AccessPermission;
      booleanCallback.invoke(accessibilityPermission);
    }

    @ReactMethod
     public void startService() {
     // Service를 시작하는 것이 아닌 앱 강제종료가 되게끔 하는 메소드
      Toast.makeText(getReactApplicationContext(), "휴대폰이 반납되었습니다.", Toast.LENGTH_SHORT).show();
      MyAccessibilityService.turnOn();
     }

     @ReactMethod
     public void stopService() {
       // Service를 끄는 것이 아닌 앱 잠금해제가 되게끔 하는 메소드
       MyAccessibilityService.getCurrentTime();
      if(!MyAccessibilityService.denyApp)
      {
        Toast.makeText(getReactApplicationContext(), "잠금이 해제되었습니다.", Toast.LENGTH_SHORT).show();
      }
      else
      {
        Toast.makeText(getReactApplicationContext(), "지금은 잠금해제가 불가능합니다.", Toast.LENGTH_SHORT).show();
      }
      MyAccessibilityService.turnOff();
     }

     @ReactMethod
     public void setAccessibilityPermissions() {
      Activity activity = getCurrentActivity();
      AlertDialog.Builder gsDialog = new AlertDialog.Builder(activity);
      gsDialog.setTitle("접근성 권한 설정");
      gsDialog.setMessage("접근성 권한을 필요로 합니다");
      gsDialog.setPositiveButton("확인", new DialogInterface.OnClickListener() {
          public void onClick(DialogInterface dialog, int which) {
              // 설정화면으로 보내는 부분
            activity.startActivity(new Intent(Settings.ACTION_ACCESSIBILITY_SETTINGS));
            return;
          }
      }).create().show();
    }

  }
