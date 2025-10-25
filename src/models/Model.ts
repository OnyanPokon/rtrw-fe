type ModelKeys = 'wilayah';

export default abstract class Model {
  static children: { [key in ModelKeys]?: ModelChildren | ModelChildren[] } = {
    wilayah: undefined
  };
}

export type ModelChildren = new (...args: any[]) => Model;
