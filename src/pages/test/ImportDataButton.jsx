function handleFileSelect(event) {
  const file = event.target.files[0];
  const reader = new FileReader();

  reader.onload = async function (event) {
    try {
      // Parse the JSON data
      const jsonData = JSON.parse(event.target.result);
      const tasks = [];
      // Store the data in local storage
      Object.keys(jsonData).forEach((key) => {
        console.log(tasks);
        tasks.push(...JSON.parse(jsonData[key]));
      });
      localStorage.setItem("tasks", JSON.stringify(tasks));

      alert("Data imported successfully!");
    } catch (error) {
      alert("Error importing data. Please make sure the file is valid JSON.");
    }
  };

  reader.readAsText(file);
}

const ImportDataButton = () => {
  const importData = async () => {
    try {
      // Prompt the user to select a file
      const fileInput = document.createElement("input");
      fileInput.type = "file";
      fileInput.accept = ".json";
      fileInput.addEventListener("change", handleFileSelect);
      fileInput.click();
    } catch (error) {
      console.error("Error importing data:", error);
      alert("An error occurred while importing data. Please try again.");
    }
  };

  return <button onClick={importData}>Import Data</button>;
};

export default ImportDataButton;
