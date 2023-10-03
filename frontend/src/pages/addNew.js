

const AddNew = ()=>{
    return (
        <body>

         <h4>Here you can add new post</h4> 
        
        <form class="form" action="/addPost" method="post">
            <label for="body" >Post :</label>
            <textarea name="body"></textarea>
            <button>Add Post</button>
        </form>

        </body>
 )}

 export default AddNew