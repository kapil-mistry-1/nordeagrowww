import { browser, by, element } from 'protractor';

export class HomePage {
  navigateTo(): Promise<unknown> {
    return browser.get(browser.baseUrl) as Promise<unknown>;
  }

  getCompareButton(): Promise<boolean>{
    return element(by.css('#btnCompareInvest')).isPresent() as Promise<boolean>;
  }

  autocompleteInput() {
    return element(by.id('searchInput'));
  }

  autocompletePanel() {
    return element(by.css('.mat-autocomplete-panel'));
  }

  option(text: string) {
    return element(by.cssContainingText('mat-option', text));
  }
  
  getInputText() {
    return this.autocompleteInput().getAttribute('value');
  }

}
