
<template>
  <div class="login-container">
    <div class="container py-5">
      <div class="row">
        <div class="col-md-5 mx-auto">
          <div class="card card-body">
            <div
              class="logo d-flex flex-column justify-content-center align-items-center"
            >
              <img
                src="../../assets/images/logo/logo.png"
                alt=""
                width="120px"
              />
              <h6 class="pb-4 mt-1 font-weight-bold">
                Competencies Evaluation Management
              </h6>
            </div>
            <h2 class="text-center font-weight-bold">Sign in</h2>
            <form @submit.prevent="handleSubmit">
              <form-group
                :validator="$v.loginForm.email"
                class="form-label-group"
              >
                <input
                  type="text"
                  v-model="loginForm.email"
                  id="email"
                  name="email"
                  class="form-control my-2"
                  placeholder="Email"
                  :class="{
                    'is-invalid': submitted && $v.loginForm.email.$error,
                  }"
                />
              </form-group>

              <form-group
                class="form-label-group"
                :validator="$v.loginForm.password"
              >
                <input
                  type="password"
                  v-model="loginForm.password"
                  id="password"
                  name="password"
                  placeholder="Password"
                  class="form-control my-2"
                  :class="{
                    'is-invalid': submitted && $v.loginForm.password.$error,
                  }"
                />
              </form-group>
              <button
                class="btn btn-lg btn-primary btn-block btn-login my-2"
                type="submit"
              >
                Sign in
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { required, email, minLength } from "vuelidate/lib/validators";
import { mapMutations } from "vuex";
import { login } from "../../shared/services/authentication.service";
export default {
  name: "Login",
  created() {},
  data() {
    return {
      loginForm: {
        email: "",
        password: "",
      },
      submitted: false,
    };
  },
  validations: {
    loginForm: {
      email: { required, email },
      password: { required, minLength: minLength(6) },
    },
  },
  props: {},
  methods: {
    ...mapMutations(["LOGIN"]),
    handleSubmit() {
      this.submitted = true;
      this.$v.$touch();
      if (!this.$v.$invalid) {
        login({
          email: this.loginForm.email,
          password: this.loginForm.password,
        }).then((res) => {
          this.LOGIN(res);
          this.$router.push("/");
          this.$toast("Login Successfully", {
            type:'success',timeout: 1500});
        });
        return;
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.login-container {
  background-image: url("../../assets/images/login_bg.png");
  background-position-y: -100px;
  background-size: cover;
  font-family: "Muli", sans-serif;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  .container {
    padding: 0.5rem 1rem;
    .card-body {
      padding: 1.5rem 2rem !important;
      border-radius: 10px !important;
      h6 {
        color: #076b2c;
      }
    }
    .card {
      box-shadow: rgba(0, 0, 0, 0.25) 0px 54px 55px,
        rgba(0, 0, 0, 0.12) 0px -12px 30px, rgba(0, 0, 0, 0.12) 0px 4px 6px,
        rgba(0, 0, 0, 0.17) 0px 12px 13px, rgba(0, 0, 0, 0.09) 0px -3px 5px;
    }
  }
  h2 {
    color: #000;
    padding-bottom: 0.2rem;
    font-size:2rem !important;
    font-weight: lighter !important;
  }
  a {
    color: #333;
    &:hover {
      color: #37b47e;
      text-decoration: none;
    }
  }
  .form-control {
    display: block;
    width: 100%;
    height: 40px;
    padding: 0.75rem 1.375rem;
    font-size: 1rem;
    font-weight: 400;
    line-height: 0.83;
    color: #495057;
    background-color: #ffffff;
    background-clip: padding-box;
    border: 1.5px solid #c0c0c0;
    &:focus {
      color: #000;
      background-color: #fff;
      border: 2px solid #37b47e;
      outline: 0;
      box-shadow: none;
    }
  }
  .btn {
    background: #37b47e;
    border: #37b47e;
    color: #fff;
    &:hover {
      background: #33a876;
      border: #33a876;
    }
  }
}
</style>


