import React from "react";

export default function Profile() {
  return (
    <div className="p-10">
      <h1>Profile & History</h1>

      <p>Phone: {localStorage.getItem("phone")}</p>
      <p>Trusted Contact: {localStorage.getItem("trustedContact")}</p>
      <p>Last Result: {localStorage.getItem("result")}</p>
    </div>
  );
}