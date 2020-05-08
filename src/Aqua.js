import axios from 'axios';
import https from 'https';

class Aqua{

  constructor(userId, password, host, port = 443, useTLS = true, verifyTLS = false, apiVersion = 'v1', remember = true){
    this.userId = userId;
    this.host = host;
    this.port = port;
    this.useTLS = useTLS;
    this.verifyTLS = verifyTLS;
    this.apiVersion = apiVersion;
    this.remember = remember;
    this.token = "";
    this.baseURL = `http${useTLS ? 's' : ''}://${host}:${port}/api/${apiVersion}`
    this.config = {};
    this.password = password;

    this._axiosInstance = axios.create({
      baseURL: this.baseURL,
      responseType: "json",
      httpsAgent: new https.Agent({  
        rejectUnauthorized: this.verifyTLS
      }),
    })

  }
  

    async init(){
        await this._axiosInstance.post('/login', {
            id: this.userId,
            password: this.password,
            remember: this.remember
          })
          .then(response => response.data)
          .then(data => {
            this.token = data.token
            this.config.headers =  { 'Authorization': `Bearer ${this.token}` }
          })
          .catch((error) => {
            console.log(error.response.data);
          });
          this.password = ""
    };


    async listRegistries() {
      let registries = []
      await this._axiosInstance.get('/registries', this.config)
        .then(response => response.data)
        .then( data => {
          registries = data
        })
        .catch((error) => {
          console.log(error);
        });

        return registries;
    }

}


export default Aqua;


