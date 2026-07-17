import React, { useState, useRef } from "react";
import { useChatStore } from "../store/useChatStore";
import { LogOutIcon, VolumeOffIcon, Volume2Icon } from "lucide-react";
import { useAuthStore } from "../store/useAuthStore";

const ProfileHeader = () => {
  const { isSoundEnabled, toggleSound } = useChatStore();
  const [selectedImg, setSelectedImg] = useState(null);
  const { logout, authUser, updateProfile } = useAuthStore();
  const fileInputRef = useRef(null);
  const audioRef = useRef(new Audio("/sounds/mouse-click.mp3"));

  const handleLogout = () => {
    logout();
  };

  const handleSound = () => {
    audioRef.current.currentTime = 0;
    audioRef.current.play();
    toggleSound();
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.readAsDataURL(file);

    reader.onloadend = async () => {
      const base64Image = reader.result;
      setSelectedImg(base64Image);
      await updateProfile({ profilePic: base64Image });
    };
  };

  return (
    <div className="pl-[4]">
      <div className="flex justify-between items-center">
        <div className="flex gap-3">
          <div>
            <button
              className="size-14 rounded-full overflow-hidden relative group"
              onClick={() => fileInputRef.current.click()}
            >
              <img
                src={selectedImg || authUser.profilePic || "/avatar.png"}
                alt="User image"
                className="size-full object-cover"
              />
              <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity">
                <span className="text-white text-xs">Change</span>
              </div>
            </button>

            <input
              type="file"
              accept="image/*"
              ref={fileInputRef}
              onChange={handleImageUpload}
              className="hidden"
            />
          </div>

          <div className="flex flex-col justify-center">
            <div> Name</div>
            <div> Status</div>
          </div>
        </div>
        <div className="flex gap-3">
          <div onClick={handleLogout}>
            <LogOutIcon />
          </div>
          <div onClick={handleSound}>
            {isSoundEnabled ? <Volume2Icon /> : <VolumeOffIcon />}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileHeader;
