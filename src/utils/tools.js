import clonedeep from 'clone-deep'
export const buildTree = (list,idName) => {
  if(!list) return []
  if(!list.length) return []
  const listClone = clonedeep(list)
  const handle = id => {
    let arr = []
    listClone.forEach(item => {
      if(item.parentId === id) {
        const children = handle(item[idName])
        if(item.children) item.children = [].concat(item.children,children)
        else item.children = children
        arr.push(item)
      }
    })
    return arr
  }
  //console.log(listClone[0][idName])
  return handle(0)
}
