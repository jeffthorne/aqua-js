import Aqua from './src/Aqua.js'

var aqua = new Aqua('username','password', 'mylo.uw.edu')

const main = async() =>{
    await aqua.init()
    let registries = await aqua.listRegistries()
    console.log(registries)

}

main()


