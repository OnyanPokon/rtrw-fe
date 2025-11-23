import Model from './Model';

export interface IncomingApiData {
  id: number;
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
  nama: string;
  deskripsi: string;
  tipe: 'pola_ruang' | 'struktur_ruang' | 'ketentuan_khusus' | 'pkkprl' | 'indikasi_program';
}

export interface OutgoingApiData {
  nama: string;
  deskripsi: string;
  rtrw_id: number;
  tipe: 'pola_ruang' | 'struktur_ruang' | 'ketentuan_khusus' | 'pkkprl' | 'indikasi_program';
}

interface FormValue {
  name: string;
  desc: string;
  rtrw_id: number;
  type: 'pola_ruang' | 'struktur_ruang' | 'ketentuan_khusus' | 'pkkprl' | 'indikasi_program';
}

type ReturnType<S, From, To> = S extends From[] ? To[] : To;

export default class Klasifikasis extends Model {
  constructor(
    public id: number,
    public rtrw: {
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
    },
    public name: string,
    public desc: string,
    public type: 'pola_ruang' | 'struktur_ruang' | 'ketentuan_khusus' | 'pkkprl' | 'indikasi_program'
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
        periode: {
          id: apiData.rtrw.periode.id,
          year_start: apiData.rtrw.periode.tahun_mulai,
          year_end: apiData.rtrw.periode.tahun_akhir
        },
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
