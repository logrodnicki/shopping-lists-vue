<template>
  <div class="w-72 h-72 flex flex-col items-center justify-between my-auto translate-y-[-25%]">
    <div class="mb-2.5" :class="[isDarkMode ? 'text-white' : 'text-gray-800']">
      <font-awesome-icon icon="circle-user" size="6x" />
    </div>
    <h1 class="text-2xl font-bold" :class="[isDarkMode ? 'text-white' : 'text-gray-800']">
      Log in
    </h1>
    <Message v-if="!!errorMessage" :message="errorMessage" :type="MESSAGE_TYPES.error"></Message>
    <div class="w-full">
      <TextInput
        id="email"
        v-model="email"
        placeholder="test@test.com"
        type="text"
        label="Email"
        :error="emailErrorMessage"
      />
      <TextInput
        id="password"
        v-model="password"
        placeholder="***"
        type="password"
        label="Password"
        :error="passwordErrorMessage"
      />
    </div>
    <div class="w-full">
      <Button label="Log in" @click="loginHandler" />
    </div>
  </div>
</template>

<script>
import { ref } from 'vue';
import axios from 'axios';
import Cookies from 'js-cookie';
import { MESSAGE_TYPES } from '@/constants/message';
import { JWT_TOKEN_KEY } from '@/consts';
import { LOGIN_URL, getUrl } from '@/api';
import router from '@/router';
import useDarkMode from '@/hooks/useDarkMode';
import Message from '@/components/Message/Message.vue';
import Button from '@/components/Button/Button.vue';
import TextInput from '@/components/Form/TextInput/TextInput.vue';

export default {
  components: {
    Message,
    TextInput,
    Button
  },
  setup() {
    const email = ref('');
    const emailErrorMessage = ref('');
    const password = ref('');
    const passwordErrorMessage = ref('');
    const errorMessage = ref('');

    const loginHandler = async () => {
      errorMessage.value = '';
      emailErrorMessage.value = '';
      passwordErrorMessage.value = '';

      if (!email.value || !password.value) {
        if (!email.value) {
          emailErrorMessage.value = "Email can't be empty";
        }

        if (!password.value) {
          passwordErrorMessage.value = "Password can't be empty";
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
        errorMessage.value = error.response.data.error.message;
      }
    };

    const { isDarkMode } = useDarkMode();

    return {
      email,
      emailErrorMessage,
      password,
      passwordErrorMessage,
      loginHandler,
      errorMessage,
      MESSAGE_TYPES,
      isDarkMode
    };
  }
};
</script>
