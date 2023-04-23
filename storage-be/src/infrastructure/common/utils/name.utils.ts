import * as _ from 'lodash';
import * as path from 'path';

export class NameUtils {
  static toKeyBabCase(str: string) {
    return _.kebabCase(str);
  }

  static getFileNameAndOrder(originName: string) {
    const ret = originName.split('.');
    const order = _.toNumber(_.last(ret));
    return {
      order: _.isNaN(order) ? 1 : order,
      fileName: _.dropRight(ret).join('.'),
    };
  }

  static getExtFile(fileName: string) {
    return path.extname(fileName);
  }

  static namesToPath(...args: string[]) {
    return args.join('/');
  }
}
