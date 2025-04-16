import MainLayout from "../layouts/MainLayout";
import { useState, useEffect } from "react";

export default function ImageDebug() {
  const [imageStatuses, setImageStatuses] = useState({});
  const imagesToTest = [
    { name: "Crossing WebP", src: "/at_the_crossing.webp" },
    { name: "Crossing JPG", src: "/at_the_crossing.jpg" },
    { name: "Profile WebP", src: "/profile_pic.webp" },
    { name: "Profile JPEG", src: "/profile_pic.jpeg" },
  ];

  const testImage = (name, src) => {
    const img = new Image();
    img.onload = () =>
      setImageStatuses((prev) => ({ ...prev, [name]: "Loaded" }));
    img.onerror = () =>
      setImageStatuses((prev) => ({ ...prev, [name]: "Failed" }));
    img.src = src;
  };

  useEffect(() => {
    imagesToTest.forEach((img) => testImage(img.name, img.src));
  }, [imagesToTest]);

  return (
    <MainLayout title="Image Debug">
      <h1>Image Loading Debug</h1>

      <table
        style={{ width: "100%", borderCollapse: "collapse", marginTop: "2rem" }}
      >
        <thead>
          <tr>
            <th
              style={{
                textAlign: "left",
                padding: "0.5rem",
                borderBottom: "1px solid #ccc",
              }}
            >
              Image
            </th>
            <th
              style={{
                textAlign: "left",
                padding: "0.5rem",
                borderBottom: "1px solid #ccc",
              }}
            >
              Path
            </th>
            <th
              style={{
                textAlign: "left",
                padding: "0.5rem",
                borderBottom: "1px solid #ccc",
              }}
            >
              Status
            </th>
          </tr>
        </thead>
        <tbody>
          {imagesToTest.map((img) => (
            <tr key={img.name}>
              <td style={{ padding: "0.5rem", borderBottom: "1px solid #ccc" }}>
                {img.name}
              </td>
              <td style={{ padding: "0.5rem", borderBottom: "1px solid #ccc" }}>
                {img.src}
              </td>
              <td style={{ padding: "0.5rem", borderBottom: "1px solid #ccc" }}>
                {imageStatuses[img.name] || "Testing..."}
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <h2 style={{ marginTop: "2rem" }}>Next Steps</h2>
      <p>Based on the results above:</p>
      <ul>
        <li>
          If WebP images fail but JPG/JPEG succeed: Your browser might not
          support WebP
        </li>
        <li>If all images fail: Check the public directory path</li>
        <li>
          If some work and others don&apos;t: Check if those specific files
          exist
        </li>
      </ul>
    </MainLayout>
  );
}
