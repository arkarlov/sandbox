import { useMemo } from "react";
import {
  Controller,
  type FieldValues,
  type Path,
  useFormContext,
} from "react-hook-form";
import { NumericFormat, type NumericFormatProps } from "react-number-format";

function getCurrencyConfig(currency: string) {
  const fmt = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency,
    maximumFractionDigits: 2,
  });
  const parts = fmt.formatToParts(1234567.89);

  const firstNum = parts.findIndex((part) => part.type === "integer");
  const lastNum = parts.map((part) => part.type).lastIndexOf("fraction");
  const end =
    lastNum === -1
      ? parts.map((part) => part.type).lastIndexOf("integer")
      : lastNum;

  return {
    prefix: parts
      .slice(0, firstNum)
      .map((part) => part.value)
      .join(""),
    suffix: parts
      .slice(end + 1)
      .map((part) => part.value)
      .join(""),
    thousandSeparator: parts.find((part) => part.type === "group")?.value ?? "",
    decimalSeparator:
      parts.find((part) => part.type === "decimal")?.value ?? ".",
    decimalScale: fmt.resolvedOptions().maximumFractionDigits,
  };
}
type Props<T extends FieldValues> = {
  name: Path<T>;
  currency?: string;
} & Omit<NumericFormatProps, "value" | "onValueChange" | "name">;

export function CurrencyInput<T extends FieldValues>({
  name,
  currency = "USD",
  ...rest
}: Props<T>) {
  const { control } = useFormContext<T>();
  const config = useMemo(() => getCurrencyConfig(currency), [currency]);

  return (
    <Controller
      control={control}
      name={name}
      render={({ field }) => (
        <NumericFormat
          {...config}
          {...rest}
          allowNegative={false}
          decimalScale={config.decimalScale}
          getInputRef={(node: HTMLInputElement | null) => field.ref(node)}
          name={field.name}
          onBlur={field.onBlur}
          value={field.value == null ? "" : String(field.value)}
          onValueChange={(value) => field.onChange(value.floatValue ?? null)}
        />
      )}
    />
  );
}
