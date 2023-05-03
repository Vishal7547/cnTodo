import "../style/heading.css";
function Heading({
  updateData,
  handlePost,
  onChangeHandler,
  item,
  update,
  updateTitle,
}) {
  console.log("updateTitle", updateTitle);
  return (
    <>
      <h1 className="heading">TODO LISTS</h1>
      <div className="addData">
        {update ? (
          <>
            <input
              type="text"
              value={item}
              placeholder="Add Task.."
              onChange={(e) => onChangeHandler(e)}
            />
            <button onClick={() => handlePost(item)}>ADD</button>
          </>
        ) : (
          <>
            <input
              type="text"
              defaultValue={updateTitle}
              key={updateTitle}
              onChange={(e) => onChangeHandler(e)}
            />
            <button onClick={() => updateData(item)}>UPDATE</button>
          </>
        )}
      </div>
    </>
  );
}

export default Heading;
