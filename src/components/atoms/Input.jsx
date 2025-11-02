import PropTypes from 'prop-types';
import { Input as AntInput } from 'antd';

const Input = ({ type = 'text', placeholder, value, onChange, error, disabled = false, prefix, suffix, size = 'large', className = '', ...props }) => {
  const inputClass = `
    rounded-xl
    ${error ? 'border-red-500' : 'border-gray-300'}
    ${className}
  `;

  const InputComponent = type === 'password' ? AntInput.Password : AntInput;

  return <InputComponent type={type} placeholder={placeholder} value={value} onChange={onChange} disabled={disabled} prefix={prefix} suffix={suffix} size={size} status={error ? 'error' : ''} className={inputClass} {...props} />;
};

Input.propTypes = {
  type: PropTypes.string,
  placeholder: PropTypes.string,
  value: PropTypes.string,
  onChange: PropTypes.func,
  error: PropTypes.bool,
  disabled: PropTypes.bool,
  prefix: PropTypes.node,
  suffix: PropTypes.node,
  size: PropTypes.oneOf(['small', 'middle', 'large']),
  className: PropTypes.string
};

export default Input;
