const fs = require('fs')
const path = require('path')

module.exports = (directory, FoldersOnly = false) => {
    let FileNames = []

    const Files = fs.readdirSync(directory, { withFileTypes: true}) 

    for(const File of Files){
        const FilePath = path.join(directory, File.name)

        if(FoldersOnly && File.isDirectory()){
            FileNames.push(FilePath)
        }else if(File.isFile()){
            FileNames.push(FilePath)
        }
    }
    return FileNames
}