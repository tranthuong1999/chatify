import React from "react";
import PageLoader from "../components/PageLoader";
import { useAuthStore } from "../store/useAuthStore";
import BorderAnimatedContainer from "../components/BorderAnimatedContainer";

const ChatPage = () => {
  const { logout } = useAuthStore();

  return (
    <div className="w-full flex items-center justify-center p-4 bg-slate-900">
      <div className="relative w-full max-w-6xl md:h-[800px] h-[650px]">
        <BorderAnimatedContainer>
          {/* left side */}
          <div>abcd</div>
          {/* right side */}
        </BorderAnimatedContainer>
      </div>
    </div>
  );
};

export default ChatPage;
