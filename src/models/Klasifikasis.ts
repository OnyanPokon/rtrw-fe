import Model from './Model';

export interface IncomingApiData {
  id: number;
  rtrw: {
    id: number;
    nama: string;
    tahun_mulai: string;
    tahun_akhir: string;
    deskripsi: string;
    wilayah: {
      id: number;
      nama: string;
      tipe: string;
      kode_wilayah: string;
    };
  };
  nama: string;
  deskripsi: string;
  tipe: 'pola_ruang' | 'struktur_ruang';
}

export interface OutgoingApiData {
  nama: string;
  deskripsi: string;
  rtrw_id: number;
  tipe: 'pola_ruang' | 'struktur_ruang';
}

interface FormValue {
  name: string;
  desc: string;
  rtrw_id: number;
  type: 'pola_ruang' | 'struktur_ruang';
}

type ReturnType<S, From, To> = S extends From[] ? To[] : To;

export default class Klasifikasis extends Model {
  constructor(
    public id: number,
    public rtrw: {
      id: number;
      name: string;
      start_year: string;
      end_year: string;
      desc: string;
      region: {
        id: number;
        name: string;
        type: string;
        region_code: string;
      };
    },
    public name: string,
    public desc: string,
    public type: 'pola_ruang' | 'struktur_ruang'
  ) {
    super();
  }

  public static fromApiData<T extends IncomingApiData | IncomingApiData[]>(apiData: T): ReturnType<T, IncomingApiData, Klasifikasis> {
    if (Array.isArray(apiData)) return apiData.map((object) => this.fromApiData(object)) as ReturnType<T, IncomingApiData, Klasifikasis>;
    return new Klasifikasis(
      apiData.id,
      {
        id: apiData.rtrw.id,
        name: apiData.rtrw.nama,
        start_year: apiData.rtrw.tahun_mulai,
        end_year: apiData.rtrw.tahun_akhir,
        desc: apiData.rtrw.deskripsi,
        region: {
          id: apiData.rtrw.wilayah.id,
          name: apiData.rtrw.wilayah.nama,
          type: apiData.rtrw.wilayah.tipe,
          region_code: apiData.rtrw.wilayah.kode_wilayah
        }
      },
      apiData.nama,
      apiData.deskripsi,
      apiData.tipe
    ) as ReturnType<T, IncomingApiData, Klasifikasis>;
  }

  public static toApiData<T extends FormValue | FormValue[]>(klasifikasis: T): ReturnType<T, FormValue, OutgoingApiData> {
    if (Array.isArray(klasifikasis)) return klasifikasis.map((object) => this.toApiData(object)) as ReturnType<T, FormValue, OutgoingApiData>;
    const apiData: OutgoingApiData = {
      nama: klasifikasis.name,
      deskripsi: klasifikasis.desc,
      rtrw_id: klasifikasis.rtrw_id,
      tipe: klasifikasis.type
    };

    return apiData as ReturnType<T, FormValue, OutgoingApiData>;
  }
}

Model.children.klasifikasi = Klasifikasis;
