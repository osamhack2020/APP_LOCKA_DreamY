package com.workspace;

import android.accessibilityservice.AccessibilityService;
import android.view.accessibility.AccessibilityEvent;
import android.content.Intent;
import android.app.PendingIntent;
import android.widget.Toast;
import android.os.Handler;
import android.app.NotificationManager;
import android.app.NotificationChannel;
import android.os.Build;
import androidx.core.app.NotificationCompat;
import android.app.Notification;
import android.util.Log;
import android.content.Context;
import com.facebook.react.HeadlessJsTaskService;
import android.content.pm.PackageManager;
import java.util.List;
import android.content.pm.PackageInfo;
import java.util.ArrayList;

public class MyAccessibilityService extends AccessibilityService {
    private static final String CHANNEL_ID = "Block";
    private static boolean denyApp = true;
    private PackageManager packageNames = getPackageManager();
    private List<PackageInfo> installList = packageNames.getInstalledPackages(0);
    private static ArrayList<String> packageNameList = new ArrayList<String>();

    public static void turnOn() {
        denyApp = true;
    }

    public static void turnOff() {
        denyApp = false;
    }

    @Override
    public void onAccessibilityEvent(AccessibilityEvent event) {
        if(event.getEventType() == AccessibilityEvent.TYPE_WINDOW_STATE_CHANGED && denyApp) {
            if(packageNameList.contains(event.getPackageName())) {
                Toast.makeText(this.getApplicationContext(), event.getPackageName() + "앱이 거부되었습니다", Toast.LENGTH_LONG);
                gotoHome();
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
        for(int i=0; i < installList.size(); i++){
            packageNameList.add((String)installList.get(i).packageName);
        }
        //packageNameList.remove("com.workspace");
        packageNameList.remove("com.android.phone");
        packageNameList.remove("com.android.settings");
        packageNameList.remove("com.kakao.talk");
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

