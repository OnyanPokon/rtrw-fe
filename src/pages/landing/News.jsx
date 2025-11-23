/* eslint-disable react/prop-types */
import { Layout, Card, Button, Input, Row, Col, Typography, Pagination } from 'antd';
import { CalendarOutlined, ArrowRightOutlined, SearchOutlined } from '@ant-design/icons';
import Navbar from '@/components/organisms/Navbar';
import Footer from '@/components/organisms/Footer';
import { usePagination, useService } from '@/hooks';
import { NewsService } from '@/services';
import React from 'react';
import parse from 'html-react-parser';
import dateFormatter from '@/utils/dateFormatter';
import { useNavigate } from 'react-router-dom';

const { Content } = Layout;
const { Title, Paragraph, Text } = Typography;
const { Search } = Input;

const BeritaPage = () => {
  const navigate = useNavigate();
  const { execute, ...getAllNews } = useService(NewsService.getAllLanding);
  const pagination = usePagination({ totalData: getAllNews.totalData });
  const [filterValues, setFilterValues] = React.useState({ search: '' });

  const fetchNews = React.useCallback(() => {
    execute({
      search: filterValues.search,
      page: pagination.page,
      per_page: pagination.per_page
    });
  }, [execute, filterValues.search, pagination.page, pagination.per_page]);

  React.useEffect(() => {
    fetchNews();
  }, [fetchNews]);

  const news = getAllNews.data ?? [];

  const NewsCard = ({ news }) => (
    <Card
      hoverable
      className="shadow-elegant hover:shadow-elegant-hover group h-full overflow-hidden rounded-2xl border-0 transition-all duration-300"
      cover={
        <div className="relative h-56 overflow-hidden">
          <img alt={news.title} src={news.thumbnail} className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110" />
          <div className="absolute left-4 top-4"></div>
        </div>
      }
    >
      <div className="flex flex-col gap-3">
        <div className="flex items-center gap-4 text-xs text-gray-500">
          <span className="flex items-center gap-1">
            <CalendarOutlined />
            {dateFormatter(news.created_at)}
          </span>
        </div>

        <Title level={4} className="!mb-0 line-clamp-2 !text-gray-800 transition-colors group-hover:text-primary-600">
          {news.title}
        </Title>

        <p className="news-text">{parse(news.content)}</p>

        {/* Read More */}
        <Button
          onClick={() => navigate(window.location.pathname + '/' + news.slug)}
          type="link"
          className="group/btn !h-auto !p-0 font-semibold text-primary-600"
          icon={<ArrowRightOutlined className="transition-transform group-hover/btn:translate-x-1" />}
          iconPosition="end"
        >
          Baca Selengkapnya
        </Button>
      </div>
    </Card>
  );

  return (
    <Layout className="min-h-screen bg-gray-50">
      <Navbar />

      {/* Hero Section */}
      <div className="relative overflow-hidden bg-gradient-to-br from-primary-600 via-primary-700 to-primary-800 pb-16 pt-24">
        <div className="absolute inset-0 bg-black/20"></div>

        {/* Decorative elements */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute right-20 top-20 h-72 w-72 rounded-full bg-white blur-3xl"></div>
          <div className="absolute bottom-20 left-20 h-64 w-64 rounded-full bg-accent-400 blur-3xl"></div>
        </div>

        <div className="container-custom relative z-10">
          <div className="mx-auto max-w-4xl text-center">
            <div className="animate-slide-down mb-6 inline-flex items-center justify-center">
              <div className="rounded-full border border-white/30 bg-white/20 px-6 py-3 backdrop-blur-md">
                <span className="text-sm font-semibold uppercase tracking-wide text-white">📰 Berita & Artikel</span>
              </div>
            </div>

            <Title level={1} className="!font-display !mb-4 text-4xl !text-white md:text-5xl lg:text-6xl">
              Berita RTRW Gorontalo
            </Title>
            <Paragraph className="mx-auto max-w-2xl text-lg text-blue-50 md:text-xl">Informasi terkini seputar perencanaan, pelaksanaan, dan pengembangan Tata Ruang Wilayah Provinsi Gorontalo</Paragraph>
          </div>
        </div>
      </div>

      <Content className="section-padding">
        <div className="container-custom">
          <div className="mx-auto max-w-7xl">
            {/* Back Button & Search */}
            <div className="mb-8 flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
              <Search placeholder="Cari berita..." allowClear enterButton={<SearchOutlined />} size="large" className="w-full sm:w-80" onSearch={(values) => setFilterValues({ search: values })} />
            </div>

            {/* All News Grid */}
            <div>
              <div className="mb-6">
                <Title level={2} className="!mb-2">
                  Semua Berita
                </Title>
                <Text className="text-gray-600">Artikel dan informasi terkini</Text>
              </div>

              <Row gutter={[24, 24]}>
                {news.map((news, index) => (
                  <Col xs={24} sm={12} lg={8} key={news.id}>
                    <div className="animate-slide-up" style={{ animationDelay: `${index * 0.1}s` }}>
                      <NewsCard news={news} />
                    </div>
                  </Col>
                ))}
              </Row>
            </div>

            {/* Load More */}
            <div className="mt-12 text-center">
              <Pagination current={pagination.page} total={pagination.totalData} onChange={pagination.onChange} pageSize={pagination.per_page} />
            </div>
          </div>
        </div>
      </Content>

      <Footer />
    </Layout>
  );
};

export default BeritaPage;
