/**
 *
 * Created by ALLENWARE on 2018/6/26.
 */


var echarts_1 = echarts.init(document.querySelector(".echarts_1"));

// 指定图表的配置项和数据
var option = {
  // 大标题
  title: {
    text: '2017年注册人数'
  },
  // 提示框组件
  tooltip: {
    trigger: "item"   // 必须要移动到数据项才显示提示框
    //trigger: "axis"   // 必须要移动到数据项才显示提示框
  },
  // 图例
  legend: {
    // data 里面的内容必须和 数据项的 name 组合使用, 必须一一比对
    data:['人数']
  },
  // x轴坐标
  xAxis: {
    data: ["1月","2月","3月","4月","5月","6月"]
  },
  // y轴, 没有设置刻度, y轴一般不需要设置刻度, 根据数据自动生成
  yAxis: {},
  // 数据项
  series: [{
    name: '人数',
    // bar 表示柱状图, line 表示折线图, pie 表示饼图
    type: 'bar',
    data: [1000, 1500, 1800, 1200, 2500, 1800]
  }]
};

// 使用刚指定的配置项和数据显示图表。
echarts_1.setOption(option);


var echarts_2 = echarts.init(document.querySelector(".echarts_2"));
option2 = {
  //backgroundColor: '#2c343c',

  title: {
    text: 'Customized Pie',
    left: 'center',
    top: 20,
    textStyle: {
      color: '#ccc'
    }
  },

  tooltip : {
    trigger: 'item',
    formatter: "{a} <br/>{b} : {c} ({d}%)"
  },

  visualMap: {
    show: false,
    min: 80,
    max: 600,
    inRange: {
      colorLightness: [0, 1]
    }
  },
  series : [
    {
      name:'访问来源',
      type:'pie',
      radius : '55%',
      center: ['50%', '50%'],
      data:[
        {value:335, name:'直接访问'},
        {value:310, name:'邮件营销'},
        {value:274, name:'联盟广告'},
        {value:235, name:'视频广告'},
        {value:400, name:'搜索引擎'}
      ].sort(function (a, b) { return a.value - b.value; }),
      roseType: 'radius',
      label: {
        normal: {
          textStyle: {
            color: 'rgba(255, 255, 255, 0.3)'
          }
        }
      },
      labelLine: {
        normal: {
          lineStyle: {
            color: 'rgba(255, 255, 255, 0.3)'
          },
          smooth: 0.2,
          length: 10,
          length2: 20
        }
      },
      itemStyle: {
        normal: {
          color: '#c23531',
          shadowBlur: 200,
          shadowColor: 'rgba(0, 0, 0, 0.5)'
        }
      },

      animationType: 'scale',
      animationEasing: 'elasticOut',
      animationDelay: function (idx) {
        return Math.random() * 200;
      }
    }
  ]
};

echarts_2.setOption(option2);