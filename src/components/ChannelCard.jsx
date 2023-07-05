import React from 'react'
import { Box, CardContent, CardMedia, Typography } from '@mui/material'
import { CheckCircle, Height } from '@mui/icons-material'
import { demoProfilePicture } from '../utils/constant'
import { Link } from 'react-router-dom'
const ChannelCard = ({ channeldetail,marginTop }) => {
  // console.log(channeldetail);
  return (
    <Box sx={{
      borderRadius: '20px',
      boxShadow: 'none',
      // border: '5px solid white',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      width: { xs: '361px', md: '320px' },
      height:'326px',
      margin:'auto',
      marginTop
    }}
    >
      <Link to={`/channel/${channeldetail?.id?.channelId}`}>
        <CardContent>
          <CardMedia
            image={channeldetail?.snippet?.thumbnails?.high?.url || demoProfilePicture}
            alt={channeldetail?.snippet?.title}
            sx={{
              borderRadius: '50%', height: '180px',
              width: '180px', mb: 2, border: '1px solid #e3e3e3'
            }}
          />
          <Typography variant='h6' color='white'>
            {channeldetail?.snippet?.title}
            <CheckCircle sx={{ fontSize: 14, color: 'gray', ml: '5px' }} />
          </Typography>
          {channeldetail?.statistics?.subscriberCount && (
            <Typography sx={{color:'white'}}>
              {parseInt(channeldetail?.statistics?.subscriberCount).toLocaleString()}
              Subscribers
            </Typography>
          )}
        </CardContent>
      </Link>
    </Box>
  )
}

export default ChannelCard