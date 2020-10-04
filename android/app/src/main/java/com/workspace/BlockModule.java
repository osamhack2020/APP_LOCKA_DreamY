package com.workspace;

import android.content.Intent;

import com.facebook.react.bridge.NativeModule;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;

import javax.annotation.Nonnull;
import java.util.Map;
import java.util.HashMap;

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
    
    @ReactMethod
     public void startService() {
     // Starting the heartbeat service
      this.reactContext.startService(new Intent(this.reactContext, MyAccessibilityService.class));
     }

     @ReactMethod
     public void stopService() {
         this.reactContext.stopService(new Intent(this.reactContext, MyAccessibilityService.class));
     }
  }