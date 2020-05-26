import Aqua from '@jeffthorne/aqua';

/*
    Early stage project. Here is sample usages. Documentation in the works.
*/

let aqua = new Aqua({userId: 'username', password: 'password', host: 'mylo.uw.edu'})

const main = async() => {
    await aqua.init()
    let registries = await aqua.listRegistries({})
    let vulns = await aqua.vulnerabilities({image_name: 'jeffthorne/books:latest'})
    let allVulns = await aqua.vulnerabilities({})
    let runningContainers = await aqua.containers({})
    let dash = await aqua.dashboard({})
    let images = await aqua.listRegisteredImages({})



    let registry = await aqua.listRegisteredImages({registry: 'DockerHubPrivate', page: 1, pageSize: 1000})
    let infrastructure = await aqua.infrastructure({})

    let services = await aqua.services({})
    let frontend = await aqua.getService('Front End')
    let risks = await aqua.risks({})
}

main()


