import React from "react";

type Props = {
  onChange: () => void;
  onBlur: () => void;
};

export default function ReactDatePicker({ onChange, onBlur }: Props) {
  return (
    <div>
      <div>Date picker</div>
      <input className="border rounded" onChange={onChange} onBlur={onBlur} />
    </div>
  );
}
