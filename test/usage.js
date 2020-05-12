import Aqua from '@jeffthorne/aqua';

var aqua = new Aqua('username','password', 'mylo.uw.edu')

const main = async() =>{
    await aqua.init()
    let registries = await aqua.listRegistries()
}

main()


