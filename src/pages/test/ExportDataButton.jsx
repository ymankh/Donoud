import { Filesystem, Directory } from '@capacitor/filesystem';


const exportJSON = async (jsonData) => {
    try {
        const fileName = 'data.json';
        const fileContents = JSON.stringify(jsonData);
        const blob = new Blob([fileContents], { type: 'application/json' });
        await Filesystem.writeFile({
            path: fileName,
            data: blob,
            directory: Directory.Documents // or any other directory you prefer
        });
        console.log('JSON file exported successfully!');
    } catch (error) {
        console.error('Error exporting JSON file:', error);
    }
};



const ExportDataButton = () => {
    const exportData = () => {
      // Step 1: Retrieve all data from local storage
      const localStorageData = { ...localStorage };

      // Step 2: Convert the data into a JSON string
      const jsonData = JSON.stringify(localStorageData);
  
      // Step 3: Write the JSON string to a file
      const blob = new Blob([jsonData], { type: 'application/json' });

      const url = URL.createObjectURL(blob);
      exportJSON(localStorageData);

      // Create a link element to trigger the download
      const a = document.createElement('a');
      a.href = url;
      a.download = 'localStorageData.json';
      document.body.appendChild(a);
      a.click();
  
      // Clean up
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    };
  
    return (
      <button onClick={exportData}>
        Export Data
      </button>
    );
  };
  
  export default ExportDataButton;