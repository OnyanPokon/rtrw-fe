import PropTypes from 'prop-types';
import { List } from 'antd';
import { CheckCircleOutlined } from '@ant-design/icons';

const ObjectiveItem = ({ title, description }) => {
  return (
    <List.Item className="group border-0 py-4 md:py-6">
      <div className="flex w-full items-start gap-4 rounded-xl p-4 transition-all duration-300 hover:bg-gradient-to-r hover:from-primary-50 hover:to-accent-50 sm:gap-5 sm:p-5 md:rounded-2xl">
        {/* Icon with gradient */}
        <div className="relative mt-1 flex-shrink-0">
          <div className="absolute inset-0 rounded-full bg-gradient-to-br from-green-400 to-emerald-400 opacity-40 blur-md transition-opacity duration-300 group-hover:opacity-60"></div>
          <div className="relative rounded-full bg-gradient-to-br from-green-500 to-emerald-500 p-2 text-white">
            <CheckCircleOutlined className="text-xl md:text-2xl" />
          </div>
        </div>

        {/* Content */}
        <div className="flex-1">
          <h4 className="mb-2 text-lg font-bold text-gray-800 transition-colors duration-300 group-hover:text-primary-700 md:text-xl">{title}</h4>
          <p className="text-sm leading-relaxed text-gray-600 md:text-base">{description}</p>
        </div>
      </div>
    </List.Item>
  );
};

ObjectiveItem.propTypes = {
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired
};

export default ObjectiveItem;
