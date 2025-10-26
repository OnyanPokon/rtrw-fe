import { DataTable, DataTableHeader } from '@/components';
import { Action } from '@/constants';
import { useAuth, useCrudModal, useNotification, usePagination, useService } from '@/hooks';
import { RegionsService, RtrwsService } from '@/services';
import { Card, Space } from 'antd';
import { Rtrws as RtrwModel } from '@/models';
import React from 'react';
import { Delete, Edit } from '@/components/dashboard/button';
import Modul from '@/constants/Modul';
import { formFields } from './FormFields';
import dateFormatter from '@/utils/dateFormatter';
import dayjs from 'dayjs';

const { UPDATE, READ, DELETE } = Action;

const Rtrws = () => {
  const { token, user } = useAuth();
  const modal = useCrudModal();
  const { success, error } = useNotification();
  const { execute, ...getAllRtrws } = useService(RtrwsService.getAll);
  const { execute: fetchRegions, ...getAllRegions } = useService(RegionsService.getAll);
  const storeRtrw = useService(RtrwsService.store);
  const updateRtrw = useService(RtrwsService.update);
  const deleteRtrw = useService(RtrwsService.delete);
  const deleteBatchRtrws = useService(RtrwsService.deleteBatch);
  const [filterValues, setFilterValues] = React.useState({ search: '' });

  const pagination = usePagination({ totalData: getAllRtrws.totalData });

  const [selectedRegions, setSelectedRegions] = React.useState([]);

  const fetchRtrws = React.useCallback(() => {
    execute({
      token: token,
      page: pagination.page,
      per_page: pagination.per_page,
      search: filterValues.search
    });
  }, [execute, filterValues.search, pagination.page, pagination.per_page, token]);

  React.useEffect(() => {
    fetchRtrws();
    fetchRegions({ token: token });
  }, [fetchRegions, fetchRtrws, pagination.page, pagination.per_page, token]);

  const rtrws = getAllRtrws.data ?? [];
  const regions = getAllRegions.data ?? [];

  const column = [
    {
      title: 'RTRW',
      dataIndex: 'name',
      sorter: (a, b) => a.name.length - b.name.length,
      searchable: true
    },
    {
      title: 'Tahun Mulai',
      dataIndex: 'start_year',
      sorter: (a, b) => a.start_year.length - b.start_year.length,
      searchable: true
    },
    {
      title: 'Tahun Berakhir',
      dataIndex: 'end_year',
      sorter: (a, b) => a.end_year.length - b.end_year.length,
      searchable: true
    }
  ];

  if (user && user.eitherCan([UPDATE, RtrwModel], [DELETE, RtrwModel], [READ, RtrwModel])) {
    column.push({
      title: 'Aksi',
      render: (_, record) => (
        <Space size="small">
          <Edit
            title={`Edit ${Modul.RTRW}`}
            model={RtrwModel}
            onClick={() => {
              modal.edit({
                title: `Edit ${Modul.RTRW}`,
                data: { ...record, start_year: dayjs(record.start_year), end_year: dayjs(record.end_year), region_id: record.region.id },
                formFields: formFields({ options: { regions } }),
                onSubmit: async (values) => {
                  const { message, isSuccess } = await updateRtrw.execute(record.id, { ...values, start_year: dateFormatter(values.start_year, 'year'), end_year: dateFormatter(values.end_year, 'year'), _method: 'PUT' }, token);
                  if (isSuccess) {
                    success('Berhasil', message);
                    fetchRegions({ token: token, page: pagination.page, per_page: pagination.per_page });
                  } else {
                    error('Gagal', message);
                  }
                  return isSuccess;
                }
              });
            }}
          />
          <Delete
            title={`Delete ${Modul.RTRW}`}
            model={RtrwModel}
            onClick={() => {
              modal.delete.default({
                title: `Delete ${Modul.RTRW}`,
                data: record,
                formFields: formFields,
                onSubmit: async () => {
                  const { isSuccess, message } = await deleteRtrw.execute(record.id, token);
                  if (isSuccess) {
                    success('Berhasil', message);
                    fetchRegions({ token: token, page: pagination.page, per_page: pagination.per_page });
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
      title: `Tambah ${Modul.RTRW}`,
      formFields: formFields({ options: { regions } }),
      onSubmit: async (values) => {
        const { message, isSuccess } = await storeRtrw.execute({ ...values, start_year: dateFormatter(values.start_year, 'year'), end_year: dateFormatter(values.end_year, 'year') }, token, values?.doc?.file ?? null);
        if (isSuccess) {
          success('Berhasil', message);
          fetchRtrws({ token: token, page: pagination.page, per_page: pagination.per_page });
        } else {
          error('Gagal', message);
        }
        return isSuccess;
      }
    });
  };

  const onDeleteBatch = () => {
    modal.delete.batch({
      title: `Hapus ${selectedRegions.length} ${Modul.RTRW} Yang Dipilih ? `,
      onSubmit: async () => {
        const ids = selectedRegions.map((item) => item.id);
        const { message, isSuccess } = await deleteBatchRtrws.execute(ids, token);
        if (isSuccess) {
          success('Berhasil', message);
          fetchRegions(token, pagination.page, pagination.per_page);
          setSelectedRegions([]);
        } else {
          error('Gagal', message);
        }
        return isSuccess;
      }
    });
  };

  return (
    <Card>
      <DataTableHeader onStore={onCreate} modul={Modul.RTRW} onDeleteBatch={onDeleteBatch} selectedData={selectedRegions} onSearch={(values) => setFilterValues({ search: values })} model={RtrwModel} />
      <div className="w-full max-w-full overflow-x-auto">
        <DataTable data={rtrws} columns={column} loading={getAllRtrws.isLoading} map={(registrant) => ({ key: registrant.id, ...registrant })} pagination={pagination} handleSelectedData={(_, selectedRows) => setSelectedRegions(selectedRows)} />
      </div>
    </Card>
  );
};

export default Rtrws;
