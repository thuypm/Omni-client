<template>
  <div>
    <div class="row">
      <div class="col-12">
        <card :title="table1.title">
          <div class="table-responsive" style="max-height:250px">
            <base-table
              :data="table1.data"
              :columns="table1.columns"
              :columnName="table1.columnName"
              thead-classes="text-primary"
              @sort="sortTable"
            ></base-table>
          </div>
        </card>
      </div>
    </div>
    <div class="row">
      <div class="col-9">
        <highcharts :constructorType="'mapChart'" class="hc" :options="mapOptions" ref="chart"></highcharts>
      </div>
      <div class="col-3">
        <highcharts class="hc" :options="chartOption" ref="chart"></highcharts>
      </div>
    </div>
  </div>
</template>
<script>
import { BaseTable } from "@/components";

import Highcharts from "highcharts";
import axios from "axios";
import worldMap from "@highcharts/map-collection/custom/world.geo.json";
import exportingInit from "highcharts/modules/exporting";
// exportingInit(Highcharts)
const tableColumns = [
  "Country",
  "TotalConfirmed",
  "NewConfirmed",
  "NewDeaths",
  "TotalRecovered",
];
const columnName = [
  "Quốc gia",
  "Tổng số ca mắc",
  "số ca mới",
  "Tử vong",
  "Đang điều trị",
];
const tableData = [
  {
    Country: "Switzerland",
    CountryCode: "CH",
    Lat: "46.82",
    Lon: "8.23",
    Confirmed: 20505,
    Deaths: 666,
    Recovered: 6415,
    Active: 13424,
    Date: "2020-04-04T00:00:00Z",
    LocationID: "628d4f12-6ebe-4fa9-b046-77ff0b894a4e",
  },
  {
    Country: "Switzerland",
    CountryCode: "CH",
    Lat: "46.82",
    Lon: "8.23",
    Confirmed: 20505,
    Deaths: 666,
    Recovered: 6415,
    Active: 13424,
    Date: "2020-04-05T00:00:00Z",
    LocationID: "628d4f12-6ebe-4fa9-b046-77ff0b894a4e",
  },
];

export default {
  components: {
    BaseTable,
  },
  methods: {
    selectCountry(e) {
      // console.log(e);
      var vt = this.allData.find(function (val) {
        return val.CountryCode.toLowerCase() == e.point["hc-key"];
      });
      var d = new Date();
      var d2 = d.toISOString();
      var now = d2.slice(0, d2.indexOf("T")) + "T00:00:00Z";
      var api =
        "https://api.covid19api.com/country/" +
        vt.Slug +
        "?from=2020-01-01T00:00:00Z&to=" +
        now;
      // console.log(api);
      axios.get(api).then((res) => {
        var arrayVal = new Array();
        arrayVal[0] = new Array();
        arrayVal[1] = new Array();
        arrayVal[2] = new Array();
        arrayVal[3] = new Array();
        const monthNames = [
          "Jan",
          "Feb",
          "Mar",
          "Apr",
          "May",
          "Jun",
          "Jul",
          "Aug",
          "Sep",
          "Oct",
          "Nov",
          "Dec",
        ];
        var labels = [];
        var i = 0;
        var dayTmp = "";
        for (var obj of res.data) {
          i++;
          var ndate = new Date(obj.Date);
          var lDay = new Date(ndate.getFullYear(), ndate.getMonth() + 1, 0);
          if (
            ndate.getDate() == lDay.getDate() ||
            (res.data[res.data.length - 1].Date == obj.Date &&
              ndate.getDate() != lDay.getDate())
          ) {
            if (obj.Date != dayTmp) {
              dayTmp = obj.Date;
              labels.push(monthNames[ndate.getMonth()]);
              // console.log(monthNames[ndate.getMonth()]);
              arrayVal[0].push(obj.Confirmed);
              arrayVal[3].push(obj.Active);
              arrayVal[2].push(obj.Deaths);
              arrayVal[1].push(obj.Recovered);
            } else {
              var ls = arrayVal[0].length - 1;
              arrayVal[0][ls] += obj.Confirmed;
              arrayVal[3][ls] += obj.Active;
              arrayVal[2][ls] += obj.Deaths;
              arrayVal[1][ls] += obj.Recovered;
            }
          }
        };
        var yTitle = this.table1.columnName[this.selectColumnIndex+1];
        this.chartOption.yAxis = {
          title:{
              text: yTitle
          }
        }
        if (e.shiftKey == true) {
          this.chartOption.xAxis = {
            categories: labels,
          };
          this.chartOption.series.push({
            name: vt.Country,
            data: arrayVal[this.selectColumnIndex],
          });
        } else {
          this.chartOption.xAxis = {
            categories: labels,
          };
          this.chartOption.series = [{
            name: vt.Country,
            data: arrayVal[this.selectColumnIndex],
          }];
        }
      });
    },
    sortTable(dataSort) {
      this.selectColumnIndex = col;
      if (
        this.table1.columns[dataSort.col] != this.mapOptions.series.name &&
        dataSort.col != 0
      ) {
        var dataMapChart = [];
        for (let obj of this.table1.data)
          dataMapChart.push([
            obj.CountryCode.toLowerCase(),
            obj[this.table1.columns[dataSort.col]],
          ]);
        this.mapOptions.series = {
          name: this.table1.columnName[dataSort.col],
          allowPointSelect: true,
          cursor: "pointer",
          states: {
            select: {
              color: "#a4edba",
              borderColor: "black",
              dashStyle: "shortdot",
            },
          },
          dataLabels: {
            enabled: true,
            format: "{point.name}",
          },
          allAreas: false,
          data: dataMapChart,
        };
      }
      var columns = this.table1.columns;
      if (dataSort.option == 1) {
        this.table1.data.sort(function (x, y) {
          if (x[columns[dataSort.col]] > y[columns[dataSort.col]]) return 1;
          if (x[columns[dataSort.col]] < y[columns[dataSort.col]]) return -1;
          return 0;
        });
      } else {
        this.table1.data.sort(function (x, y) {
          if (x[columns[dataSort.col]] < y[columns[dataSort.col]]) return 1;
          if (x[columns[dataSort.col]] > y[columns[dataSort.col]]) return -1;
          return 0;
        });
      }
    },
  },
  data() {
    var _this = this;
    return {
      selectColumnIndex: 0,
      chartOption: {
        chart: {
          type: "spline",
        },
        title: {
          text: "Chi tiết",
        },
        subtitle: {
          text: "ấn shift+ click để so sánh",
        },
        xAxis: {
          categories: [
            "Jan",
            "Feb",
            "Mar",
            "Apr",
            "May",
            "Jun",
            "Jul",
            "Aug",
            "Sep",
            "Oct",
            "Nov",
            "Dec",
          ],
        },
        yAxis: {
          title: {
            text: "Số ca đang điều trị",
          },
          labels: {
            formatter: function () {
              return this.value + "";
            },
          },
        },
        tooltip: {
          crosshairs: true,
          shared: true,
        },
        plotOptions: {
          spline: {
            marker: {
              radius: 4,
              lineColor: "#666666",
              lineWidth: 1,
            },
          },
        },
        series: [
         
        ],
      },
      mapOptions: {
        chart: {
          map: worldMap,
        },
        title: {
          text: "Bản đồ dịch trên toàn thế giới",
        },
        subtitle: {
          text: "Không biết ghi cái gì ở đây cả",
        },
        mapNavigation: {
          enabled: true,
          buttonOptions: {
            alignTo: "spacingBox",
          },
        },
        colorAxis: {
          min: 0,
        },
        plotOptions: {
          series: {
            events: {
              click: function (e) {
                _this.selectCountry(e);
              },
            },
          },
        },
        series: [
          {
            name: "Số ca nhiễm hiện tại",
            allowPointSelect: true,
            cursor: "pointer",
            states: {
              select: {
                color: "#a4edba",
                borderColor: "black",
                dashStyle: "shortdot",
              },
            },
            dataLabels: {
              enabled: true,
              format: "{point.name}",
            },
            allAreas: false,
            data: [],
          },
        ],
      },
      allData: [],
      table1: {
        title: "Bảng xếp hạng",
        columns: [...tableColumns],
        columnName: [...columnName],
        data: [...tableData],
      },
    };
  },

  mounted() {
    axios.get("https://api.covid19api.com/summary").then((res) => {
      var dataMapChart = [];
      this.allData = res.data.Countries;
      this.table1.data = res.data.Countries;
      for (let obj of res.data.Countries)
        dataMapChart.push([obj.CountryCode.toLowerCase(), obj.NewConfirmed]);
      this.mapOptions.series = {
        name: "Số ca nhiễm mới",
        allowPointSelect: true,
        cursor: "pointer",
        states: {
          select: {
            color: "#a4edba",
            borderColor: "black",
            dashStyle: "shortdot",
          },
        },
        dataLabels: {
          enabled: true,
          format: "{point.name}",
        },
        allAreas: false,
        data: dataMapChart,
      };
    });
  },
};
</script>
<style>
</style>
