import PropTypes from 'prop-types';

const ErrorText = ({ children, className = '' }) => {
  if (!children) return null;

  return <p className={`mt-1 text-sm text-red-500 ${className}`}>{children}</p>;
};

ErrorText.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string
};

export default ErrorText;
