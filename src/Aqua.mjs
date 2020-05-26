import axios from 'axios';
import https from 'https'


class Aqua{

    constructor({userId, password, host, port = 443, useTLS = true, verifyTLS = false, apiVersion = 'v1', remember = true, token = ''}){
      this.userId = userId;
      this.host = host;
      this.port = port;
      this.useTLS = useTLS;
      this.verifyTLS = verifyTLS;
      this.apiVersion = apiVersion;
      this.remember = remember;
      this.token = token;
      this.baseURL = `http${useTLS ? 's' : ''}://${host}:${port}/api`
      this.config = { headers: {'Content-Type': 'application/json'}};
      this.password = password;

      if(token != ''){
        this.config.headers = {...this.config.headers, 'Authorization': `Bearer ${this.token}` }
      }
      
    }

      async init(){
        let params = {id: this.userId, password: this.password, remember: this.remember}
        let resp = await this._api({path:'/v1/login', method: 'post', data: params})
        this.token = resp.token
        this.password = ""
      };


      async containers({nodeId = "", groupBy = 'containers', status = 'running', page = '1', pageSize = '50'}){
        let params = { nodeId: nodeId, groupBy: groupBy, status: status, page: page, pageSize: pageSize }
        return this._api({path: '/v1/containers', data: params})
      }

      async listRegisteredImages({registry = null, repository = null, name = null, page = 1, pageSize = 50, orderBy = null}){
          let params = { registry, repository, name, page, page_size: pageSize, order_by: orderBy }
          return await this._api({path: '/v2/images', data: params})
      }

      async listRegistries({page = '1', pageSize = '50'}) {
        let params = { page, pagesize: pageSize }
        return await this._api({path:'/v1/registries', data: params})
      }

      //List all vulnerabilities found in images
      async vulnerabilities({show_negligible = true, hide_base_image = false, text_search = null, 
                              severity = null, order_by = null, page = 1, pagesize = 100, include_vpatch_info = true,
                              image_name = null, fix_availability = true, acknowledge_status = false}) {
        let params = {
          show_negligible: show_negligible, 
          hide_base_image: hide_base_image, 
          text_search: text_search, 
          severity: severity, 
          order_by: order_by, 
          page: page, 
          pagesize: pagesize, 
          include_vpatch_info: include_vpatch_info,
          image_name: image_name, 
          fix_availability: fix_availability, 
          acknowledge_status: acknowledge_status
        }

          return await this._api({path: '/v2/risks/vulnerabilities', data: params})
      }


      async dashboard({registry =  null, hosts = null, containers_app = null}) {
        let params = { registry: registry, hosts: hosts, containers_app: containers_app }
        return this._api({path: '/v1/dashboard', data: params})
      }
      
      async infrastructure({type = 'clusters', search = null, enforced = null, scope = 'Global', orderBy = 'name', page = '1', pageSize = '50'}){
        let params = { page, page_size: pageSize, order_by: orderBy, search, type, enforced, scope }
        return this._api({path: '/v2/infrastructure', data: params})
      }

      async services({page = '1', pageSize = '50'}){
        let params = { page, page_size: pageSize }
        return  await this._api({path: '/v1/applications', data: params})
      }

      async getService(name){
        return await this._api({path: `/v1/applications/${name}`})
      }

      //BENCH
      
      async risks({page = '1', pageSize = '50'}){
        let params = { page, page_size: pageSize }
        return await this._api({path: '/v2/risks', data: params})
      }

      async _api({path = '', method = 'get', data = null}){

        let result = {}
      
        let request = {
          method,
          url: `${this.baseURL}${path}`,
          headers: {
            'Content-Type': 'application/json',
          },
          httpsAgent: new https.Agent({  
          rejectUnauthorized: this.verifyTLS
        }),
        }
      
        if(this.token != null) {
          request.headers.Authorization = `Bearer ${this.token}`
        }
      
        if(data != null){
          request.data = data
        }
      
      
      
        await axios(request)
          .then(response => response.data)
          .then(data => result = data)
          .catch((error) => {
            console.log(error);
          });
      
          return result;
      };

   
}// end Aqua class

 
export default Aqua;