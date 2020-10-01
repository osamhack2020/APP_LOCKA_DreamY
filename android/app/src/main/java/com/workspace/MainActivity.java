package com.workspace;

import com.facebook.react.ReactActivity;
import android.accessibilityservice.AccessibilityServiceInfo;
import android.view.accessibility.AccessibilityEvent;
import android.view.accessibility.AccessibilityManager;
import android.app.AlertDialog;
import android.content.Context;
import android.content.Intent;
import android.os.Bundle;
import android.provider.Settings;
import android.util.Log;
import android.content.DialogInterface;

import java.util.List;


public class MainActivity extends ReactActivity {

  /**
   * Returns the name of the main component registered from JavaScript. This is used to schedule
   * rendering of the component.
   */
  @Override
  protected String getMainComponentName() {
    return "workspace";
  }

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
