<template>
  <div class="row">
    <div class="col-9">
      <highcharts :constructorType="'mapChart'" class="hc" :options="mapOptions" ref="chart"></highcharts>
    </div>
    <div class="col-3">
      <highcharts class="hc" :options="chartOption" ref="chart"></highcharts>
    </div>
  </div>
</template>
<script>
import Highcharts from "highcharts";
import axios from "axios";
import worldMap from "@highcharts/map-collection/custom/world.geo.json";
import exportingInit from "highcharts/modules/exporting";
export default {
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
        series: [],
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
      allData: []
    };
  },
  mounted() {
    axios.get("https://api.covid19api.com/summary").then((res) => {
      var dataMapChart = [];
      this.allData = res.data.Countries;
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