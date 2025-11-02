import PropTypes from 'prop-types';
import { Layout } from 'antd';
import Hero from '../organisms/Hero';
import Navbar from '../organisms/Navbar';
import Footer from '../organisms/Footer';

const { Content } = Layout;

const MainLayout = ({ heroData, children }) => {
  return (
    <Layout className="min-h-screen bg-gray-50">
      <Navbar />
      <Hero title={heroData.title} subtitle={heroData.subtitle} description={heroData.description} />
      <Content>{children}</Content>
      <Footer />
    </Layout>
  );
};

MainLayout.propTypes = {
  heroData: PropTypes.shape({
    title: PropTypes.string.isRequired,
    subtitle: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired
  }).isRequired,
  children: PropTypes.node.isRequired
};

export default MainLayout;
