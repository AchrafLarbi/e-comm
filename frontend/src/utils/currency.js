// Currency utility functions
export const formatCurrency = (amount) => {
  return `${amount} DZD`;
};

export const formatPrice = (price) => {
  return `${parseFloat(price).toFixed(2)} DZD`;
};

export const CURRENCY_SYMBOL = "DZD";
export const CURRENCY_CODE = "DZD";
