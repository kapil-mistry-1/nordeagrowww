import { FundDetailPage } from './fundDetail.po';
import { browser, logging } from 'protractor';

describe('Nordea Growww App Fund Detail page', () => {
  let page: FundDetailPage;
  
  beforeEach(() => {
    page = new FundDetailPage();
  });


  it('select global search value and go to fund details', async () => {
    page.navigateTo();
    page.autocompleteInput().click();
    page.option('Axis Midcap Direct Plan Growth Fund').click();
    expect(page.goToFundDetailPage()).toBeTruthy();

  });

  it('performace graph exists on fund details', async () => {
    expect(page.getPerformanceGraph()).toBeTruthy();
  });

  afterEach(async () => {
    // Assert that there are no errors emitted from the browser
    const logs = await browser.manage().logs().get(logging.Type.BROWSER);
    expect(logs).not.toContain(jasmine.objectContaining({
      level: logging.Level.SEVERE,
    } as logging.Entry));
  });
});
