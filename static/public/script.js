var app = new Vue({
        el: '#test',
        data: {
            userid: ""
        },
        methods: {
              uploadUser: function(){
                  axios.get('/getWeibo',{
                    params: {
                      userid: this.userid
                    }
                  })
                  .then(function (response) {
                        console.log(response)
                    })
                  .catch(function (error) {
                    console.log(error);
                  });
              },
              uploadFile: function(){
                var formData = new FormData();
                formData.append('file', this.$refs["file"].files[0]);
                axios.post('/personalInsight', formData)
                  .then(function (response) {
                        console.log(response)
                    })
                  .catch(function (error) {
                    console.log(error);
                  });
              }
            }
})