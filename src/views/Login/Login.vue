<template>
  <div :class="[$style.wrapper]">
    <div :class="[$style.content]">
      <div
        :class="[isDarkMode ? 'text-white' : 'text-gray-800']"
        class="mb-2.5"
      >
        <font-awesome-icon icon="circle-user" size="6x" />
      </div>
      <h1
        :class="[isDarkMode ? 'text-white' : 'text-gray-800']"
        class="text-2xl font-bold"
      >
        Log in
      </h1>
      <Message
        v-if="!!errors.main"
        :message="errors.main"
        :type="MessageTypes.ERROR"
      ></Message>
      <Box classes="w-full">
        <TextInput
          id="email"
          v-model="email"
          :error="errors.email"
          :type="TextInputTypes.TEXT"
          label="Email"
          placeholder="test@test.com"
        />
        <TextInput
          id="password"
          v-model="password"
          :error="errors.password"
          :type="TextInputTypes.PASSWORD"
          label="Password"
          placeholder="***"
        />
      </Box>
      <div :class="[$style.buttons]">
        <Button
          :show-loader="isLoading"
          classes="w-full"
          label="Log in"
          @click="loginHandler"
        />
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { onMounted, reactive, ref } from 'vue';
import axios, { AxiosError } from 'axios';
import Cookies from 'js-cookie';
import { JWT_TOKEN_KEY } from '@/consts';
import { getUrl, LOGIN_URL } from '@/api';
import router from '@/router';
import useDarkMode from '@/hooks/useDarkMode';
import Message from '@/components/Message/Message.vue';
import Button from '@/components/Button/Button.vue';
import TextInput from '@/components/Form/TextInput/TextInput.vue';
import { MessageTypes, TextInputTypes } from '@/types';
import Box from '@/components/Box/Box.vue';

const email = ref('');
const password = ref('');
const isLoading = ref(false);

const errors = reactive({
  main: '',
  email: '',
  password: ''
});

onMounted(() => {
  Cookies.remove(JWT_TOKEN_KEY);
});

const loginHandler = async () => {
  errors.main = '';
  errors.email = '';
  errors.password = '';

  if (!email.value || !password.value) {
    if (!email.value) {
      errors.email = "Email can't be empty";
    }

    if (!password.value) {
      errors.password = "Password can't be empty";
    }

    return;
  }

  const url = getUrl(LOGIN_URL);

  try {
    const response = await axios.post(url, {
      identifier: email.value,
      password: password.value
    });

    Cookies.set(JWT_TOKEN_KEY, response.data.jwt);

    await router.push({ name: 'Main' });
  } catch (error) {
    if (error instanceof AxiosError) {
      errors.main = error?.response?.data?.error?.message;
    }
  } finally {
    isLoading.value = false;
  }
};

const { isDarkMode } = useDarkMode();
</script>

<style module>
.wrapper {
  @apply h-full flex items-center min-h-104;
}

.content {
  @apply w-72 h-72 flex flex-col gap-4 items-center my-auto translate-y-[-25%];
}

.buttons {
  @apply w-full flex justify-center;
}
</style>
