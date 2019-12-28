<template>
  <div class="slide-wrap">
    <p class="slide-title"><span style="color: #F00">*</span>Chart Type</p>
    <template v-for="chartItem in chartOptions">
      <div :key="chartItem.title">
        <p>{{chartItem.title}}</p>
        <ul>
          <li v-drag="item" class="line-item" 
            v-for="(item,index) in chartItem.charts" 
            :key="item.title + '_' + index" 
            :style="{backgroundImage: 'url('+item.icon+')', backgroundSize: '100%'}">
          </li>
        </ul>
      </div>
    </template>
  </div>
</template>
<script>
import { getStyle, addClass, removeClass } from '@/utils/dom'

export default {
  props: {
    dragUp:{
      type: Function,
      default: () => { }
    }
  },  
  data(){
    return{
      chartOptions: [
        {
          title: 'Line Chart',
          charts: [
            {
              type: 'LineChart',
              vwidth: '100%',
              icon: require('@/assets/images/LineCharts.svg')
            }
          ]
        },
        // {
        //   title: 'Histogram',
        //   charts: [
        //     {
        //       type: 'StackedBarChart',
        //       vwidth: '50%',
        //       icon: require('@/assets/images/BarCharts.svg')
        //     }
        //   ]
        // },
        {
          title: 'Pie Chart',
          charts: [
            {
              type: 'PieChart',
              vwidth: '50%',
              icon: require('@/assets/images/PieCharts.svg')
            },
            {
              type: 'DoughnutChart',
              vwidth: '50%',
              icon: require('@/assets/images/DoughnutCharts.svg')
            }
          ]
        },{
          title: 'Pivot Table',
          charts: [
            {
              type: 'PivoteTable',
              vwidth: '100%',
              icon: require('@/assets/images/PivotGrid.svg')
            }
          ]
        }
      ]
    }
  },
  directives: {
      drag(el, binding, vnode) {
          let dragBox = el; //获取当前元素
          dragBox.onmousedown = e => {
              //算出鼠标相对元素的位置
              let disX = e.clientX - dragBox.offsetLeft;
              let disY = e.clientY - dragBox.offsetTop;
              var nDom = dragBox.cloneNode();

              nDom.style.position="absolute";
              nDom.style.left = (e.clientX - disX) + "px";
              nDom.style.top =  (e.clientY - disY)  + "px";
              nDom.style.zIndex="99999"
              nDom.style.width= getStyle(dragBox,'width')
              nDom.style.height= getStyle(dragBox,'height')
              document.body.appendChild(nDom)
              addClass(document.body, 'disable-user-select')
              document.onmousemove = e => {
                //用鼠标的位置减去鼠标相对元素的位置，得到元素的位置
                let left = e.clientX - disX;
                let top = e.clientY - disY;
                //移动当前元素
                nDom.style.left = left + "px";
                nDom.style.top = top + "px";
              };
              document.onmouseup = e => {
                console.log(nDom.style.width)
                console.log(binding.value)
                  vnode.context.dragUp({
                    width: parseFloat(nDom.style.width),
                    height: parseFloat(nDom.style.width),
                    x: parseFloat(nDom.style.left),
                    y: parseFloat(nDom.style.top),
                    ...binding.value
                  })
                  //鼠标弹起来的时候不再移动
                  document.onmousemove = null;
                  //预防鼠标弹起来后还会循环（即预防鼠标放上去的时候还会移动）  
                  document.onmouseup = null;
                  document.body.removeChild(nDom)
                  nDom = null
                  removeClass(document.body, 'disable-user-select')
              };
          };
      }
  }
}
</script>

<style lang="scss" scope>
.drag {
    width: 100%;
    height: 500px;
    background-color: #fff;
}
.drag_box {
    width: 150px;
    height: 90px;
    border: 1px solid #666;
    background-color: #ccc;
    /* 使用定位，脱离文档流 */
    position: relative;
    top: 100px;
    left: 100px;
    /* 鼠标移入变成拖拽手势 */
    cursor: move;
    z-index: 3000;
}
.slide-wrap{
  min-height: 100vh;
  background: #f1f3f5;
  padding: 15px;
  width: 160px;
  .slide-title{
    margin-bottom: 10px;
  }
  ul{
    max-width: 160px;
    overflow: hidden;
    margin: 5px 0 10px 0;
  }
  .line-item{
    float: left;
    margin: 0 10px 10px 0;
    // background: #FFF;
    width: 30px;
    height: 30px;
    cursor: pointer;
    user-select: none;
    img{
      max-width:100%;
      user-select: none;
    }
  }
}
</style>