import { HomePage } from './home.po';
import { browser, logging } from 'protractor';


describe('Nordea Growww App Home page', () => {
  let page: HomePage;

  beforeEach(() => {
    page = new HomePage();
  });

  it('compare button present on home page', () => {
    page.navigateTo();
    expect(page.getCompareButton()).toBeTruthy();
  });

  it('global search exist on home page', async () => {
    page.autocompleteInput().click();
    expect((await page.autocompletePanel().getText()).length).toBeGreaterThan(0);
  });


  afterEach(async () => {
    // Assert that there are no errors emitted from the browser
    const logs = await browser.manage().logs().get(logging.Type.BROWSER);
    expect(logs).not.toContain(jasmine.objectContaining({
      level: logging.Level.SEVERE,
    } as logging.Entry));
  });
});
