<template>
  <div :class="[$style.wrapper]">
    <div class="mb-2.5" :class="[isDarkMode ? 'text-white' : 'text-gray-800']">
      <font-awesome-icon icon="circle-user" size="6x" />
    </div>
    <h1
      class="text-2xl font-bold"
      :class="[isDarkMode ? 'text-white' : 'text-gray-800']"
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
        placeholder="test@test.com"
        :type="TextInputTypes.TEXT"
        label="Email"
        :error="errors.email"
      />
      <TextInput
        id="password"
        v-model="password"
        placeholder="***"
        :type="TextInputTypes.PASSWORD"
        label="Password"
        :error="errors.password"
      />
    </Box>
    <div :class="[$style.buttons]">
      <Button
        label="Log in"
        classes="w-full"
        :show-loader="isLoading"
        @click="loginHandler"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue';
import axios, { AxiosError } from 'axios';
import Cookies from 'js-cookie';
import { JWT_TOKEN_KEY } from '@/consts';
import { LOGIN_URL, getUrl } from '@/api';
import router from '@/router';
import useDarkMode from '@/hooks/useDarkMode';
import Message from '@/components/Message/Message.vue';
import Button from '@/components/Button/Button.vue';
import TextInput from '@/components/Form/TextInput/TextInput.vue';
import { TextInputTypes } from '@/types';
import { MessageTypes } from '@/types';
import Box from '@/components/Box/Box.vue';

const email = ref('');
const password = ref('');
const isLoading = ref(false);

const errors = reactive({
  main: '',
  email: '',
  password: ''
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

    router.push({ name: 'Main' });
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
  @apply w-72 h-72 flex flex-col gap-4 items-center my-auto translate-y-[-25%];
}

.buttons {
  @apply w-full flex justify-center;
}
</style>
