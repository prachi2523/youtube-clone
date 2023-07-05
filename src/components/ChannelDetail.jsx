import {useState,useEffect} from 'react'
import { useParams } from 'react-router-dom'
import { Box } from '@mui/material'

import {Videos,ChannelCard} from '.'
import { fetchAPI } from '../utils/fetchAPI'

const ChannelDetail =() => {
  const {id}=useParams()
  const[ChannelDetail,setChannelDetail]=useState(null)
  const [videos,setVideos]=useState([])
  console.log(videos);
  useEffect(()=>{
fetchAPI(`channels?part=snippet&id=${id}`)
.then((data)=>setChannelDetail(data?.items[0]));

fetchAPI(`search?channelId=${id}&part=snippet&order=date`)
.then((data)=>setVideos(data?.items))
  },[id])

  
 
  return (
    <Box minHeight='95vh'>
      <Box>
      <div
      style={{
        background:' rgb(2,0,36)',
        background: 'linear-gradient(90deg, rgba(2,0,36,1) 0%, rgba(221,131,131,1) 50%, rgba(231,23,27,1) 87%)',
      height:'300px',
    zIndex:10}}
    />
    <ChannelCard channeldetail={ChannelDetail}
    marginTop='-110px'/>
      </Box>
      <Box display='flex' p='2'>
        <Box sx={{mr:{sm:'100px'}}}/>
          <Videos videos={videos}/>
        
      </Box>
    </Box>
  )
}

export default ChannelDetail