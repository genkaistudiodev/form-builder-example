const exportDataToJson = (data) => {
    const jsonString = `data:text/json;chatset=utf-8,${encodeURIComponent(
        JSON.stringify(data)
    )}`;
    const link = document.createElement("a");
    link.href = jsonString;
    link.download = "data.json";
    link.click();
}

const importDataFromJson = async (e, callback) => {
    e.preventDefault();
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onload = (e) => {
        let newData = JSON.parse(e.target.result);
        callback(newData);
    };
    reader.readAsText(file);
}

const exportedFunctions = {
    exportDataToJson,
    importDataFromJson
}

export default exportedFunctions;