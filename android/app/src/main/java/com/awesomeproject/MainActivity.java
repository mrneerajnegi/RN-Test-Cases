package com.awesomeproject;
import android.app.NotificationChannel;
import android.app.NotificationManager;
import android.os.Build;
import android.media.AudioAttributes;
import androidx.core.app.NotificationCompat;
import android.net.Uri;
import android.content.ContentResolver;
import com.facebook.react.ReactActivity;
import android.os.Bundle;
public class MainActivity extends ReactActivity {

  /**
   * Returns the name of the main component registered from JavaScript. This is used to schedule
   * rendering of the component.
   */
  @Override
  protected String getMainComponentName() {
    return "AwesomeProject";
  }
  @Override
  protected void onCreate(Bundle savedInstanceState) {
    super.onCreate(savedInstanceState);

  if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.O) {
NotificationChannel notificationChannel = new NotificationChannel("new_email_arrived_channel", "My Emailer", NotificationManager.IMPORTANCE_HIGH);
notificationChannel.setShowBadge(true);
notificationChannel.setDescription("");
AudioAttributes att = new AudioAttributes.Builder()
.setUsage(AudioAttributes.USAGE_NOTIFICATION)
.setContentType(AudioAttributes.CONTENT_TYPE_SPEECH)
.build();
notificationChannel.setSound(Uri.parse(ContentResolver.SCHEME_ANDROID_RESOURCE + "://" + getPackageName() + "/raw/bark"), att);
notificationChannel.enableVibration(true);
notificationChannel.setVibrationPattern(new long[]{400, 400});
notificationChannel.setLockscreenVisibility(NotificationCompat.VISIBILITY_PUBLIC);
NotificationManager manager = getSystemService(NotificationManager.class);
manager.createNotificationChannel(notificationChannel);
}
  }
}
