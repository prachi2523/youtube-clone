import React from 'react'
import { useState, useEffect } from 'react'
import { Link, useParams } from 'react-router-dom'
import ReactPlayer from 'react-player'
import { Typography, Stack, Box } from '@mui/material'
import { CheckCircle, Title } from '@mui/icons-material'

import { Videos } from '.'
import { fetchAPI } from '../utils/fetchAPI'

const VedioDetail = () => {
  const { id } = useParams();

  const [vedioDetail, setVedioDetail] = useState(null)
  const [video,setVideo]=useState(null)
  useEffect(() => {
    fetchAPI(`videos?part=snippet,statistics&id=${id}`)
      .then((data) => setVedioDetail(data.items[0]))

    fetchAPI(`search?part=snippet&relatedToVideoId=${id}&type=video`)
    .then((data)=>setVideo(data.items))
  }, [id]);
  if (!vedioDetail?.snippet) return 'Loading...'
  // console.log(vedioDetail?.snippet?.channelId);
  const { snippet: { title, channelId, channelTitle }, statistics: { viewCount, likeCount } } = vedioDetail

  return (
    <Box minHeight='100vh'>
      <Stack direction={{ xs: 'column', md: 'row' }}>
        <Box flex={1}>
          <Box sx={{ width: '100%', position: 'sticky', top: '86px' }}>
            <ReactPlayer url={`https://www.youtube.com/watch?v=${id}`}
              className='react-player' controls />
            <Typography color='#fff' variant='h5' fontWeight='bold' p={2}>
              {title}
            </Typography>
            <Stack direction='row' justifyContent='space-between' sx={{
              color: '#fff'
            }} py={1} px={8} >
              <Link to={`/channel/${channelId}`} >
                <Typography variant={{ sm: 'subtitle1', md: 'h6' }} color='white'>
                  {channelTitle}
                  <CheckCircle sx={{ fontSize: '12px', color: 'grey', ml: '5px' }} />
                </Typography>
              </Link>
              <Stack direction='row' gap='20px' alignItems='center'>
                <Typography variant='body1' sx={{ opacity: 0.7 }}>
                  {parseInt(viewCount).toLocaleString()} views
                </Typography>
                <Typography variant='body1' sx={{ opacity: 0.7 }}>
                  {parseInt(likeCount).toLocaleString()} likes
                </Typography>
              </Stack>
            </Stack>
          </Box>
        </Box>
        <Box px={2} py={{md:1,xs:5}} justifyContent='center' alignItems='center'>
        <Videos videos={video} direction='column'/>
      </Box>
      </Stack>
    </Box>
  )
}

export default VedioDetail