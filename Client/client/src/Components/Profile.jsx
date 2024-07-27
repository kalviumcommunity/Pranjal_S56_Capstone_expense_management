import React, { useState } from "react";
import Navbar from "./Navbar";

function App() {
  const [profilePhotoUrl, setProfilePhotoUrl] = useState(
    "path/to/profile/photo.jpg"
  );

  return (
    <div>
      <Navbar profilePhotoUrl={profilePhotoUrl} />
    </div>
  );
}

export default App;
