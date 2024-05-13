const notAllowedFieldsToUpdateError = (res) => {
    return res
        .status(200)
        .send("Um ou mais campos inseridos não são editaveis.");
};

module.exports = { notAllowedFieldsToUpdateError };