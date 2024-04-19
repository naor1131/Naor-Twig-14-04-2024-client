import "./text-input.css";

interface ITextInputProps {
  label: string;
  value: string;
  onChange?: React.ChangeEventHandler<HTMLInputElement>;
  message: string;
}

const TextInput = ({ label, value, onChange, message }: ITextInputProps) => {
  return (
    <div className="text-input">
      <div className="row">
        <label className="label" htmlFor="clientId">
          {label}
        </label>
        <input
          id="clientId"
          className="input"
          type="text"
          value={value}
          onChange={onChange}
        />
      </div>
      <div className="feedback">{message}</div>
    </div>
  );
};

export default TextInput;
