import { Component } from '@angular/core';
import { EmailComposer } from '@ionic-native/email-composer/ngx';
import { Subject } from 'rxjs';

declare var cordova: any;

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss'],
})
export class Tab3Page {
  constructor(private emailComposer: EmailComposer) {}

  sendEmail() {
    this.emailComposer.isAvailable().then((available: boolean) => {
      if (available) {
        // Now we know we can send
        console.log('Email composer is available!');
        let email = {
          to: 'test@example.com',
          subject: 'Test email',
          body: 'How are you? Nice greetings from Ionic.',
          isHtml: true,
        };

        // Send a text email
        this.emailComposer.open(email);
      } else {
        console.log('Email composer is not available...');
      }
    });
  }
}
