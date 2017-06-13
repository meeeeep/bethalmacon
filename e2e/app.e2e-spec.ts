import { BethalMacon2Page } from './app.po';

describe('bethal-macon2 App', () => {
  let page: BethalMacon2Page;

  beforeEach(() => {
    page = new BethalMacon2Page();
  });

  it('should display welcome message', done => {
    page.navigateTo();
    page.getParagraphText()
      .then(msg => expect(msg).toEqual('Welcome to app!!'))
      .then(done, done.fail);
  });
});
