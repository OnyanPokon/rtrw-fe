import { DatatableColumn, FormField as FormFieldType, Override } from '@/types';
import strings from '@/utils/strings';
import { DescriptionsItemType } from 'antd/es/descriptions';
import Model from './Model';
import { InputType } from '@/constants';

export interface IncomingApiData {
  id: number;
  nama: string;
  tahun_mulai: string;
  tahun_akhir: string;
  wilayah: {
    id: number;
    nama: string;
    tipe: string;
    kode_wilayah: string;
  };
  deskripsi: string;
  dokumen_file: string;
}

export interface OutgoingApiData {
  _method?: 'PUT';
  nama: string;
  tahun_mulai: string;
  tahun_akhir: string;
  wilayah_id: number;
  deskripsi: string;
  dokumen_file: string;
}

interface FormValue {
  _method?: 'PUT';
  name: string;
  start_year: string;
  end_year: string;
  region_id: number;
  desc: string;
  doc: string;
}

type ReturnType<S, From, To> = S extends From[] ? To[] : To;

export default class Rtrws extends Model {
  constructor(
    public id: number,
    public name: string,
    public start_year: string,
    public end_year: string,
    public region: {
      id: number;
      name: string;
      type: string;
      region_code: string;
    },
    public desc: string,
    public doc: string
  ) {
    super();
  }

  public static fromApiData<T extends IncomingApiData | IncomingApiData[]>(apiData: T): ReturnType<T, IncomingApiData, Rtrws> {
    if (Array.isArray(apiData)) return apiData.map((object) => this.fromApiData(object)) as ReturnType<T, IncomingApiData, Rtrws>;
    return new Rtrws(
      apiData.id,
      apiData.nama,
      apiData.tahun_mulai,
      apiData.tahun_akhir,
      {
        id: apiData.wilayah.id,
        name: apiData.wilayah.nama,
        type: apiData.wilayah.tipe,
        region_code: apiData.wilayah.kode_wilayah
      },
      apiData.deskripsi,
      apiData.dokumen_file
    ) as ReturnType<T, IncomingApiData, Rtrws>;
  }

  public static toApiData<T extends FormValue | FormValue[]>(rtrws: T): ReturnType<T, FormValue, OutgoingApiData> {
    if (Array.isArray(rtrws)) return rtrws.map((object) => this.toApiData(object)) as ReturnType<T, FormValue, OutgoingApiData>;
    const apiData: OutgoingApiData = {
      ...(rtrws._method ? { _method: rtrws._method } : {}),
      nama: rtrws.name,
      tahun_mulai: rtrws.start_year,
      tahun_akhir: rtrws.end_year,
      wilayah_id: rtrws.region_id,
      deskripsi: rtrws.desc,
      dokumen_file: rtrws.doc
    };

    return apiData as ReturnType<T, FormValue, OutgoingApiData>;
  }
}

// FIXME: you maybe want to change below line. If you don't want to then delete this FIXME line
Model.children.rtrw = Rtrws;
