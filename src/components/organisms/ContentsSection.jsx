import PropTypes from 'prop-types';
import { Row, Col } from 'antd';
import SectionHeader from '../molecules/SectionHeader';
import InfoCard from '../molecules/InfoCard';

const ContentsSection = ({ data }) => {
  const { title, icon, items } = data;

  return (
    <section id="konten" className="section-padding relative overflow-hidden bg-gradient-to-b from-gray-50 to-white">
      {/* Decorative circles - Adjusted for mobile */}
      <div className="absolute left-10 top-20 h-48 w-48 rounded-full bg-gradient-to-br from-primary-200 to-accent-200 opacity-20 blur-3xl sm:h-72 sm:w-72"></div>
      <div className="absolute bottom-20 right-10 h-64 w-64 rounded-full bg-gradient-to-br from-accent-200 to-primary-200 opacity-20 blur-3xl sm:h-96 sm:w-96"></div>

      <div className="container-custom relative z-10 mb-12 mt-12">
        <div className="mx-auto max-w-7xl">
          <SectionHeader title={title} icon={icon} centered />

          <Row gutter={[16, 16]} className="sm:gutter-24 md:gutter-32 mt-8 md:mt-10">
            {items.map((item, index) => (
              <Col xs={24} sm={12} lg={6} key={item.id}>
                <div className="animate-scale-in h-full" style={{ animationDelay: `${index * 0.1}s` }}>
                  <InfoCard title={item.title} description={item.description} icon={item.icon} />
                </div>
              </Col>
            ))}
          </Row>
        </div>
      </div>
    </section>
  );
};

ContentsSection.propTypes = {
  data: PropTypes.shape({
    title: PropTypes.string.isRequired,
    icon: PropTypes.elementType.isRequired,
    items: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.number.isRequired,
        title: PropTypes.string.isRequired,
        description: PropTypes.string.isRequired,
        icon: PropTypes.node
      })
    ).isRequired
  }).isRequired
};

export default ContentsSection;
