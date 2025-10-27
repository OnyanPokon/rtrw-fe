type ModelKeys = 'wilayah' | 'rtrw' | 'klasifikasi';

export default abstract class Model {
  static children: { [key in ModelKeys]?: ModelChildren | ModelChildren[] } = {
    wilayah: undefined,
    rtrw: undefined,
    klasifikasi: undefined
  };
}

export type ModelChildren = new (...args: any[]) => Model;
