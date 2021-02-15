// import React, {useState, useEffect} from 'react';
// import { Container, Alert, Table, Button } from 'react-bootstrap';
// import Moment from 'moment';
// import {Link} from 'react-router-dom';
// import { useAuth } from '../contexts/AuthContext';
// import axios from 'axios';
// import {FaStripeS} from 'react-icons/fa'


// import Rating from './RequestRating';

// export default function Request({request}) {
//     const otherUserName = getOtherUserName(request);

//     const getOtherUserName = (request) => {
//         if (user.userID !== request.owner) {
//             return request.owner_name
//         } else {
//             return request.sitter_name
//         }
//     }

//     return(
//         <tr key={request.request_id}>
//             <td className='align-middle'>
//                 <Link to={requestRouterParams(request.request_id, otherUserName)}>
//                     {Moment.parseZone(request.date_of_service).local().format('l')} Request { user.userID === request.owner ? 'To' : 'From'} {otherUserName}
//                 </Link>
//             </td>
//             <td className='align-middle'>
//                 <Link to={requestRouterParams(request.request_id, otherUserName)}>
//                 <Container >
//                     <div className='text-muted'>
//                     { 
//                         request.last_message.message
//                     }
//                     </div>
//                     <div className='text-right'>
//                         <small>
//                             {Moment().from(request.last_message.timestamp)}
//                         </small>
//                     </div>
//                     </Container>
//                 </Link>
//             </td>
//             <td className='align-middle'>
//                 <Rating baseURL={baseURL} request={request} currentUserData={user} maxRating={maxRating}/>
//             </td>
//             <td>
//                 { user.userID === request.owner &&
//                     <Button><FaStripeS /></Button>
//                 }
//             </td>
//         </tr>
//     )

// }
