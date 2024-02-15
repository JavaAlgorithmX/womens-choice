
export default function UserDetails({ user }) {
    return (
      <div>
        <h2>Shop Name: {user.shopName}</h2>
        <p>Mobile Number: {user.mobile}</p>
        <p>Address: {user.shopAddressLine1}, {user.shopAddressLine2}, {user.landmark}, {user.state}, {user.country}, PIN: {user.pin}</p>
      </div>
    );
  };