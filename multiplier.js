const GACHA_RATES = [
  { multiplier: 1, rate: 0.5, cost: 100 },
  { multiplier: 2, rate: 0.3, cost: 200 },
  { multiplier: 3, rate: 0.2, cost: 300 },
  { multiplier: 4, rate: 0.1, cost: 400 },
  { multiplier: 5, rate: 0.05, cost: 500 },
  { multiplier: 6, rate: 0.02, cost: 600 },
  { multiplier: 7, rate: 0.01, cost: 700 },
  { multiplier: 8, rate: 0.005, cost: 800 },
  { multiplier: 9, rate: 0.002, cost: 900 },
  { multiplier: 10, rate: 0.001, cost: 1000 },
];

function upgradeGacha(currentMultiplier) {
  //  Just find the position of the current multiplier, look for the next position and return that multiplier's value.
  const currentMultiplierIndex = GACHA_RATES.findIndex((rate) => rate.multiplier === currentMultiplier);
  return GACHA_RATES[currentMultiplierIndex + 1].multiplier;
}

function gachaDecision(currentPoints, currentMultiplier) {
  // find position of currentMultiplier in the GACHA_RATES array
  const currentMultiplierIndex = GACHA_RATES.findIndex((rate) => rate.multiplier === currentMultiplier);
  const currentMultiplierData = GACHA_RATES[currentMultiplierIndex];

  // if currentMultiplier is the last one, return false
  if (currentMultiplierIndex === GACHA_RATES.length - 1) {
    return false;
  }

  // find position of next multiplier
  const nextMultiplierData = GACHA_RATES[currentMultiplierIndex + 1];

  // Check if upgrading is affordable and beneficial
  const currentPotential = currentMultiplierData.multiplier * currentPoints;
  const nextPotential = nextMultiplierData.multiplier * (currentPoints - (nextMultiplierData.cost / nextMultiplierData.rate));

  // Upgrade if next potential earning is greater than current potential
  return nextPotential > currentPotential;

}

module.exports = {
  GACHA_RATES,
  upgradeGacha,
  gachaDecision,
};