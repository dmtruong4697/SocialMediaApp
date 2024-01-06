// reducer.js
const initialState = {
  // Khởi tạo state profile theo các trường bạn có
  address: '',
  avatar: '',
  city: '',
  coins: '',
  country: '',
  cover_image: '',
  created: '',
  description: '',
  id: '',
  is_friend: '',
  link: '',
  listing: '',
  online: '',
  username: '',
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case 'UPDATE_PROFILE':
      // Cập nhật toàn bộ profile với thông tin mới
      return {
        ...state,
        ...action.payload,
      };
    default:
      return state;
  }
};

export default reducer;
