import { RatemybillPage } from './app.po';

describe('ratemybill App', () => {
  let page: RatemybillPage;

  beforeEach(() => {
    page = new RatemybillPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
