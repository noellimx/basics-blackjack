// ROUND

// Round Phase

class RoundPhase {
  static _NULL = new RoundPhase(null);
  // CRA-V6-1.24
  static COMMENCE = new RoundPhase("PLACE YOUR BETS, PLEASE");
  static INITIAL_BET = new RoundPhase("INITIAL BET");
  static INITIAL_DEAL = new RoundPhase("INITIAL DEAL");
  static IN_PLAY_PLAYERS = new RoundPhase("PLAY_PLAYERS");
  static IN_PLAY_DEALER = new RoundPhase("PLAY_DEALER");
  static END = new RoundPhase("END");

  constructor(desc) {
    this._desc = desc;
  }

  desc = () => this._desc;
}

class Round {
  __resetHooks = () => {
    this._onFinish = () => {
      throw new Error(`Error. Callback[_onFinish] must be configured`);
    };
    this.setOnFinish = (fn) => {
      this._onFinish = fn;
    };
  };

  /**
   *
   * @param {Lounge} lounge
   */
  constructor(lounge) {
    /** @private {Lounge} */
    this._lounge = lounge;

    this._phase = RoundPhase._NULL;
    this._rootQueueSeat = new Vertex(null);
    this._currentVertexSeat = this._rootQueueSeat;
    this._dealer = new Dealer(lounge.getDealer());
    this._dealer.setRound(this);
    const players = lounge.getPlayers();
    let thisVertexPlayer = this._rootQueueSeat;
    for (const player of players) {
      const vertexPlayer = new Vertex(new Seat(new Player(player)));
      thisVertexPlayer.setNext(vertexPlayer);
      thisVertexPlayer = vertexPlayer;
    }

    this.__resetHooks();
  }

  getCurrentSeat = () => this._currentVertexSeat.getElement();
  peekNextSeat = () => this._currentVertexSeat.peekNextElement();
  getPhase = () => this._phase;

  /**
   *
   * @returns {Dealer}
   */
  getDealer = () => this._dealer;

  finish = (isContinue) => {
    if (!(isContinue === false || isContinue === true)) {
      throw new Error(`Continue or not?`);
    }

    this._onFinish(this._lounge, isContinue);
    this.__resetHooks();
  };
}

newRound = (lounge) => {
  let reject = false;
  let rejectDescription = [];
  if (!lounge.getDealer()) {
    reject = true;
    rejectDescription.push(`newRound no dealer.`);
  }
  if (!(lounge.getPlayers().length > 0)) {
    reject = true;
    rejectDescription.push(`newRound no player.`);
  }

  if (reject) {
    throw new Error(rejectDescription.join(" "));
  }

  return new Round(lounge);
};
