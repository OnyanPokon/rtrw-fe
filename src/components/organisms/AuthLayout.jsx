import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { EnvironmentOutlined } from '@ant-design/icons';

const AuthLayout = ({ children }) => {
  return (
    <div className="relative min-h-screen overflow-hidden bg-gradient-to-br from-gray-50 via-blue-50 to-gray-100">
      {/* Decorative elements */}
      <div className="absolute right-0 top-0 h-64 w-64 rounded-full bg-gradient-to-br from-primary-200 to-accent-200 opacity-30 blur-3xl sm:h-80 sm:w-80 md:h-96 md:w-96"></div>
      <div className="absolute bottom-0 left-0 h-56 w-56 rounded-full bg-gradient-to-br from-accent-200 to-primary-200 opacity-30 blur-3xl sm:h-72 sm:w-72 md:h-80 md:w-80"></div>

      {/* Background pattern */}
      <div
        className="absolute inset-0 opacity-5"
        style={{
          backgroundImage: 'radial-gradient(circle at 2px 2px, #1677ff 1px, transparent 0)',
          backgroundSize: '40px 40px'
        }}
      ></div>

      {/* Header */}
      <div className="container-custom relative z-10 py-4 sm:py-6">
        <Link to="/" className="group inline-flex items-center gap-2 sm:gap-3">
          <div className="rounded-lg bg-primary-100 p-2 text-primary-600 shadow-lg transition-transform duration-300 group-hover:scale-110 sm:p-2.5 md:rounded-xl md:p-3">
            <EnvironmentOutlined className="text-xl sm:text-2xl" />
          </div>
          <div>
            <h2 className="font-display text-lg font-bold text-gray-800 sm:text-xl">RTRW</h2>
            <p className="text-xs text-gray-600">Provinsi Gorontalo</p>
          </div>
        </Link>
      </div>

      {/* Content */}
      <div className="container-custom relative z-10 flex min-h-[calc(100vh-100px)] items-center justify-center py-8 sm:py-12">{children}</div>
    </div>
  );
};

AuthLayout.propTypes = {
  children: PropTypes.node.isRequired
};

export default AuthLayout;
