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

import android.content.Context;
import com.facebook.react.HeadlessJsTaskService;


public class MyAccessibilityService extends AccessibilityService {
    private static final int SERVICE_NOTIFICATION_ID = 12345;
    private static final String CHANNEL_ID = "Block";

    private Handler handler = new Handler();
    private Runnable runnableCode = new Runnable() {
        @Override
        public void run() {
            Context context = getApplicationContext();
            Intent myIntent = new Intent(context, MyAccessibilityServiceEvent.class);
            context.startService(myIntent);
            HeadlessJsTaskService.acquireWakeLockNow(context);
            handler.postDelayed(this, 2000);
        }
    };    

    @Override
    public void onAccessibilityEvent(AccessibilityEvent event) {
        boolean denyApp = false;
        String packagename = "SNOW";//차단할 앱
        //서비스 돌아가는지 확인
        if(event.getEventType() == AccessibilityEvent.TYPE_WINDOW_STATE_CHANGED) {
            Toast.makeText(this.getApplicationContext(), "앱이 거부되었습니다", Toast.LENGTH_LONG);
            if(packagename.equals(event.getPackageName())) {
                Toast.makeText(this.getApplicationContext(), event.getPackageName() + "앱이 거부되었습니다", Toast.LENGTH_LONG);
                gotoHome();
            }
        }
    }
    
    @Override
    public void onInterrupt(){
    }

    @Override
    public void onCreate() {
        super.onCreate();

    }

    @Override
    public void onDestroy() {
        super.onDestroy();
        this.handler.removeCallbacks(this.runnableCode);
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

    private void createNotificationChannel() {
        // Create the NotificationChannel, but only on API 26+ because
        // the NotificationChannel class is new and not in the support library
        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.O) {
            int importance = NotificationManager.IMPORTANCE_DEFAULT;
            NotificationChannel channel = new NotificationChannel(CHANNEL_ID, "HEARTBEAT", importance);
            channel.setDescription("CHANEL DESCRIPTION");
            NotificationManager notificationManager = getSystemService(NotificationManager.class);
            notificationManager.createNotificationChannel(channel);
        }
    }

    @Override
    public int onStartCommand(Intent intent, int flags, int startId) {
        //이 함수 설명이 좀 되어야 할 거 같음.
        //Notification띄워주는 함수, 그래야 서비스가 foreground로 인식됨.
      this.handler.post(this.runnableCode); // Starting the interval
      // Turning into a foreground service
      createNotificationChannel(); // Creating channel for API 26+
      Intent notificationIntent = new Intent(this, MainActivity.class);
      PendingIntent contentIntent = PendingIntent.getActivity(this, 0, notificationIntent, PendingIntent.FLAG_CANCEL_CURRENT);
      Notification notification = new NotificationCompat.Builder(this, CHANNEL_ID)
        .setContentTitle("Block service")
        .setContentText("Running…")
        .setSmallIcon(R.mipmap.ic_launcher)
        .setContentIntent(contentIntent)
        .setOngoing(true)
        .build();
        startForeground(SERVICE_NOTIFICATION_ID, notification);
        return START_STICKY;
    }

}

