const USD_LOCALE = "en-US";
const CURRENCY_DECIMAL_PLACES = 2;

export function createCurrencyFormatter(currency: string, locale = USD_LOCALE) {
  return new Intl.NumberFormat(locale, {
    style: "currency",
    currency,
    maximumFractionDigits: CURRENCY_DECIMAL_PLACES,
  });
}
