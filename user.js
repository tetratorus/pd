const TIER_1_REFERRAL_BONUS = 0.16;
const TIER_2_REFERRAL_BONUS = 0.08;
// const TIER_3_REFERRAL_BONUS = 0.04;

const { v4 } = require('uuid');

const parent = {
};

const children = {
};

const users = {
};

function createUser({
  referrerId,
  questRate,
  multiplierGachaRate,
  followers,
}) {
  const user = new User({
    referrerId,
    questRate,
    multiplierGachaRate,
    followers,
  });
  users[user.id] = user;
  if (referrerId) {
    parent[user.id] = referrerId;
    children[referrerId].push(user.id);
  }
  children[user.id] = [];

  return user;
}

class User {
  constructor({
    referrerId,
    questRate,
    multiplierGachaRate,
    followers,
  }) {
    this.id = v4();
    this.referrerId = referrerId || null;
    this.questRate = questRate;
    this.multiplierGachaRate = multiplierGachaRate;
    this.followers = followers;

    this.age = 0;
    this.points = 0;
    this.questPoints = 0;
    this.tier1Referrals = 0;
    this.tier2Referrals = 0;
    // this.tier3Referrals = 0;
    this.multiplier = 1;
  }

  addPoints(points, direct = false) {
    this.points += points;
    if (direct) {
      this.questPoints += points;
    }
    if (parent[this.id]) {
      users[parent[this.id]].addPoints(Math.round(points * TIER_1_REFERRAL_BONUS));
    }
    if (parent[parent[this.id]]) {
      users[parent[parent[this.id]]].addPoints(Math.round(points * TIER_2_REFERRAL_BONUS));
    }
    // if (parent[parent[parent[this.id]]]) {
    //   users[parent[parent[parent[this.id]]]].addPoints(Math.round(points * TIER_3_REFERRAL_BONUS));
    // }
  }

  dayPassed(quests) {
    this.age++;
    // simulate quests
    for (let i = 0; i < quests.length; quest++) {
      let quest = quests[i]
      if (Math.random() * this.questRate > quest.difficulty) {
        this.addPoints(quest.do());
      }
      // Math.random() * quest.difficulty < this.followers ? this.addPoints(quest.do()) : null;
    }
  }
}

module.exports = {
  createUser,
  parent,
  children,
  users,
};