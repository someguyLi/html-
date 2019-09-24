Vue.component('ridinglantern', {
    props:['width','height','num','bgimg'],
    data:()=>{
        return{
            cla:{
                position: 'absolute',
                perspective: '1000px',
                width: '600px',
                height: '160px',
                'transform-origin': 'center center 0px',
                transform:'',
                'background-color':'rgb(146,180,139)',
                'background-image':'',
                'background-size': 'cover'
            },
            cla1:{
                'transform-style': 'preserve-3d',
                '-webkit-transform-style': 'preserve-3d',
                '-moz-transform-style': 'preserve-3d',
                width: '600px',
                height: '160px',
                'margin-left': '300px',
                'transition': '2s',
                '-webkit-transition': '2s',
                '-moz-transition': '2s',
                transform: 'rotateY(0deg)'
            },
            cc:[],
        }

    },
    methods: { 
        translatez(n/*边数*/,width){            //计算中心点距离
            n=parseInt(n);
            width=parseInt(width);
            let a=width / 2 / Math.tan(360 / n / 2 * 0.017453293);
            return a.toFixed(2);
        }
    },
    created: function () {
        this.cla.width=this.width;
        this.cla.height=this.height;
        this.cla1.width=this.width;
        this.cla1.height=this.height;
        this.bgimg=this.bgimg.split("+");
        for(let i=0;i<this.num;i++){
            let a=JSON.stringify(this.cla);
            this.cc.push(JSON.parse(a));
            let translateZ=this.translatez(this.num,this.width);
            let Y=(360/this.num*i);
            this.cc[i].transform="rotateY("+Y+"deg)translateZ("+translateZ+"px)";
            this.cc[i]['imgurl']=this.bgimg[i];
            console.log(this.cc[i]);
        }
    },
    beforeMount: function () {

        var r=0;
        setInterval(()=>{
            r-=360/this.num;
            this.cla1.transform='rotateY('+r+'deg)';
        },2000); 
        
    },
  
    template:'<div v-bind:style=cla1>'+
                '<div v-for="(n,index) in cc" v-bind:style=n> <img style="width: 100%;height: 100%;" :src="n.imgurl" alt=""> </div>'
            +'</div>'
})