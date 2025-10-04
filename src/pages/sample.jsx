// import React, { useState, useEffect } from 'react';
// import { useParams, Link, useNavigate } from 'react-router-dom';
// import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
// import { useAuth } from '../context/AuthContext';
// import sentIcon from "../assets/sent2.jpg"
// import downloadIcon from "../assets/downloadIcon.jpg"

// const MaterialDetail = () => {
//   const [comment, setComment] = useState('');
//   const { id } = useParams();
//   const navigate = useNavigate();
//   const { currUser, api } = useAuth();
//   const queryClient = useQueryClient();

//   const { data: Material, isLoading, isError, error } = useQuery({
//     queryKey: ['material', id],
//     queryFn: async () => {
//       const response = await api.get(`/author/material/${id}`);  
//       return response.data; 
//     },
//   });
//   const addCommentMutation = useMutation({
//     mutationFn: async (newComment) => {
//       const response = await api.post(`/material/${id}/comments`, newComment);
//       return response.data;
//     },
//     onSuccess: () => {
//       queryClient.invalidateQueries(['material', id]);
//       setComment('');
//       alert('Comment added successfully!');
//     },
//     onError: (err) => {
//       alert(err.response?.data?.message || 'Failed to add comment.'); 
//     },
//   });
//   const updateLikesMutation = useMutation({
//     mutationFn: async () => {
//       const response = await api.post(`/author/${id}/like`); 
//       return response.data;
//     },
//     onSuccess: () => {
//       queryClient.invalidateQueries(['material', id]);
//     },
//     onError: (err) => {
//       alert(err.response?.data?.message || 'something went wrong');
//     },
//   });


//   const handleLike = () => {
//     if (!currUser) {
//       alert('You must be logged in');
//       navigate('/login');
//       return;
//     }
//     updateLikesMutation.mutate();
//   };


//   useEffect(() => {
//     window.scrollTo(0, 0);
//   }, []);


//   const handleCommentSubmit = (e) => {
//     e.preventDefault();
//     if (!comment.trim()) {
//       alert('Please write a comment.');
//       return;
//     }
//     if (!currUser) {
//       alert('You must be logged in to leave a comment.');
//       navigate('/login');
//       return;
//     }
//     addCommentMutation.mutate({ description: comment });
//   };


//   const handleDeleteComment = async (commentId) => {
//     if (!currUser) {
//       alert('You must be logged in to delete a review.');
//       navigate('/login');
//       return;
//     }
//     if (window.confirm('Are you sure you want to delete this comment?')) {
//       try {
//         const response = await api.delete(`/material/${id}/comments/${commentId}`); 
//         queryClient.invalidateQueries(['material', id]);
//         alert(response.data.message || 'Comment deleted successfully!');
//       } catch (err) {
//         alert(err.response?.data?.message || 'Failed to delete comment.');
//       }
//     }
//   };
//   if (isLoading){
//     return(
//       <div>
//         Loading Material...
//       </div>
//     );
//   }
//   if (isError) {
//     return (
//       <div>
//         <div className="altdanger">Error: {error.message || 'Failed to load Material.'}</div>
//       </div>
//     );
//   }

//   return (
//     <div className='entire'>
//       <h2 className='title'><i>{Material.title}</i></h2>
//       <div className="detailCard">
//         {
//         Material.file.url && 
//         (<iframe className="cardImg" src={Material.file?.url} alt={Material.title} />)}
//         <div className="cardBody">
//           <p className="cardText">
//             <i className="descp">
//               {Material.description}
//             </i> <br />
//           </p>
//           { Material.file.url && (<a href={Material?.file?.url?.replace("/upload/", "/upload/fl_attachment/")}>
//             <button><img src={downloadIcon} alt="" /></button>
//           </a>)}
//         </div>
//       </div>

//       {currUser && currUser._id === Material.owner?._id && (
//         <div className="editDelete">
          
//           <Link to={`/material/${Material._id}/edit`}>
//           <button className="MDeditbtn">
//             Edit
//           </button>
//           </Link>
          
          
//           <Link to={`/material/${Material._id}/delete`}>
//             <button className="MDeditbtn">
//             Delete
//             </button>
//           </Link>
//         </div>
//       )}
//             <div className='divLike'>
//                   <button className='btnLike'
//                     onClick={() => handleLike()}
//                   >
//                     👍{Material.likeCount}
//                   </button> 
//               </div>

//       <hr style={{ width: '80%', margin: '20px 0' }} />

//       {currUser ? (
//         <div className="WriteComment">
//           <form className="needsValidation" onSubmit={handleCommentSubmit}>
//             <label htmlFor="comment">Write Your Comment</label><br />
//             <textarea
//               required
//               name="material[comments]"
//               id="comment"
//               rows="3"
//               value={comment}
//               onChange={(e) => setComment(e.target.value)}
//             ></textarea>
//             <br />
//             <button 
//               type="submit" 
//               className="sendComment" 
//               disabled={addCommentMutation.isLoading}
//             >
//             {addCommentMutation.isLoading ? (
//               'Sending...'
//             ) : (
//               <img 
//                 src={sentIcon}  
//                 alt="Sent" 
//               />
//             )}
//             </button>
//           </form>
//         </div>
//       ) : (
//         <p>Please <Link to="/login">login</Link> to leave a comment</p>
//       )}

//       <hr style={{ width: '80%', margin: '20px 0' }} />

//       {Material.comments && Material.comments.length > 0 && (
//         <>
//           <h3 className='headingComment'>All Comments</h3>
//           <div className="allComments" >
//             {Material.comments.map((comment) => (
//               <div className="CommentCard" key={comment._id}>
//                 {currUser && currUser._id === comment.owner?._id && (
//                   <button
//                   className='sendComment'
//                     onClick={() => handleDeleteComment(comment._id)}
//                     title="Delete Comment"
//                   >
//                     Remove
//                   </button>
//                 )}
//                 <p className='commentOwner'>     
//                  <b>{comment.owner?.username}</b> <br /> 
//                 </p>
//                 <p>{comment.description}</p>
//               </div>
//             ))}
//           </div>
//         </>
//       )}
//     </div>
//     )}

//     export default MaterialDetail;
