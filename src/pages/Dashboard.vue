<template>
  <div>
    <div class="row"></div>
    <div class="row">
      <div class="col-md-3">
        <div class="form-group">
          <form action>
            <h5 class="title">Chọn quốc gia</h5>
            <input
              list="selectCountry"
              aria-describedby="addon-right addon-left"
              placeholder="Chọn quốc gia"
              class="form-control"
              @change="getData($event, null)"
            />
            <datalist id="selectCountry">
              <option
                v-for="(country,index) in countries"
                :key="index"
                :value="(index+1) + '. ' + country.Country"
              ></option>
            </datalist>
          </form>
        </div>
      </div>
      <div class="col-md-3">
        <div class="form-group">
          <form action>
            <h5 class="title">Chọn thời điểm xem</h5>
            <input
              list="selectTime"
              aria-describedby="addon-right addon-left"
              placeholder="Chọn thời gian xem"
              class="form-control"
              @change="getData(null, $event)"
            />
            <datalist id="selectTime">
              <option v-for="(option,index) in optionTime" :key="index" :value="option"></option>
            </datalist>
          </form>
        </div>
      </div>
      <div class="col-md-6">
        <h4
          class="title"
        >Ngày hôm nay trên {{option.country== "0"? "thế giới": countries[parseInt(option.country)-1].Country}} : {{newCase}} ca mới</h4>
      </div>
    </div>
    <div class="row">
      <div class="col-12">
        <card type="chart">
          <template slot="header">
            <div class="row">
              <div class="col-sm-6" :class="isRTL ? 'text-right' : 'text-left'">
                <h5 class="card-category">Thế giới</h5>
                <h2 class="card-title">{{$t('dashboard.performance')}}</h2>
              </div>
              <div class="col-sm-6">
                <div
                  class="btn-group btn-group-toggle"
                  :class="isRTL ? 'float-left' : 'float-right'"
                  data-toggle="buttons"
                >
                  <label
                    v-for="(option, index) in bigLineChartCategories"
                    :key="option"
                    class="btn btn-sm btn-primary btn-simple"
                    :class="{active: bigLineChart.activeIndex === index}"
                    :id="index"
                  >
                    <input
                      type="radio"
                      @click="initBigChart(index, bigLineChart.chartData.labels)"
                      name="options"
                      autocomplete="off"
                      :checked="bigLineChart.activeIndex === index"
                    />
                    {{option + " " + bigLineChart.allData[index][bigLineChart.allData[index].length-1]}}
                  </label>
                </div>
              </div>
            </div>
          </template>
          <div class="chart-area">
            <line-chart
              style="height: 100%"
              ref="bigChart"
              chart-id="big-line-chart"
              :chart-data="bigLineChart.chartData"
              :gradient-colors="bigLineChart.gradientColors"
              :gradient-stops="bigLineChart.gradientStops"
              :extra-options="bigLineChart.extraOptions"
            ></line-chart>
          </div>
        </card>
      </div>
    </div>
    <h4 class="title">Tại Việt Nam</h4>
    <div class="row">
      <div class="col-lg-4" :class="{'text-right': isRTL}">
        <card type="chart">
          <template slot="header">
            <h5 class="card-category">Số người mắc</h5>
            <h3 class="card-title">{{vietnam.TotalConfirmed}}</h3>
          </template>
          <div class="chart-area">
            <line-chart
              style="height: 100%"
              ref="purpleLineChart"
              chart-id="purple-line-chart"
              :chart-data="purpleLineChart.chartData"
              :gradient-colors="purpleLineChart.gradientColors"
              :gradient-stops="purpleLineChart.gradientStops"
              :extra-options="purpleLineChart.extraOptions"
            ></line-chart>
          </div>
        </card>
      </div>
      <div class="col-lg-4" :class="{'text-right': isRTL}">
        <card type="chart">
          <template slot="header">
            <h5 class="card-category">Tử vong</h5>
            <h3 class="card-title">{{vietnam.TotalDeaths}}</h3>
          </template>
          <div class="chart-area">
            <bar-chart
              style="height: 100%"
              chart-id="blue-bar-chart"
              :chart-data="blueBarChart.chartData"
              :gradient-stops="blueBarChart.gradientStops"
              :extra-options="blueBarChart.extraOptions"
            ></bar-chart>
          </div>
        </card>
      </div>
      <div class="col-lg-4" :class="{'text-right': isRTL}">
        <card type="chart">
          <template slot="header">
            <h5 class="card-category">Khỏi bệnh</h5>

            <h3 class="card-title">{{vietnam.TotalRecovered}}</h3>
          </template>
          <div class="chart-area">
            <line-chart
              style="height: 100%"
              chart-id="green-line-chart"
              :chart-data="greenLineChart.chartData"
              :gradient-stops="greenLineChart.gradientStops"
              :extra-options="greenLineChart.extraOptions"
            ></line-chart>
          </div>
        </card>
      </div>
    </div>
    <!-- <div class="row">
      <div class="col-lg-6 col-md-12">
        <card type="tasks" :header-classes="{'text-right': isRTL}">
          <template slot="header">
            <h6 class="title d-inline">{{$t('dashboard.tasks', {count: 5})}}</h6>
            <p class="card-category d-inline">{{$t('dashboard.today')}}</p>
            <base-dropdown
              menu-on-right
              tag="div"
              title-classes="btn btn-link btn-icon"
              aria-label="Settings menu"
              :class="{'float-left': isRTL}"
            >
              <i slot="title" class="tim-icons icon-settings-gear-63"></i>
              <a class="dropdown-item" href="#pablo">{{$t('dashboard.dropdown.action')}}</a>
              <a class="dropdown-item" href="#pablo">{{$t('dashboard.dropdown.anotherAction')}}</a>
              <a class="dropdown-item" href="#pablo">{{$t('dashboard.dropdown.somethingElse')}}</a>
            </base-dropdown>
          </template>
          <div class="table-full-width table-responsive">
            <task-list></task-list>
          </div>
        </card>
      </div>
      <div class="col-lg-6 col-md-12">
        <card class="card" :header-classes="{'text-right': isRTL}">
          <h4 slot="header" class="card-title">Bảng xếp hạng</h4>
          <div class="table-responsive">
            <user-table></user-table>
          </div>
        </card>
      </div>
    </div>-->
    <!-- 2 cái bảng phụ  -->
    <div class="row"></div>
  </div>
</template>
<script>
import LineChart from "@/components/Charts/LineChart";
import BarChart from "@/components/Charts/BarChart";
import * as chartConfigs from "@/components/Charts/config";
import TaskList from "./Dashboard/TaskList";
import UserTable from "./Dashboard/UserTable";
import config from "@/config";
import axios from "axios";

export default {
  components: {
    LineChart,
    BarChart,
    TaskList,
    UserTable,
  },
  data() {
    return {
      countries: [],
      newCase: 0,
      vietnam: {},
      option: {
        country: "0",
        time: "Toàn bộ",
      },
      optionTime: ["Toàn bộ", "Tuần này", "Tháng này"],
      bigLineChart: {
        totals: [],
        allData: [
          [100, 70, 90, 70, 85, 60, 75, 60, 90, 80, 110, 100],
          [80, 120, 105, 110, 95, 105, 90, 100, 80, 95, 70, 120],
          [60, 80, 65, 130, 80, 105, 90, 130, 70, 115, 60, 130],
          [60, 80, 65, 130, 99, 105, 90, 81, 70, 115, 60, 79],
        ],
        activeIndex: 0,
        chartData: {
          datasets: [{}],
          labels: [
            "JAN",
            "FEB",
            "MAR",
            "APR",
            "MAY",
            "JUN",
            "JUL",
            "AUG",
            "SEP",
            "OCT",
            "NOV",
            "DEC",
          ],
        },
        extraOptions: chartConfigs.purpleChartOptions,
        gradientColors: config.colors.primaryGradient,
        gradientStops: [1, 0.4, 0],
        categories: [],
      },
      purpleLineChart: {
        extraOptions: chartConfigs.purpleChartOptions,
        chartData: {
          labels: ["JUL", "AUG", "SEP", "OCT", "NOV", "DEC"],
          datasets: [
            {
              label: "Data",
              fill: true,
              borderColor: config.colors.primary,
              borderWidth: 2,
              borderDash: [],
              borderDashOffset: 0.0,
              pointBackgroundColor: config.colors.primary,
              pointBorderColor: "rgba(255,255,255,0)",
              pointHoverBackgroundColor: config.colors.primary,
              pointBorderWidth: 20,
              pointHoverRadius: 4,
              pointHoverBorderWidth: 15,
              pointRadius: 4,
              data: [80, 100, 70, 20, 120, 80],
            },
          ],
        },
        gradientColors: config.colors.primaryGradient,
        gradientStops: [1, 0.2, 0],
      },
      greenLineChart: {
        extraOptions: chartConfigs.greenChartOptions,
        chartData: {
          labels: ["JUL", "AUG", "SEP", "OCT", "NOV"],
          datasets: [
            {
              label: "My First dataset",
              fill: true,
              borderColor: config.colors.danger,
              borderWidth: 2,
              borderDash: [],
              borderDashOffset: 0.0,
              pointBackgroundColor: config.colors.danger,
              pointBorderColor: "rgba(255,255,255,0)",
              pointHoverBackgroundColor: config.colors.danger,
              pointBorderWidth: 20,
              pointHoverRadius: 4,
              pointHoverBorderWidth: 15,
              pointRadius: 4,
              data: [90, 27, 60, 12, 80],
            },
          ],
        },
        gradientColors: [
          "rgba(66,134,121,0.15)",
          "rgba(66,134,121,0.0)",
          "rgba(66,134,121,0)",
        ],
        gradientStops: [1, 0.4, 0],
      },
      blueBarChart: {
        extraOptions: chartConfigs.barChartOptions,
        chartData: {
          labels: ["USA", "GER", "AUS", "UK", "RO", "BR"],
          datasets: [
            {
              label: "Countries",
              fill: true,
              borderColor: config.colors.info,
              borderWidth: 2,
              borderDash: [],
              borderDashOffset: 0.0,
              data: [53, 20, 10, 80, 100, 45],
            },
          ],
        },
        gradientColors: config.colors.primaryGradient,
        gradientStops: [1, 0.4, 0],
      },
    };
  },
  computed: {
    enableRTL() {
      return this.$route.query.enableRTL;
    },
    isRTL() {
      return this.$rtl.isRTL;
    },
    bigLineChartCategories() {
      return this.$t("dashboard.chartCategories");
    },
  },

  methods: {
    pullData(time) {},
    getData(e1, e2) {
      if (e1) {
        this.option.country = e1.target.value.slice(
          0,
          e1.target.value.indexOf(".")
        );
        var country = this.countries[parseInt(this.option.country) - 1].Slug;
        axios
          .get(
            "https://api.covid19api.com/dayone/country/" +
              country +
              "/status/confirmed"
          )
          .then((res) => {
            this.newCase =
              res.data[res.data.length - 1].Cases -
              res.data[res.data.length - 2].Cases;
          });
      }

      if (e2) this.option.time = e2.target.value;
      var country = this.countries[parseInt(this.option.country) - 1].Slug;
      var d = new Date();
      var d2 = d.toISOString();
      var now = d2.slice(0, d2.indexOf("T")) + "T00:00:00Z";
      switch (this.option.time) {
        case "Toàn bộ": {
          var api =
            "https://api.covid19api.com/country/" +
            country +
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
                  arrayVal[1].push(obj.Active);
                  arrayVal[2].push(obj.Deaths);
                  arrayVal[3].push(obj.Recovered);
                } else {
                  var ls = arrayVal[0].length - 1;
                  arrayVal[0][ls] += obj.Confirmed;
                  arrayVal[1][ls] += obj.Active;
                  arrayVal[2][ls] += obj.Deaths;
                  arrayVal[3][ls] += obj.Recovered;
                }
              }
            }
            this.bigLineChart.chartData.labels = labels;
            this.bigLineChart.allData = arrayVal;
            this.$refs.bigChart.updateGradients(this.chartData);
            this.initBigChart(0, labels);
          });
          break;
        }
        case "Tuần này": {
          var lastWeek = new Date(d.getTime() - 604800000).toISOString();
          var startTime =
            lastWeek.slice(0, lastWeek.indexOf("T")) + "T00:00:00Z";
          var api =
            "https://api.covid19api.com/country/" +
            country +
            "?from=" +
            startTime +
            "&to=" +
            now;
          console.log(api);
          axios.get(api).then((res) => {
            var arrayVal = new Array();
            arrayVal[0] = new Array();
            arrayVal[1] = new Array();
            arrayVal[2] = new Array();
            arrayVal[3] = new Array();

            var labels = [];
            var i = 0;
            var dayTmp = "";
            for (var obj of res.data) {
              i++;
              var ndate = new Date(obj.Date);
              var lDay = new Date(ndate.getFullYear(), ndate.getMonth() + 1, 0);
              {
                if (obj.Date != dayTmp) {
                  dayTmp = obj.Date;
                  labels.push(obj.Date.slice(0, obj.Date.indexOf("T")));
                  // console.log(monthNames[ndate.getMonth()]);
                  arrayVal[0].push(obj.Confirmed);
                  arrayVal[1].push(obj.Active);
                  arrayVal[2].push(obj.Deaths);
                  arrayVal[3].push(obj.Recovered);
                } else {
                  var ls = arrayVal[0].length - 1;
                  arrayVal[0][ls] += obj.Confirmed;
                  arrayVal[1][ls] += obj.Active;
                  arrayVal[2][ls] += obj.Deaths;
                  arrayVal[3][ls] += obj.Recovered;
                }
              }
            }
            this.bigLineChart.chartData.labels = labels;
            this.bigLineChart.allData = arrayVal;
            this.$refs.bigChart.updateGradients(this.chartData);
            this.initBigChart(0, labels);
          });
          break;
        }
        case "Tháng này": {
        }
      }
    },
    initBigChart(index, lab) {
      let chartData = {
        datasets: [
          {
            fill: true,
            borderColor: config.colors.primary,
            borderWidth: 2,
            borderDash: [],
            borderDashOffset: 0.0,
            pointBackgroundColor: config.colors.primary,
            pointBorderColor: "rgba(255,255,255,0)",
            pointHoverBackgroundColor: config.colors.primary,
            pointBorderWidth: 20,
            pointHoverRadius: 4,
            pointHoverBorderWidth: 15,
            pointRadius: 4,
            data: this.bigLineChart.allData[index],
          },
        ],
        labels: lab,
      };
      this.$refs.bigChart.updateGradients(chartData);
      this.bigLineChart.chartData = chartData;
      this.bigLineChart.activeIndex = index;
    },
    loadMiniChart() {
      var d = new Date();
      var d2 = d.toISOString();
      var now = d2.slice(0, d2.indexOf("T")) + "T00:00:00Z";
      var api =
        "https://api.covid19api.com/country/vietnam" +
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
              arrayVal[1].push(obj.Active);
              arrayVal[2].push(obj.Deaths);
              arrayVal[3].push(obj.Recovered);
            } else {
              var ls = arrayVal[0].length - 1;
              arrayVal[0][ls] += obj.Confirmed;
              arrayVal[1][ls] += obj.Active;
              arrayVal[2][ls] += obj.Deaths;
              arrayVal[3][ls] += obj.Recovered;
            }
          }
        }
        var dataPurple = {
          labels: labels,
          datasets: [
            {
              label: "Data",
              fill: true,
              borderColor: config.colors.primary,
              borderWidth: 2,
              borderDash: [],
              borderDashOffset: 0.0,
              pointBackgroundColor: config.colors.primary,
              pointBorderColor: "rgba(255,255,255,0)",
              pointHoverBackgroundColor: config.colors.primary,
              pointBorderWidth: 20,
              pointHoverRadius: 4,
              pointHoverBorderWidth: 15,
              pointRadius: 4,
              data: arrayVal[0],
            },
          ],
        };

        var dataBlue = {
          labels: labels,
          datasets: [
            {
              label: "Countries",
              fill: true,
              borderColor: config.colors.info,
              borderWidth: 2,
              borderDash: [],
              borderDashOffset: 0.0,
              data: arrayVal[2],
            },
          ],
        };
        var dataGreen = {
          labels: labels,
          datasets: [
            {
              label: "My First dataset",
              fill: true,
              borderColor: config.colors.danger,
              borderWidth: 2,
              borderDash: [],
              borderDashOffset: 0.0,
              pointBackgroundColor: config.colors.danger,
              pointBorderColor: "rgba(255,255,255,0)",
              pointHoverBackgroundColor: config.colors.danger,
              pointBorderWidth: 20,
              pointHoverRadius: 4,
              pointHoverBorderWidth: 15,
              pointRadius: 4,
              data: arrayVal[3],
            },
          ],
        };
        this.purpleLineChart.chartData = dataPurple;
        this.blueBarChart.chartData = dataBlue;
        this.greenLineChart.chartData = dataGreen;
        // this.bigLineChart.chartData.labels = labels;
        // this.bigLineChart.allData = arrayVal;
        // this.$refs.bigChart.updateGradients(this.chartData);
        // this.initBigChart(0, labels);
      });
    },

    // loadTotal() {},
    // loadMonthByCountry(country, start, end) {},
  },
  // created()
  // {

  // },
  mounted() {
    this.loadMiniChart();
    this.i18n = this.$i18n;
    if (this.enableRTL) {
      this.i18n.locale = "ar";
      this.$rtl.enableRTL();
    }
    this.initBigChart(0, [
      "JAN",
      "FEB",
      "MAR",
      "APR",
      "MAY",
      "JUN",
      "JUL",
      "AUG",
      "SEP",
      "OCT",
      "NOV",
      "DEC",
    ]);
    axios.get("https://api.covid19api.com/summary").then((res) => {
      this.vietnam = res.data.Countries[181];
    });
    axios.get("https://api.covid19api.com/countries").then((res) => {
      var val = res.data;
      val.sort(function (x, y) {
        if (x.Slug > y.Slug) return 1;
        if (x.Slug < y.Slug) return -1;
        return 0;
      });

      this.countries = val;
      // this.bigData = res.data;
      // this.vietnam = res.data.Countries[]
    });
  },
  beforeDestroy() {
    if (this.$rtl.isRTL) {
      this.i18n.locale = "en";
      this.$rtl.disableRTL();
    }
  },
};
</script>
<style>
</style>
