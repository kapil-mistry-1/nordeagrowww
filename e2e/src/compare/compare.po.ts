import { browser, by, element } from 'protractor';

export class ComparePage {
  navigateTo(): Promise<unknown> {
    return browser.get(browser.baseUrl) as Promise<unknown>;
  }

  goToComparePage(): Promise<boolean>{
    let compareButton =  element(by.id('btnCompareInvest')).click();
    browser.waitForAngular();
    return element(by.css('.growww__compare-container')).isPresent() as Promise<boolean>; 
  }

  selectFirstFundtoCompare() {
    return element(by.id('addFund1'));
  }

  autocompleteInput() {
    return element(by.id('searchInputModal'));
  }

  autocompletePanel() {
    return element(by.css('.mat-autocomplete-panel'));
  }

  option(text: string) {
    return element(by.cssContainingText('mat-option', text));
  }

  getFundCompareData() {
    return element(by.css('.growww__fund-name'));
  }
  
}
