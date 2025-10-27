import { DataTable, DataTableHeader } from '@/components';
import { Action } from '@/constants';
import { useAuth, useCrudModal, useNotification, usePagination, useService } from '@/hooks';
import { KlasifikasisService, PolaruangsService } from '@/services';
import { Card, Skeleton, Space } from 'antd';
import React from 'react';
import { Delete, Edit } from '@/components/dashboard/button';
import Modul from '@/constants/Modul';
import { formFields } from './FormFields';
import { Polaruangs as PolaruangModel } from '@/models';

const { UPDATE, READ, DELETE } = Action;

const Polaruangs = () => {
  const { token, user } = useAuth();
  const modal = useCrudModal();
  const { success, error } = useNotification();
  const { execute, ...getAllPolaruangs } = useService(PolaruangsService.getAll);
  const { execute: fetchKlasifikasis, ...getAllKlasifikasis } = useService(KlasifikasisService.getAll);
  const storePolaruang = useService(PolaruangsService.store);
  const updatePolaruang = useService(PolaruangsService.update);
  const deletePolaruang = useService(PolaruangsService.delete);
  const deleteBatchPolaruangs = useService(PolaruangsService.deleteBatch);
  const [filterValues, setFilterValues] = React.useState({ search: '' });

  const pagination = usePagination({ totalData: getAllPolaruangs.totalData });

  const [selectedPolaruangs, setSelectedPolaruangs] = React.useState([]);

  const fetchPolaruangs = React.useCallback(() => {
    execute({
      token: token,
      page: pagination.page,
      per_page: pagination.per_page,
      search: filterValues.search
    });
  }, [execute, filterValues.search, pagination.page, pagination.per_page, token]);

  React.useEffect(() => {
    fetchPolaruangs();
    fetchKlasifikasis({ token: token });
  }, [fetchKlasifikasis, fetchPolaruangs, pagination.page, pagination.per_page, token]);

  const polaRuangs = getAllPolaruangs.data ?? [];
  const klasifikasis = getAllKlasifikasis.data ?? [];

  const column = [
    {
      title: 'Nama Polaruang',
      dataIndex: 'name',
      sorter: (a, b) => a.name.length - b.name.length,
      searchable: true
    },
    {
      title: 'Klasifikasi',
      dataIndex: ['klasifikasi', 'name'],
      sorter: (a, b) => a.klasifikasi.name.length - b.klasifikasi.name.length,
      searchable: true
    }
  ];

  if (user && user.eitherCan([UPDATE, PolaruangModel], [DELETE, PolaruangModel], [READ, PolaruangModel])) {
    column.push({
      title: 'Aksi',
      render: (_, record) => (
        <Space size="small">
          <Edit
            title={`Edit ${Modul.POLARUANG}`}
            model={PolaruangModel}
            onClick={() => {
              modal.edit({
                title: `Edit ${Modul.POLARUANG}`,
                data: { ...record, id_klasifikasi: record.klasifikasi.id },
                formFields: formFields({ options: { klasifikasi: klasifikasis } }),
                onSubmit: async (values) => {
                  const { message, isSuccess } = await updatePolaruang.execute(record.id, { ...values, _method: 'PUT' }, token, values.geojson_file.file);
                  if (isSuccess) {
                    success('Berhasil', message);
                    fetchPolaruangs({ token: token, page: pagination.page, per_page: pagination.per_page });
                  } else {
                    error('Gagal', message);
                  }
                  return isSuccess;
                }
              });
            }}
          />
          <Delete
            title={`Delete ${Modul.POLARUANG}`}
            model={PolaruangModel}
            onClick={() => {
              modal.delete.default({
                title: `Delete ${Modul.POLARUANG}`,
                data: record,
                formFields: formFields,
                onSubmit: async () => {
                  const { isSuccess, message } = await deletePolaruang.execute(record.id, token);
                  if (isSuccess) {
                    success('Berhasil', message);
                    fetchPolaruangs({ token: token, page: pagination.page, per_page: pagination.per_page });
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
      title: `Tambah ${Modul.POLARUANG}`,
      formFields: formFields({ options: { klasifikasi: klasifikasis } }),
      onSubmit: async (values) => {
        const { message, isSuccess } = await storePolaruang.execute(values, token, values.geojson_file.file);
        if (isSuccess) {
          success('Berhasil', message);
          fetchPolaruangs({ token: token, page: pagination.page, per_page: pagination.per_page });
        } else {
          error('Gagal', message);
        }
        return isSuccess;
      }
    });
  };

  const onDeleteBatch = () => {
    modal.delete.batch({
      title: `Hapus ${selectedPolaruangs.length} ${Modul.POLARUANG} Yang Dipilih ? `,
      onSubmit: async () => {
        const ids = selectedPolaruangs.map((item) => item.id);
        const { message, isSuccess } = await deleteBatchPolaruangs.execute(ids, token);
        if (isSuccess) {
          success('Berhasil', message);
          fetchKlasifikasis(token, pagination.page, pagination.per_page);
          setSelectedPolaruangs([]);
        } else {
          error('Gagal', message);
        }
        return isSuccess;
      }
    });
  };

  return (
    <Card>
      <Skeleton loading={getAllPolaruangs.isLoading}>
        <DataTableHeader onStore={onCreate} modul={Modul.POLARUANG} onDeleteBatch={onDeleteBatch} selectedData={selectedPolaruangs} onSearch={(values) => setFilterValues({ search: values })} model={PolaruangModel} />
        <div className="w-full max-w-full overflow-x-auto">
          <DataTable
            data={polaRuangs}
            columns={column}
            loading={getAllPolaruangs.isLoading}
            map={(registrant) => ({ key: registrant.id, ...registrant })}
            pagination={pagination}
            handleSelectedData={(_, selectedRows) => setSelectedPolaruangs(selectedRows)}
          />
        </div>
      </Skeleton>
    </Card>
  );
};

export default Polaruangs;
