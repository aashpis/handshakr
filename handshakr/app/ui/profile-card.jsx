


export default function ProfileCard({ username, userId, email }) {
   return (
      <div className="bg-white my-4 text-grey-700 text-sm border rounded">
         <div className="m-4">
            <h1 className="text-blue-500">My Profile</h1>
            <p>username: <span className="text-blue-700 font-bold">{username}</span></p>
            <p>user ID: <span className="text-blue-700 font-bold">{userId}</span></p>
            <p>email: <span className="text-blue-700 font-bold">{email}</span></p>
         </div>
      </div>

      
   );
}