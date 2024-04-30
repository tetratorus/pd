
// Power Distribution Sampling Function

function powerDistributionSample(k, theta) {
  let u = Math.random();
  return Math.floor(Math.pow(1 - u, 1 / k) * theta);
}

module.exports = {
  powerDistributionSample
};
