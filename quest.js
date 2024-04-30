const calendar = [];

// represents 4 months
for (let i = 0; i < 120; i++) {
  calendar.push([]);
}

let currentDate = 0;
function dayPassed() {
  currentDate++;
}

class Quest {
  constructor({
    name,
    reward,
    difficulty,
    date,
    maxClaims,
    maxPool,
  }) {
    if (!name || !reward || date === undefined) {
      throw new Error('Quest must have a name, reward, and date');
    }
    this.name = name;
    this.reward = reward;
    this.date = date;
    this.difficulty = difficulty || 50;
    this.maxClaims = maxClaims || Infinity;
    this.maxPool = maxPool || Infinity;
    this.currentClaims = 0;
  }

  do() {
    if (this.reward > this.maxPool) {
      return 0;
    }
    if (this.currentClaims < this.maxClaims) {
      this.currentClaims++;
      this.maxPool -= this.reward;
      return this.reward;
    }
    return 0;
  }
}

module.exports = {
  calendar,
  Quest,
  currentDate,
  dayPassed,
};