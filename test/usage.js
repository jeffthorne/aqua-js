import Aqua from '@jeffthorne/aqua';

var aqua = new Aqua('username','password', 'mylo.uw.edu')

const main = async() =>{
    await aqua.init()
    let registries = await aqua.listRegistries()
    let vulns = await aqua.vulnerabilties({image_name: 'jeffthorne/books:latest'})
    let allVulns = await aqua.vulnerabilties({})
}

main()


