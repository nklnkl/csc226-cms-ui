import { Csc226CmsUiPage } from './app.po';

describe('csc226-cms-ui App', () => {
  let page: Csc226CmsUiPage;

  beforeEach(() => {
    page = new Csc226CmsUiPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!!');
  });
});
