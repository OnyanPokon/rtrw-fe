import PropTypes from 'prop-types';
import FormLabel from '../atoms/FormLabel';
import Input from '../atoms/Input';
import ErrorText from '../atoms/ErrorText';

const FormField = ({ label, name, type = 'text', placeholder, value, onChange, error, required = false, prefix, suffix, disabled = false }) => {
  return (
    <div className="mb-5">
      {label && (
        <FormLabel htmlFor={name} required={required}>
          {label}
        </FormLabel>
      )}
      <Input id={name} name={name} type={type} placeholder={placeholder} value={value} onChange={onChange} error={!!error} prefix={prefix} suffix={suffix} disabled={disabled} />
      <ErrorText>{error}</ErrorText>
    </div>
  );
};

FormField.propTypes = {
  label: PropTypes.string,
  name: PropTypes.string.isRequired,
  type: PropTypes.string,
  placeholder: PropTypes.string,
  value: PropTypes.string,
  onChange: PropTypes.func.isRequired,
  error: PropTypes.string,
  required: PropTypes.bool,
  prefix: PropTypes.node,
  suffix: PropTypes.node,
  disabled: PropTypes.bool
};

export default FormField;
