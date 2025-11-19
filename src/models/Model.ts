type ModelKeys = 'wilayah' | 'rtrw' | 'klasifikasi' | 'polaruang' | 'periode' | 'dasar_hukum' | 'struktur_ruang';

export default abstract class Model {
  static children: { [key in ModelKeys]?: ModelChildren | ModelChildren[] } = {
    wilayah: undefined,
    rtrw: undefined,
    klasifikasi: undefined,
    polaruang: undefined,
    periode: undefined,
    dasar_hukum: undefined,
    struktur_ruang: undefined
  };
}

export type ModelChildren = new (...args: any[]) => Model;
