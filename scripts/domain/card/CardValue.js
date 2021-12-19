class FaceValue {
  // Only Ace have soft value.
  static ACE = new FaceValue(1, 1, 11);

  /** CRA-V6-3.4.2 */
  static TWO = new FaceValue(2, 2);
  static THREE = new FaceValue(3, 3);
  static FOUR = new FaceValue(4, 4);
  static FIVE = new FaceValue(5, 5);
  static SIX = new FaceValue(6, 6);
  static SEVEN = new FaceValue(7, 7);
  static EIGHT = new FaceValue(8, 8);
  static NINE = new FaceValue(9, 9);
  static TEN = new FaceValue(10, 10);

  // Pictures
  static JACK = new FaceValue(11, 10);
  static QUEEN = new FaceValue(12, 10);
  static KING = new FaceValue(13, 10);

  /**
   *
   * @param {number} rank
   * @param {number} hardValue
   * @param {number} softValue
   */
  constructor(rank, hardValue, softValue) {
    this._rank = rank;
    this._hardValue = hardValue;
    this._softValue = softValue;
  }

  getRank = () => this._rank;
  getHardValue = () => this._hardValue;
  getSoftValue = () => this._softValue;
}
