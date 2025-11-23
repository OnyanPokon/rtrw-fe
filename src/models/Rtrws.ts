import Model from './Model';
import asset from '@/utils/asset';

export interface IncomingApiData {
  id: number;
  nama: string;
  deskripsi: string;

  periode: {
    id: number;
    tahun_mulai: string;
    tahun_akhir: string;
  };
}

export interface OutgoingApiData {
  nama: string;
  deskripsi: string;
  periode_id: number;
}

interface FormValue {
  name: string;
  desc: string;
  periode_id: number;
}

type ReturnType<S, From, To> = S extends From[] ? To[] : To;

export default class Rtrws extends Model {
  constructor(
    public id: number,
    public name: string,
    public desc: string,

    public periode: {
      id: number;
      year_start: string;
      year_end: string;
    }
  ) {
    super();
  }

  public static fromApiData<T extends IncomingApiData | IncomingApiData[]>(apiData: T): ReturnType<T, IncomingApiData, Rtrws> {
    if (Array.isArray(apiData)) return apiData.map((object) => this.fromApiData(object)) as ReturnType<T, IncomingApiData, Rtrws>;
    return new Rtrws(
      apiData.id,
      apiData.nama,
      apiData.deskripsi,

      {
        id: apiData.periode.id,
        year_start: apiData.periode.tahun_mulai,
        year_end: apiData.periode.tahun_akhir
      }
    ) as ReturnType<T, IncomingApiData, Rtrws>;
  }

  public static toApiData<T extends FormValue | FormValue[]>(rtrws: T): ReturnType<T, FormValue, OutgoingApiData> {
    if (Array.isArray(rtrws)) return rtrws.map((object) => this.toApiData(object)) as ReturnType<T, FormValue, OutgoingApiData>;
    const apiData: OutgoingApiData = {
      nama: rtrws.name,
      deskripsi: rtrws.desc,
      periode_id: rtrws.periode_id
    };

    return apiData as ReturnType<T, FormValue, OutgoingApiData>;
  }
}

Model.children.rtrw = Rtrws;
