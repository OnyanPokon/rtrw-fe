import PropTypes from 'prop-types';

const Text = ({ children, variant = 'body', className = '' }) => {
  const variants = {
    body: 'text-base text-gray-600 leading-relaxed',
    subtitle: 'text-lg text-gray-500',
    caption: 'text-sm text-gray-500',
    lead: 'text-xl text-gray-700 leading-relaxed'
  };

  return <p className={`${variants[variant]} ${className}`}>{children}</p>;
};

Text.propTypes = {
  children: PropTypes.node.isRequired,
  variant: PropTypes.oneOf(['body', 'subtitle', 'caption', 'lead']),
  className: PropTypes.string
};

export default Text;
