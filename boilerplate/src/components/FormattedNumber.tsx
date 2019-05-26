import * as React from "react";

const DEFAULT_SEPARATOR = ",";

interface FormattedNumberProps {
  value: number | string;
  seperator?: string;
}

export const FormattedNumber: React.FC<FormattedNumberProps> = props => {
  const seperator = props.seperator || DEFAULT_SEPARATOR;
  const formatterNumber = String(props.value).replace(
    /(\d)(?=(?:\d{3})+(?!\d))/g,
    `$1${seperator}`
  );

  return <span>{formatterNumber}</span>;
};
