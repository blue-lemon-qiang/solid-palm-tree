new Vue({
    el: "#app",
    data: {
        columns1: [
            {
                title: '姓名',
                key: 'username'
            },
            {
                title: '电话',
                key: 'tel'
            },
            {
                title: '月龄',
                key: 'age'
            },
            {
                title: '性别',
                key: 'sex'
            },
            {
                title: '地址',
                key: 'address'
            },
            {
                title: '意向',
                key: 'intention'
            }
        ],
        data1: [],
        //分页
        pageSize: 10,//每页显示多少条
        dataCount: 100,//总条数
        pageCurrent: 1,//当前页
        pageSizeOpts: [10, 20, 50, 100, 200]
    },
    mounted() {
        this.getdata(1, this.pageSize);
    },
    methods: {
        getdata(pn, ps) {
            var that = this;
            axios.get('http://zyl.sosodo.xyz:32769/shudu/all_user/?pn=' + pn + '&ps=' + ps).then(function (res) {
                if (res.status == 200) {
                    if (res.data.code == 200000) {
                        console.log(res.data)
                        that.data1 = res.data.data.list;
                        // for (var i in that.data1) {
                        //     that.data1[i].tel = "\t" + that.data1[i].tel
                        // }
                        that.data1.forEach(function (item) {
                            item.tel = "\t" + item.tel
                        });
                        that.dataCount = res.data.data.total;
                    } else
                        that.$Message.error(res.data.message)
                }
            }).catch(function (error) {
                console.log(error)
            })
        },
        //页数改变的时候触发的函数，切换页码修改显示数据
        changepage(index) {
            console.log(index)
            this.pageCurrent = index;
            this.getdata(index, this.pageSize);
        },
        //每页显示的数据条数
        changePageSize(size) {
            console.log(size)
            //实时获取当前需要显示的条数
            this.pageSize = size;
            this.getdata(this.pageCurrent, size)
        },
        exportData() {
            var that = this;
            this.getdata(1, this.dataCount)
            setTimeout(() => {
                this.$refs.table.exportCsv({
                    filename: '报名信息'
                });
                that.getdata(that.pageCurrent, that.pageSize)
            }, 1500);
        }
    }
})