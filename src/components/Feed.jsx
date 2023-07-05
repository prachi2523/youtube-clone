import { useState, useEffect } from "react"
import { Box, Stack, Typography, colors } from '@mui/material'

import { SideBar, Videos } from "./"
import { fetchAPI } from "../utils/fetchAPI"
import { categories } from "../utils/constant"

const Feed = () => {
  const [selectedCategory,setSelectedCategory]=useState('New')
  const [videos,setVideos]=useState([])

  useEffect(()=>{
    fetchAPI(`search?part=snippet&q=${selectedCategory}`)
    .then((data)=>setVideos(data.items))
  },[selectedCategory])

  return (
    <Stack sx={{ flexDirection: { sx: 'column', md: "row" } }}>
      <Box sx={{
        height: { sx: 'auto', md: '92vh' },
        borderRight: '1px  solid #3d3d3d',
        px: { sx: 0, md: 2 }
      }}>
        <SideBar selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory} />
        <Typography sx={{ color: '#ffff', mt: 1 }} className="copyright">
          Copyright 2020 JSM media
        </Typography>
      </Box>
      <Box p={2} sx={{
        // border: '5px solid green',
        overflowY: 'auto',
        height: '90vh', flex: 2
      }}>
        <Typography variant="h4"
          fontWeight={'bold'} mb={2}
          sx={{ color: 'white' }}>
          {selectedCategory} <span style={{ color: '#F31503' }}>
            videos
          </span>
        </Typography>

        <Videos videos={videos} />
      </Box>
    </Stack>
  )
}

export default Feed