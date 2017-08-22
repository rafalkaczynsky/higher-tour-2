
let sessionBlock = []
    
    for (let i = 1; i <= 6; i++){
        let item = {
            week: {
                title: 'This is title of Week' + i,
                description: 'This is description of Week'+ i
            }
        }
        sessionBlock.push(item)
    }

module.export = sessionBlock