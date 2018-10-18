class Disclosure {
  constructor (options = {}) {
    this._setOptions(options);
    const detailsList = [...document.querySelectorAll(this.detailsSelector)];
    detailsList.forEach($details => this.init($details));
  }

  init ($details) {
    // CSSによって Transition させるために、デフォルトの高さを持たせる
    $details.style.height =
      $details.hasAttribute(this.flagAttribute)
        ?　　`${$details.clientHeight}px`
        : `${$details.querySelector(this.summarySelector).clientHeight}px`;

    $details.querySelector(this.summarySelector).addEventListener('click', e => {
      e.preventDefault()
      this.toggle(e.currentTarget.parentElement);
    })
  }

  // todo: イベントの廃棄管理
  destroy ($details) {}

  toggle ($details) {
    $details.hasAttribute(this.flagAttribute)
      ? this.close($details)
      : this.open($details)
  }

  open ($details) {
    $details.setAttribute(this.flagAttribute, '');
    const detailsStyles = window.getComputedStyle($details);

    $details.style.height = `${
    $details.scrollHeight
    - Number(detailsStyles.paddingTop.replace('px', ''))
    - Number(detailsStyles.paddingBottom.replace('px', ''))
      }px`;
  }

  close ($details) {
    $details.removeAttribute(this.flagAttribute);
    $details.style.height = `${$details.querySelector(this.summarySelector).clientHeight}px`;
  }

  _setOptions (options) {
    // デフォルトのオプションを設定
    this.detailsSelector = 'details';
    this.summarySelector = 'summary';
    this.flagAttribute = 'open';

    // デフォルト設定を ユーザカスタムで上書き
    Object.assign(this, options);
  }
}

const disclosure = new Disclosure({
  // デフォルトのやつ
  detailsSelector: 'details',
  summarySelector: 'summary',
  flagAttribute: 'open',
});

// メソッド呼び出してみる
document.querySelector('.js-button-toggle').addEventListener('click', () => {
  disclosure.toggle(document.querySelector('.js-close-el'));
});

// document.querySelector('.js-button-init').addEventListener('click', () => {
//   disclosure.init(document.querySelector('.js-init-el'));
// });
