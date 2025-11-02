type ModelKeys = 'wilayah' | 'rtrw' | 'klasifikasi' | 'polaruang' | 'periode' | 'dasar_hukum';

export default abstract class Model {
  static children: { [key in ModelKeys]?: ModelChildren | ModelChildren[] } = {
    wilayah: undefined,
    rtrw: undefined,
    klasifikasi: undefined,
    polaruang: undefined,
    periode: undefined,
    dasar_hukum: undefined
  };
}

export type ModelChildren = new (...args: any[]) => Model;
