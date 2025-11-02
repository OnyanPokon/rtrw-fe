import { Layout, Table, Button, Typography, Skeleton } from 'antd';
import { DownloadOutlined, EnvironmentOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import Navbar from '@/components/organisms/Navbar';
import Footer from '@/components/organisms/Footer';
import { usePagination, useService } from '@/hooks';
import { RtrwsService } from '@/services';
import React from 'react';
import { countYearLeft } from '@/utils/countYearLeft';

const { Content } = Layout;
const { Title, Paragraph } = Typography;

const PeriodePage = () => {
  const { execute, ...getAllRtrws } = useService(RtrwsService.getAll);
  const pagination = usePagination({ totalData: getAllRtrws.totalData });
  const navigate = useNavigate();

  const fetchRtrws = React.useCallback(() => {
    execute({
      page: pagination.page,
      per_page: pagination.per_page
    });
  }, [execute, pagination.page, pagination.per_page]);

  React.useEffect(() => {
    fetchRtrws();
  }, [fetchRtrws, pagination.page, pagination.per_page]);

  const rtrws = getAllRtrws.data ?? [];

  const columns = [
    {
      title: 'Periode RTRW',
      render: (_, record) => (
        <div className="font-semibold text-gray-800">
          <div className="text-lg">
            {record.periode.year_start} - {record.periode.year_end}
          </div>
          <div className="mt-1 text-sm font-normal text-gray-500">{countYearLeft(record.periode.year_start, record.periode.year_end)} Tahun</div>
        </div>
      )
    },
    {
      title: 'Dasar Hukum',
      render: (_, record) => (
        <div>
          <div className="font-medium text-gray-700">{record.dasar_hukum.name}</div>
        </div>
      )
    },
    {
      title: 'Download PDF',
      render: (_, record) => (
        <Button type="primary" icon={<DownloadOutlined />} onClick={() => window.open(record.dasar_hukum.doc, '_blank')} className="border-0 bg-gradient-to-r from-primary-600 to-primary-700 shadow-md hover:shadow-lg">
          <span className="hidden sm:inline">Unduh PDF</span>
          <span className="sm:hidden">PDF</span>
        </Button>
      )
    },
    {
      title: 'Lihat Peta',
      render: () => (
        <Button type="default" icon={<EnvironmentOutlined />} onClick={() => navigate('/map')} className="border-primary-500 text-primary-600 hover:bg-primary-50">
          <span className="hidden sm:inline">Buka Peta</span>
          <span className="sm:hidden">Peta</span>
        </Button>
      )
    }
  ];

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
                <span className="text-sm font-semibold uppercase tracking-wide text-white">📅 Periode Perencanaan</span>
              </div>
            </div>

            <Title level={1} className="!font-display !mb-4 text-4xl !text-white md:text-5xl lg:text-6xl">
              Periode RTRW Gorontalo
            </Title>
            <Paragraph className="mx-auto max-w-2xl text-lg text-blue-50 md:text-xl">Dokumen perencanaan tata ruang wilayah Provinsi Gorontalo untuk berbagai periode perencanaan pembangunan daerah</Paragraph>
          </div>
        </div>

        {/* Wave decoration */}
        {/* <div className="absolute bottom-[-2px] left-0 right-0 z-10">
          <svg viewBox="0 0 1440 120" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-auto">
            <path
              d="M0 0L60 10C120 20 240 40 360 45C480 50 600 40 720 35C840 30 960 30 1080 35C1200 40 1320 50 1380 55L1440 60V120H1380C1320 120 1200 120 1080 120C960 120 840 120 720 120C600 120 480 120 360 120C240 120 120 120 60 120H0V0Z"
              fill="#f8fafc"
            />
          </svg>
        </div> */}
      </div>

      <Content className="section-padding">
        <div className="container-custom">
          <div className="mx-auto max-w-5xl">
            {/* Info Card */}
            <div className="animate-fade-in mb-8 rounded-xl border-l-4 border-primary-600 bg-gradient-to-r from-blue-50 to-primary-50 p-6">
              <h3 className="mb-2 flex items-center gap-2 font-bold text-gray-800">
                <span className="text-xl">ℹ️</span>
                Informasi Penting
              </h3>
              <p className="text-sm text-gray-600 md:text-base">
                Halaman ini menyediakan akses ke dokumen-dokumen RTRW Provinsi Gorontalo dari berbagai periode perencanaan. Setiap dokumen mengacu pada Peraturan Daerah yang berlaku dan memuat rencana penataan ruang wilayah untuk jangka waktu
                tertentu.
              </p>
            </div>

            {/* Table Card */}
            <div className="shadow-elegant animate-slide-up overflow-hidden rounded-2xl border border-gray-100 bg-white">
              <div className="border-b border-gray-100 p-6">
                <Title level={3} className="!mb-2 !text-gray-800">
                  Dokumen RTRW Tersedia
                </Title>
                <Paragraph className="!mb-0 text-gray-600">Daftar dokumen perencanaan tata ruang dari berbagai periode - unduh dokumen lengkap atau lihat visualisasi peta interaktif</Paragraph>
              </div>

              <div className="overflow-x-auto p-6">
                <Skeleton loading={getAllRtrws.isLoading}>
                  <Table dataSource={rtrws} columns={columns} pagination={false} className="custom-table" />
                </Skeleton>
              </div>
            </div>

            {/* Additional Info */}
            <div className="mt-8 grid grid-cols-1 gap-6 md:grid-cols-3">
              <div className="rounded-xl border border-gray-100 bg-white p-6 shadow-sm transition-shadow hover:shadow-md">
                <div className="mb-3 text-3xl">📄</div>
                <h4 className="mb-2 font-semibold text-gray-800">Format Digital</h4>
                <p className="text-sm text-gray-600">Dokumen tersedia dalam format PDF yang dapat diunduh dan dibaca offline</p>
              </div>

              <div className="rounded-xl border border-gray-100 bg-white p-6 shadow-sm transition-shadow hover:shadow-md">
                <div className="mb-3 text-3xl">🗺️</div>
                <h4 className="mb-2 font-semibold text-gray-800">Peta Interaktif</h4>
                <p className="text-sm text-gray-600">Visualisasi GIS lengkap dengan layer kawasan yang dapat di-toggle</p>
              </div>

              <div className="rounded-xl border border-gray-100 bg-white p-6 shadow-sm transition-shadow hover:shadow-md">
                <div className="mb-3 text-3xl">⏱️</div>
                <h4 className="mb-2 font-semibold text-gray-800">Multi Periode</h4>
                <p className="text-sm text-gray-600">Akses dokumen dari berbagai periode perencanaan untuk referensi dan perbandingan</p>
              </div>
            </div>
          </div>
        </div>
      </Content>

      <Footer />
    </Layout>
  );
};

export default PeriodePage;
