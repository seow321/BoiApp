'use strict';

var boiApp = angular.module('boiApp');

boiApp.controller('HomeController', function ($rootScope, $scope, $http, $timeout) {
    $scope.$on('$viewContentLoaded', function () {
        // initialize core components
        require.config({
            paths: {
                echarts: 'http://echarts.baidu.com/build/dist'
            }
        });

        // use
        require(
            [
                'echarts',
                'echarts/chart/bar' // require the specific chart type
            ],
            function (ec) {
                // Initialize after dom ready
                var myChart = ec.init(document.getElementById('dashboard'));

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
                var option = {
                    title: {
                        text: 'Investment Flow',
                        subtext: 'Year 2015',
                        x: 'center',
                        textAlign: 'center',
                        padding: '1',
                        itemGap:"1",
                        textStyle: {
                            fontSize:'30'
                        },
                        subtextStyle: {
                            fontSize: '15'
                        }
                    },
                    tooltip: {
                        trigger: 'axis'
                    },
                    legend: {
                        data: ['Out', 'In'],
                        y:'bottom'
                    },
                    calculable: false,
                    xAxis: [
                        {
                            type: 'category',
                            data: ['Jul', 'Aug', 'Sep']
                        }
                    ],
                    yAxis: [
                        {
                            type: 'value'
                        }
                    ],
                    color:["red","green"],
                    series: [
                        {
                            name: 'Out',
                            type: 'bar',
                            data: [ 100, 100, 100],
                            markPoint: {
                                data: [
                                    { type: 'max', name: 'Highest Out' }
                                    
                                ]
                            },
                            markLine: {
                                data: [
                                    { type: 'average', name: 'Average' }
                                ]
                            }
                        },
                        {
                            name: 'In',
                            type: 'bar',
                            data: [ 70, 140, 280],
                            markPoint: {
                                data: [
                                    { type:'max', name:'Highest In' }
                                    
                                ]
                            },
                            markLine: {
                                data: [
                                    { type: 'average', name: 'Average' }
                                ]
                            }
                        }
                    ]
                };


                // Load data into the ECharts instance
                myChart.setOption(option);
            }
        );
    });


});