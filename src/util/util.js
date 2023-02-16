export const sortbyTime = (data) => {
    return data.sort((a, b) => {
        if(new Date(a.dateModified) < new Date(b.dateModified)) 
            return 1
        return -1
    })
}

export const sortArraybyTime = (data) => {
    return data.sort((a, b) => {
        if(new Date(a[0]) < new Date(b[0])) 
            return 1
        return -1
    })
}