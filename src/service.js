import axios from 'axios';
const URL_BASE= 'http://localhost:3200'

//init de la response
let statusRes = new Object();
statusRes.flag = '';
statusRes.message = ''

let res = new Object();
res.status= statusRes
res.payload= ''


export async function createBoard(){
    try{
    const result = await axios.post(URL_BASE+'/board')
    res = result.data 
    return res    
} catch (error){
    res.status.flag = 'N'
    res.status.message = error
    return res
    }

}

export async function markBoard(token,idBoard,index){
    try{
    const result = await axios.put(URL_BASE+'/board/'+idBoard,{"index":index},{headers:{"Authorization":token, "Content-Type":"application/json"}});       
    res = result.data 
    return res    
} catch (error){
    res.status.flag = 'N'
    res.status.message = error
    return res
    }

}



export async function getBoard(token,idBoard){
    try{
    const result = await axios.get(URL_BASE+'/board/'+idBoard,{headers:{"Authorization":token}});       
    res = result.data 
    return res    
} catch (error){
    res.status.flag = 'N'
    res.status.message = error
    return res
    }

}

