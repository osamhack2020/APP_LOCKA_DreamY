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
import android.os.PersistableBundle;
import java.util.List;



public class MainActivity extends ReactActivity {
    private final int OVERLAY_PERMISSION_REQ_CODE = 1;  // Choose any value

  /**
   * Returns the name of the main component registered from JavaScript. This is used to schedule
   * rendering of the component.
   */

  @Override
  protected String getMainComponentName() {
    return "workspace";
  }

  @Override
  public void onCreate(Bundle saveInstanceState) {
    /*
    super.onCreate(saveInstanceState);

    if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.M) {
        if (!Settings.canDrawOverlays(this)) {
            Intent intent = new Intent(Settings.ACTION_MANAGE_OVERLAY_PERMISSION,
                                       Uri.parse("package:" + getPackageName()));
            startActivityForResult(intent, OVERLAY_PERMISSION_REQ_CODE);
        }
    }
    */
    AlertDialog.Builder builder = new AlertDialog.Builder(this);
    builder.setTitle("기본 다이얼로그");
    builder.setMessage("다이얼로그의 본문,");
    builder.setPositiveButton("Pos", null);
    builder.show();
    /*
    checkAccessibilityPermissions();
    setAccessibilityPermissions();
    */
}

/*
    @Override
    protected void onActivityResult(int requestCode, int resultCode, Intent data) {
    if (requestCode == OVERLAY_PERMISSION_REQ_CODE) {
        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.M) {
            if (!Settings.canDrawOverlays(this)) {
                // SYSTEM_ALERT_WINDOW permission not granted
            }
        }
    }
    mReactInstanceManager.onActivityResult( this, requestCode, resultCode, data );
    }*/

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
