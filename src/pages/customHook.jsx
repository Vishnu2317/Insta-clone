export const useGetUserID = () =>{
    return window.localStorage.getItem("userID")
}

export const useGetUserName = () =>{
    return window.localStorage.getItem("userName")
}

export const useGetUserImage = () =>{
    return window.localStorage.getItem("userImg")
}