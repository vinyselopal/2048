export const getFromLocalStorage = (name) => {
    const item = localStorage.getItem(name)
    console.log(name, item)
    if (item) return JSON.parse(item)
    return undefined
}

export const saveToLocalStorage = (name, item) => {
    localStorage.setItem(name, JSON.stringify(item))
    return true
}

