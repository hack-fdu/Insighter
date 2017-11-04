var app = new Vue({
        el: '#test',
        data: {
            userid: {}
        },
        methods: {
              uploadID: function(){
                var formData = new FormData();
                formData.append('file', this.$refs["file"].files[0]);
                axios.post('https://gateway.watsonplatform.net/personality-insights/api/v3/profile', {
                    params: {
                      version: "2017-10-13"
                    },
                    data: {
                      formData
                    },
                    auth: {
                      username:"2a9b220a-c00a-457e-8eed-a2342b87aecd",
                      password: "gVcgp70GQFon"
                    },
                    headers: {
                      "Content-Type": "text/plain",
                      "Access-Control-Allow-Origin": "*"
                    }
                  })
                  .then(function (response) {
                        console.log(response)
                    })
                  .catch(function (error) {
                    console.log(error);
                  });
              }
            }
})