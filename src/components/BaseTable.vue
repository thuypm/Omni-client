<template>
  <table class="table tablesorter" :class="tableClass">
    <thead :class="theadClasses">
    <tr>
      <slot name="columns">
        <th v-for="(column, id) in columnName" :key="id" @click="sortBy(id, column)"> {{column}} <i class="fa fa-fw " :class="{
          'fa-arrow-up' : sort == 1 &&  idSort == id,
          'fa-arrow-down' : sort == 0 &&  idSort == id,
          'fa-arrows-alt-v' : sort == -1 || idSort != id,
        }" style=""></i></th>
      </slot>
    </tr>
    </thead>
    <tbody :class="tbodyClasses">
    <tr v-for="(item, index) in data" :key="index">
      <slot :row="item">
        <td v-for="(column, index) in columns"
            :key="index"
            v-if="hasValue(item, column)">
          {{itemValue(item, column)}}
        </td>
      </slot>
    </tr>
    </tbody>
  </table>
</template>
<script>
  export default {
    name: 'base-table',
    props: {
      columnName: {
        type: Array,
        default: () => [],
        description: "Table columns"
      },
      columns: {
        type: Array,
        default: () => [],
        description: "Table columns"
      },
      data: {
        type: Array,
        default: () => [],
        description: "Table data"
      },
      type: {
        type: String, // striped | hover
        default: "",
        description: "Whether table is striped or hover type"
      },
      theadClasses: {
        type: String,
        default: '',
        description: "<thead> css classes"
      },
      tbodyClasses: {
        type: String,
        default: '',
        description: "<tbody> css classes"
      }
    },
    data(){
        return{
          sort: -1,
          idSort: -1,

        }
    },
    computed: {
      tableClass() {
        return this.type && `table-${this.type}`;
      }
    },
    mounted(){

    },
    methods: {

      sortBy(id, col)
      {
        if(this.idSort == id)
          this.sort = !this.sort;
        else
          {
            this.sort = 1;
            this.idSort = id;
          }
      //  console.log(this.sort +" "+ this.idSort)
      },
      hasValue(item, column) {
        return item[column] !== "undefined";
      },
      itemValue(item, column) {
        return item[column];
      }
    }
  };
</script>
<style>
.table > thead > tr > th:hover {
  cursor: pointer;
   /* color:yellow  */
}
</style>
