import asset from '@/utils/asset';
import Model from './Model';

export interface IncomingApiData {
  id: number;
  nama: string;
  file_dokumen: string;
}

export interface OutgoingApiData {
  _method?: 'PUT';
  nama: string;
  file_dokumen: string;
}

interface FormValue {
  _method?: 'PUT';
  name: string;
  doc: string;
}

type ReturnType<S, From, To> = S extends From[] ? To[] : To;

export default class DasarHukums extends Model {
  constructor(
    public id: number,
    public name: string,
    public doc: string
  ) {
    super();
  }

  public static fromApiData<T extends IncomingApiData | IncomingApiData[]>(apiData: T): ReturnType<T, IncomingApiData, DasarHukums> {
    if (Array.isArray(apiData)) return apiData.map((object) => this.fromApiData(object)) as ReturnType<T, IncomingApiData, DasarHukums>;
    return new DasarHukums(apiData.id, apiData.nama, asset(apiData.file_dokumen)) as ReturnType<T, IncomingApiData, DasarHukums>;
  }

  public static toApiData<T extends FormValue | FormValue[]>(dasarHukums: T): ReturnType<T, FormValue, OutgoingApiData> {
    if (Array.isArray(dasarHukums)) return dasarHukums.map((object) => this.toApiData(object)) as ReturnType<T, FormValue, OutgoingApiData>;
    const apiData: OutgoingApiData = {
      ...(dasarHukums._method ? { _method: dasarHukums._method } : {}),
      nama: dasarHukums.name,
      file_dokumen: dasarHukums.doc
    };
    return apiData as ReturnType<T, FormValue, OutgoingApiData>;
  }
}

Model.children.dasar_hukum = DasarHukums;
