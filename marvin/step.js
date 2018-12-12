// @flow
const currentStep = user => {
  console.log(user);
  if (typeof user.get('opt_in') === 'undefined') {
    return 0;
  }

  if (typeof user.get('name') === 'undefined') {
    return 1;
  }

  if (typeof user.get('city') === 'undefined') {
    return 2;
  }

  if (typeof user.get('household_size') === 'undefined') {
    return 3;
  }

  if (typeof user.get('has_place_to_stay') === 'undefined') {
    return 4;
  }

  return 5;
};

module.exports = {
  currentStep
};
