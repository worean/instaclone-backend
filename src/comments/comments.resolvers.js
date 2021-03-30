export default {
    Comment : {
        isMine:({userId},_,{logginedUser}) => {
            return userId === logginedUser.id;
        }
    }
}