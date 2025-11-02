import PropTypes from 'prop-types';

const SectionHeader = ({ title, description, icon: IconComponent, centered = false }) => {
  const alignment = centered ? 'text-center items-center' : 'text-left items-start';

  return (
    <div className={`flex flex-col ${alignment} animate-slide-up mb-8 gap-4 md:mb-12 md:gap-5`}>
      {IconComponent && (
        <div className="relative inline-block">
          <div className="shadow-elegant relative rounded-xl bg-primary-50 p-3 text-primary-600 md:rounded-2xl md:p-5">
            <IconComponent className="text-4xl md:text-5xl" />
          </div>
        </div>
      )}

      <div className={centered ? 'text-center' : 'text-left'}>
        <h2 className="font-display mb-3 bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text px-4 text-3xl font-bold text-transparent sm:text-4xl md:mb-4 md:text-5xl">{title}</h2>
        {description && <p className="max-w-3xl px-4 text-base leading-relaxed text-gray-600 sm:text-lg md:text-xl">{description}</p>}
      </div>
    </div>
  );
};

SectionHeader.propTypes = {
  title: PropTypes.string.isRequired,
  description: PropTypes.string,
  icon: PropTypes.elementType,
  centered: PropTypes.bool
};

export default SectionHeader;
