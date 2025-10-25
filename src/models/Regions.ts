import { DatatableColumn, FormField as FormFieldType, Override } from '@/types';
import strings from '@/utils/strings';
import { DescriptionsItemType } from 'antd/es/descriptions';
import Model from './Model';
import { InputType } from '@/constants';

export interface IncomingApiData {
  id: number;
  nama: string;
  tipe: string;
  kode_wilayah: string;
}

export interface OutgoingApiData {
  nama: string;
  tipe: string;
  kode_wilayah: string;
}

interface FormValue {
  name: string;
  type: string;
  region_code: string;
}

type ReturnType<S, From, To> = S extends From[] ? To[] : To;

export default class Regions extends Model {
  constructor(
    public id: number,
    public name: string,
    public type: string,
    public region_code: string
  ) {
    super();
  }

  public static fromApiData<T extends IncomingApiData | IncomingApiData[]>(apiData: T): ReturnType<T, IncomingApiData, Regions> {
    if (Array.isArray(apiData)) return apiData.map((object) => this.fromApiData(object)) as ReturnType<T, IncomingApiData, Regions>;
    return new Regions(apiData.id, apiData.nama, apiData.tipe, apiData.kode_wilayah) as ReturnType<T, IncomingApiData, Regions>;
  }

  public static toApiData<T extends FormValue | FormValue[]>(regions: T): ReturnType<T, FormValue, OutgoingApiData> {
    if (Array.isArray(regions)) return regions.map((object) => this.toApiData(object)) as ReturnType<T, FormValue, OutgoingApiData>;
    const apiData: OutgoingApiData = {
      nama: regions.name,
      tipe: regions.type,
      kode_wilayah: regions.region_code
    };

    return apiData as ReturnType<T, FormValue, OutgoingApiData>;
  }
}

Model.children.wilayah = Regions;
