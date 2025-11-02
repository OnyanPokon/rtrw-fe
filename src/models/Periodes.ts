import Model from './Model';

export interface IncomingApiData {
  id: number;
  tahun_mulai: string;
  tahun_akhir: string;
}

export interface OutgoingApiData {
  tahun_mulai: string;
  tahun_akhir: string;
}

interface FormValue {
  year_start: string;
  year_end: string;
}

type ReturnType<S, From, To> = S extends From[] ? To[] : To;

export default class Periodes extends Model {
  constructor(
    public id: number,
    public year_start: string,
    public year_end: string
  ) {
    super();
  }

  public static fromApiData<T extends IncomingApiData | IncomingApiData[]>(apiData: T): ReturnType<T, IncomingApiData, Periodes> {
    if (Array.isArray(apiData)) return apiData.map((object) => this.fromApiData(object)) as ReturnType<T, IncomingApiData, Periodes>;
    return new Periodes(apiData.id, apiData.tahun_mulai, apiData.tahun_akhir) as ReturnType<T, IncomingApiData, Periodes>;
  }

  public static toApiData<T extends FormValue | FormValue[]>(periodes: T): ReturnType<T, FormValue, OutgoingApiData> {
    if (Array.isArray(periodes)) return periodes.map((object) => this.toApiData(object)) as ReturnType<T, FormValue, OutgoingApiData>;
    const apiData: OutgoingApiData = {
      tahun_mulai: periodes.year_start,
      tahun_akhir: periodes.year_end
    };

    return apiData as ReturnType<T, FormValue, OutgoingApiData>;
  }
}

Model.children.periode = Periodes;
