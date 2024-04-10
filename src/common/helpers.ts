export const downloadFile = ({
  data,
  fileName,
  fileType,
}: {
  data: any;
  fileName: string;
  fileType: string;
}) => {
  // Create a blob with the data we want to download as a file
  const blob = new Blob([data], { type: fileType });
  // Create an anchor element and dispatch a click event on it
  // to trigger a download
  const a = document.createElement("a");
  a.download = fileName;
  a.href = window.URL.createObjectURL(blob);
  const clickEvt = new MouseEvent("click", {
    view: window,
    bubbles: true,
    cancelable: true,
  });
  a.dispatchEvent(clickEvt);
  a.remove();
};


export const resolveMaterialsName = (material: string) => {
  switch (material) {
    case 'ice':
      return 'Gelo eterno';
    case 'ruby':
      return 'Aço rubi';
    case 'adamant':
      return 'Adamante';
    case 'wood':
      return 'Madeira tollon';
    case 'mithril':
      return 'Mithril';
    case 'red':
      return 'Matéria vermelha';
    default:
      return 'Nenhum material';
  }
};

