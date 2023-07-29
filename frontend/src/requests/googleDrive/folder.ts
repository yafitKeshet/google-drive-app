// export const getFiles = async (folderId) => {
//   try {
//     const response = await fetch(
//       "http://localhost:5000/google-drive/folder/" + folderId,
//       {
//         method: "GET",
//       }
//     );

//     const responseJSON = await response.json();

//     return responseJSON.data.files;
//   } catch (err) {
//     console.log("ERROR: GET folder/getFiles", err);
//     return {};
//   }
// };
