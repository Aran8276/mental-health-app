import { Link } from "react-router-dom";

const ActiveUserCardView = () => {
  return (
    <Link to="/">
      <div className="flex space-x-3">
        <section className="">
          <div className="w-8 h-8 overflow-hidden border-2 border-gray-400 rounded-full">
            <img
              src="https://images.unsplash.com/photo-1517841905240-472988babdf9?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=334&q=80"
              className="object-cover w-full h-full"
              alt="avatar"
            />
          </div>
        </section>

        <section className="flex flex-col space-y-1">
          <h2 className="font-semibold">User Name</h2>
          <p className="text-gray-700 text-sm">25 respon</p>
        </section>
      </div>
    </Link>
  );
};

export default ActiveUserCardView;
