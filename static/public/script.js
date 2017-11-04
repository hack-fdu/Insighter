var app = new Vue({
        el: '#test',
        data: {
            userid: {}
        },
        methods: {
              uploadID: function(){
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