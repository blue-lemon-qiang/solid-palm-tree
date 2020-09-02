function validateSequence(rule, value, callback) {
    // alert(value)
    if (value === '') {
        callback(new Error('手机号不能为空'));
    }
    else if (value.length != 11) {
        callback(new Error('请填写正确的手机号'));
    } else
        callback();
}
var vm = new Vue({
    el: "#app",
    data: {
        value: 0,
        typeflag: true,
        formInformation: {
            name: '',
            phone: '',
            city: '',
            age: '',
            sex: '',
            message: '托管'
        },
        ruleValidate: {
            name: [
                {
                    required: true, message: '姓名不能为空', trigger: 'blur'
                }
            ],
            phone: [
                {
                    required: true, validator: validateSequence, trigger: 'blur'
                }
                // {
                //     required: true, message: '手机号不能为空', trigger: 'blur'
                // },
                // { 
                //     type: "string", required: true, pattern: /^1[3456789]\d{9}$/, trigger: 'change' 
                // }
            ],
            age: [
                {
                    required: true, message: '月龄不能为空', trigger: 'blur'
                }
            ],
            sex: [
                {
                    required: true, message: '请选择性别', trigger: 'change'
                }
            ],
            city: [
                {
                    required: true, message: '地址不能为空', trigger: 'blur'
                }
            ]
        }
    },
    methods: {
        reset: function () {
            // this.formInformation.name = '';
            // this.formInformation.phone = '';
            // this.formInformation.city = '';
            // this.formInformation.age = '';
            // this.formInformation.sex = '';
            // this.formInformation.message = '托管';
            this.$refs['aaa'].resetFields();
        },
        close: function () {
            document.getElementById('ad').style.display = 'none'
        },
        submit: function () {
            var that = this;
            console.log(JSON.stringify(this.formInformation))
            this.$refs['aaa'].validate(function (valid) {
                if (valid) {
                    axios.post('http://zyl.sosodo.xyz:32769/shudu/sign_up/', {
                        username: that.formInformation.name,
                        tel: that.formInformation.phone,
                        address: that.formInformation.city,
                        age: that.formInformation.age,
                        sex: that.formInformation.sex,
                        intention: that.formInformation.message
                    }).then(function (res) {
                        if (res.status == 200) {
                            if (res.data.code == 10000) {
                                that.$Message.success('报名成功！');
                            } else
                                that.$Message.error('报名失败！原因:' + res.data.message);
                        }
                    }).catch(function (error) {
                        console.log(error);
                    })
                } else {
                    that.$Message.error('信息填写错误！');
                }
            })
        },
        clickMusic: function () {
            this.typeflag = !this.typeflag
            if (this.typeflag == true) {
                document.getElementById('music').play();
            } else {
                document.getElementById('music').pause();
            }
        }
    },
    computed: {
        type: function () {
            return this.typeflag ? 'ios-musical-notes' : 'ios-notifications-off'
        }
    }
})