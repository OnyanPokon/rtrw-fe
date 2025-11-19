/* eslint-disable react/prop-types */
import { useNotification, useService } from '@/hooks';
import { RtrwsService } from '@/services';
import { BASE_URL } from '@/utils/api';
import asset from '@/utils/asset';
import { AimOutlined, MenuOutlined } from '@ant-design/icons';
import { Button, Checkbox, Collapse, Form, Select, Skeleton, Typography } from 'antd';
import React from 'react';
import { MapContainer, TileLayer, GeoJSON } from 'react-leaflet';
import { useNavigate } from 'react-router-dom';

const Maps = () => {
  const navigate = useNavigate();
  const { success, error } = useNotification();
  const { execute, ...getAllRtrws } = useService(RtrwsService.getAll);
  const klasifikasisByRtrw = useService(RtrwsService.getAllKlasifikasisByRtrw);
  const [selectedLayers, setSelectedLayers] = React.useState({});
  const [loadingLayers, setLoadingLayers] = React.useState({});
  const [treeData, setTreeData] = React.useState([]);

  const fetchRtrws = React.useCallback(() => {
    execute({ page: 1, per_page: 100000 });
  }, [execute]);

  React.useEffect(() => {
    fetchRtrws();
  }, [fetchRtrws]);

  const rtrws = getAllRtrws.data ?? [];

  const handleToggleLayer = async (pemetaan) => {
    const id = pemetaan.key;

    if (selectedLayers[id]) {
      const updated = { ...selectedLayers };
      delete updated[id];
      setSelectedLayers(updated);
      return;
    }

    setLoadingLayers((prev) => ({ ...prev, [id]: true }));

    try {
      const res = await fetch(BASE_URL + `/polaruang/${id}/geojson`);
      const json = await res.json();

      setSelectedLayers((prev) => ({
        ...prev,
        [id]: { id, data: json }
      }));
    } catch (e) {
      console.error('Gagal mengambil GeoJSON:', e);
    } finally {
      setLoadingLayers((prev) => ({ ...prev, [id]: false }));
    }
  };

  function mapKlasifikasiToTreeData(data) {
    return data.map((klasifikasi) => ({
      title: klasifikasi.nama,
      key: klasifikasi.id,
      children: (klasifikasi.pola_ruang || []).map((pola) => ({
        title: pola.nama,
        key: pola.id,
        geojson_file: asset(pola.geojson_file),
        isLeaf: true
      }))
    }));
  }

  const handleFetchKlasifikasi = async (values) => {
    const { message, isSuccess, data } = await klasifikasisByRtrw.execute({
      idRtrw: values.id_rtrw
    });

    if (isSuccess) {
      success('Berhasil', message);

      const klasifikasiList = data.klasifikasis ?? [];

      setTreeData(mapKlasifikasiToTreeData(klasifikasiList));
    } else {
      error('Gagal', message);
    }

    return isSuccess;
  };

  const getFeatureStyle = (feature) => {
    const props = feature.properties;
    if (!props.fill) {
      return {
        color: '#0000ff',
        weight: 3,
        fillOpacity: 0.3,
        fillColor: '#ffffff'
      };
    }

    return {
      color: props.stroke,
      weight: props['stroke-width'],
      opacity: props['stroke-opacity'],
      fillColor: props.fill,
      fillOpacity: props['fill-opacity']
    };
  };

  return (
    <section className="flex h-screen w-full">
      <div className="h-full w-full flex-[3]">
        <MapContainer center={[0.5412, 123.0595]} zoom={9} className="h-screen w-full">
          <TileLayer attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors' url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
          {Object.values(selectedLayers).map((layer) => (
            <GeoJSON key={layer.id} data={layer.data} style={getFeatureStyle} />
          ))}
        </MapContainer>
      </div>
      <div className="flex h-full w-full flex-[1] flex-col gap-y-4 overflow-y-auto bg-white p-8">
        <div className="inline-flex items-center justify-between">
          <div className="flex flex-col">
            <Typography.Title level={5} style={{ margin: 0 }}>
              Geospasial
            </Typography.Title>
            <p className="text-sm">Tampilan Map</p>
          </div>
          <Button variant="solid" color="primary" shape="round" onClick={() => navigate('/')}>
            Ke Beranda
          </Button>
        </div>
        <div className="mt-8">
          <Skeleton loading={getAllRtrws.isLoading}>
            <Form className="flex items-center gap-x-2" onFinish={handleFetchKlasifikasi}>
              <Form.Item name="id_rtrw" style={{ margin: 0 }} className="w-full">
                <Select size="large" placeholder="Pilih Data RTRW" className="w-full">
                  {rtrws.map((item) => (
                    <Select.Option key={item.id} value={item.id}>
                      {item.name}
                    </Select.Option>
                  ))}
                </Select>
              </Form.Item>

              <Form.Item style={{ margin: 0 }}>
                <Button size="large" variant="solid" color="primary" htmlType="submit" loading={klasifikasisByRtrw.isLoading}>
                  Kirim
                </Button>
              </Form.Item>
            </Form>
          </Skeleton>
        </div>
        {klasifikasisByRtrw.isLoading ? (
          <div className="flex flex-col gap-y-8">
            <div className="flex flex-col gap-y-2">
              <div className="mt-4 flex flex-col gap-y-4">
                <Collapse ghost expandIcon={() => ''}>
                  <Collapse.Panel
                    header={
                      <div className="inline-flex w-full items-center justify-between">
                        <div className="inline-flex w-full items-center gap-x-4">
                          <div className="flex items-center justify-center rounded-md bg-blue-100 p-3">
                            <AimOutlined className="text-blue-500" />
                          </div>
                          <Skeleton.Input size="small" active />
                        </div>
                        <MenuOutlined />
                      </div>
                    }
                  >
                    <div className="flex flex-col gap-y-2 px-4">
                      <Checkbox>
                        <Skeleton.Input size="small" active />
                      </Checkbox>
                      <Checkbox>
                        <Skeleton.Input size="small" active />
                      </Checkbox>
                      <Checkbox>
                        <Skeleton.Input size="small" active />
                      </Checkbox>
                      <Checkbox>
                        <Skeleton.Input size="small" active />
                      </Checkbox>
                    </div>
                  </Collapse.Panel>
                </Collapse>
              </div>
            </div>
          </div>
        ) : (
          <div className="flex flex-col gap-y-8">
            {treeData.map((item) => (
              <div key={item.key} className="flex flex-col gap-y-2">
                <div className="mt-4 flex flex-col gap-y-4">
                  <Collapse ghost expandIcon={() => ''}>
                    <Collapse.Panel
                      header={
                        <div className="inline-flex w-full items-center justify-between">
                          <div className="inline-flex w-full items-center gap-x-4">
                            <div className="flex items-center justify-center rounded-md bg-blue-100 p-3">
                              <AimOutlined className="text-blue-500" />
                            </div>
                            {item.title}
                          </div>
                          <MenuOutlined />
                        </div>
                      }
                    >
                      <div className="flex flex-col gap-y-2 px-4">
                        {item.children.map((pemetaan) => (
                          <Checkbox key={pemetaan.key} onChange={() => handleToggleLayer(pemetaan)}>
                            <span className="inline-flex items-center gap-x-2">
                              {pemetaan.title}

                              {loadingLayers[pemetaan.key] && <span className="h-3 w-3 animate-spin rounded-full border-2 border-blue-500 border-t-transparent"></span>}
                              {/* <Button
                                icon={<InfoCircleOutlined />}
                                type='link'
                                onClick={() => {
                                  modal.show.description({
                                    title: pemetaan.nama_pemetaan,
                                    data: [
                                      {
                                        key: 'name',
                                        label: `Nama Pemetaan`,
                                        children: pemetaan.nama_pemetaan
                                      },
                                      {
                                        key: 'name',
                                        label: `Deskripsi`,
                                        children: pemetaan.deskripsi
                                      },
                                      {
                                        key: 'jenis',
                                        label: `Jenis`,
                                        children: pemetaan.jenis
                                      },

                                    ]
                                  });
                                }}
                              /> */}
                            </span>
                          </Checkbox>
                        ))}
                      </div>
                    </Collapse.Panel>
                  </Collapse>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default Maps;
