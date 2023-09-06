<script setup>
import * as Yup from "yup";
import { Form, Field } from "vee-validate";
import { reactive, ref } from "vue";
import Register from "../components/Register.vue";
import { StoreApp } from "@/services/stores";
import { updateAuthorizationHeader } from "@/services/api";
import { useRouter } from "vue-router";

const ROUTER = useRouter();

const {
  onActionLoadingActive,
  onActionActivePopupMessage,
  onActionAccountLogin,
} = StoreApp();

const formLogin = ref(null);

const data = reactive({
  formLogin: {
    userName: "",
    password: "",
  },
});

const onInputUpdatePassword = (event) => {
  formLogin.value.setFieldValue("password", event.target.value);
};

const onCheckValidate = () => {
  return Yup.object({
    errors: Yup.string().nullable(),

    userName: Yup.string().required("Vui lòng nhập tên tài khoản!"),

    password: Yup.string().required("Vui lòng nhập mật khẩu!"),
  });
};

const onClickButtonLogin = (value) => {
  onActionLoadingActive(true);

  onActionAccountLogin(value)
    .then((res) => {
      if (res?.statusCode === 200)
        localStorage.setItem("AppLocalStorage", JSON.stringify(res.data));
      updateAuthorizationHeader(res.data.accessToken);
      onActionLoadingActive(false);

      ROUTER.push({ name: "Home" });
    })
    .catch((error) => {
      onActionActivePopupMessage(0, error);
      onActionLoadingActive(false);
    });
};
</script>

<template>
  <div
    class="container-login flex flex-column gap-3 align-items-center bg-light-blue w-full h-screen"
  >
    <span class="text-4xl font-bold text-main-color mt-8">t share</span>
    <Form
      class="container-login-form w-23rem bg-white p-4 border-round-lg flex flex-column gap-3"
      ref="formLogin"
      :initial-values="data.formLogin"
      :validation-schema="onCheckValidate()"
      @submit="onClickButtonLogin"
    >
      <Field v-slot="{ field, errorMessage, handleChange }" name="userName">
        <div class="flex flex-column gap-1">
          <InputText
            class="w-full"
            placeholder="Tên tài khoản"
            type="text"
            v-model="field.value"
            @update:model-value="handleChange"
          />

          <small v-show="errorMessage" class="p-error ml-1">
            {{ errorMessage }}
          </small>
        </div>
      </Field>

      <Field v-slot="{ field, errorMessage, handleChange }" name="password">
        <div class="flex flex-column gap-1">
          <Password
            class="w-full"
            placeholder="Mật khẩu"
            :feedback="false"
            toggleMask
            inputClass="w-full"
            @input="onInputUpdatePassword"
            v-model="field.value"
            @update:model-value="handleChange"
          />

          <small v-show="errorMessage" class="p-error ml-1">
            {{ errorMessage }}
          </small>
        </div>
      </Field>
      <div class="flex flex-column gap-3">
        <Button label="Đăng nhập" type="submit" />

        <div class="text-main-color cursor-pointer on-click text-center">
          Quên mật khẩu?
        </div>
      </div>

      <!-- Tạo tài khoản mới -->
      <Register />
    </Form>
  </div>
</template>

<style scoped>
@media only screen and (max-width: 500px) {
  .container-login {
    padding-left: 2rem !important;
    padding-right: 2rem !important;
  }

  .container-login span {
    margin-top: 3rem !important;
  }

  .container-login-form {
    width: 100% !important;
  }
}
</style>
