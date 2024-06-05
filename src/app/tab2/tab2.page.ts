import { Component } from '@angular/core';
import { OpenNativeSettings } from '@ionic-native/open-native-settings/ngx';
import { Contacts } from '@capacitor-community/contacts';

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
  retrieveContacts = async () => {
    // request projection
    const permissionState = await Contacts.requestPermissions();

    if (permissionState.contacts === 'granted') {
      console.log('Permission granted.');
      const projection = {
        // Specify which fields should be retrieved.
        name: true,
        phones: true,
      };

      try {
        const result = await Contacts.getContacts({
          projection,
        });
      } catch (error) {
        console.error(error);
      }
      // get all contacts
    }
  };
}
