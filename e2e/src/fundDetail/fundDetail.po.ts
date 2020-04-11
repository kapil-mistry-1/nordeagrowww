import { browser, by, element } from 'protractor';

export class FundDetailPage {
  navigateTo(): Promise<unknown> {
    return browser.get(browser.baseUrl) as Promise<unknown>;
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

  goToFundDetailPage(): Promise<boolean> {
    return element(by.css('#compareMutualFunds')).isPresent() as Promise<boolean>;
  }

  getPerformanceGraph(): Promise<boolean> {
    return element(by.tagName('app-performance-graph')).isPresent() as Promise<boolean>;
  }


}
