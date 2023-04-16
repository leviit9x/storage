import * as _ from 'lodash';

export class NameUtils {
  static toKeyBabCase(str: string) {
    return _.kebabCase(str);
  }
}
