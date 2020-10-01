package com.workspace;

import android.accessibilityservice.AccessibilityService;
import android.view.accessibility.AccessibilityEvent;
import android.content.Intent;
import android.util.Log;
import android.widget.Toast;
import android.content.DialogInterface;

public class MyAccessibilityService extends AccessibilityService {

    @Override
    public void onAccessibilityEvent(AccessibilityEvent event) {
        boolean denyApp = false;
        String packagename = "SNOW";//차단할 앱
        if(event.getEventType() == AccessibilityEvent.TYPE_WINDOW_STATE_CHANGED) {
            if(packagename.equals(event.getPackageName())) {
                Toast.makeText(this.getApplicationContext(), event.getPackageName() + "앱이 거부되었습니다", Toast.LENGTH_LONG);
                gotoHome();
            }
        }
    }
    @Override
    public void onInterrupt(){
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

