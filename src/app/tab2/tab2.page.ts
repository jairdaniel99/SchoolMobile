import { Component } from '@angular/core';
import { OpenNativeSettings } from '@ionic-native/open-native-settings/ngx';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss'],
})
export class Tab2Page {
  constructor(private openNativeSettings: OpenNativeSettings) {}

  openSettings(setting: string) {
    this.openNativeSettings
      .open(setting)
      .then((val) => alert(val))
      .catch((err) => alert(JSON.stringify(err)));
    console.log('open settings');
  }
}
