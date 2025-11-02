import PropTypes from 'prop-types';

const StatCard = ({ title, value, icon, color = 'blue', trend }) => {
  const Icon = icon;
  const colors = {
    blue: 'from-blue-500 to-blue-600',
    green: 'from-green-500 to-green-600',
    purple: 'from-purple-500 to-purple-600',
    orange: 'from-orange-500 to-orange-600'
  };

  return (
    <div className="shadow-elegant hover:shadow-elegant-hover group rounded-xl bg-white p-4 transition-all duration-300 hover:-translate-y-1 sm:p-5 md:rounded-2xl md:p-6 md:hover:-translate-y-2">
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <p className="mb-2 text-xs font-medium text-gray-600 sm:text-sm">{title}</p>
          <h3 className="mb-2 text-2xl font-bold text-gray-800 sm:text-3xl">{value}</h3>
          {trend && (
            <p className={`text-xs font-semibold sm:text-sm ${trend.positive ? 'text-green-600' : 'text-red-600'}`}>
              {trend.positive ? '↑' : '↓'} {trend.value}
            </p>
          )}
        </div>

        <div className="relative">
          <div className={`absolute inset-0 bg-gradient-to-br ${colors[color]} rounded-lg opacity-30 blur-md transition-opacity duration-300 group-hover:opacity-50 md:rounded-xl md:blur-lg`}></div>
          <div className={`relative bg-gradient-to-br ${colors[color]} rounded-lg p-2.5 text-white transition-all duration-300 group-hover:rotate-3 group-hover:scale-110 sm:p-3 md:rounded-xl md:p-4`}>
            <Icon className="text-xl sm:text-2xl" />
          </div>
        </div>
      </div>
    </div>
  );
};

StatCard.propTypes = {
  title: PropTypes.string.isRequired,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  icon: PropTypes.elementType.isRequired,
  color: PropTypes.oneOf(['blue', 'green', 'purple', 'orange']),
  trend: PropTypes.shape({
    positive: PropTypes.bool,
    value: PropTypes.string
  })
};

export default StatCard;
