import { DataTable, DataTableHeader } from '@/components';
import { Action } from '@/constants';
import { useAuth, useCrudModal, useNotification, usePagination, useService } from '@/hooks';
import { PeriodesService } from '@/services';
import { Card, Skeleton, Space } from 'antd';
import { Periodes as PeriodeModel } from '@/models';
import React from 'react';
import { Delete, Edit } from '@/components/dashboard/button';
import Modul from '@/constants/Modul';
import { formFields } from './FormFields';
import dateFormatter from '@/utils/dateFormatter';
import dayjs from 'dayjs';

const { UPDATE, READ, DELETE } = Action;

const Periodes = () => {
  const { token, user } = useAuth();
  const modal = useCrudModal();
  const { success, error } = useNotification();
  const { execute, ...getAllPeriodes } = useService(PeriodesService.getAll);
  const storePeriode = useService(PeriodesService.store);
  const updatePeriode = useService(PeriodesService.update);
  const deletePeriode = useService(PeriodesService.delete);
  const deleteBatchPeriodes = useService(PeriodesService.deleteBatch);
  const [filterValues, setFilterValues] = React.useState({ search: '' });

  const pagination = usePagination({ totalData: getAllPeriodes.totalData });

  const [selectedPeriodes, setSelectedPeriodes] = React.useState([]);

  const fetchPeriodes = React.useCallback(() => {
    execute({
      token: token,
      page: pagination.page,
      per_page: pagination.per_page,
      search: filterValues.search
    });
  }, [execute, filterValues.search, pagination.page, pagination.per_page, token]);

  React.useEffect(() => {
    fetchPeriodes();
  }, [fetchPeriodes, pagination.page, pagination.per_page, token]);

  const periodes = getAllPeriodes.data ?? [];

  const column = [
    {
      title: 'Tahun Mulai',
      dataIndex: 'year_start',
      sorter: (a, b) => a.year_start.length - b.year_start.length,
      searchable: true
    },
    {
      title: 'Tahun Berakhir',
      dataIndex: 'year_end',
      sorter: (a, b) => a.year_end.length - b.year_end.length,
      searchable: true
    }
  ];

  if (user && user.eitherCan([UPDATE, PeriodeModel], [DELETE, PeriodeModel], [READ, PeriodeModel])) {
    column.push({
      title: 'Aksi',
      render: (_, record) => (
        <Space size="small">
          <Edit
            title={`Edit ${Modul.PERIODE}`}
            model={PeriodeModel}
            onClick={() => {
              modal.edit({
                title: `Edit ${Modul.PERIODE}`,
                data: { ...record, year_start: dayjs(record.year_start), year_end: dayjs(record.year_end) },
                formFields: formFields,
                onSubmit: async (values) => {
                  const { message, isSuccess } = await updatePeriode.execute(record.id, { ...values, year_start: dateFormatter(values.year_start, 'year'), year_end: dateFormatter(values.year_end, 'year') }, token);
                  if (isSuccess) {
                    success('Berhasil', message);
                    fetchPeriodes({ token: token, page: pagination.page, per_page: pagination.per_page });
                  } else {
                    error('Gagal', message);
                  }
                  return isSuccess;
                }
              });
            }}
          />
          <Delete
            title={`Delete ${Modul.PERIODE}`}
            model={PeriodeModel}
            onClick={() => {
              modal.delete.default({
                title: `Delete ${Modul.PERIODE}`,
                onSubmit: async () => {
                  const { isSuccess, message } = await deletePeriode.execute(record.id, token);
                  if (isSuccess) {
                    success('Berhasil', message);
                    fetchPeriodes({ token: token, page: pagination.page, per_page: pagination.per_page });
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
      title: `Tambah ${Modul.PERIODE}`,
      formFields: formFields,
      onSubmit: async (values) => {
        const { message, isSuccess } = await storePeriode.execute({ ...values, year_start: dateFormatter(values.year_start, 'year'), year_end: dateFormatter(values.year_end, 'year') }, token);
        if (isSuccess) {
          success('Berhasil', message);
          fetchPeriodes({ token: token, page: pagination.page, per_page: pagination.per_page });
        } else {
          error('Gagal', message);
        }
        return isSuccess;
      }
    });
  };

  const onDeleteBatch = () => {
    modal.delete.batch({
      title: `Hapus ${selectedPeriodes.length} ${Modul.PERIODE} Yang Dipilih ? `,
      onSubmit: async () => {
        const ids = selectedPeriodes.map((item) => item.id);
        const { message, isSuccess } = await deleteBatchPeriodes.execute(ids, token);
        if (isSuccess) {
          success('Berhasil', message);
          setSelectedPeriodes([]);
        } else {
          error('Gagal', message);
        }
        return isSuccess;
      }
    });
  };

  return (
    <Card>
      <Skeleton loading={getAllPeriodes.isLoading}>
        <DataTableHeader onStore={onCreate} modul={Modul.PERIODE} onDeleteBatch={onDeleteBatch} selectedData={selectedPeriodes} onSearch={(values) => setFilterValues({ search: values })} model={PeriodeModel} />
        <div className="w-full max-w-full overflow-x-auto">
          <DataTable
            data={periodes}
            columns={column}
            loading={getAllPeriodes.isLoading}
            map={(registrant) => ({ key: registrant.id, ...registrant })}
            pagination={pagination}
            handleSelectedData={(_, selectedRows) => setSelectedPeriodes(selectedRows)}
          />
        </div>
      </Skeleton>
    </Card>
  );
};

export default Periodes;
