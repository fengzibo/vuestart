/**
 * Created by wulinbo on 17/2/17.
 */
var vm  = new Vue({
    el:'#app',
    data:{
        productList:[],
        totalMoney: 0,
        checkAllFlag:false,
        showFlag:false,
        curindex: ''
    },
    filters:{
        formatMoney:function (val) {
            return "￥"+val.toFixed(2);
        }
    },
    mounted:function(){
        this.$nextTick(function () {
            vm.cartView();
        })
    },
    methods:{
        cartView:function () {
            var _this = this;
            this.$http.get("data/cart.json").then(function(res){
                _this.productList = res.body.result.productList;
            });
        },
        changeMoney:function (productList,way) {
            if(way>0){
               productList.productQuentity++;
            }else {
                productList.productQuentity--;
                if(productList.productQuentity<1){
                    productList.productQuentity = 1;
                }
            }
            this.caleMoney();
        },
        changeCheck:function (item) {
            if(typeof item.checked == 'undefined'){
                //Vue.set(item,"checked",true);
                this.$set(item,'checked',true)
            }else {
                item.checked = !item.checked;
            }
            this.caleMoney();
        },
        checkAll:function (flag) {
            this.checkAllFlag = flag;
            var _this = this;
            this.productList.forEach(function (item, index) {
                if(typeof item.checked == 'undefined'){
                    _this.$set(item,'checked',_this.checkAllFlag)
                }else {
                    item.checked = _this.checkAllFlag;
                }
            })
            this.caleMoney();
        },
        caleMoney:function () {
            var _this = this;
            _this.totalMoney = 0;
            this.productList.forEach(function (item, index) {
                if(item.checked){
                    _this.totalMoney += item.productPrice *item.productQuentity;
                }

            })
        },
        delconfirm:function (item) {
            this.showFlag=true;
            this.curindex = item;
        },
        delproduct:function () {
            var _index = this.productList.indexOf(this.curindex)
            this.productList.splice(_index,1);
            this.showFlag = false;
        }
    }
});
Vue.filter("money",function (val,type) {
    return "￥"+val.toFixed(2)+type;
})