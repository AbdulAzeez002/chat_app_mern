export const getToken=()=>{
    const data=JSON.parse( localStorage?.getItem('user-info'))
   
    return data.token
}