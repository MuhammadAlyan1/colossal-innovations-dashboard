import React from 'react';
import { FormGroupType } from '../../types/FormGroupType';

const FormGroup = (props: FormGroupType) => {
  const {
    label,
    placeholder,
    state,
    setState,
    rows,
    variant = 'outlined',
    type = 'text'
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
          autoComplete={type === 'password' ? 'current-password' : ''}
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
