import { Layout, Button } from 'antd';
import { ArrowLeftOutlined } from '@ant-design/icons';
import Navbar from '@/components/organisms/Navbar';
import Footer from '@/components/organisms/Footer';
import { useService } from '@/hooks';
import { NewsService } from '@/services';
import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';

const { Content } = Layout;

const BeritaPage = () => {
  const { slug } = useParams();
  const { execute, ...getAllNews } = useService(NewsService.getBySlug);
  const navigate = useNavigate();

  const fetchNews = React.useCallback(() => {
    execute({
      slug
    });
  }, [execute, slug]);

  React.useEffect(() => {
    fetchNews();
  }, [fetchNews]);

  const news = getAllNews.data ?? [];

  return (
    <Layout className="min-h-screen bg-white">
      <Navbar />
      <Content className="section-padding">
        <section className="bg-white pb-16 pt-8 antialiased lg:pb-24">
          <div className="mx-auto flex max-w-screen-xl justify-center gap-x-16 px-4">
            <div className="flex flex-col items-center gap-y-4">
              <div className="mt-1 flex flex-col items-center gap-y-1">
                <Button shape="circle" size="large" color="danger" variant="outlined" icon={<ArrowLeftOutlined />} onClick={() => navigate(-1)} />
                <span className="text-xs text-red-500">Kembali</span>
              </div>
            </div>
            <article className="format format-sm sm:format-base lg:format-lg format-blue dark:format-invert w-full max-w-2xl">
              <div className="not-format mb-4 lg:mb-6">
                <h1 className="mb-4 text-3xl font-extrabold leading-tight text-gray-900 lg:mb-14 lg:text-4xl">{news?.title}</h1>
                {news?.thumbnail ? (
                  <img src={news.thumbnail} alt={news.title} className="aspect-video w-full rounded-lg object-cover" />
                ) : (
                  <div className="flex aspect-video w-full items-center justify-center rounded-lg bg-gray-100 text-gray-400">Tidak ada gambar</div>
                )}
              </div>

              <div className="prose prose-lg text-justify leading-relaxed text-gray-800" dangerouslySetInnerHTML={{ __html: news?.content }} />
            </article>
          </div>
        </section>
      </Content>

      <Footer />
    </Layout>
  );
};

export default BeritaPage;
