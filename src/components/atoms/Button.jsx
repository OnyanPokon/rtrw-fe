import PropTypes from 'prop-types';

const Button = ({ children, variant = 'primary', size = 'medium', fullWidth = false, type = 'button', onClick, disabled = false, loading = false, className = '' }) => {
  const baseStyles = 'font-semibold rounded-xl transition-all duration-300 inline-flex items-center justify-center gap-2 shadow-md hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed';

  const variants = {
    primary: 'bg-gradient-to-r from-primary-600 to-primary-700 hover:from-primary-700 hover:to-primary-800 text-white',
    secondary: 'bg-white border-2 border-primary-600 text-primary-600 hover:bg-primary-50',
    danger: 'bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white',
    ghost: 'bg-transparent text-primary-600 hover:bg-primary-50'
  };

  const sizes = {
    small: 'px-4 py-2 text-sm',
    medium: 'px-6 py-3 text-base',
    large: 'px-8 py-4 text-lg'
  };

  return (
    <button type={type} onClick={onClick} disabled={disabled || loading} className={` ${baseStyles} ${variants[variant]} ${sizes[size]} ${fullWidth ? 'w-full' : ''} ${loading ? 'cursor-wait' : ''} ${className} `}>
      {loading ? (
        <>
          <div className="h-5 w-5 animate-spin rounded-full border-b-2 border-white"></div>
          Loading...
        </>
      ) : (
        children
      )}
    </button>
  );
};

Button.propTypes = {
  children: PropTypes.node.isRequired,
  variant: PropTypes.oneOf(['primary', 'secondary', 'danger', 'ghost']),
  size: PropTypes.oneOf(['small', 'medium', 'large']),
  fullWidth: PropTypes.bool,
  type: PropTypes.oneOf(['button', 'submit', 'reset']),
  onClick: PropTypes.func,
  disabled: PropTypes.bool,
  loading: PropTypes.bool,
  className: PropTypes.string
};

export default Button;
