import axios from 'axios'
import { useState } from 'react';
import { useEffect } from 'react';


function Home (){
    const [posts , setPosts] = useState(null);
    
  useEffect(()=>{
    axios.get('http://localhost:3500/home')
   .then (res => {
          setPosts(res.data)  
    })   
   .catch (err => console.log(err))
},[posts]);

    return(
     <div>
      <body>
    
      <h2>Welcome To Refu'In</h2>
    
    <div class="write-post">
        <a href="/post/addnew">
            <h3>If you are <strong>IN</strong> start the journey In-Posting ✍️
            <div class="In-Posting">
                
            </div>
         <input type="text" class="post-input" placeholder="write your post in here" /> 📝</h3></a>

    </div>
    
    <div class="jasem-style">
  
          { posts?.length>0  ? 
           posts?.map(post => 
              <div>
                <h2> {post.UserId.Name}</h2>
                <h4>{post.body}</h4>
                <h6>{post.create_at}</h6>
              </div>
           )
           : <h1> no posts</h1>
           }
          
   </div>
</body>

</div>
    )
    }

    export default Home