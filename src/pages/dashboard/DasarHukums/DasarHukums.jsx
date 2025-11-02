import { DataTable, DataTableHeader } from '@/components';
import { Action } from '@/constants';
import { useAuth, useCrudModal, useNotification, usePagination, useService } from '@/hooks';
import { DasarHukumsService } from '@/services';
import { Button, Card, Skeleton, Space } from 'antd';
import { DasarHukums as DasarHukumModel } from '@/models';
import React from 'react';
import { Delete, Detail, Edit } from '@/components/dashboard/button';
import Modul from '@/constants/Modul';
import { formFields } from './FormFields';
import { DownloadOutlined } from '@ant-design/icons';

const { UPDATE, READ, DELETE } = Action;

const DasarHukums = () => {
  const { token, user } = useAuth();
  const modal = useCrudModal();
  const { success, error } = useNotification();
  const { execute, ...getAllDasarHukums } = useService(DasarHukumsService.getAll);
  const storeDasarHukum = useService(DasarHukumsService.store);
  const updateDasarHukum = useService(DasarHukumsService.update);
  const deleteDasarHukum = useService(DasarHukumsService.delete);
  const deleteBatchDasarHukums = useService(DasarHukumsService.deleteBatch);
  const [filterValues, setFilterValues] = React.useState({ search: '' });

  const pagination = usePagination({ totalData: getAllDasarHukums.totalData });

  const [selectedDasarHukums, setSelectedDasarHukums] = React.useState([]);

  const fetchDasarHukums = React.useCallback(() => {
    execute({
      token: token,
      page: pagination.page,
      per_page: pagination.per_page,
      search: filterValues.search
    });
  }, [execute, filterValues.search, pagination.page, pagination.per_page, token]);

  React.useEffect(() => {
    fetchDasarHukums();
  }, [fetchDasarHukums, pagination.page, pagination.per_page, token]);

  const dasarHukums = getAllDasarHukums.data ?? [];

  const column = [
    {
      title: 'Dasar Hukum',
      dataIndex: 'name',
      sorter: (a, b) => a.name.length - b.name.length,
      searchable: true
    }
  ];

  if (user && user.eitherCan([UPDATE, DasarHukumModel], [DELETE, DasarHukumModel], [READ, DasarHukumModel])) {
    column.push({
      title: 'Aksi',
      render: (_, record) => (
        <Space size="small">
          <Edit
            title={`Edit ${Modul.DASAR_HUKUM}`}
            model={DasarHukumModel}
            onClick={() => {
              modal.edit({
                title: `Edit ${Modul.DASAR_HUKUM}`,
                data: record,
                formFields: formFields,
                onSubmit: async (values) => {
                  const { message, isSuccess } = await updateDasarHukum.execute(record.id, { ...values, _method: 'PUT' }, token, values.doc.file);
                  if (isSuccess) {
                    success('Berhasil', message);
                    fetchDasarHukums({ token: token, page: pagination.page, per_page: pagination.per_page });
                  } else {
                    error('Gagal', message);
                  }
                  return isSuccess;
                }
              });
            }}
          />
          <Detail
            title={`Detail ${Modul.DASAR_HUKUM}`}
            model={DasarHukumModel}
            onClick={() => {
              modal.show.description({
                title: record.name,
                data: [
                  {
                    key: 'name',
                    label: `Nama Klasifikasi`,
                    children: record.name
                  },
                  {
                    key: 'file_dokumen',
                    label: `File Dokumen Dasar Hukum`,
                    children: (
                      <Button icon={<DownloadOutlined />} onClick={() => window.open(record.doc, '_blank')}>
                        Download
                      </Button>
                    )
                  }
                ]
              });
            }}
          />
          <Delete
            title={`Delete ${Modul.DASAR_HUKUM}`}
            model={DasarHukumModel}
            onClick={() => {
              modal.delete.default({
                title: `Delete ${Modul.DASAR_HUKUM}`,
                data: record,
                formFields: formFields,
                onSubmit: async () => {
                  const { isSuccess, message } = await deleteDasarHukum.execute(record.id, token);
                  if (isSuccess) {
                    success('Berhasil', message);
                    fetchDasarHukums({ token: token, page: pagination.page, per_page: pagination.per_page });
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
    modal.create({
      title: `Tambah ${Modul.DASAR_HUKUM}`,
      formFields: formFields,
      onSubmit: async (values) => {
        const { message, isSuccess } = await storeDasarHukum.execute(values, token, values.doc.file);
        if (isSuccess) {
          success('Berhasil', message);
          fetchDasarHukums({ token: token, page: pagination.page, per_page: pagination.per_page });
        } else {
          error('Gagal', message);
        }
        return isSuccess;
      }
    });
  };

  const onDeleteBatch = () => {
    modal.delete.batch({
      title: `Hapus ${selectedDasarHukums.length} ${Modul.DASAR_HUKUM} Yang Dipilih ? `,
      onSubmit: async () => {
        const ids = selectedDasarHukums.map((item) => item.id);
        const { message, isSuccess } = await deleteBatchDasarHukums.execute(ids, token);
        if (isSuccess) {
          success('Berhasil', message);
          fetchDasarHukums(token, pagination.page, pagination.per_page);
          setSelectedDasarHukums([]);
        } else {
          error('Gagal', message);
        }
        return isSuccess;
      }
    });
  };

  return (
    <Card>
      <Skeleton loading={getAllDasarHukums.isLoading}>
        <DataTableHeader onStore={onCreate} modul={Modul.DASAR_HUKUM} onDeleteBatch={onDeleteBatch} selectedData={selectedDasarHukums} onSearch={(values) => setFilterValues({ search: values })} model={DasarHukumModel} />
        <div className="w-full max-w-full overflow-x-auto">
          <DataTable
            data={dasarHukums}
            columns={column}
            loading={getAllDasarHukums.isLoading}
            map={(registrant) => ({ key: registrant.id, ...registrant })}
            pagination={pagination}
            handleSelectedData={(_, selectedRows) => setSelectedDasarHukums(selectedRows)}
          />
        </div>
      </Skeleton>
    </Card>
  );
};

export default DasarHukums;
