import Aqua from '../src/Aqua.mjs';

var aqua = new Aqua('username','password', 'mylo.uw.edu')

const main = async() => {
    await aqua.init()
    let registries = await aqua.listRegistries()
    let vulns = await aqua.vulnerabilities({image_name: 'jeffthorne/books:latest'})
    let allVulns = await aqua.vulnerabilities({})
    let runningContainers = await aqua.containers({})
    let dash = await aqua.dashboard({})
    let images = await aqua.listRegisteredImages({})



    let resp = await aqua.listRegisteredImages({registry: 'DockerHubPrivate', page: 1, pageSize: 1000})
    console.log(resp)


}

main()


