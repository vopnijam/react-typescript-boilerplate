export const validateEmail = (email?: string): IIsValid => {
  if (!email || !email.length) {
    return {
      reason: 'Please enter an email',
      valid: false,
    };
  }

  const re = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/; // tslint:disable-line max-line-length

  if (!re.test(email.toLowerCase())) {
    return {
      reason: 'Please enter a valid email',
      valid: false,
    };
  }

  return {
    reason: undefined,
    valid: true,
  };
};

export const validateCurrency = (amount?: string): IIsValid => {
  if (!amount || !amount.length) {
    return {
      reason: 'Please enter an amount',
      valid: false,
    };
  }

  const re = /^\d+(?:\.\d{0,2})$/;

  if (!re.test(amount)) {
    return {
      reason: 'Please enter a valid amount in the form 99999.99',
      valid: false,
    };
  }

  return {
    reason: undefined,
    valid: true,
  };
};
