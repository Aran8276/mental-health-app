import { Link } from "react-router-dom";
import UserAvatar from "../UserAvatar/UserAvatar";

const ActiveUserCardView = () => {
  return (
    <Link to="/">
      <div className="flex space-x-3">
        <section>
          <UserAvatar />
        </section>

        <section className="flex flex-col space-y-1">
          <h2 className="font-semibold">User Name</h2>
          <p className="text-gray-700 dark:text-gray-200 text-sm">25 respon</p>
        </section>
      </div>
    </Link>
  );
};

export default ActiveUserCardView;
