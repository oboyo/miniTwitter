import {data} from "./data.js"
document.addEventListener("click",(e)=>{
  likesCount(e)
  reTweetCount(e)
  deleteTweet(e)
  handleTweet(e)
  openComments(e)
  handleReplyLikes(e)
  handleReplyRetweets(e)
  deleteReplyTweet(e)
  handleReplyTweets(e)
})
let tweetsData = data
if(tweetsData){
  tweetsData =  JSON.parse(localStorage.getItem("tweetsData"))
}

function likesCount(e){
  const id = e.target.dataset.likes
  if(!id) return
  const tarObj = tweetsData.filter(tweet => tweet.uuid == id)[0]
  if(!tarObj.isLiked){
    tarObj.likes++
    tarObj.isLiked = true
  }
  else {
    tarObj.likes--
    tarObj.isLiked = false
  }
   document.getElementById(`tweet-counts-${id}`).innerText = tarObj.likes
   document.getElementById(`tweet-likes-${id}`).classList.toggle("liked")
//  render()
//  document.getElementById(`reply-section-${tarObj.uuid}`).classList.toggle("hidden")
//  document.getElementById(`reply-area-${tarObj.uuid}`).classList.add("hidden")
}
function reTweetCount(e){
  const id = e.target.dataset.retweets
  if(!id) return
  const tarObj = tweetsData.filter(tweet => tweet.uuid == id)[0]
  if(!tarObj.isRetweeted){
    tarObj.retweets++
    tarObj.isRetweeted = true
  }
  else {
    tarObj.retweets--
    tarObj.isRetweeted = false
  }
   document.getElementById(`retweets-counts-${id}`).innerText = tarObj.retweets
   document.getElementById(`retweets-likes-${id}`).classList.toggle("retweeted")
//  render()
  
}
function handleReplyRetweets(e){
  const id = e.target.dataset.replyRetweets
  if(!id) return
  const tarObj = tweetsData.filter(tweet=>{
    return tweet.replies.filter(reply => reply.uuid == id)[0]
  })[0]
  const replyObj = tarObj.replies.filter(reply => reply.uuid == id)[0]
  if(!replyObj.isRetweeted){
    replyObj.retweets++
    replyObj.isRetweeted = true
  }
  else {
    replyObj.retweets--
    replyObj.isRetweeted = false
  }
  // document.getElementById(`reply-retweets-counts-${id}`).innerText = replyObj.retweets
  // document.getElementById(`reply-retweets-${id}`).classList.toggle("retweeted")
  render()
  document.getElementById(`reply-section-${tarObj.uuid}`).classList.toggle("hidden")
  document.getElementById(`reply-area-${tarObj.uuid}`).classList.toggle("hidden")
}
function deleteTweet(e){
  const id = e.target.dataset.delete
  if(!id) return
    tweetsData.filter((tweet,index) => {
      if(tweet.uuid == id){
        tweetsData.splice(index,1)
        render()
      }
    })
  }
  function handleTweet(e){
    const id = e.target.id
    if(!e.target.id == "tweetbtn") return
    let myInput = document.getElementById("tweet-input")
    if(myInput.value){
      tweetsData.unshift(
        {
          handle: `@o_boyo 💎`,
          profilePic: `images/scrimbalogo.png`,
          likes: 0,
          retweets: 0,
          tweetText: myInput.value,
          replies: [],
          isLiked: false,
          isRetweeted: false,
          uuid: Math.floor(Math.random()*100000),
        },
      )
      render()
      myInput.value = ""
    }
  }
  function handleReplyTweets(e){
    const id = e.target.dataset.replyTweets
    if(id){
      let myInput = document.getElementById(`reply-tweets-${id}`)
      const tarObj = tweetsData.filter(tweet => tweet.uuid == id)[0]
    if(myInput.value){
      tarObj.replies.unshift(
        {
          handle: `@o_boyo 💎`,
          profilePic: `images/scrimbalogo.png`,
          likes: 0,
          retweets: 0,
          tweetText: myInput.value,
          replies: [],
          isLiked: false,
          isRetweeted: false,
          uuid: Math.floor(Math.random()*100000),
        },
      )
      render()
      // document.getElementById(`reply-section-${tarObj.uuid}`).innerHTML = getReplyHtml(tarObj)
      // document.getElementById(`replies-count-length-${tarObj.uuid}`).textContent = tarObj.replies.length
      document.getElementById(`reply-section-${tarObj.uuid}`).classList.toggle("hidden")
      document.getElementById(`reply-area-${tarObj.uuid}`).classList.toggle("hidden")
      myInput.value = ""
    }
    
    }
  }
  function openComments(e){
    const id = e.target.dataset.comments
    const tarObj = tweetsData.filter(tweet => tweet.uuid == id)[0]
    if(!id) return
    document.getElementById(`reply-area-${id}`).classList.toggle("hidden")
    document.getElementById(`reply-section-${id}`).classList.toggle("hidden")
    // document.getElementById(`reply-section-${id}`).innerHTML = getReplyHtml(tarObj)
    //  getReplyHtml(tarObj)
     
  }
  function handleReplyLikes(e){
    const id = e.target.dataset.replyLikes
    console.log(id)
    if(!id) return
    const tarObj = tweetsData.filter(tweet=>{
      return tweet.replies.filter(reply => reply.uuid == id)[0]
    })[0]
    const replyObj = tarObj.replies.filter(reply => reply.uuid == id)[0]
    console.log(tarObj.uuid)
    if(!replyObj.isLiked){
      replyObj.likes++
      replyObj.isLiked = true
    }
    else {
      replyObj.likes--
      replyObj.isLiked = false
    }
    render()
    // document.getElementById(`reply-likes-counts-${id}`).innerText = replyObj.likes
    // document.getElementById(`reply-likes-${id}`).classList.toggle("liked")
    document.getElementById(`reply-section-${tarObj.uuid}`).classList.toggle("hidden")
    document.getElementById(`reply-area-${tarObj.uuid}`).classList.toggle("hidden")
  }
  
  function deleteReplyTweet(e){
    const id = e.target.dataset.replyDelete
    if(!id) return
    const tarObj = tweetsData.filter(tweet=>{
      return tweet.replies.filter(reply => reply.uuid == id)[0]
    })[0]
    tarObj.replies.filter((reply,index)=>{
      if(reply.uuid == id){
        tarObj.replies.splice(index,1)
      }
      render()
       document.getElementById(`reply-section-${tarObj.uuid}`).classList.toggle("hidden")
       document.getElementById(`reply-area-${tarObj.uuid}`).classList.toggle("hidden")
      // document.getElementById(`reply-section-${tarObj.uuid}`).innerHTML = getReplyHtml(tarObj)
      // document.getElementById(`replies-count-length-${tarObj.uuid}`).textContent = tarObj.replies.length
    })
    }
function getTweetHtml(){
  let tweetHtml = ""
  // let likeTweet = ""
//  let likeRetweet = ""
  tweetsData.forEach(tweet => {
    const{isLiked,profilePic,uuid,replies,retweets,likes,isRetweeted,tweetText,handle} = tweet
    //other way to change the color
//    let likeTweet = ""
//    if(isLiked){
//      likeTweet = "liked" 
//    }
//    
//    if(isRetweeted){
//        likeRetweet = "retweeted"
//    }
   
    let replyHtml = ""
    if(tweet.replies.length > 0){
        tweet.replies.forEach(reply => {
          const{isRetweeted,profilePic,handle,tweetText,uuid,retweets,likes,isLiked} = reply
          let likeReplyLiked = ""
          let likeReplyRetweeted = ""
          if(isLiked){
            likeReplyLiked = "liked" 
          }
          if(isRetweeted){
            likeReplyRetweeted = "retweeted" 
          }
      replyHtml += 
     `
     <div class="tweet-reply">
     <div class="tweet-inner">
         <img src="${profilePic}" class="profile-pic">
         <div>
             <p class="handle">${handle}</p>
             <p class="tweet-text">${tweetText}</p>
             <div class="tweet-details">
                 <span class="tweet-detail">
                     <i id="reply-likes-${uuid}" data-reply-likes="${uuid}" class="${likeReplyLiked} fa-solid fa-heart"></i>
                     <span id="reply-likes-counts-${uuid}">
                     ${likes}
                     </span>
                 </span>
                 <span class="tweet-detail">
                 <i id="reply-retweets-${uuid}" data-reply-retweets="${uuid}" class="${likeReplyRetweeted} fa-solid fa-retweet"></i>
                     <span id="reply-retweets-counts-${uuid}">
                     ${retweets}
                     </span>
                 </span>
                 <span class="tweet-detail">
                     <i data-reply-delete="${uuid}" class="fa-regular fa-trash-can"
                     ></i>
                 </span>
             </div>
         </div>
     </div>
  </div>
     `
        })

    }
    tweetHtml += `
    <div class="tweet">
    <div class="tweet-inner">
        <img src="${profilePic}" class="profile-pic">
        <div>
            <p class="handle">${handle}</p>
            <p class="tweet-text">${tweetText}</p>
            <div class="tweet-details">
                <span class="tweet-detail">
                    <i data-comments="${uuid}" class="fa-regular fa-comment-dots"></i>
                    <span id="replies-count-length-${uuid}">
                    ${replies.length}
                    </span>
                </span>
                <span class="tweet-detail">
                    <i id="tweet-likes-${uuid}"  data-likes="${uuid}" class="fa-solid fa-heart"
                    ></i>
                    <span id="tweet-counts-${uuid}">
                    ${likes}
                    </span>
                </span>
                <span class="tweet-detail">
                    <i id="retweets-likes-${uuid}"  data-retweets="${uuid}" class="fa-solid fa-retweet"
                    ></i>
                    <span  id="retweets-counts-${uuid}">${retweets}</span>
                </span>
                <span class="tweet-detail">
                <i data-delete="${uuid}" class="fa-regular fa-trash-can"
                ></i>
                </span>
            </div>   
        </div>            
    </div>
    </div>
    <div id="reply-area-${uuid}" class="hidden tweet-reply-area">
    <img src="images/scrimbalogo.png" class="profile-pic">
    <textarea
       
        id="reply-tweets-${uuid}"
        placeholder="Tweet your reply"
        class="tweet-reply-input"
    ></textarea>
    <button  data-reply-tweets="${uuid}" class="tweet-reply-btn"
    >Tweet</button>
</div>
<div id="reply-section-${uuid}" class="hidden">
${replyHtml}
</div>
    </div> 
    `
  });
  return tweetHtml
}
// function getReplyHtml(obj){
//   let replyHtml = ""
//   if(obj.replies.length > 0){
//     obj.replies.forEach(reply => {
//       const{profilePic,handle,tweetText,uuid,retweets,likes} = reply
//       replyHtml += 
//      `
//      <div class="tweet-reply">
//      <div class="tweet-inner">
//          <img src="${profilePic}" class="profile-pic">
//          <div>
//              <p class="handle">${handle}</p>
//              <p class="tweet-text">${tweetText}</p>
//              <div class="tweet-details">
//                  <span class="tweet-detail">
//                      <i id="reply-likes-${uuid}" data-reply-likes="${uuid}" class="fa-solid fa-heart"></i>
//                      <span id="reply-likes-counts-${uuid}">
//                      ${likes}
//                      </span>
//                  </span>
//                  <span class="tweet-detail">
//                  <i id="reply-retweets-${uuid}" data-reply-retweets="${uuid}" class="fa-solid fa-retweet"></i>
//                      <span id="reply-retweets-counts-${uuid}">
//                      ${retweets}
//                      </span>
//                  </span>
//                  <span class="tweet-detail">
//                      <i data-reply-delete="${uuid}" class="fa-regular fa-trash-can"
//                      ></i>
//                  </span>
//              </div>
//          </div>
//      </div>
//   </div>
//      `
//     })
//   }
//   document.getElementById(`reply-section-${obj.uuid}`).innerHTML = replyHtml
//   document.getElementById(`replies-count-length-${tarObj.uuid}`).textContent = obj.replies.length
// }
function render(){
  localStorage.setItem("tweetsData",JSON.stringify(tweetsData))
  document.getElementById("feed").innerHTML = getTweetHtml()
}
render()
{/* <div class="tweet">
<div class="tweet-inner">
    <img src="" class="profile-pic">
    <div>
        <p class="handle"></p>
        <p class="tweet-text">$</p>
        <div class="tweet-details">
            <span class="tweet-detail">
                <i class="fa-regular fa-comment-dots"></i>
                <span>
                </span>
            </span>
            <span class="tweet-detail">
                <i class="fa-solid fa-heart"
                ></i>
                <span>
                </span>
            </span>
            <span class="tweet-detail">
                <i class="fa-solid fa-retweet"
                ></i>
                <span></span>
            </span>
            <span class="tweet-detail">
            <i class="fa-regular fa-trash-can"
            ></i>
            </span>
        </div>   
    </div>            
</div>
</div>
</div> */}



        {/* <div class="hidden tweet-reply-area">
                <img src="images/scrimbalogo.png" class="profile-pic">
                <textarea
                    placeholder="Tweet your reply"
                    class="tweet-reply-input"
                ></textarea>
                <button class="tweet-reply-btn"
                >Tweet</button>
            </div>
            <div class="hidden">
            </div> */}



            // <div class="tweet-reply">
            //     <div class="tweet-inner">
            //         <img src="" class="profile-pic">
            //         <div>
            //             <p class="handle"></p>
            //             <p class="tweet-text"></p>
            //             <div class="tweet-details">
            //                 <span class="tweet-detail">
            //                     <i class="fa-solid fa-heart"></i>
            //                     <span>
            //                     </span>
            //                 </span>
            //                 <span class="tweet-detail">
            //                     <i class="fa-solid fa-retweet"
            //                     ></i>
            //                     <span>
            //                     </span>
            //                 </span>
            //                 <span class="tweet-detail">
            //                     <i class="fa-regular fa-trash-can"
            //                     ></i>
            //                 </span>
            //             </div>
            //         </div>
            //     </div>
            // </div>