document.querySelector("div.control-group.tooltip.right>span.small-text").insertAdjacentHTML("afterend", `<input type="text" id="username_input" placeholder="返信先のユーザー名"></input>
<span id="user_icon_span"></span> <input type="text" id="parent_id_input" placeholder="返信先のコメントID"></input><input type="text" id="comment_count_input" placeholder="コメント数"></input>`);
const getUserData = async (user) => {
  const response = await fetch("https://api.scratch.mit.edu/users/" + user);
  const data = await response.json();
  return data.id;
};

document.getElementById("username_input").addEventListener("change",() => {
 getUserData(document.getElementById("username_input").value).then((id) => {
  console.log(id);
  document.getElementById("user_icon_span").innerHTML = `<span>返信先のユーザーアイコン</span>
  <img src="//cdn2.scratch.mit.edu/get_image/user/${id}_60x60.png" width="45" height="45">`;
  document.querySelector("#main-post-form>div.control-group>div.button.small").dataset.commenteeId = id;
 });
});

document.getElementById("parent_id_input").addEventListener("change",() => {
  document.querySelector("#main-post-form>div.control-group>div.button.small").dataset.parentThread = document.getElementById("parent_id_input").value;
});

document.getElementById("comment_count_input").addEventListener("change",() => {
 const comment_count = document.getElementById("comment_count_input").value;
 let count = 100000000000000;
 let i = 0;
  if (!isNaN(comment_count) && comment_count > 0) {
  const interval = setInterval(() => {
   i++;
   if(i < comment_count){
    count++;
    window.location.href = window.location.href.split('#')[0] + `#comments-${count}`;
    console.log(i);
   }else{
    clearInterval(interval);
   }
  },1000);
 }
});

const commentId = () => {
   document.querySelectorAll(".comment_id_link").forEach((el) => {el.remove()});
   const comments = document.querySelectorAll("div.comment");
   comments.forEach((comment) => {
     const id = comment.dataset.commentId;
     document.querySelector("#comments-" + id + ">.actions-wrap").insertAdjacentHTML("afterbegin",`<a class="comment_id_link" href="#comments-${id}">#${id}</a>`);
 });
};

setInterval(() => {
  commentId();
},1000);
