<template>
  <div class="container mt-4">
    <div class="row">
      <div class="col-md-8 offset-md-2">
        <h3>Todo App</h3>

        <div class="input-group mb-3 mt-4">
          <input type="text" class="form-control" placeholder="Masukkan Kegiatan Hari ini" aria-label="Masukkan Kegiatan Hari ini"
            aria-describedby="button-addon2" v-model="model.name">
          <button class="btn btn-outline-secondary" type="button" id="button-addon2" @click="save()">Save</button>
        </div>

        <table class="table table-hover">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">Kegiatan</th>
              <th scope="col">Status</th>
              <th scope="col">Aksi</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(val, index) in allData" :key="val.uuid">
              <th scope="row">{{ index + 1 }}</th>
              <td>{{ val.name }}</td>
              <td>
                <span class="badge" :class="val.status == 'new' ? 'text-bg-primary' : 'text-bg-success'">{{ val.status }}</span>
              </td>
              <td>
                <button style="margin-right:10px;" class="btn btn-danger btn-sm" @click="hapus(val.uuid)">Hapus</button>
                <button @click="completed(val.uuid)" class="btn btn-secondary btn-sm">Completed</button>
              </td>
            </tr>

          </tbody>
        </table>

      </div>
  </div>
  </div>
</template>

<script>
import http from './http-common'

export default {
  name: "App",
  data() {
    return {
      name: 'Yasir',
      model: {
        name: '',
        status: 'new'
      },
      allData: [],
    }
  },
  mounted() {
    this.getAllData();
  },
  methods: {

    async getAllData() {
      try {
        const res = await http.get("unit");
        this.allData = JSON.parse(JSON.stringify(res.data.data));
      } catch (err) {
        console.log(err);
      }
    },

    async save() {
      try {
       await http.post("unit", this.model);
        this.getAllData();
        this.model.name = '';
      } catch (err) {
        console.log(err);
      }
    },

    async hapus(id) {
      try {
       await http.delete("unit/" + id);
        this.getAllData();
      } catch (err) {
        console.log(err);
      }
    },

    async completed(id) {
      try {
       await http.post("unit/" + id + "?_method=PATCH", {
          status: 'completed'
        });
        this.getAllData();
      } catch (err) {
        console.log(err);
      }
    }
  },
}
</script>

<style lang="">

</style>