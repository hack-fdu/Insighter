var app = new Vue({
        el: '#test',
        data: {
            userid: ""
        },
        methods: {
              uploadUser: function(){
                  axios.get('/getWeibo',{
                    params: {
                      userid: this.userid
                    }
                  })
                  .then(function (response) {
                                   // 基于准备好的dom，初始化echarts图表
                  if(response) {

                      var myChart1 = echarts.init(document.getElementById('echart1'));
                      var myChart2 = echarts.init(document.getElementById('echart2'));
                      var myChart3 = echarts.init(document.getElementById('echart3'));
                      var labelTop = {
                          normal: {
                              label: {
                                  show: true,
                                  position: 'center',
                                  formatter: '{b}',
                                  textStyle: {
                                      baseline: 'bottom'
                                  }
                              },
                              labelLine: {
                                  show: false
                              }
                          }
                      };
                      var labelFromatter = {
                          normal: {
                              label: {
                                  formatter: function (params) {
                                      return 100 - params.value + '%'
                                  },
                                  textStyle: {
                                      baseline: 'top'
                                  }
                              }
                          },
                      }
                      var labelBottom = {
                          normal: {
                              color: '#ccc',
                              label: {
                                  show: true,
                                  position: 'center'
                              },
                              labelLine: {
                                  show: false
                              }
                          },
                          emphasis: {
                              color: 'rgba(0,0,0,0)'
                          }
                      };
                      var radius = [40, 55];


                      option1 = {
                          title: {
                              // text: 'Personal Analysis',
                              // subtext: '纯属虚构',
                              x: 'right',
                              y: 'bottom'
                          },
                          tooltip: {
                              trigger: 'item',
                              backgroundColor: 'rgba(0,0,250,0.2)'
                          },
                          legend: {
                              // orient : 'vertical',
                              //x : 'center',
                              data: function () {
                                  var list = [];
                                  for (var i = 1; i <= 1; i++) {
                                      list.push("");
                                  }
                                  return list;
                              }()
                          },
                          toolbox: {
                              // show : true,
                              // orient : 'vertical',
                              // y:'center',
                              // feature : {
                              //     mark : {show: true},
                              //     dataView : {show: true, readOnly: false},
                              //     restore : {show: true},
                              //     saveAsImage : {show: true}
                              // }
                          },
                          polar: [
                              {
                                  indicator: [
                                      {text: 'Openness', max: 1000},
                                      {text: 'Conscientiousness', max: 1000},
                                      {text: 'Extraversion', max: 1000},
                                      {text: 'Agreeableness', max: 1000},
                                      {text: 'Emotional range', max: 1000}
                                  ],
                                  center: ['50%', 240],
                                  radius: 150
                              }
                          ],
                          calculable: false,
                          series: (function () {
                              var series = [];
                              for (var i = 1; i <= 1; i++) {
                                  series.push({
                                      name: '浏览器（数据纯属虚构）',
                                      type: 'radar',
                                      symbol: 'none',
                                      itemStyle: {
                                          normal: {
                                              lineStyle: {
                                                  width: 4
                                              },
                                              areaStyle: {
                                                  type: 'default',
                                                  color: "red"
                                              },
                                          },
                                          emphasis: {
                                              areaStyle: {color: 'rgba(0,250,0,0.3)'}
                                          }
                                      },
                                      data: [
                                          {
                                              value: [
                                                  response.data.personality[0].percentile * 1000,
                                                  response.data.personality[1].percentile * 1000,
                                                  response.data.personality[2].percentile * 1000,
                                                  response.data.personality[3].percentile * 1000,
                                                  response.data.personality[4].percentile * 1000
                                              ],
                                              name: i + 2000
                                          }
                                      ]
                                  })
                              }
                              return series;
                          })()
                      };

                      option2 = {
                          legend: {
                              x: 'center',
                              y: 'center',
                              data: [
                                  'Challenge', 'Closeness', 'Curiosity', 'Excitement', 'Harmony',
                                  'Ideal', 'Liberty', 'Love', 'Practicality', 'Self-expression'
                              ]
                          },
                          title: {
                              text: 'The App World',
                              subtext: 'from global web index',
                              x: 'center'
                          },
                          toolbox: {
                              show: false,
                              feature: {
                                  dataView: {show: true, readOnly: false},
                                  magicType: {
                                      show: true,
                                      type: ['pie', 'funnel'],
                                      option: {
                                          funnel: {
                                              width: '20%',
                                              height: '30%',
                                              itemStyle: {
                                                  normal: {
                                                      label: {
                                                          formatter: function (params) {
                                                              return 'other\n' + params.value + '%\n'
                                                          },
                                                          textStyle: {
                                                              baseline: 'middle'
                                                          }
                                                      }
                                                  },
                                              }
                                          }
                                      }
                                  },
                                  restore: {show: true},
                                  saveAsImage: {show: true}
                              }
                          },
                          series: [
                              {
                                  type: 'pie',
                                  center: ['10%', '30%'],
                                  radius: radius,
                                  x: '0%', // for funnel
                                  itemStyle: labelFromatter,
                                  data: [
                                      {
                                          name: 'other',
                                          value: (1 - response.data.needs[0].percentile.toFixed(2)) * 100,
                                          itemStyle: labelBottom
                                      },
                                      {
                                          name: 'Challenge',
                                          value: (response.data.needs[0].percentile.toFixed(2)) * 100,
                                          itemStyle: labelTop
                                      }
                                  ]
                              },
                              {
                                  type: 'pie',
                                  center: ['30%', '30%'],
                                  radius: radius,
                                  x: '20%', // for funnel
                                  itemStyle: labelFromatter,
                                  data: [
                                      {
                                          name: 'other',
                                          value: (1 - response.data.needs[1].percentile.toFixed(2)) * 100,
                                          itemStyle: labelBottom
                                      },
                                      {
                                          name: 'Closeness',
                                          value: (response.data.needs[1].percentile.toFixed(2)) * 100,
                                          itemStyle: labelTop
                                      }
                                  ]
                              },
                              {
                                  type: 'pie',
                                  center: ['50%', '30%'],
                                  radius: radius,
                                  x: '40%', // for funnel
                                  itemStyle: labelFromatter,
                                  data: [
                                      {
                                          name: 'other',
                                          value: (1 - response.data.needs[2].percentile.toFixed(2)) * 100,
                                          itemStyle: labelBottom
                                      },
                                      {
                                          name: 'Curiosity',
                                          value: (response.data.needs[2].percentile.toFixed(2)) * 100,
                                          itemStyle: labelTop
                                      }
                                  ]
                              },
                              {
                                  type: 'pie',
                                  center: ['70%', '30%'],
                                  radius: radius,
                                  x: '60%', // for funnel
                                  itemStyle: labelFromatter,
                                  data: [
                                      {
                                          name: 'other',
                                          value: (1 - response.data.needs[3].percentile.toFixed(2)) * 100,
                                          itemStyle: labelBottom
                                      },
                                      {
                                          name: 'Excitement',
                                          value: (response.data.needs[3].percentile.toFixed(2)) * 100,
                                          itemStyle: labelTop
                                      }
                                  ]
                              },
                              {
                                  type: 'pie',
                                  center: ['90%', '30%'],
                                  radius: radius,
                                  x: '80%', // for funnel
                                  itemStyle: labelFromatter,
                                  data: [
                                      {
                                          name: 'other',
                                          value: (1 - response.data.needs[4].percentile.toFixed(2)) * 100,
                                          itemStyle: labelBottom
                                      },
                                      {
                                          name: 'Harmony',
                                          value: (response.data.needs[4].percentile.toFixed(2)) * 100,
                                          itemStyle: labelTop
                                      }
                                  ]
                              },
                              {
                                  type: 'pie',
                                  center: ['10%', '70%'],
                                  radius: radius,
                                  y: '55%',   // for funnel
                                  x: '0%',    // for funnel
                                  itemStyle: labelFromatter,
                                  data: [
                                      {
                                          name: 'other',
                                          value: (1 - response.data.needs[5].percentile.toFixed(2)) * 100,
                                          itemStyle: labelBottom
                                      },
                                      {
                                          name: 'Ideal',
                                          value: (response.data.needs[5].percentile.toFixed(2)) * 100,
                                          itemStyle: labelTop
                                      }
                                  ]
                              },
                              {
                                  type: 'pie',
                                  center: ['30%', '70%'],
                                  radius: radius,
                                  y: '55%',   // for funnel
                                  x: '20%',    // for funnel
                                  itemStyle: labelFromatter,
                                  data: [
                                      {
                                          name: 'other',
                                          value: (1 - response.data.needs[6].percentile.toFixed(2)) * 100,
                                          itemStyle: labelBottom
                                      },
                                      {
                                          name: 'Liberty',
                                          value: (response.data.needs[6].percentile.toFixed(2)) * 100,
                                          itemStyle: labelTop
                                      }
                                  ]
                              },
                              {
                                  type: 'pie',
                                  center: ['50%', '70%'],
                                  radius: radius,
                                  y: '55%',   // for funnel
                                  x: '40%', // for funnel
                                  itemStyle: labelFromatter,
                                  data: [
                                      {
                                          name: 'other',
                                          value: (1 - response.data.needs[7].percentile.toFixed(2)) * 100,
                                          itemStyle: labelBottom
                                      },
                                      {
                                          name: 'Love',
                                          value: (response.data.needs[7].percentile.toFixed(2)) * 100,
                                          itemStyle: labelTop
                                      }
                                  ]
                              },
                              {
                                  type: 'pie',
                                  center: ['70%', '70%'],
                                  radius: radius,
                                  y: '55%',   // for funnel
                                  x: '60%', // for funnel
                                  itemStyle: labelFromatter,
                                  data: [
                                      {
                                          name: 'other',
                                          value: (1 - response.data.needs[8].percentile.toFixed(2)) * 100,
                                          itemStyle: labelBottom
                                      },
                                      {
                                          name: 'Practicality',
                                          value: (response.data.needs[8].percentile.toFixed(2)) * 100,
                                          itemStyle: labelTop
                                      }
                                  ]
                              },
                              {
                                  type: 'pie',
                                  center: ['90%', '70%'],
                                  radius: radius,
                                  y: '55%',   // for funnel
                                  x: '80%', // for funnel
                                  itemStyle: labelFromatter,
                                  data: [
                                      {
                                          name: 'other',
                                          value: (1 - response.data.needs[9].percentile.toFixed(2)) * 100,
                                          itemStyle: labelBottom
                                      },
                                      {
                                          name: 'Self-expression',
                                          value: (response.data.needs[9].percentile.toFixed(2)) * 100,
                                          itemStyle: labelTop
                                      }
                                  ]
                              }
                          ]
                      };
                      var weights = [-0.3, 0.4, -0.2, -0.3, 0.3, -0.4, 0.1, 0.4, -0.1, 0.1];
                      var depression = 0;
                      for (var i = 0; i < weights.length; i++) {
                          depression = depression + weights[i] * response.data.needs[i].percentile;
                      }
                      console.log(depression)

                      option3 = {
                            tooltip : {
                                formatter: "{a} <br/>{b} : {c}%"
                            },
                            toolbox: {
                                feature: {
                                    restore: {},
                                    saveAsImage: {}
                                }
                            },
                            series: [
                                {
                                    axisLine: {            // 坐标轴线
                                        lineStyle: {       // 属性lineStyle控制线条样式
                                            color: [[0.1, 'red'],[0.2, 'yellow'],[0.8, 'green'],[0.9, 'yellow'],[1, 'red']],
                                            width: 8
                                        }
                                    },

                                    min: -1,
                                    max: 1,
                                    splitNumber: 10,
                                    name: '抑郁程度',
                                    type: 'gauge',
                                    detail: {formatter:'{value}%'},
                                    data: [{value: depression.toFixed(2), name: '抑郁程度'}]
                                }
                            ]
                        };
                      console.log(response.data.needs)
                      console.log(response.data.needs[1].percentile)
                      console.log(response.data.needs[1].percentile.toFixed(2))
                      // 为echarts对象加载数据 
                      myChart1.setOption(option1);
                      myChart2.setOption(option2);
                      myChart3.setOption(option3);



                  }
                  })
                  .catch(function (error) {
                        console.log(error);
                    });
                }
                        // uploadFile: function(){
                        //   var formData = new FormData();
                        //   formData.append('file', this.$refs["file"].files[0]);
                        //   axios.post('/personalInsight', formData)
                        //     .then(function (response) {
                        //           console.log(response)
                        //       })
                        //     .catch(function (error) {
                        //       console.log(error);
                        //     });
                        // }
            }
})