package com.workspace;

import android.content.Intent;

import com.facebook.react.bridge.NativeModule;
import com.facebook.react.bridge.ReactApplicationContext;
//import com.facebook.react.bridge.ReactContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;

import android.app.AlertDialog;
import android.accessibilityservice.AccessibilityServiceInfo;
import android.view.accessibility.AccessibilityEvent;
import android.view.accessibility.AccessibilityManager;

import javax.annotation.Nonnull;


public class BlockModule extends ReactContextBaseJavaModule {
    public static final String REACT_CLASS = "Block";
    private static ReactApplicationContext reactContext;//만약 안되면 주석처리.

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
     public void startService() {
     // Starting the heartbeat service
      this.reactContext.startService(new Intent(this.reactContext, MyAccessibilityService.class));
     }

     @ReactMethod
     public void stopService() {
         this.reactContext.stopService(new Intent(this.reactContext, MyAccessibilityService.class));
     }


     @ReactMethod
     public boolean checkAccessibilityPermissions(){
      AccessibilityManager accessibilityManager = 
          (AccessibilityManager)getSystemService(Context.ACCESSIBILITY_SERVICE);
  
      List<AccessibilityServiceInfo> list = 
        accessibilityManager.getEnabledAccessibilityServiceList(AccessibilityServiceInfo.FEEDBACK_GENERIC);
  
      Log.d("service_test", "size : " + list.size());
      for(int i = 0; i < list.size(); i++){
          AccessibilityServiceInfo info = list.get(i);
          if(info.getResolveInfo().serviceInfo.packageName.equals(getApplication().getPackageName())){
              return true;
          }
      }
          return false;
      }

      @ReactMethod
      public void setAccessibilityPermissions(){
        AlertDialog.Builder permissionDialog = new AlertDialog.Builder(this);
        permissionDialog.setTitle("접근성 권한 설정");
        permissionDialog.setMessage("앱을 사용하기 위해 접근성 권한이 필요합니다.");
        permissionDialog.setPositiveButton("허용", new DialogInterface.OnClickListener() {
            @Override
            public void onClick(DialogInterface dialog, int which) {
                startActivity(new Intent(Settings.ACTION_ACCESSIBILITY_SETTINGS));
                return;
            }
        }).create().show();
    }

  }