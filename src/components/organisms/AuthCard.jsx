import PropTypes from 'prop-types';

const AuthCard = ({ title, subtitle, children, icon: IconComponent }) => {
  return (
    <div className="animate-scale-in w-full max-w-md px-4">
      <div className="shadow-elegant rounded-2xl border border-gray-100 bg-white p-6 sm:p-8 md:rounded-3xl md:p-10">
        {/* Icon */}
        {IconComponent && (
          <div className="mb-4 flex justify-center sm:mb-6">
            <div className="relative inline-block">
              <div className="relative rounded-xl bg-primary-50 p-3 text-primary-600 md:rounded-2xl md:p-4">
                <IconComponent className="text-3xl md:text-4xl" />
              </div>
            </div>
          </div>
        )}

        {/* Title */}
        <div className="mb-6 text-center sm:mb-8">
          <h1 className="font-display mb-2 text-2xl font-bold text-gray-800 sm:text-3xl md:text-4xl">{title}</h1>
          {subtitle && <p className="text-sm text-gray-600 sm:text-base">{subtitle}</p>}
        </div>

        {/* Form Content */}
        <div>{children}</div>
      </div>
    </div>
  );
};

AuthCard.propTypes = {
  title: PropTypes.string.isRequired,
  subtitle: PropTypes.string,
  children: PropTypes.node.isRequired,
  icon: PropTypes.elementType
};

export default AuthCard;
