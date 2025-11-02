import PropTypes from 'prop-types';

const FormLabel = ({ children, required = false, htmlFor, className = '' }) => {
  return (
    <label htmlFor={htmlFor} className={`mb-2 block text-sm font-semibold text-gray-700 ${className}`}>
      {children}
      {required && <span className="ml-1 text-red-500">*</span>}
    </label>
  );
};

FormLabel.propTypes = {
  children: PropTypes.node.isRequired,
  required: PropTypes.bool,
  htmlFor: PropTypes.string,
  className: PropTypes.string
};

export default FormLabel;
