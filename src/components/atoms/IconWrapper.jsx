import PropTypes from 'prop-types';

const IconWrapper = ({ icon, size = 'default', className = '' }) => {
  const sizes = {
    small: 'text-2xl',
    default: 'text-4xl',
    large: 'text-6xl'
  };

  const Icon = icon;
  return <Icon className={`${sizes[size]} ${className}`} />;
};

IconWrapper.propTypes = {
  icon: PropTypes.elementType.isRequired,
  size: PropTypes.oneOf(['small', 'default', 'large']),
  className: PropTypes.string
};

export default IconWrapper;
