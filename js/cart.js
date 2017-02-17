/**
 * Created by wulinbo on 17/2/17.
 */
var vm  = new Vue({
    el:'#app',
    data:{
        productList:[],
        totalMoney: 0
    },
    filters:{

    },
    mounted:function(){

        this.cartView();
    },
    methods:{
        cartView:function () {
            var _this = this;
            this.$http.get("data/cart.json").then(function(res){
                _this.productList = res.body.result.productList;
                _this.totalMoney = res.body.result.totalMoney;
            });
        }
    }
})