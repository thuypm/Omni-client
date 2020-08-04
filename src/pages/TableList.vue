<template>
  <div class="row">
    <div class="col-12">
      <card :title="table1.title">
        <div class="table-responsive">
          <base-table
            :data="table1.data"
            :columns="table1.columns"
            :columnName="table1.columnName"
            thead-classes="text-primary"
          ></base-table>
        </div>
      </card>
    </div>
<!-- 
    <div class="col-12">
      <card class="card-plain">
        <div class="table-full-width table-responsive">
          <base-table
            :title="table2.title"
            :sub-title="table2.subTitle"
            :data="table2.data"
            :columns="table2.columns"
            :columnName="table2.columnName"
          ></base-table>
        </div>
      </card>
    </div> -->
  </div>
</template>
<script>
import { BaseTable } from "@/components";
const tableColumns = ["Country","Confirmed", "Deaths", "Recovered", "Active"];
const columnName = [
  "Quốc gia",
  "Số ca mắc",
  "Tử vong",
  "Đang điều trị",
  "Khỏi bệnh",
];
const tableData = [
    {
    "Country": "Switzerland",
    "CountryCode": "CH",
    "Lat": "46.82",
    "Lon": "8.23",
    "Confirmed": 20505,
    "Deaths": 666,
    "Recovered": 6415,
    "Active": 13424,
    "Date": "2020-04-04T00:00:00Z",
    "LocationID": "628d4f12-6ebe-4fa9-b046-77ff0b894a4e"
  },
    {
    "Country": "Switzerland",
    "CountryCode": "CH",
    "Lat": "46.82",
    "Lon": "8.23",
    "Confirmed": 20505,
    "Deaths": 666,
    "Recovered": 6415,
    "Active": 13424,
    "Date": "2020-04-05T00:00:00Z",
    "LocationID": "628d4f12-6ebe-4fa9-b046-77ff0b894a4e"
  }
];

export default {
  components: {
    BaseTable,
  },
  data() {
    return {
      table1: {
        title: "Simple Table",
        columns: [...tableColumns],
        columnName: [...columnName],
        data: [...tableData],
      },
      table2: {
        title: "Table on Plain Background",
        columns: [...tableColumns],
        columnName: [...columnName],
        data: [...tableData],
      },
    };
  },
};
</script>
<style>
</style>
