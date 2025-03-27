import { Component } from '@angular/core';
import { Screen } from 'app/screen';
import * as moment from 'moment-timezone';
import { TranslateService } from '@ngx-translate/core';
declare var window: any;

@Component({
  selector: 'screen-chooselanguage-phoneportrait',
  templateUrl: 'chooselanguage.html'
})
export class chooselanguage_PhonePortrait extends Screen {
    data: any;

    constructor(private translate: TranslateService) {
        super();
    }

  ngOnInit(): void {
    super.ngOnInit();
    // Logic to run when the screen loads goes here.
  }

  ngOnDestroy(): void {
    super.ngOnDestroy();
    // Logic to run when the screen unloads goes here.
  }

  onDataLoad(data: any): void {
    // Logic to run when the screen's data is updated goes here.
  }
  onBackButton(): boolean {
    //(Android) returns :
    // true - handle the event in App Hooks
    // false - stop the event propogation
      return true;
  }

  chooseLanguage(lang) {
      this.translate.use(lang);
      moment.locale(lang);
  }
}
