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
    private static final int SERVICE_NOTIFICATION_ID = 12345;
    private static final String CHANNEL_ID = "Block";
    private static final String TAG = "AccessibilityService";




    @Override
    public void onAccessibilityEvent(AccessibilityEvent event) {
        boolean denyApp = true;
        PackageManager packageName = getPackageManager();
        List<PackageInfo> installList = packageName.getInstalledPackages(0);
        ArrayList packageNameList = new ArrayList();
    
        //installList.remove("com.workspace");
    
        for (int i=0; i < installList.size(); i++){
            packageNameList.add((String)installList.get(i).packageName);
        }

        //String packagename = "com.kakao.talk";//차단할 앱

        if(event.getEventType() == AccessibilityEvent.TYPE_WINDOW_STATE_CHANGED && denyApp) {
            for (int i=0; i < installList.size() ; i++ )
            {
                if(packageNameList.get(i).equals(event.getPackageName())) {
                    Toast.makeText(this.getApplicationContext(), event.getPackageName() + "앱이 거부되었습니다", Toast.LENGTH_LONG);
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

    /*
    @Override
    public void onDestroy() {
        super.onDestroy();
        this.handler.removeCallbacks(this.runnableCode);
    }
    */
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

