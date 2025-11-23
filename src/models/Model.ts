type ModelKeys = 'rtrw' | 'klasifikasi' | 'polaruang' | 'periode' | 'struktur_ruang' | 'ketentuan_khusus' | 'pkkprl' | 'indikasi_program' | 'berita';

export default abstract class Model {
  static children: { [key in ModelKeys]?: ModelChildren | ModelChildren[] } = {
    rtrw: undefined,
    klasifikasi: undefined,
    polaruang: undefined,
    periode: undefined,
    struktur_ruang: undefined,
    pkkprl: undefined,
    berita: undefined
  };
}

export type ModelChildren = new (...args: any[]) => Model;
