import { useAuth, useService } from '@/hooks';
import { DashboardService } from '@/services';
import { EnvironmentOutlined, ExpandAltOutlined, ExpandOutlined, RadarChartOutlined, SettingOutlined } from '@ant-design/icons';
import { Card } from 'antd';
import React from 'react';

const Dashboard = () => {
  const { token } = useAuth();
  const { execute, ...getAllSummary } = useService(DashboardService.getAll);

  const fetchNews = React.useCallback(() => {
    execute({
      token: token
    });
  }, [execute, token]);

  React.useEffect(() => {
    fetchNews();
  }, [fetchNews]);

  const summary = getAllSummary.data ?? [];

  console.log(summary);

  return (
    <div className="grid w-full grid-cols-5 gap-x-2">
      <Card className="col-span-1">
        <div className="flex items-center justify-between">
          <div className="flex flex-col gap-y-1">
            <p className="font-semibold capitalize">Polaruang</p>
            <span className="text-xl font-semibold">{summary.polaruang}</span>
          </div>
          <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-blue-500 p-2 text-2xl text-white">
            <ExpandOutlined />
          </div>
        </div>
      </Card>
      <Card className="col-span-1">
        <div className="flex items-center justify-between">
          <div className="flex flex-col gap-y-1">
            <p className="font-semibold capitalize">Struktur Ruang</p>
            <span className="text-xl font-semibold">{summary.struktur_ruang}</span>
          </div>
          <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-blue-500 p-2 text-2xl text-white">
            <EnvironmentOutlined />
          </div>
        </div>
      </Card>
      <Card className="col-span-1">
        <div className="flex items-center justify-between">
          <div className="flex flex-col gap-y-1">
            <p className="font-semibold capitalize">Ketentuan Khusus</p>
            <span className="text-xl font-semibold">{summary.ketentuan_khusus}</span>
          </div>
          <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-blue-500 p-2 text-2xl text-white">
            <ExpandAltOutlined />
          </div>
        </div>
      </Card>
      <Card className="col-span-1">
        <div className="flex items-center justify-between">
          <div className="flex flex-col gap-y-1">
            <p className="font-semibold capitalize">Indikasi Program</p>
            <span className="text-xl font-semibold">{summary.indikasi_program}</span>
          </div>
          <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-blue-500 p-2 text-2xl text-white">
            <SettingOutlined />
          </div>
        </div>
      </Card>
      <Card className="col-span-1">
        <div className="flex items-center justify-between">
          <div className="flex flex-col gap-y-1">
            <p className="font-semibold capitalize">PKKPRL</p>
            <span className="text-xl font-semibold">{summary.pkkprl}</span>
          </div>
          <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-blue-500 p-2 text-2xl text-white">
            <RadarChartOutlined />
          </div>
        </div>
      </Card>
    </div>
  );
};

export default Dashboard;
