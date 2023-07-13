<script setup>
import * as Yup from "yup";
import { Form, Field } from "vee-validate";
import { reactive, ref } from "vue";
import { StoreApp } from "@/services/stores";

const { onActionActivePopupMessage, onActionAccountRegister } = StoreApp();

const formRegister = ref(null);

const data = reactive({
  formRegister: {
    lastName: "",
    firstName: "",
    userName: "",
    password: "",
    confirmPassword: "",
    dateOfBirth: "",
    gender: "",
  },
  display: false,
});

const onClickOpenPopupRegister = () => {
  data.display = true;
};

const onInputUpdatePassword = (event, field) => {
  formRegister.value.setFieldValue(`${field}`, event.target.value);
};

const onCheckValidate = () => {
  return Yup.object({
    errors: Yup.string().nullable(),

    lastName: Yup.string().required("Hãy nhập họ"),

    firstName: Yup.string().required("Hãy nhập tên"),

    userName: Yup.string().required("Hãy nhập tên tài khoản"),

    password: Yup.string()
      .required("Hãy nhập mật khẩu")
      .min(3, "Mật khẩu phải trên 10 ký tự"),

    confirmPassword: Yup.string().required("Hãy nhập mật khẩu xác nhận"),

    dateOfBirth: Yup.string().required("Hãy nhập ngày sinh"),

    gender: Yup.string().required("Hãy chọn giới tính"),
  });
};

const onClickButtonRegister = async (value) => {
  if (value.password !== value.confirmPassword) {
    formRegister.value.setFieldError(
      "confirmPassword",
      "Mật khẩu xác nhận không khớp"
    );
    return;
  }

  const res = await onActionAccountRegister(value);

  if (res === "OK") data.display = false;
  onActionActivePopupMessage(
    true,
    1,
    "Chúc mừng bạn đã đăng ký tài khoản thành công. Hãy đăng nhập để tận hưởng những trải nghiệm tuyệt vời mà chúng tôi mang đến."
  );

  if (res === "EXIST")
    formRegister.value.setFieldError("userName", "Tên người dùng đã tồn tại");
};
</script>

<template>
  <div
    @click="onClickOpenPopupRegister"
    class="w-full text-center py-3 font-bold cursor-pointer border-top-1 text-500 unselectable"
  >
    <span class="text-900 on-click"> Tạo tài khoản mới</span>
  </div>

  <Dialog
    v-model:visible="data.display"
    modal
    header="Đăng ký tài khoản"
    class="w-30rem"
  >
    <Form
      ref="formRegister"
      :initial-values="data.Register"
      :validation-schema="onCheckValidate()"
      @submit="onClickButtonRegister"
    >
      <div class="mt-1 flex flex-column gap-3">
        <div class="flex gap-3">
          <Field v-slot="{ field, errorMessage, handleChange }" name="lastName">
            <div class="flex w-full flex-column gap-1">
              <InputText
                class="w-full"
                v-model="field.value"
                placeholder="Họ"
                @update:model-value="handleChange"
              />

              <small v-show="errorMessage" class="p-error ml-1">
                {{ errorMessage }}
              </small>
            </div>
          </Field>

          <Field
            v-slot="{ field, errorMessage, handleChange }"
            name="firstName"
          >
            <div class="flex w-full flex-column gap-1">
              <InputText
                class="w-full"
                v-model="field.value"
                placeholder="Tên"
                @update:model-value="handleChange"
              />

              <small v-show="errorMessage" class="p-error ml-1">
                {{ errorMessage }}
              </small>
            </div>
          </Field>
        </div>

        <Field v-slot="{ field, errorMessage, handleChange }" name="userName">
          <div class="flex flex-column gap-1">
            <InputText
              class="w-full"
              v-model="field.value"
              placeholder="Tên tài khoản"
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
              @input="onInputUpdatePassword($event, 'password')"
              v-model="field.value"
              @update:model-value="handleChange"
            />

            <small v-show="errorMessage" class="p-error ml-1">
              {{ errorMessage }}
            </small>
          </div>
        </Field>

        <Field
          v-slot="{ field, errorMessage, handleChange }"
          name="confirmPassword"
        >
          <div class="flex flex-column gap-1">
            <Password
              class="w-full"
              placeholder="Xác nhận mật khẩu"
              :feedback="false"
              toggleMask
              inputClass="w-full"
              @input="onInputUpdatePassword($event, 'confirmPassword')"
              v-model="field.value"
              @update:model-value="handleChange"
            />

            <small v-show="errorMessage" class="p-error ml-1">
              {{ errorMessage }}
            </small>
          </div>
        </Field>

        <div class="w-full flex gap-3">
          <Field
            v-slot="{ field, errorMessage, handleChange }"
            name="dateOfBirth"
          >
            <div class="w-full flex-column gap-1">
              <Calendar
                class="w-full"
                v-model="field.value"
                placeholder="Ngày sinh"
                @update:model-value="handleChange"
              />

              <small v-show="errorMessage" class="p-error ml-1">
                {{ errorMessage }}
              </small>
            </div>
          </Field>

          <Field v-slot="{ field, errorMessage, handleChange }" name="gender">
            <div class="w-full flex-column gap-1">
              <Dropdown
                class="w-full"
                v-model="field.value"
                :options="[
                  {
                    name: 'Nam',
                    code: 'Nam',
                  },
                  {
                    name: 'Nữ',
                    code: 'Nữ',
                  },
                  {
                    name: 'Khác',
                    code: 'Khác',
                  },
                ]"
                optionLabel="name"
                optionValue="code"
                placeholder="Giới tính"
                @update:model-value="handleChange"
              />

              <small v-show="errorMessage" class="p-error ml-1">
                {{ errorMessage }}
              </small>
            </div>
          </Field>
        </div>

        <div style="font-size: 0.9rem" class="text-500 line-height-2">
          Bằng cách nhấp vào Đăng ký, bạn có thể nhận được thông báo của chúng
          tôi qua SMS và hủy nhận bất kỳ lúc nào.
        </div>

        <Button class="w-full" type="submit" label="Đăng ký" />
      </div>
    </Form>
  </Dialog>
</template>
