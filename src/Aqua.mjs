import axios from 'axios';
import https from 'https'



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
    this.baseURL = `http${useTLS ? 's' : ''}://${host}:${port}/api`
    this.config = { headers: {'Content-Type': 'application/json'}};
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
        await this._axiosInstance.post('/v1/login', {
            id: this.userId,
            password: this.password,
            remember: this.remember
          })
          .then(response => response.data)
          .then(data => {
            this.token = data.token
            this.config.headers =  {...this.config.headers, 'Authorization': `Bearer ${this.token}` }
          })
          .catch((error) => {
            console.log("in error")
            console.log(error);
          });
          this.password = ""
    };


    async containers(nodeId = "", groupBy = 'containers', status = 'running', page = '1', pageSize = '50'){
      let containers = []

      await this._axiosInstance.get('/v1/containers', this.config, {
        nodeId,
        groupBy,
        status,
        page,
        pageSize
      })
      .then(response => {
        containers = response.data
      })
      .catch( error => {
        console.log(error)
      });

      return containers

    }



    async listRegisteredImages({registry = null, repository = null, name = null, page = 1, pageSize = 50, orderBy = null}){
        let registeredImages = []
        let params = { registry, repository, name, page, page_size: pageSize, order_by: orderBy }
        this.config.params = params

        await this._axiosInstance.get('/v2/images', this.config)
        .then(response => {
          registeredImages = response.data
        })
        .catch( error => {
          console.log(error)
        });

        this.config.params = {}
        return registeredImages

    }


    async listRegistries() {
      let registries = []

      await this._axiosInstance.get('/v1/registries', this.config)
        .then(response => response.data)
        .then( data => {
          registries = data
        })
        .catch((error) => {
          console.log(error.response);
        });

        return registries;
    }

}


export default Aqua;