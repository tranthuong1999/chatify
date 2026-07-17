import React from "react";
import { useChatStore } from "../store/useChatStore";

const ActiveTabSwitch = () => {
  const { setActiveTab, activeTab } = useChatStore();

  const handleActiveTab = (tab) => {
    setActiveTab(tab);
  };
  return (
    <div className="tabs tabs-boxed bg-transparent p-2 m-2">
      <button
        onClick={() => handleActiveTab("chats")}
        className={`tab ${
          activeTab === "chats"
            ? "bg-cyan-500/20 text-cyan-400"
            : "text-slate-400"
        }`}
      >
        {" "}
        Chat{" "}
      </button>
      <button
        onClick={() => handleActiveTab("contacts")}
        className={`tab ${
          activeTab === "contacts"
            ? "bg-cyan-500/20 text-cyan-400"
            : "text-slate-400"
        }`}
      >
        {" "}
        Contact{" "}
      </button>
    </div>
  );
};

export default ActiveTabSwitch;
