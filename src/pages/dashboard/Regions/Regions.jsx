import { DataTable, DataTableHeader } from '@/components';
import { Action } from '@/constants';
import { useAuth, useCrudModal, useNotification, usePagination, useService } from '@/hooks';
import { RegionsService } from '@/services';
import { Card, Space } from 'antd';
import { Regions as RegionModel } from '@/models';
import React from 'react';
import { Delete, Edit } from '@/components/dashboard/button';
import Modul from '@/constants/Modul';
import { formFields } from './FormFields';

const { UPDATE, READ, DELETE } = Action;

const Regions = () => {
  const { token, user } = useAuth();
  const modal = useCrudModal();
  const { success, error } = useNotification();
  const { execute, ...getAllRegions } = useService(RegionsService.getAll);
  const storeRegion = useService(RegionsService.store);
  const updateRegion = useService(RegionsService.update);
  const deleteRegion = useService(RegionsService.delete);
  const deleteBatchRegions = useService(RegionsService.deleteBatch);
  const [filterValues, setFilterValues] = React.useState({ search: '' });

  const pagination = usePagination({ totalData: getAllRegions.totalData });

  const [selectedRegions, setSelectedRegions] = React.useState([]);

  const fetchRegions = React.useCallback(() => {
    execute({
      token: token,
      page: pagination.page,
      per_page: pagination.per_page,
      search: filterValues.search
    });
  }, [execute, filterValues.search, pagination.page, pagination.per_page, token]);

  React.useEffect(() => {
    fetchRegions();
  }, [fetchRegions, pagination.page, pagination.per_page, token]);

  const regions = getAllRegions.data ?? [];

  const column = [
    {
      title: 'Kode Wilayah',
      dataIndex: 'region_code',
      sorter: (a, b) => a.region_code.length - b.region_code.length,
      searchable: true
    },
    {
      title: 'Nama Wilayah',
      dataIndex: 'name',
      sorter: (a, b) => a.name.length - b.name.length,
      searchable: true
    },
    {
      title: 'Tipe Wilayah',
      dataIndex: 'type',
      sorter: (a, b) => a.type.length - b.type.length,
      searchable: true
    }
  ];

  if (user && user.eitherCan([UPDATE, RegionModel], [DELETE, RegionModel], [READ, RegionModel])) {
    column.push({
      title: 'Aksi',
      render: (_, record) => (
        <Space size="small">
          <Edit
            title={`Edit ${Modul.REGION}`}
            model={RegionModel}
            onClick={() => {
              modal.edit({
                title: `Edit ${Modul.REGION}`,
                data: record,
                formFields: formFields,
                onSubmit: async (values) => {
                  const { message, isSuccess } = await updateRegion.execute(record.id, values, token);
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
            title={`Delete ${Modul.REGION}`}
            model={RegionModel}
            onClick={() => {
              modal.delete.default({
                title: `Delete ${Modul.REGION}`,
                data: record,
                formFields: formFields,
                onSubmit: async () => {
                  const { isSuccess, message } = await deleteRegion.execute(record.id, token);
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
      title: `Tambah ${Modul.REGION}`,
      formFields: formFields,
      onSubmit: async (values) => {
        const { message, isSuccess } = await storeRegion.execute(values, token);
        if (isSuccess) {
          success('Berhasil', message);
          fetchRegions({ token: token, page: pagination.page, per_page: pagination.per_page });
        } else {
          error('Gagal', message);
        }
        return isSuccess;
      }
    });
  };

  const onDeleteBatch = () => {
    modal.delete.batch({
      title: `Hapus ${selectedRegions.length} ${Modul.REGION} Yang Dipilih ? `,
      onSubmit: async () => {
        const ids = selectedRegions.map((item) => item.id);
        const { message, isSuccess } = await deleteBatchRegions.execute(ids, token);
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
      <DataTableHeader onStore={onCreate} modul={Modul.REGION} onDeleteBatch={onDeleteBatch} selectedData={selectedRegions} onSearch={(values) => setFilterValues({ search: values })} model={RegionModel} />
      <div className="w-full max-w-full overflow-x-auto">
        <DataTable data={regions} columns={column} loading={getAllRegions.isLoading} map={(registrant) => ({ key: registrant.id, ...registrant })} pagination={pagination} handleSelectedData={(_, selectedRows) => setSelectedRegions(selectedRows)} />
      </div>
    </Card>
  );
};

export default Regions;
