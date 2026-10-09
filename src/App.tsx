import { useState } from "react";
import { FormProvider, useForm, useWatch } from "react-hook-form";
import { AtmCurrencyInput } from "./AtmCurrencyInput";
import { CurrencyInput } from "./CurrencyInput";
import "./App.css";

const CURRENCIES = [
  { label: "USD", value: "USD" },
  { label: "EUR", value: "EUR" },
  { label: "GBP", value: "GBP" },
  { label: "JPY", value: "JPY" },
  { label: "RUB", value: "RUB" },
] as const;

type Form = { numeric: number | null; atm: number | null };

const inputStyle = { padding: 10, fontSize: 18 };
const hintStyle = { margin: 0, fontSize: 13, opacity: 0.7 };

function App() {
  const [currency, setCurrency] = useState<
    (typeof CURRENCIES)[number]["value"]
  >(CURRENCIES[0].value);
  const methods = useForm<Form>({
    defaultValues: { numeric: 1234.5, atm: 1234.5 },
  });
  const formValues = useWatch({ control: methods.control });

  return (
    <FormProvider {...methods}>
      <form className="demo-shell">
        <h1>Currency input mask: comparison of approaches</h1>

        <label className="preset-picker">
          <span>Currency</span>
          <select
            value={currency}
            onChange={(event) =>
              setCurrency(event.target.value as typeof currency)
            }
          >
            {CURRENCIES.map((item) => (
              <option key={item.value} value={item.value}>
                {item.label}
              </option>
            ))}
          </select>
        </label>

        <section className="input-panel">
          <strong>1. react-number-format</strong>
          <CurrencyInput
            key={"numeric-" + currency}
            name="numeric"
            currency={currency}
            placeholder="Enter amount"
            style={inputStyle}
          />
          <p style={hintStyle}>
            Free-form input, decimal separator support, and normal caret
            behavior while editing in the middle.
          </p>
        </section>

        <section className="input-panel">
          <strong>2. ATM-style</strong>
          <AtmCurrencyInput
            key={"atm-" + currency}
            name="atm"
            currency={currency}
            placeholder="Type digits"
            style={inputStyle}
          />
          <p style={hintStyle}>
            Digits only, right-to-left fill, caret always stays at the end.
          </p>
        </section>

        <pre className="form-preview">
          {JSON.stringify(formValues, null, 2)}
        </pre>
      </form>
    </FormProvider>
  );
}

export default App;
