import { Delete, Edit } from '@/components/dashboard/button';
import Modul from '@/constants/Modul';
import { useAuth, useCrudModal, useNotification, usePagination, useService } from '@/hooks';
import { Card, Skeleton, Space } from 'antd';
import { News as NewsModel } from '@/models';
import React from 'react';
import { Action } from '@/constants';
import { DataTable, DataTableHeader } from '@/components';
import NewsService from '@/services/NewsService.js';
import { useNavigate } from 'react-router-dom';

const { DELETE, UPDATE, READ } = Action;

const News = () => {
  const modal = useCrudModal();
  const navigate = useNavigate();
  const { success, error } = useNotification();
  const { token, user } = useAuth();
  const { execute, ...getAllNews } = useService(NewsService.getAll);

  const pagination = usePagination({ totalData: getAllNews.totalData });
  const [filterValues, setFilterValues] = React.useState({ search: '' });

  const [selectedNews, setSelectedNews] = React.useState([]);

  const fetchNews = React.useCallback(() => {
    execute({
      token: token,
      page: pagination.page,
      per_page: pagination.perPage,
      search: filterValues.search
    });
  }, [execute, filterValues.search, pagination.page, pagination.perPage, token]);

  React.useEffect(() => {
    fetchNews();
  }, [fetchNews, token]);

  const news = getAllNews.data ?? [];

  const deleteNews = useService(NewsService.delete);
  const deleteBatchNews = useService(NewsService.deleteBatch);

  const column = [
    {
      title: 'Judul',
      dataIndex: 'title',
      sorter: (a, b) => a.title.length - b.title.length,
      searchable: true
    },
    {
      title: 'Status',
      dataIndex: 'status',
      sorter: (a, b) => a.status.length - b.status.length,
      searchable: true
    }
  ];

  if (user && user.eitherCan([UPDATE, NewsModel], [DELETE, NewsModel], [READ, NewsModel])) {
    column.push({
      title: 'Aksi',
      render: (_, record) => (
        <Space size="small">
          <Edit
            title={`Edit ${Modul.NEWS}`}
            model={NewsModel}
            onClick={() => {
              navigate(window.location.pathname + '/edit/' + record.slug);
            }}
          />
          <Delete
            title={`Delete ${Modul.NEWS}`}
            model={NewsModel}
            onClick={() => {
              modal.delete.default({
                title: `Delete ${Modul.NEWS}`,
                data: record,
                onSubmit: async () => {
                  const { isSuccess, message } = await deleteNews.execute(record.id, token);
                  if (isSuccess) {
                    success('Berhasil', message);
                    fetchNews({ token: token, page: pagination.page, per_page: pagination.per_page });
                  } else {
                    error('Gagal', message);
                  }
                  return isSuccess;
                }
              });
            }}
          />
        </Space>
      )
    });
  }

  const onCreate = () => {
    navigate(window.location.pathname + '/create');
  };

  const onDeleteBatch = () => {
    modal.delete.batch({
      title: `Hapus ${selectedNews.length} ${Modul.STRUKTUR} Yang Dipilih ? `,
      onSubmit: async () => {
        const ids = selectedNews.map((item) => item.id);
        const { message, isSuccess } = await deleteBatchNews.execute(ids, token);
        if (isSuccess) {
          success('Berhasil', message);
          fetchNews(token, pagination.page, pagination.per_page);
          setSelectedNews([]);
        } else {
          error('Gagal', message);
        }
        return isSuccess;
      }
    });
  };

  return (
    <Card>
      <Skeleton loading={getAllNews.isLoading}>
        <DataTableHeader model={NewsModel} modul={Modul.NEWS} onStore={onCreate} onDeleteBatch={onDeleteBatch} selectedData={selectedNews} onSearch={(values) => setFilterValues({ ...filterValues, search: values })} />
        <div className="w-full max-w-full overflow-x-auto">
          <DataTable data={news} columns={column} loading={getAllNews.isLoading} map={(news) => ({ key: news.id, ...news })} handleSelectedData={(_, selectedRows) => setSelectedNews(selectedRows)} pagination={pagination} />
        </div>
      </Skeleton>
    </Card>
  );
};

export default News;
