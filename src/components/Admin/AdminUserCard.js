
export default function AdminUserCard({user}){
    return(
        <div className="grid grid-cols-3 gap-3 bg-gradient-to-r from-fuchsia-500 to-cyan-500 rounded-md drop-shadow-md">
            <div className="col-span-1 px-2 py-2 rounded-md">
                <img className="rounded-full drop-shadow-md" src="https://w7.pngwing.com/pngs/178/595/png-transparent-user-profile-computer-icons-login-user-avatars-thumbnail.png" alt=""></img>
            </div>
            <div className="col-span-2 py-2">
                <div>{user.mobile}</div>
                <div>{user.shopMobileNo}</div>
                <div>{user.shopName}</div>
                <div>{user.role}</div>
            </div>

        </div>
    );
}