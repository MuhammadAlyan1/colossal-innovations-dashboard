import React from 'react';

type FormGroupType = {
  label: string;
  placeholder: string;
  state: string | string[];
  setState: React.SetStateAction<any>;
  rows?: number;
  variant?: 'outlined' | 'standard';
  type?: 'text' | 'password';
};

const FormGroup = (props: FormGroupType) => {
  const {
    label,
    placeholder,
    state,
    setState,
    rows,
    variant = 'outlined',
    type = 'text',
  } = props;

  return (
    <div className="form__group">
      <label htmlFor={label.split(' ').join('_')} className="form__label">
        {label}
      </label>
      {rows ? (
        <textarea
          className={`form__field ${
            variant === 'standard'
              ? 'form__field--standard'
              : 'form__field--outlined'
          }`}
          id={label.split(' ').join('_')}
          placeholder={placeholder}
          value={state}
          onChange={(e) => setState(e.target.value)}
          rows={rows}
          required
        />
      ) : (
        <input
          type={type}
          className={`form__field ${
            variant === 'standard'
              ? 'form__field--standard'
              : 'form__field--outlined'
          }`}
          id={label.split(' ').join('_')}
          placeholder={placeholder}
          value={state}
          onChange={(e) => setState(e.target.value)}
          required
        />
      )}
    </div>
  );
};

export default FormGroup;
