/**
 * Created by wulinbo on 17/2/20.
 */
new Vue({
    el:"#addressPage",
    data:{
        addressList:[],
        limitNum:3,
        currentIndex:0,
        shippway:1,
        showFlag:false,
        curindex:''
    },
    mounted:function(){
        this.$nextTick(function () {
            this.getAddressList();
        })
    },
    computed:{
        filteredItems: function () {
            return this.addressList.slice(0,this.limitNum);
        }
    },
    methods:{
        getAddressList:function () {
            var _this= this;
            this.$http.get("data/address.json").then(function (response) {
                var res = response.data;
                if(res.status=="1"){
                    _this.addressList = res.result;
                }
            })
        },
        setDefault:function (addressId) {
            this.addressList.forEach(function (address, index) {
                if(address.addressId == addressId){
                    address.isDefault = true;
                }else {
                    address.isDefault = false;
                }
            })

        },
        delconfirm:function (item) {
            this.showFlag=true;
            this.curindex = item;
        },
        delproduct:function () {
            var _index = this.addressList.indexOf(this.curindex)
            this.addressList.splice(_index,1);
            this.showFlag = false;
        }
    }
})