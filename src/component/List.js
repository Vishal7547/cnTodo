import React from "react";
import { useState, useEffect } from "react";
import "../style/list.css";
function List({
  data,
  handleDelete,
  handleUpdate,
  update,
  updateCheckBox,
  clearTodo,
}) {
  const [completedTask, setCompletedTask] = useState([]);

  useEffect(() => {
    const count = () => {
      if (data.length > 0) {
        const complete = data.filter((x) => x.completed === true);
        setCompletedTask(complete.length);
      }
    };
    count();
  }, [data]);

  if (data.length === 0) {
    return (
      <>
        <h1 className="animationSet">Assign Todo</h1>
      </>
    );
  }

  return (
    <div className="addData">
      <div className="scrollPlace">
        {data.map((x) => {
          return (
            <div className="wrapper" key={x.id}>
              <div className="checks">
                <input
                  type="checkbox"
                  checked={x.completed}
                  onChange={() => updateCheckBox(x)}
                />
              </div>
              <div className="texts">
                <p>{x.title}</p>
              </div>
              <div className="update" onClick={() => handleUpdate(x)}>
                {<i class="bi bi-pencil-fill"></i>}
              </div>
              <div className="delete" onClick={() => handleDelete(x.id)}>
                <i class="bi bi-trash3-fill"></i>
              </div>
            </div>
          );
        })}
      </div>
      <div className="count">
        <span>Completed Todo:{completedTask} </span>
        <button onClick={clearTodo}>CLEAR</button>
        <span>Total Todo:{data.length} </span>
      </div>
    </div>
  );
}

export default List;
