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
import java.util.Calendar;
import java.text.SimpleDateFormat;

public class MyAccessibilityService extends AccessibilityService {
    protected static final String CHANNEL_ID = "Block";
    protected static boolean denyApp = true;
    protected static Calendar currentDate = Calendar.getInstance();
    protected static long now = System.currentTimeMillis();
    protected static Date mDate = new Date(now);
    protected static String getTime = new SimpleDateFormat("yyyyMMddHHmm").format(mDate);
    protected static int currentTime = Integer.parseInt(getTime.substring(getTime.length()-4, getTime.length()));
    protected static int dayOfWeek = currentDate.get(Calendar.DAY_OF_WEEK);

    //폰 내는 시간
    protected static int lockedtime = 2100;
    //폰 받는 시간emf
    protected static int weekendunlockedtime = 1030;
    protected static int unlockedtime = 1800;
    

    public static void turnOn() {
        denyApp = true;
    }

    public static void turnOff() {
        denyApp = false;
    }

    public static void getCurrentTime() {
        //현재 시간을 가져와서 잠금상태를 결정함.
        currentDate = Calendar.getInstance();
        dayOfWeek = currentDate.get(Calendar.DAY_OF_WEEK);
        now = System.currentTimeMillis();
        mDate = new Date(now);
        getTime = new SimpleDateFormat("yyyyMMddHHmm").format(mDate);
        currentTime = Integer.parseInt(getTime.substring(getTime.length()-4, getTime.length()));

        if (dayOfWeek==1 || dayOfWeek==7){
            if (currentTime>lockedtime || currentTime<weekendunlockedtime) {denyApp = true;}
            else{denyApp = false;}
        }
        else{
            if (currentTime>lockedtime || currentTime<unlockedtime) {denyApp = true;}
            else{denyApp = false;}
        }
    }

    @Override
    public void onAccessibilityEvent(AccessibilityEvent event) {
        getCurrentTime();
        PackageManager packageNames = getPackageManager();
        List<PackageInfo> installList = packageNames.getInstalledPackages(0);
        ArrayList packageNameList = new ArrayList();
        
        for(int i=0; i < installList.size(); i++){
            packageNameList.add((String)installList.get(i).packageName);
        }
        packageNameList.remove("com.workspace");
        packageNameList.remove("com.samsung.android.honeyboard");
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

