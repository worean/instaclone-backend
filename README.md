# InstaClone Back-end

Instaclone Backend.

## User
 - [x] Create Account
 - [x] See Profile
 - [x] Login
 - [x] Edit Profile
 - [x] Change Avatar (Image Upload)
 - [x] Follow User
 - [x] UnFollow User
 - [x] See Followers & See Followings w/ Pagination
 - [x] Computed Field
 - [x] Search Users

## Photo
 - [x] Upload Photo
 - [x] See Photo
 - [x] See Hashtags
 - [x] Search Photo
 - [x] Edit Photo
 - [x] Like / unLike Photo
 - [x] See Photo Likes
 - [x] See Feed
 - [x] See Photo Comments
 - [x] Delete Photo
 - [x] isMine 구현

## Comments
 - [x] Comment on Photo
 - [x] Edit Comment
 - [x] Delete Comment
 - [x] isMine 구현

## AWS S3
 - [x] Upload Photo AWS S3

## DMs
 - [x] Create Room
 - [x] See Rooms
 - [x] See Room
 - [x] Computed Fields
 - [x] See Message
 - [x] Read Message
 - [x] Realtime Messages

## Nofitication
 - [ ] Create Notification
 - [ ] Delete Notification
 - [ ] Push Alarm

---

### Notification
    특정 동작(Query문) 이 실행 시 API 서버에서 Event를 발생시켜
    유저가 특정 Event를 확인하고 알림 메시지가 사용자들에게 띄어지도록
    하기 위해 구현이 필요하다.
  1. FollowUser 동작 시 Followed 된 User에게 알림 메시지 전송
  2. ToggleLike 동작 시 Like를 누른 사람들의 목록을 알림 메시지로 전송
  3. Notification 확인 시 읽음 상태로 전환
  4. 유저가 로그인 되어 있다면 읽지 않은 Notification이 있다고 알려줌



## Get Started
  개발하기 위해서 AWS상의 Linux 커널에서 동작한다.
  그리고 해당 소스를 복사해서 사용한다.
```
git clone https://github.com/worean/instaclone-backend
cd instaclone-backend
npm install
npm run migrate
npm run dev
```