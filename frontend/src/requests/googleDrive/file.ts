// export const getFile = async (fileId) => {
//   try {
//     const response = await fetch(
//       "http://localhost:5000/google-drive/file/" + fileId,
//       {
//         method: "GET",
//       }
//     );

//     console.log(response);
//     // const responseJSON = await response.json();

//     // return responseJSON.data.files;
//   } catch (err) {
//     console.log("ERROR: GET file/getFile", err);
//     return {};
//   }
// };

/*
  const handleGetFile = async (id) => {
    try {
      axios({
        url: "http://localhost:5000/google-drive/file/" + id,
        method: "GET",
        responseType: "blob",
      }).then((res) => {
        FileDownload(res.data, "downloaded.jpg");
      });
      // const response = await fetch(
      //   "http://localhost:5000/google-drive/file/" + id,
      //   {
      //     method: "GET",
      //   }
      // );

      // console.log(response);
      // const responseJSON = await response.json();

      // return responseJSON.data.files;
    } catch (err) {
      console.log(err);
    }
  };


*/
