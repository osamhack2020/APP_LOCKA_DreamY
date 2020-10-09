package com.workspace;

import android.accessibilityservice.AccessibilityService;
import android.view.accessibility.AccessibilityEvent;
import android.content.Intent;
import android.widget.Toast;
//import android.os.Build;
import android.app.Notification;
import android.content.Context;
import android.content.pm.PackageManager;
import java.util.List;
import android.content.pm.PackageInfo;
import java.util.ArrayList;
import com.facebook.react.bridge.ReactApplicationContext;

import java.util.Date;
import java.text.SimpleDateFormat;

public class MyAccessibilityService extends AccessibilityService {
    protected static final String CHANNEL_ID = "Block";
    protected static boolean denyApp = true;
    protected static long now = System.currentTimeMillis();
    protected static Date mDate = new Date(now);
    protected static String getTime = new SimpleDateFormat("yyyyMMddHHmm").format(mDate);
    protected static int result = Integer.parseInt(getTime.substring(getTime.length()-4, getTime.length()));
    public static void turnOn() {
        denyApp = true;
    }

    public static void turnOff() {
        denyApp = false;
    }

    @Override
    public void onAccessibilityEvent(AccessibilityEvent event) {
        now = System.currentTimeMillis();
        mDate = new Date(now);
        getTime = new SimpleDateFormat("yyyyMMddHHmm").format(mDate);
        int result = Integer.parseInt(getTime.substring(getTime.length()-4, getTime.length()));
        PackageManager packageNames = getPackageManager();
        List<PackageInfo> installList = packageNames.getInstalledPackages(0);
        ArrayList packageNameList = new ArrayList();
        
        for(int i=0; i < installList.size(); i++){
            packageNameList.add((String)installList.get(i).packageName);
        }
        packageNameList.remove("com.workspace");
        if(event.getEventType() == AccessibilityEvent.TYPE_WINDOW_STATE_CHANGED && denyApp) {
            for (int i=0; i < packageNameList.size() ; i++ )
            {	            
                if(packageNameList.get(i).equals(event.getPackageName())) {
                    //Toast.makeText(this.getReactApplicationContext(), event.getPackageName() + "앱이 거부되었습니다", Toast.LENGTH_LONG);
                    gotoHome();
                }
            }
        }
    }
    
    @Override
    public void onInterrupt(){
        // TODO Auto-generated method stub
    }

    @Override
    public void onCreate() {
        super.onCreate();
    }

    private void gotoHome(){
        Intent intent = new Intent();
        intent.setAction("android.intent.action.MAIN");
        intent.addCategory("android.intent.category.HOME");
        intent.addFlags(Intent.FLAG_ACTIVITY_EXCLUDE_FROM_RECENTS
                | Intent.FLAG_ACTIVITY_FORWARD_RESULT
                | Intent.FLAG_ACTIVITY_NEW_TASK | Intent.FLAG_ACTIVITY_PREVIOUS_IS_TOP
                | Intent.FLAG_ACTIVITY_RESET_TASK_IF_NEEDED);
        startActivity(intent);
    }
}

