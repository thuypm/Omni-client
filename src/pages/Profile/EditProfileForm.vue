<template>
  <card>
    <h5 slot="header" class="title">Tài Khoản {{model.title}}</h5>
    <div class="row">
      <div class="col-md-12">
        <base-input label="username"
                  v-model="model.username"
                  placeholder="Home Address">
        </base-input>
      </div>
    </div>
 <div class="row">
      <div class="col-md-12">
        <base-input label="password"
                  v-model="model.password"
                  placeholder="Home Address">
        </base-input>
      </div>
    </div>
    <base-button slot="footer" type="primary" fill>Lưu</base-button>
  </card>
</template>
<script>
  export default {
    props: {
      model: {
        type: Object,
        default: () => {
          return {};
        }
      }
    }
  }
</script>
<style>
</style>
