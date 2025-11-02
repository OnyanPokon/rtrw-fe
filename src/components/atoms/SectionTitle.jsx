import PropTypes from 'prop-types';

const SectionTitle = ({ children, level = 2, className = '' }) => {
  const Tag = `h${level}`;
  const baseStyles = 'font-bold text-gray-800';
  const levelStyles = {
    1: 'text-4xl md:text-5xl',
    2: 'text-3xl md:text-4xl',
    3: 'text-2xl md:text-3xl',
    4: 'text-xl md:text-2xl'
  };

  return <Tag className={`${baseStyles} ${levelStyles[level]} ${className}`}>{children}</Tag>;
};

SectionTitle.propTypes = {
  children: PropTypes.node.isRequired,
  level: PropTypes.oneOf([1, 2, 3, 4]),
  className: PropTypes.string
};

export default SectionTitle;
