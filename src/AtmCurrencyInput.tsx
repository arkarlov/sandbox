import {
  type FieldValues,
  type Path,
  useController,
  useFormContext,
} from "react-hook-form";
import type { ChangeEvent, InputHTMLAttributes } from "react";

const CURRENCY_DECIMAL_PLACES = 2;
const CURRENCY_FACTOR = 10 ** CURRENCY_DECIMAL_PLACES;

const createCurrencyFormatter = (currency: string) =>
  new Intl.NumberFormat("en-US", {
    style: "currency",
    currency,
    maximumFractionDigits: CURRENCY_DECIMAL_PLACES,
  });

type Props<T extends FieldValues> = {
  name: Path<T>;
  currency?: string;
} & Omit<InputHTMLAttributes<HTMLInputElement>, "value" | "onChange" | "name">;

export function AtmCurrencyInput<T extends FieldValues>({
  name,
  currency = "USD",
  ...rest
}: Props<T>) {
  const { control } = useFormContext<T>();
  const { field } = useController({ control, name });
  const fmt = createCurrencyFormatter(currency);

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const digits = event.target.value.replace(/\D/g, "");
    const numericValue = digits ? Number(digits) / CURRENCY_FACTOR : 0;
    field.onChange(numericValue === 0 ? null : numericValue);
  };

  return (
    <input
      {...rest}
      ref={(node: HTMLInputElement | null) => {
        field.ref(node);
      }}
      name={field.name}
      onBlur={field.onBlur}
      inputMode="numeric"
      value={field.value == null ? "" : fmt.format(field.value)}
      onChange={handleChange}
    />
  );
}
