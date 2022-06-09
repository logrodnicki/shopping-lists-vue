<template>
  <div class="w-72 max-w-90 min-h-72 flex flex-col items-center justify-between">
    <div class="text-gray-800 mb-2.5">
      <font-awesome-icon icon="circle-user" size="6x" />
    </div>
    <h1 class="text-2xl font-bold text-gray-800">Log in</h1>
    <Message v-if="!!errorMessage" :message="errorMessage" :type="messageTypes.error"></Message>
    <div>
      <div class="my-4">
        <label for="email" class="text-sm text-black font-bold text-gray-800">Email</label>
        <input
          id="email"
          v-model="email"
          type="email"
          class="border-2 w-full rounded-md border-gray-200 focus:border-orange-400 text-sm py-1 px-2 placeholder-gray-300 outline-none transition duration-300"
          placeholder="test@test.com"
        />
        <div class="h-4">
          <div v-if="emailErrorMessage" class="transition text-red-500 text-xs">
            {{ emailErrorMessage }}
          </div>
        </div>
      </div>
      <div class="my-4">
        <label for="password" class="text-sm text-black font-bold text-gray-800">Password</label>
        <input
          id="password"
          v-model="password"
          type="password"
          class="border-2 w-full rounded-md border-gray-200 focus:border-orange-400 text-sm py-1 px-2 placeholder-gray-300 outline-none transition duration-300"
          placeholder="****"
        />
        <div class="h-4">
          <div v-if="passwordErrorMessage" class="transition text-red-500 text-xs">
            {{ passwordErrorMessage }}
          </div>
        </div>
      </div>
    </div>
    <div class="w-full">
      <button
        class="text-white h-8 w-full bg-orange-400 border-orange-500 rounded-md shadow-lg shadow-orange-300 transition duration-300 hover:bg-orange-500"
        @click="loginHandler"
      >
        Log in
      </button>
    </div>
  </div>
</template>

<script>
import { ref } from 'vue';
import axios from 'axios';
import Cookies from 'js-cookie';
import Message, { types as messageTypes } from '@/components/Message/Message.vue';
import { JWT_TOKEN_KEY } from '@/consts';
import { LOGIN_URL, getUrl } from '@/api';
import router from '../../router';

export default {
  components: {
    Message
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

    return {
      email,
      emailErrorMessage,
      password,
      passwordErrorMessage,
      loginHandler,
      errorMessage,
      messageTypes
    };
  }
};
</script>
