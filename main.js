

// user creation parameters
const BASE_QUEST_RATE = 50;
const MAX_QUEST_RATE = 200;
const BASE_DAILY_MULTIPLIER_GACHA_RATE = 0.1;
const MAX_DAILY_MULTIPLIER_GACHA_RATE = 0.8;

// referral parameters
const RATIO_OF_ORGANIC_USERS = 0.4
const FOLLOWERS_POWER_LAW_K = 0.03;       // Adjust k for more skew (smaller k -> more skew)
const FOLLOWERS_POWER_LAW_THETA = 500000; // Maximum possible number of followers
const FOLLOWERS_MIN_BASE = 50;     // Minimum possible number of followers
const FOLLOWERs_MIN_RANGE = 50;    // Range of possible minimum follower

// community growth parameters
const NEW_USER_RATIO = 0.1;
const MIN_NEW_USER = 50;

const { calendar, Quest } = require('./quest');
const { users, createUser } = require('./user');
const { powerDistributionSample } = require('./utils');
const { parent } = require('./user');
const { GACHA_RATES, upgradeGacha, gachaDecision } = require('./multiplier');


function getQuestRate() {
  return Math.floor(BASE_QUEST_RATE + Math.random() * (MAX_QUEST_RATE - BASE_QUEST_RATE));
}

function getMultiplierGachaRate() {
  const dec = BASE_DAILY_MULTIPLIER_GACHA_RATE + Math.random() * (MAX_DAILY_MULTIPLIER_GACHA_RATE - BASE_DAILY_MULTIPLIER_GACHA_RATE);
  return Math.floor(dec * 100) / 100
}

function getFollowers() {
  return powerDistributionSample(FOLLOWERS_POWER_LAW_K, FOLLOWERS_POWER_LAW_THETA) + Math.floor(FOLLOWERS_MIN_BASE + Math.random() * FOLLOWERs_MIN_RANGE);
}

// quest structure
//     name: string,
//     reward: number,
//     difficulty: number between 1-100,
//     date: number between 0 to 120,
//     maxClaims: number,
//     maxPool: number,


// quests data, days 0 - 120
//  Not all days have quests But at least one quest every three days Difficulty is random between 20 to 80
//  Reward is random between 100 to 500
const questsData = [
  {
    name: 'Quest 1',
    reward: 100,
    difficulty: 10,
    date: 0,
  },
  {
    name: 'Quest 2',
    reward: 200,
    difficulty: 20,
    date: 1,
  },
  {
    name: 'Quest 3',
    reward: 120,
    difficulty: 23,
    date: 2,
  },
  {
    name: 'Quest 4',
    reward: 300,
    difficulty: 25,
    date: 3,
  },
  {
    name: 'Quest 5',
    reward: 150,
    difficulty: 20,
    date: 4,
  },
  {
    name: 'Quest 6',
    reward: 400,
    difficulty: 15,
    date: 5,
  },
  {
    name: 'Quest 7',
    reward: 200,
    difficulty: 10,
    date: 6,
  },
  {
    name: 'Quest 8',
    reward: 500,
    difficulty: 45,
    date: 7,
  },
  {
    name: 'Quest 9',
    reward: 250,
    difficulty: 20,
    date: 10,
  },
  {
    name: 'Quest 10',
    reward: 600,
    difficulty: 28,
    date: 13,
  },
  {
    name: 'Quest 11',
    reward: 300,
    difficulty: 54,
    date: 15,
  },
  {
    name: 'Quest 12',
    reward: 700,
    difficulty: 60,
    date: 18,
  },
  {
    name: 'Quest 13',
    reward: 350,
    difficulty: 30,
    date: 21,
  },
  {
    name: 'Quest 14',
    reward: 800,
    difficulty: 70,
    date: 22,
  },
  {
    name: 'Quest 15',
    reward: 400,
    difficulty: 40,
    date: 24,
  },
  {
    name: 'Quest 16',
    reward: 900,
    difficulty: 80,
    date: 27,
  },
  {
    name: 'Quest 17',
    reward: 450,
    difficulty: 45,
    date: 30,
  },
  {
    name: 'Quest 18',
    reward: 1000,
    difficulty: 90,
    date: 33,
  },
  {
    name: 'Quest 19',
    reward: 500,
    difficulty: 50,
    date: 34,
  },
  {
    name: 'Quest 20',
    reward: 1100,
    difficulty: 100,
    date: 35,
  },
  {
    name: 'Quest 21',
    reward: 550,
    difficulty: 55,
    date: 38,
  },
  {
    name: 'Quest 22',
    reward: 1200,
    difficulty: 45,
    date: 41,
  },
  {
    name: 'Quest 23',
    reward: 600,
    difficulty: 60,
    date: 42,
  },
  {
    name: 'Quest 24',
    reward: 1300,
    difficulty: 65,
    date: 44,
  },
  {
    name: 'Quest 25',
    reward: 650,
    difficulty: 70,
    date: 46,
  },
  {
    name: 'Quest 26',
    reward: 1400,
    difficulty: 75,
    date: 49,
  },
  {
    name: 'Quest 27',
    reward: 700,
    difficulty: 80,
    date: 51,
  },
  {
    name: 'Quest 28',
    reward: 1500,
    difficulty: 85,
    date: 52,
  },
  {
    name: 'Quest 29',
    reward: 750,
    difficulty: 90,
    date: 55,
  },
  {
    name: 'Quest 30',
    reward: 1600,
    difficulty: 95,
    date: 58,
  },
  {
    name: 'Quest 31',
    reward: 800,
    difficulty: 100,
    date: 61,
  },
  {
    name: 'Quest 32',
    reward: 1700,
    difficulty: 50,
    date: 64,
  },
  {
    name: 'Quest 33',
    reward: 850,
    difficulty: 55,
    date: 67,
  },
  {
    name: 'Quest 34',
    reward: 1800,
    difficulty: 60,
    date: 70,
  },
  {
    name: 'Quest 35',
    reward: 900,
    difficulty: 65,
    date: 73,
  },
  {
    name: 'Quest 36',
    reward: 1900,
    difficulty: 70,
    date: 74,
  },
  {
    name: 'Quest 37',
    reward: 950,
    difficulty: 75,
    date: 77,
  },
  {
    name: 'Quest 38',
    reward: 2000,
    difficulty: 80,
    date: 80,
  },
  {
    name: 'Quest 39',
    reward: 1000,
    difficulty: 85,
    date: 81,
  },
  {
    name: 'Quest 40',
    reward: 2100,
    difficulty: 90,
    date: 82,
  },
  {
    name: 'Quest 41',
    reward: 1050,
    difficulty: 95,
    date: 84,
  },
  {
    name: 'Quest 42',
    reward: 2200,
    difficulty: 100,
    date: 87,
  },
  {
    name: 'Quest 43',
    reward: 1100,
    difficulty: 50,
    date: 90,
  },
  {
    name: 'Quest 44',
    reward: 2300,
    difficulty: 55,
    date: 93,
  },
  {
    name: 'Quest 45',
    reward: 1150,
    difficulty: 60,
    date: 96,
  },
  {
    name: 'Quest 46',
    reward: 2400,
    difficulty: 65,
    date: 99,
  },
  {
    name: 'Quest 47',
    reward: 1200,
    difficulty: 70,
    date: 102,
  },
  {
    name: 'Quest 48',
    reward: 2500,
    difficulty: 75,
    date: 105,
  },
  {
    name: 'Quest 49',
    reward: 1250,
    difficulty: 80,
    date: 108,
  },
  {
    name: 'Quest 50',
    reward: 2600,
    difficulty: 85,
    date: 111,
  },
  {
    name: 'Quest 51',
    reward: 1300,
    difficulty: 90,
    date: 114,
  },
  {
    name: 'Quest 52',
    reward: 2700,
    difficulty: 95,
    date: 117,
  },
  {
    name: 'Quest 53',
    reward: 1350,
    difficulty: 100,
    date: 119,
  }
];

async function worldSim() {
  // insert quests into calendar based on date as index
  questsData.forEach((questData) => {
    calendar[questData.date].push(new Quest(questData));
  });

  // simulate days passing
  for (let i = 0; i < calendar.length; i++) {
    process.stdout.write('\x1Bc') // clear console
    console.log(`Day ${i}`);


    /* simulate new users joining */
    // We assume a minimum of 50 a day or 10% of our total number of users, whichever is higher
    let newUsers = 50;
    if (Object.keys(users).length > MIN_NEW_USER / NEW_USER_RATIO) {
      newUsers = Math.floor(Object.keys(users).length * NEW_USER_RATIO);
    }

    // create new users, ratio of organic vs referred users is based on RATIO_OF_ORGANIC_USERS parameter
    for (let i = 0; i < newUsers; i++) {
      if (Math.random() < RATIO_OF_ORGANIC_USERS) {
        createUser({
          referrerId: null,
          questRate: getQuestRate(),
          multiplierGachaRate: getMultiplierGachaRate(),
          followers: getFollowers(),
        });
      } else {
        //  For referred users, what we will do is we will look through the list of all users sorted by followers count We sum up all of the followers And then we do a math.random multiplied by the total number of followers And then once again look through the sorted list And the idea here is that whether you get referred by an existing user is directly proportional to how many followers they have
        const totalFollowers = Object.values(users).reduce((acc, user) => acc + user.followers, 0);
        const randomFollowerCount = Math.random() * totalFollowers;
        let referrer = { id: null }
        let runningTotal = 0;
        for (const user of Object.values(users)) {
          runningTotal += user.followers;
          if (runningTotal >= randomFollowerCount) {
            referrer = user;
            break;
          }
        }
        createUser({
          referrerId: referrer.id,
          questRate: getQuestRate(),
          multiplierGachaRate: getMultiplierGachaRate(),
          followers: getFollowers(),
        });

        // update referral numbers
        if (referrer.id) {
          users[referrer.id].tier1Referrals++;
        }
        if (parent[referrer.id]) {
          users[parent[referrer.id]].tier2Referrals++;
        }
        // if (parent[parent[referrer.id]]) {
        //   users[parent[parent[referrer.id]]].tier3Referrals++;
        // }
      }
    }


    /* simulate users completing quests */
    const quests = calendar[i];
    quests.forEach((quest) => {
      // simulate quest completion
      Object.values(users).forEach((user) => {
        if (Math.random() * user.questRate > quest.difficulty) {
          user.addPoints(quest.reward, true);
        }
      });
    });

    /* simulate users gachaing to upgrade their multiplier */
    Object.values(users).forEach((user) => {
      if (Math.random() < user.multiplierGachaRate) {
        if (gachaDecision(user.points, user.multiplier)) {
          user.multiplier = upgradeGacha(user.multiplier);
          user.points -= GACHA_RATES.find((rate) => rate.multiplier === user.multiplier).cost;
        }
      }
    });

    /* simulate users aging */
    Object.values(users).forEach((user) => {
      user.age++;
    });

    /* print leaderboard */
    const usersArray = [];
    for (const user of Object.values(users)) {
      usersArray.push(user);
    }
    const leaderboard = usersArray.sort((a, b) => (b.points * b.multiplier) - (a.points * a.multiplier)).map((user, i) => { return {
      position: i + 1,
      ...user
    }});

    const displayFormat = function (a, i) {
      return {
        position: a.position,
        id: a.id.slice(0, 10),
        referrer: a.referrerId ? a.referrerId.slice(0, 10) : null,
        followers: a.followers,
        questRate: a.questRate,
        "gacha%": a.multiplierGachaRate,
        age: a.age,
        t1: a.tier1Referrals,
        t2: a.tier2Referrals,
        // tier3Referrals: a.tier3Referrals,
        mul: a.multiplier,
        quests: a.questPoints,
        finalPoints: a.multiplier * a.points,
      }
    }

    //  If there are less than 30 users, just print everything. If there are more than 45 users, print the first 15, and then the last 15, and then the 15 in the middle.
    if (leaderboard.length <= 30) {
      console.table(leaderboard);
    } else {
      console.table(leaderboard.slice(0, 10).map(displayFormat));
      console.table(leaderboard.slice(leaderboard.length / 2 - 5, leaderboard.length / 2 + 5).map(displayFormat));
      console.table(leaderboard.slice(leaderboard.length - 10).map(displayFormat));

      // console.table(leaderboard.slice(0, 15));
      // console.table(leaderboard.slice(leaderboard.length / 2 - 7, leaderboard.length / 2 + 7));
      // console.table(leaderboard.slice(leaderboard.length - 15));
    }
    await new Promise((resolve) => setTimeout(resolve, 1000));
  }
}

worldSim();
