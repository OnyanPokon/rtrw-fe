import PropTypes from 'prop-types';
import { Card } from 'antd';

const InfoCard = ({ title, description, icon, hoverable = true }) => {
  return (
    <Card
      hoverable={hoverable}
      className="shadow-elegant hover:shadow-elegant-hover group h-full overflow-hidden rounded-xl border-0 bg-gradient-to-br from-white to-gray-50 transition-all duration-500 hover:-translate-y-1 md:rounded-2xl md:hover:-translate-y-2"
    >
      <div className="flex flex-col items-start gap-4 p-1 md:gap-5 md:p-2">
        {/* Icon with gradient background */}
        {icon && (
          <div className="relative">
            <div className="relative transform rounded-xl bg-primary-50 p-3 transition-all duration-500 group-hover:rotate-3 group-hover:scale-110 md:rounded-2xl md:p-4">
              <span className="text-4xl drop-shadow-lg filter md:text-5xl">{icon}</span>
            </div>
          </div>
        )}

        {/* Content */}
        <div className="flex-1">
          <h3 className="mb-2 text-lg font-bold text-gray-800 transition-colors duration-300 group-hover:text-primary-700 md:mb-3 md:text-xl">{title}</h3>
          <p className="text-sm leading-relaxed text-gray-600 md:text-base">{description}</p>
        </div>

        {/* Decorative element */}
        <div className="absolute right-0 top-0 -z-10 h-24 w-24 rounded-full bg-gradient-to-br from-primary-100 to-accent-100 opacity-0 blur-2xl transition-opacity duration-500 group-hover:opacity-30 md:h-32 md:w-32"></div>
      </div>
    </Card>
  );
};

InfoCard.propTypes = {
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  icon: PropTypes.node,
  hoverable: PropTypes.bool
};

export default InfoCard;
