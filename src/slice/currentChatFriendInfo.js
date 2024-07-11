import { createSlice  } from '@reduxjs/toolkit'
import { json } from 'react-router-dom';
export const friendInfoslice = createSlice({
  name: 'chatfriendinfo',
  initialState: {
     FriendInfo : JSON.parse(localStorage.getItem("chatFriendInfo"))  
     ? JSON.parse(localStorage.getItem("chatFriendInfo")) 
     : null,
  },
  reducers: {
    chatFriendInfo: (state, action) => {  
      state.FriendInfo = action.payload  
    },   
 
  },  
})
export const { chatFriendInfo } = friendInfoslice.actions
export default friendInfoslice.reducer;  