import PropTypes from 'prop-types';
import { List } from 'antd';
import SectionHeader from '../molecules/SectionHeader';
import ObjectiveItem from '../molecules/ObjectiveItem';

const ObjectivesSection = ({ data }) => {
  const { title, icon, items } = data;

  return (
    <section className="section-padding relative overflow-hidden bg-white">
      {/* Background pattern */}
      <div
        className="absolute inset-0 opacity-5"
        style={{
          backgroundImage: 'radial-gradient(circle at 2px 2px, #1677ff 1px, transparent 0)',
          backgroundSize: '40px 40px'
        }}
      ></div>

      <div className="container-custom relative z-10 mt-12">
        <div className="mx-auto max-w-5xl">
          <SectionHeader title={title} icon={icon} centered />

          <div className="shadow-elegant animate-slide-up mt-8 rounded-2xl border border-gray-100 bg-white p-6 sm:p-8 md:mt-10 md:rounded-3xl md:p-10">
            <List
              dataSource={items}
              renderItem={(item, index) => (
                <div key={item.id} className="animate-slide-up" style={{ animationDelay: `${index * 0.1}s` }}>
                  <ObjectiveItem title={item.title} description={item.description} />
                </div>
              )}
            />
          </div>
        </div>
      </div>
    </section>
  );
};

ObjectivesSection.propTypes = {
  data: PropTypes.shape({
    title: PropTypes.string.isRequired,
    icon: PropTypes.elementType.isRequired,
    items: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.number.isRequired,
        title: PropTypes.string.isRequired,
        description: PropTypes.string.isRequired
      })
    ).isRequired
  }).isRequired
};

export default ObjectivesSection;
