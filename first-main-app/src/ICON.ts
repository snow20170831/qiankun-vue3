import { createVNode } from 'vue';
import * as $Icon from '@ant-design/icons-vue';

// eslint-disable-next-line
const Icon = (props: { type: keyof typeof $Icon }) => {
  const { type } = props;
  return createVNode($Icon[type]);
};

export default Icon;
