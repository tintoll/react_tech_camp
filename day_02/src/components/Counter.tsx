import * as React from "react";
import { FormattedNumber } from "./FormattedNumber";

const DEFAULT_UNIT = "";
const DEFAULT_COLOR = "#000";

interface CouterProps {
  title: string;
  count: number | string;
  color?: string;
  unit?: string;
}
export const Counter: React.FC<CouterProps> = props => {
  const unit = props.unit || DEFAULT_UNIT;
  const color = props.color || DEFAULT_COLOR;

  return (
    <div className="item">
      <p>{props.title}</p>
      <p style={{ color }}>
        <span>
          <FormattedNumber value={props.count} />
        </span>
        <span className="unit">{unit}</span>
      </p>
    </div>
  );
};
