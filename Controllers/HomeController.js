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
                'echarts/chart/pie' // require the specific chart type
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
                        text: 'Oct - Nov',
                        subtext: 'Flow of Investment',
                        x: 'center'
                    },
                    tooltip: {
                        trigger: 'item',
                        formatter: "{a} <br/>{b} : {c} ({d}%)"
                    },
                    legend: {
                        orient: 'horizontal',
                        y: 'bottom',
                        data: ['Out', 'In', 'Pending']
                    },
                    toolbox: {
                        show: false,
                        feature: {
                            mark: { show: true },
                            dataView: { show: true, readOnly: false },
                            magicType: {
                                show: true,
                                type: ['pie', 'funnel'],
                                option: {
                                    funnel: {
                                        x: '25%',
                                        width: '50%',
                                        funnelAlign: 'center',
                                        max: 1548
                                    }
                                }
                            },
                            restore: { show: true },
                            saveAsImage: { show: true }
                        }
                    },
                    calculable: true,
                    color:[
                        "rgb(50, 128, 255)",
                        "rgb(50,204,102)",
                        "rgb(243,130,130)"
                    ],
                    series: [
                        {
                            name: 'Deals',
                            type: 'pie',
                            radius: '55%',
                            center: ['50%', '60%'],
                            data: [
                                { value: 600, name: 'Out' },
                                { value: 700, name: 'In' },
                                { value: 300, name: 'Pending' }
                            ]
                        }
                    ]
                };


                // Load data into the ECharts instance
                myChart.setOption(option);
            }
        );
    });


});