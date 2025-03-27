import { Component, Inject } from '@angular/core';
import { Screen } from './screen';
import { Screens } from './app.screens';
import * as mocks from 'mocks/index';
import * as moment from 'moment-timezone';
import { Hooks } from './app.hooks';
import { Bootstrap, TBootstrap } from 'smartux-client';
import * as translations from '../i18n';
import { TranslateService } from '@ngx-translate/core';
declare const window: any;

@Component({
  templateUrl: 'app.html'
})
export class ClientApp extends Screen {

    constructor( @Inject(Bootstrap) bootstrap: TBootstrap, hooks: Hooks, private translate: TranslateService) {
    super();
    bootstrap(hooks, Screens.mapping, mocks, translations);
    translate.setDefaultLang('en-US');
    moment.locale('en-US');
    this.checkDeviceLang();
  }

    checkDeviceLang() {
        let lang = window.navigator.language;
        if (window.Intl) {
            lang = window.Intl.getCanonicalLocales(lang)[0];
        }
        let languages = this.translate.getLangs();
        if (languages.indexOf(lang) < 0) {
            // check if we have default translation file for the given country:
            let countryFileIndex = languages.indexOf(lang.split('-')[0]);
            if (countryFileIndex > -1) {
                lang = languages[countryFileIndex];
                this.translate.use(lang);
                moment.locale(lang);
            } else {
                // check the macth of language code without country code to choose more suitable language file:
                for (let i = 0; i < languages.length; i++) {
                    if (languages[i].split('-')[0] === lang.split('-')[0]) {
                        lang = languages[i];
                        this.translate.use(lang);
                        moment.locale(lang);
                        break;
                    }
                }
            }
        } else {
            this.translate.use(lang);
        }
        localStorage.lang = lang;
    }
}

