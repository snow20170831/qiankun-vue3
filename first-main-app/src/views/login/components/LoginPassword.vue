<template>
  <a-form ref="formRef" :model="formState" :rules="rules">
    <a-form-item name="username">
      <a-input v-model:value="formState.username" allow-clear placeholder="请输入账号">
        <template #prefix>
          <!-- <user-outlined /> -->
          <Icon type="UserOutlined" />
        </template>
      </a-input>
    </a-form-item>
    <a-form-item name="password">
      <a-input-password
        v-model:value="formState.password"
        allow-clear
        type="password"
        placeholder="请输入登录密码">
        <template #prefix>
          <!-- <lock-outlined /> -->
          <Icon type="LockOutlined" />
        </template>
      </a-input-password>
    </a-form-item>
    <a-form-item>
      <a-button
        type="primary"
        block
        :loading="loading"
        style="height: 40px;"
        @click="handleSubmit">登录
      </a-button>
    </a-form-item>
  </a-form>
</template>

<script lang="ts">
import { defineComponent, reactive, ref } from 'vue';
import { useStore } from 'vuex';
import { useRouter } from 'vue-router';
import { firstRoute } from '@/router';
// import type { UnwrapRef } from 'vue';
// import { UserOutlined, LockOutlined } from '@ant-design/icons-vue';
import Icon from '@/ICON';

interface FormState {
  username: string,
  password: string,
}

export default defineComponent({
  components: {
    // UserOutlined,
    // LockOutlined,
    Icon,
  },
  setup() {
    const store = useStore();
    const router = useRouter();
    const formRef = ref();
    // const formState: UnwrapRef<FormState> = reactive({
    //   username: '',
    //   password: '',
    // });
    const formState: FormState = reactive({
      username: '',
      password: '',
    });
    const rules = {
      username: [{ required: true, message: '请输入帐号' }],
      password: [{ required: true, message: '请输入登录密码' }],
    };
    const loading = ref(false);
    const handleSubmit = () => {
      formRef.value
        .validateFields()
        .then(() => {
          // TODO 调用登录接口
          console.log('formState', formState, firstRoute);
          // store.actions.onLogin(formState.username);
          store.dispatch('login', formState.username);
          router.push(firstRoute);
        })
        .catch(() => {
          loading.value = false;
        });
    };
    return {
      formRef,
      formState,
      rules,
      loading,
      handleSubmit,
    };
  },
});
</script>

<style lang="less" scoped>
  .ant-form {
    margin-top: 9px;
    :deep(.ant-input)  {
      height: 28px;
    }
  }
</style>
