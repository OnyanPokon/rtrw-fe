type ModelKeys = 'wilayah' | 'rtrw' | 'klasifikasi' | 'polaruang';

export default abstract class Model {
  static children: { [key in ModelKeys]?: ModelChildren | ModelChildren[] } = {
    wilayah: undefined,
    rtrw: undefined,
    klasifikasi: undefined,
    polaruang: undefined
  };
}

export type ModelChildren = new (...args: any[]) => Model;
