// 统一导出查询方法

import user from './user';
import todo from './todo';

export default {
  ...user,
  ...todo,
};
