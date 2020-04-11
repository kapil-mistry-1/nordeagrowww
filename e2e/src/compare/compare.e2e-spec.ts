import { ComparePage } from './compare.po';
import { browser, logging } from 'protractor';

describe('Nordea Growww App Compare page', () => {
  let page: ComparePage;

  beforeEach(() => {
    page = new ComparePage();
  });

  it('clicks on compare button and goes to compare page', () => {
    page.navigateTo();
    expect(page.goToComparePage()).toBeTruthy();
  });

  it('clicks on add funds to open modal and select fund to compare', () => {
    page.selectFirstFundtoCompare().click();
    page.autocompleteInput().click();
    browser.waitForAngular();
    page.option('Axis Midcap Direct Plan Growth Fund').click();
    expect(page.getFundCompareData().getText()).toEqual('Axis Midcap Direct Plan Growth Fund');
  });

  afterEach(async () => {
    // Assert that there are no errors emitted from the browser
    const logs = await browser.manage().logs().get(logging.Type.BROWSER);
    expect(logs).not.toContain(jasmine.objectContaining({
      level: logging.Level.SEVERE,
    } as logging.Entry));
  });
});
