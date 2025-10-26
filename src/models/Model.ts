type ModelKeys = 'wilayah' | 'rtrw';

export default abstract class Model {
  static children: { [key in ModelKeys]?: ModelChildren | ModelChildren[] } = {
    wilayah: undefined,
    rtrw: undefined
  };
}

export type ModelChildren = new (...args: any[]) => Model;
