import { DatatableColumn, FormField as FormFieldType, Override } from '@/types';
import strings from '@/utils/strings';
import { DescriptionsItemType } from 'antd/es/descriptions';
import Model from './Model';
import { InputType } from '@/constants';

export interface IncomingApiData {
  id: number;
  klasifikasi: {
    id: number;
    nama: string;
    deskripsi: string;
    tipe: string;
    rtrw: {
      id: number;
      nama: string;
      periode: {
        id: number;
        tahun_mulai: string;
        tahun_akhir: string;
      };
      deskripsi: string;
      wilayah: {
        id: number;
        nama: string;
        tipe: string;
        kode_wilayah: string;
      };
    };
  };
  nama: string;
  deskripsi: string;
  geojson_file: string;
}

export interface OutgoingApiData {
  _method?: 'PUT';
  nama: string;
  deskripsi: string;
  geojson_file: string;
  klasifikasi_id: string;
}

interface FormValue {
  _method?: 'PUT';
  name: string;
  desc: string;
  geojson_file: string;
  id_klasifikasi: string;
}

type ReturnType<S, From, To> = S extends From[] ? To[] : To;

export default class Polaruangs extends Model {
  constructor(
    public id: number,
    public klasifikasi: {
      id: number;
      name: string;
      desc: string;
      type: string;
      rtrw: {
        id: number;
        name: string;
        periode: {
          id: number;
          year_start: string;
          year_end: string;
        };
        desc: string;
        region: {
          id: number;
          name: string;
          type: string;
          region_code: string;
        };
      };
    },
    public name: string,
    public desc: string,
    public geojson_file: string
  ) {
    super();
  }

  public static fromApiData<T extends IncomingApiData | IncomingApiData[]>(apiData: T): ReturnType<T, IncomingApiData, Polaruangs> {
    if (Array.isArray(apiData)) return apiData.map((object) => this.fromApiData(object)) as ReturnType<T, IncomingApiData, Polaruangs>;
    return new Polaruangs(
      apiData.id,
      {
        id: apiData.klasifikasi.id,
        name: apiData.klasifikasi.nama,
        desc: apiData.klasifikasi.deskripsi,
        type: apiData.klasifikasi.tipe,
        rtrw: {
          id: apiData.klasifikasi.rtrw.id,
          name: apiData.klasifikasi.rtrw.nama,
          periode: {
            id: apiData.klasifikasi.rtrw.periode.id,
            year_start: apiData.klasifikasi.rtrw.periode.tahun_mulai,
            year_end: apiData.klasifikasi.rtrw.periode.tahun_akhir
          },
          desc: apiData.klasifikasi.rtrw.deskripsi,
          region: {
            id: apiData.klasifikasi.rtrw.wilayah.id,
            name: apiData.klasifikasi.rtrw.wilayah.nama,
            type: apiData.klasifikasi.rtrw.wilayah.tipe,
            region_code: apiData.klasifikasi.rtrw.wilayah.kode_wilayah
          }
        }
      },
      apiData.nama,
      apiData.deskripsi,
      apiData.geojson_file
    ) as ReturnType<T, IncomingApiData, Polaruangs>;
  }

  public static toApiData<T extends FormValue | FormValue[]>(polaruangs: T): ReturnType<T, FormValue, OutgoingApiData> {
    if (Array.isArray(polaruangs)) return polaruangs.map((object) => this.toApiData(object)) as ReturnType<T, FormValue, OutgoingApiData>;
    const apiData: OutgoingApiData = {
      ...(polaruangs._method ? { _method: polaruangs._method } : {}),
      nama: polaruangs.name,
      deskripsi: polaruangs.desc,
      klasifikasi_id: polaruangs.id_klasifikasi,
      geojson_file: polaruangs.geojson_file
    };

    return apiData as ReturnType<T, FormValue, OutgoingApiData>;
  }
}

Model.children.polaruang = Polaruangs;
