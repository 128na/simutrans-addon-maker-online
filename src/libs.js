// ファイルオブジェクトからバイナリデータを読み取る
export const asyncFileReader = function (files) {
  return Promise.all(files.map((file) => {
    return new Promise((res, rej) => {
      const r = new FileReader();
      r.onload = () => res({ file, result: r.result });
      r.onerror = () => rej({ file, error: r.error });
      r.readAsDataURL(file);
    });
  }));
};

export const dataURL2File = function (dataURL, name, suffix = '.png') {
  const byteString = atob(dataURL.split(",")[1]);
  const mimeType = dataURL.match(/(:)([a-z\/]+)(;)/)[2];

  for (var i = 0, l = byteString.length, content = new Uint8Array(l); l > i; i++) {
    content[i] = byteString.charCodeAt(i);
  }

  return new File([content], `${name}${suffix}`, {
    type: mimeType,
  })
};

export const postPak = async function ({ filename, size, dat, images }) {
  const formData = new FormData();
  formData.append("filename", filename);
  formData.append("size", size);
  formData.append("dat", dat);

  images.map((image, index) => {
    formData.append(`images[${index}]`, image);
  });

  // const url = "http://localhost:1180/api/v1/pak";
  const url = "https://makeobj-api.128-bit.net/api/v1/pak";
  const res = await fetch(url, {
    method: "POST",
    body: formData,
    headers: {
      Accept: "application/json",
    },
  });
  if (!res.ok) {
    alert('pak化に失敗しました')
    return console.log({ res });
  }
  const body = await res.json();
  return body.pakfile;
};

export const download = function (uri, name) {
  const link = document.createElement("a");
  link.download = name;
  link.href = uri;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}