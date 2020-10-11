package com.workspace;

import android.content.Intent;
import android.content.Context;

import com.facebook.react.bridge.WritableMap;
import com.facebook.react.bridge.Arguments;
import com.facebook.react.bridge.Promise;
import com.facebook.react.uimanager.PixelUtil;
import com.facebook.react.uimanager.IllegalViewOperationException;
import com.facebook.react.bridge.Callback;

import com.facebook.react.bridge.NativeModule;
import com.facebook.react.bridge.ReactApplicationContext;
//import com.facebook.react.bridge.ReactContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import android.widget.Toast;

import android.os.Bundle;

import android.app.AlertDialog;
import android.os.PersistableBundle;
import java.util.List;
import java.lang.Math;

import javax.annotation.Nonnull;

public class calcModule extends ReactContextBaseJavaModule {
    //계산기능 추가. 전역일계산, 
    public static final String REACT_CLASS = "calcModule";
    private static ReactApplicationContext reactContext;

    public int privateSalary = 408100;
    public int firstprivateSalary = 441700;
    public int corporalSalary = 488200;
    public int sergeantSalary = 540900;

    private final int[] mMeasureBuffer = new int[1];

    public calcModule(@Nonnull ReactApplicationContext reactContext) {
      super(reactContext);
      this.reactContext = reactContext;
    }
    
    @Nonnull
    @Override
    public String getName() {
      return REACT_CLASS;
    }

    @ReactMethod
     public void calcSalary(int selectMilitary, int Savings, Callback errorCallback, Callback successCallback) {
        /*
        육해공군별로 다르게 짜야 함. 
        0:육군 1:해군 2:공군 3:해병대
        */
        try{
          //calcSalary(selectMilitary, Savings);
          //WritableMap map = Arguments.createMap();
          int savingMoney = 0;
          int salarySum = 0;
          if(selectMilitary == 0 || selectMilitary == 3){
              salarySum=(privateSalary*2) + (firstprivateSalary*6) + (corporalSalary*6) + (sergeantSalary*4);
              savingMoney = (int) Math.round(((((savingMoney*0.055)/12)*18)*19)/2);
              salarySum+=savingMoney;
          }
          else if(selectMilitary == 1){
              salarySum=(privateSalary*2) + (firstprivateSalary*6) + (corporalSalary*6) + (sergeantSalary*6);
              savingMoney = (int) Math.round(((((savingMoney*0.055)/12)*18)*19)/2);
              salarySum+=savingMoney;
          }
          else{
              salarySum=(privateSalary*2) + (firstprivateSalary*6) + (corporalSalary*6) + (sergeantSalary*8);
              savingMoney = (int) Math.round(((((savingMoney*0.055)/12)*18)*19)/2);
              salarySum+=savingMoney;
          }
          successCallback.invoke(Integer.toString(salarySum));
        }
        catch (IllegalViewOperationException e) {
          errorCallback.invoke(e.getMessage());
        }

     }

     @ReactMethod
     public void calcVacation() {

     }

  }
