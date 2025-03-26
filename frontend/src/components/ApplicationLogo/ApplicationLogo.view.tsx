import { Link } from "react-router-dom";

const ApplicationLogoView = () => {
  return (
    <Link to="/">
      <div className="text-black dark:text-white">Mental Health App</div>
    </Link>
  );
};

export default ApplicationLogoView;
