import { verifySession } from './app/lib/dal'
import  ProfileCard  from '../ui/profile-card'
import HandshakeCreationForm from '../ui/handshake-creation-form'

const user = {
  username: "jSmith",
  userID: "123456",
  email: "jsmith@gmail.com"
}

export default function Page() {
    return (
      <div>
    <ProfileCard 
    username = {user.username}
    userId = {user.userID}
    email = {user.email}
    />
    <HandshakeCreationForm />
    </div>
    );
  }
 

// TODO: implement user vs admin dashboard 
// export default function Dashboard() {
//   const session = await verifySession()
//   const userRole = session?.user?.role // Assuming 'role' is part of the session object
 
//   if (userRole === 'admin') {
//     return <AdminDashboard />
//   } else if (userRole === 'user') {
//     return <UserDashboard />
//   } else {
//     redirect('/login')
//   }
// }