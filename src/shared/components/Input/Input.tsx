interface InputProps {
  value: string;
  onChange: (value: string) => void;
}

export function Input({ value, onChange }: InputProps) {
  return <input value={value} onChange={(e) => onChange(e.target.value)} />;
}
