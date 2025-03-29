import { User } from "lucide-react";

const UserAvatarView = () => {
  return (
    <div className="w-8 h-8 overflow-hidden border-2 border-gray-400 rounded-full">
      <User className="p-[6px] w-full h-full" />
    </div>
  );
};

export default UserAvatarView;
