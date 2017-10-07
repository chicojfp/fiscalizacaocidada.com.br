import { FiscalSocialPage } from './app.po';

describe('fiscal-social App', () => {
  let page: FiscalSocialPage;

  beforeEach(() => {
    page = new FiscalSocialPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
