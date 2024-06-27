import { createSlice  } from '@reduxjs/toolkit'
export const friendInfoslice = createSlice({
  name: 'chatfriendinfo',
  initialState: {
     FriendInfo :null 
  },
  reducers: {
    chatFriendInfo: (state, action) => {  
      state.FriendInfo = action.payload  
    }, 
 
  },
})
export const { chatFriendInfo } = friendInfoslice.actions
export default friendInfoslice.reducer;