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
import com.workspace.MyAccessibilityService;

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
     public void startService() {
     // Service를 시작하는 것이 아닌 앱 강제종료가 되게끔 하는 메소드
     Toast.makeText(getReactApplicationContext(), MyAccessibilityService.getTime, Toast.LENGTH_LONG).show();
      MyAccessibilityService.turnOn();
     }

     @ReactMethod
     public void stopService() {
       // Service를 끄는 것이 아닌 앱 잠금해제가 되게끔 하는 메소드
      Toast.makeText(getReactApplicationContext(), "UNLOCK", Toast.LENGTH_SHORT).show();
      MyAccessibilityService.turnOff();
     }

  }
