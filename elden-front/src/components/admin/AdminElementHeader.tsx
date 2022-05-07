import React, { useEffect, useState } from "react";
import { fetchFileBase64 } from "../../util/requests";

export default function AdminElementHeader({ idImage, title }) {
  const [image64, setImage64] = useState(null);

  async function getImage() {
    const res = await fetchFileBase64(idImage);
    if (res.status === 200) setImage64((await res.json()).file_content);
  }

  useEffect(() => {
    console.info("fefnerfnejknerkfnejfkfnjr");

    getImage();
  }, [title]);

  return (
    <div className="admin-element-hd">
      {image64 && <img src={image64} alt="" />}
      <p>{title}</p>
    </div>
  );
}
