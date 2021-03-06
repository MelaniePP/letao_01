$(function(){
   // 基于准备好的dom，初始化echarts实例
   var chartleft = echarts.init(document.querySelector(".echart_left"));

   // 指定图表的配置项和数据
   var option1 = {
       title: {
           text: '2018年注册人数'
       },
       tooltip: {},
       legend: {
           data:['销量','人数']
       },
       xAxis: {
           data: ["1月","2月","3月","4月","5月","6月"]
       },
       yAxis: {},
       series: [{
           name: '销量',
           type: 'bar',
           data: [523, 202, 346, 101, 210, 80]
       },
       {
        name: '人数',
        type: 'bar',
        data: [53, 22, 36, 101, 20, 80]
    }]
   };

   // 使用刚指定的配置项和数据显示图表。
   chartleft.setOption(option1);


   var chartright = echarts.init(document.querySelector(".echart_right"));
   var option2 = {
    title : {
        text: '热门品牌销售',
        subtext: '2018年11月',
        x:'center'
    },
    tooltip : {
        trigger: 'item',
        formatter: "{a} <br/>{b} : {c} ({d}%)"
    },
    legend: {
        orient: 'vertical',
        left: 'left',
        data: ['直接访问','邮件营销','联盟广告','视频广告','搜索引擎']
    },
    series : [
        {
            name: '访问来源',
            type: 'pie',
            radius : '55%',
            center: ['50%', '60%'],
            data:[
                {value:335, name:'直接访问'},
                {value:310, name:'邮件营销'},
                {value:234, name:'联盟广告'},
                {value:135, name:'视频广告'},
                {value:1548, name:'搜索引擎'}
            ],
            itemStyle: {
                emphasis: {
                    shadowBlur: 10,
                    shadowOffsetX: 0,
                    shadowColor: 'rgba(0, 0, 0, 0.5)'
                }
            }
        }
    ]
};
   chartright.setOption(option2);
})