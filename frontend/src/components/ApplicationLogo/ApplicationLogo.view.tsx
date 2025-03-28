import { Link } from "react-router-dom";

const ApplicationLogoView = () => {
  return (
    <Link to="/">
      <div className="flex items-center space-x-5 text-black dark:text-white">
        <img className="animate-spin" src="/react.svg" />
        <p>Mental Health App</p>
      </div>
    </Link>
  );
};

export default ApplicationLogoView;
